import fs from 'node:fs';
import path from 'node:path';

/*
 * Monde « Les ingrédients du succès » (public/playground/ingredients/).
 * Stocke les recettes envoyées par les visiteurs dans un simple fichier JSON.
 *
 *   GET  /api/ingredients          -> { ingredients, recipes }
 *   POST /api/ingredients/recipes  -> { name?, values: { <id>: 0..10 }, extra?: [{ label, value }] }
 *
 * Modération : mettre "hidden": true sur une recette ou un ingrédient dans le fichier
 * (INGREDIENTS_FILE) et redémarrer le service pour le masquer.
 */

const FILE = path.resolve(process.env.INGREDIENTS_FILE || './data/ingredients.json');
const MAX_INGREDIENTS = 12;
const MAX_RECIPES = 500;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;

const SEED = ['Curiosité', 'Patience', 'Chance', 'Travail', 'Talent', 'Audace', 'Réseau', 'Gentillesse'];

const slug = (s) =>
  s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'x';
const clean = (s, max) =>
  String(s ?? '').replace(/[<>\u0000-\u001f]/g, '').replace(/\s+/g, ' ').trim().slice(0, max);

function load() {
  try {
    const j = JSON.parse(fs.readFileSync(FILE, 'utf8'));
    if (Array.isArray(j.ingredients) && Array.isArray(j.recipes)) return j;
  } catch {
    /* premier démarrage : on part des ingrédients de base */
  }
  return { ingredients: SEED.map((label) => ({ id: slug(label), label })), recipes: [] };
}

let state = load();

function persist() {
  fs.mkdirSync(path.dirname(FILE), { recursive: true });
  const tmp = `${FILE}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(state));
  fs.renameSync(tmp, FILE);
}

const publicState = () => ({
  ingredients: state.ingredients.filter((g) => !g.hidden).map(({ id, label }) => ({ id, label })),
  recipes: state.recipes.filter((r) => !r.hidden).slice(-200).map(({ id, name, values }) => ({ id, name, values })),
});

const hits = new Map(); // ip -> timestamps
const limited = (ip) => {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  if (list.length >= RATE_MAX) return true;
  list.push(now);
  hits.set(ip, list);
  return false;
};

export function mountIngredients(app) {
  app.get('/api/ingredients', (_req, res) => {
    res.setHeader('Cache-Control', 'no-store');
    res.json(publicState());
  });

  app.post('/api/ingredients/recipes', (req, res) => {
    if (limited(req.ip)) return res.status(429).json({ error: 'too many recipes' });

    const body = req.body ?? {};
    const known = new Set(state.ingredients.map((g) => g.id));
    const values = {};
    for (const [id, v] of Object.entries(body.values ?? {})) {
      const n = Number(v);
      if (known.has(id) && Number.isFinite(n)) values[id] = Math.round(Math.min(10, Math.max(0, n)) * 2) / 2;
    }

    for (const x of Array.isArray(body.extra) ? body.extra.slice(0, 3) : []) {
      const label = clean(x?.label, 24);
      const n = Number(x?.value);
      if (label.length < 2 || !Number.isFinite(n)) continue;
      let g = state.ingredients.find((i) => i.label.toLowerCase() === label.toLowerCase());
      if (!g) {
        if (state.ingredients.length >= MAX_INGREDIENTS) continue;
        g = { id: slug(label), label };
        while (state.ingredients.some((i) => i.id === g.id)) g.id += '-';
        state.ingredients.push(g);
      }
      values[g.id] = Math.round(Math.min(10, Math.max(0, n)) * 2) / 2;
    }

    if (Object.keys(values).length < 3) return res.status(400).json({ error: 'not enough values' });

    state.recipes.push({ id: `r${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`, name: clean(body.name, 24), values, ts: Date.now() });
    if (state.recipes.length > MAX_RECIPES) state.recipes = state.recipes.slice(-MAX_RECIPES);
    persist();
    return res.json(publicState());
  });
}
