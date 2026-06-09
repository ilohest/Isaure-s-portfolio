// Génère src/styles/primeflex-compat.css : un sous-ensemble purgé de primeflex
// ne contenant QUE les classes utilitaires réellement utilisées dans le projet.
// Objectif : retirer primeflex.css (445 Ko) du bundle tout en préservant le rendu
// exact (primeflex gagnait via !important + une échelle d'espacement différente
// de Tailwind : p-4=1.5rem, gap-4=1.5rem, etc.).
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { globSync } from 'glob';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// 1) Tous les tokens de classe utilisés dans les composants/pages.
const srcFiles = globSync('src/**/*.{vue,astro}', { cwd: root, absolute: true });
const used = new Set();
for (const f of srcFiles) {
  const txt = readFileSync(f, 'utf8');
  // class="...", :class="...", class:list=[...] → on récupère tous les mots de classe
  // plausibles. On inclut '/' et '.' pour ne PAS scinder les classes Tailwind
  // fractionnaires (w-8/12, w-1/2…) : sinon "md:w-8" serait extrait et matcherait
  // par erreur une classe primeflex .md:w-8 inutilisée.
  for (const m of txt.matchAll(/[\w:/.-]+/g)) {
    used.add(m[0]);
  }
}

// 2) Parse primeflex.css en respectant les blocs @media (un seul niveau).
const css = readFileSync(path.join(root, 'node_modules/primeflex/primeflex.css'), 'utf8');

// Itère les "items" de premier niveau : soit `@media (...) { ... }`, soit `selector { ... }`.
function* topLevelItems(s) {
  let i = 0;
  const n = s.length;
  while (i < n) {
    // saute espaces/commentaires
    while (i < n && /\s/.test(s[i])) i++;
    if (i >= n) break;
    if (s.startsWith('/*', i)) {
      i = s.indexOf('*/', i) + 2;
      continue;
    }
    // lit jusqu'à '{' (prélude)
    const braceStart = s.indexOf('{', i);
    if (braceStart === -1) break;
    const prelude = s.slice(i, braceStart).trim();
    // trouve le '}' équilibré
    let depth = 0;
    let j = braceStart;
    for (; j < n; j++) {
      if (s[j] === '{') depth++;
      else if (s[j] === '}') {
        depth--;
        if (depth === 0) break;
      }
    }
    const body = s.slice(braceStart + 1, j);
    yield { prelude, body };
    i = j + 1;
  }
}

// Extrait les classes d'un sélecteur (gère l'échappement `\:` de primeflex).
function selectorMatchesUsed(selectorList) {
  return selectorList.split(',').some((sel) => {
    const classes = [...sel.matchAll(/\.((?:\\.|[\w-])+)/g)].map((m) =>
      m[1].replace(/\\(.)/g, '$1'),
    );
    // garde la règle si TOUTES ses classes-cibles sont utilisées (sélecteurs simples
    // d'utilitaires : une seule classe en général).
    return classes.length > 0 && classes.every((c) => used.has(c));
  });
}

function keepRules(body) {
  let out = '';
  for (const { prelude, body: rule } of topLevelItems(body)) {
    if (prelude.startsWith('@')) continue; // pas de @media imbriqué dans primeflex
    if (selectorMatchesUsed(prelude)) {
      out += `${prelude}{${rule.trim()}}\n`;
    }
  }
  return out;
}

let result = '/* Généré par scripts/purge-primeflex.mjs — ne pas éditer à la main. */\n';
result += '/* Sous-ensemble utilisé de primeflex (échelle + !important préservés). */\n';

for (const { prelude, body } of topLevelItems(css)) {
  if (prelude.startsWith('@media')) {
    const inner = keepRules(body);
    if (inner.trim()) result += `${prelude}{\n${inner}}\n`;
  } else if (selectorMatchesUsed(prelude)) {
    result += `${prelude}{${body.trim()}}\n`;
  }
}

const outPath = path.join(root, 'src/styles/primeflex-compat.css');
writeFileSync(outPath, result);
const kb = (Buffer.byteLength(result) / 1024).toFixed(1);
const rules = (result.match(/\{/g) || []).length;
console.log(`primeflex-compat.css écrit : ${kb} Ko, ${rules} blocs (vs 445 Ko primeflex).`);
