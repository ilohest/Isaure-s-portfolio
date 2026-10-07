/**
 * Générateur du poster d'accueil : un pavage de la grille par des polyominos
 * (L, S, T, pilules, cercles, grands rectangles…), chacun contouré d'une ligne fine
 * aux angles arrondis. Déterministe (graine) → même rendu à chaque build.
 */

export type ColorKey = 'red' | 'blue' | 'green' | 'yellow' | 'pink';
export type LinkKey = 'work' | 'services' | 'contact' | 'process' | 'about' | 'ai';

export interface Region {
  id: number;
  size: number;
  path: string;
  color: ColorKey;
  color2: ColorKey;
  /** vecteur du dégradé en coordonnées objectBoundingBox */
  grad: { x1: number; y1: number; x2: number; y2: number };
  label?: { x: number; y: number; link: LinkKey };
  link?: LinkKey;
  delay: number;
}

export interface PosterLayout {
  cols: number;
  rows: number;
  unit: number;
  pad: number;
  width: number;
  height: number;
  regions: Region[];
}

type Cell = [number, number];

const UNIT = 100;
const PAD = 14;
const INSET = 4.5; // demi-largeur du canal entre deux régions
const RADIUS = 50;

const mulberry32 = (seed: number) => {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

// ---------------------------------------------------------------- pièces
interface PieceDef {
  cells: Cell[];
  w: number;
  big?: boolean;
}

const rect = (w: number, h: number): Cell[] => {
  const out: Cell[] = [];
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) out.push([x, y]);
  return out;
};

const PIECES: PieceDef[] = [
  { cells: [[0, 0]], w: 2.4 },
  { cells: [[0, 0], [1, 0]], w: 4 },
  { cells: [[0, 0], [1, 0], [2, 0]], w: 1.8 },
  { cells: [[0, 0], [1, 0], [0, 1]], w: 4.2 },
  { cells: rect(2, 2), w: 2.2 },
  { cells: [[0, 0], [1, 0], [2, 0], [0, 1]], w: 3 },
  { cells: [[1, 0], [2, 0], [0, 1], [1, 1]], w: 3.4 },
  { cells: [[0, 0], [1, 0], [2, 0], [1, 1]], w: 1.8 },
  { cells: [[0, 0], [1, 0], [0, 1], [1, 1], [0, 2]], w: 1.7 },
  { cells: [[0, 0], [1, 0], [2, 0], [0, 1], [0, 2]], w: 1.2 },
  { cells: [[0, 0], [2, 0], [0, 1], [1, 1], [2, 1]], w: 0.7 },
  { cells: rect(3, 2), w: 1.6 },
  { cells: rect(3, 3), w: 0.55, big: true },
  { cells: rect(4, 2), w: 0.45, big: true },
  { cells: [...rect(3, 3), [0, 3], [0, 4]], w: 0.45, big: true },
  { cells: rect(2, 4), w: 0.45, big: true },
];

const normalize = (cells: Cell[]): Cell[] => {
  const sorted = [...cells].sort((a, b) => a[1] - b[1] || a[0] - b[0]);
  const [ox, oy] = sorted[0];
  return sorted.map(([x, y]) => [x - ox, y - oy]);
};

const orientationsOf = (cells: Cell[]): Cell[][] => {
  const seen = new Set<string>();
  const out: Cell[][] = [];
  let cur = cells;
  for (let m = 0; m < 2; m++) {
    for (let r = 0; r < 4; r++) {
      cur = cur.map(([x, y]) => [-y, x] as Cell);
      const n = normalize(cur);
      const key = n.map((c) => c.join(',')).join(';');
      if (!seen.has(key)) {
        seen.add(key);
        out.push(n);
      }
    }
    cur = cur.map(([x, y]) => [-x, y] as Cell);
  }
  return out;
};

const LIBRARY = PIECES.map((p) => ({ ...p, orients: orientationsOf(p.cells) }));

// ---------------------------------------------------------------- pavage
const tile = (cols: number, rows: number, rng: () => number): Cell[][] => {
  const owner: number[] = new Array(cols * rows).fill(-1);
  const regions: Cell[][] = [];
  let bigCount = 0;
  const maxBig = cols * rows > 60 ? 2 : 1;

  for (;;) {
    const at = owner.indexOf(-1);
    if (at === -1) break;
    const ax = at % cols;
    const ay = Math.floor(at / cols);
    const cands: { cells: Cell[]; w: number; big?: boolean }[] = [];
    for (const piece of LIBRARY) {
      if (piece.big && bigCount >= maxBig) continue;
      for (const o of piece.orients) {
        const ok = o.every(([dx, dy]) => {
          const x = ax + dx;
          const y = ay + dy;
          return x >= 0 && x < cols && y >= 0 && y < rows && owner[y * cols + x] === -1;
        });
        if (ok) cands.push({ cells: o.map(([dx, dy]) => [ax + dx, ay + dy] as Cell), w: piece.w / piece.orients.length, big: piece.big });
      }
    }
    if (!cands.length) cands.push({ cells: [[ax, ay]], w: 1 });
    const total = cands.reduce((s, c) => s + c.w, 0);
    let r = rng() * total;
    let pick = cands[cands.length - 1];
    for (const c of cands) {
      r -= c.w;
      if (r <= 0) {
        pick = c;
        break;
      }
    }
    if (pick.big) bigCount++;
    const id = regions.length;
    pick.cells.forEach(([x, y]) => (owner[y * cols + x] = id));
    regions.push(pick.cells);
  }
  return regions;
};

const scoreTiling = (regions: Cell[][], cols: number, rows: number) => {
  const total = cols * rows;
  const avg = total / regions.length;
  const monos = regions.filter((r) => r.length === 1).length / regions.length;
  const bigs = regions.filter((r) => r.length >= 5).length;
  const biggest = Math.max(...regions.map((r) => r.length));
  let s = 0;
  s -= Math.abs(avg - 3.6) * 3;
  s -= Math.abs(monos - 0.1) * 12;
  s += Math.min(bigs, 9) * 0.5;
  if (biggest > 14) s -= 6;
  return s;
};

// ---------------------------------------------------------------- contour
const outlinePath = (cells: Cell[]): string => {
  const set = new Set(cells.map(([x, y]) => `${x},${y}`));
  const has = (x: number, y: number) => set.has(`${x},${y}`);
  type Pt = [number, number];
  const edges = new Map<string, Pt>(); // départ → arrivée
  const add = (a: Pt, b: Pt) => edges.set(a.join(','), b);
  for (const [x, y] of cells) {
    if (!has(x, y - 1)) add([x, y], [x + 1, y]);
    if (!has(x + 1, y)) add([x + 1, y], [x + 1, y + 1]);
    if (!has(x, y + 1)) add([x + 1, y + 1], [x, y + 1]);
    if (!has(x - 1, y)) add([x, y + 1], [x, y]);
  }
  const start = [...edges.keys()][0].split(',').map(Number) as Pt;
  const pts: Pt[] = [start];
  let cur = edges.get(start.join(','))!;
  while (cur[0] !== start[0] || cur[1] !== start[1]) {
    pts.push(cur);
    cur = edges.get(cur.join(','))!;
  }
  // ne garde que les coins
  const corners = pts.filter((p, i) => {
    const a = pts[(i + pts.length - 1) % pts.length];
    const b = pts[(i + 1) % pts.length];
    return (p[0] - a[0]) * (b[1] - p[1]) - (p[1] - a[1]) * (b[0] - p[0]) !== 0;
  });
  const n = corners.length;
  const dir = (a: Pt, b: Pt): Pt => {
    const dx = b[0] - a[0];
    const dy = b[1] - a[1];
    const l = Math.hypot(dx, dy) || 1;
    return [dx / l, dy / l];
  };
  const normal = (d: Pt): Pt => [-d[1], d[0]]; // intérieur à droite (y vers le bas)

  // sommets décalés vers l'intérieur
  const w = corners.map((v, i) => {
    const dIn = dir(corners[(i + n - 1) % n], v);
    const dOut = dir(v, corners[(i + 1) % n]);
    const n1 = normal(dIn);
    const n2 = normal(dOut);
    return [v[0] * UNIT + INSET * (n1[0] + n2[0]), v[1] * UNIT + INSET * (n1[1] + n2[1])] as Pt;
  });

  const f = (v: number) => Math.round(v * 100) / 100;
  const as: Pt[] = [];
  const bs: Pt[] = [];
  const rs: number[] = [];
  const sweeps: number[] = [];
  for (let i = 0; i < n; i++) {
    const p = w[(i + n - 1) % n];
    const c = w[i];
    const q = w[(i + 1) % n];
    const dIn = dir(p, c);
    const dOut = dir(c, q);
    const r = Math.min(RADIUS, Math.hypot(c[0] - p[0], c[1] - p[1]) / 2, Math.hypot(q[0] - c[0], q[1] - c[1]) / 2);
    as.push([c[0] - dIn[0] * r, c[1] - dIn[1] * r]);
    bs.push([c[0] + dOut[0] * r, c[1] + dOut[1] * r]);
    rs.push(r);
    sweeps.push(dIn[0] * dOut[1] - dIn[1] * dOut[0] > 0 ? 1 : 0);
  }
  let d = `M${f(bs[0][0])},${f(bs[0][1])}`;
  for (let i = 1; i <= n; i++) {
    const k = i % n;
    d += ` L${f(as[k][0])},${f(as[k][1])} A${f(rs[k])},${f(rs[k])} 0 0 ${sweeps[k]} ${f(bs[k][0])},${f(bs[k][1])}`;
  }
  return `${d} Z`;
};

// ---------------------------------------------------------------- génération
const PALETTE: ColorKey[] = ['red', 'blue', 'green', 'yellow', 'pink'];
const BASE_W: Record<ColorKey, number> = { red: 1, blue: 1.25, green: 1, yellow: 1, pink: 0.8 };

const pickWeighted = <T,>(items: T[], weight: (t: T) => number, rng: () => number): T => {
  const total = items.reduce((s, it) => s + weight(it), 0);
  let r = rng() * total;
  for (const it of items) {
    r -= weight(it);
    if (r <= 0) return it;
  }
  return items[items.length - 1];
};

export interface PosterOptions {
  cols: number;
  rows: number;
  /** taille de police du label en unités du viewBox (sert au test d'encombrement) */
  labelSize: number;
  links: LinkKey[];
}

export const generatePoster = ({ cols, rows, labelSize, links }: PosterOptions): PosterLayout => {
  // meilleure graine parmi 240
  let best: { score: number; tiles: Cell[][]; seed: number } | null = null;
  for (let seed = 1; seed <= 240; seed++) {
    const tiles = tile(cols, rows, mulberry32(seed * 7919 + cols * 31 + rows));
    const score = scoreTiling(tiles, cols, rows);
    if (!best || score > best.score) best = { score, tiles, seed };
  }
  const tiles = best!.tiles;
  const rng = mulberry32(best!.seed * 101 + 7);

  // voisinage
  const cellOwner = new Map<string, number>();
  tiles.forEach((cs, id) => cs.forEach(([x, y]) => cellOwner.set(`${x},${y}`, id)));
  const neighbours = tiles.map((cs, id) => {
    const s = new Set<number>();
    for (const [x, y] of cs)
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const o = cellOwner.get(`${x + dx},${y + dy}`);
        if (o !== undefined && o !== id) s.add(o);
      }
    return s;
  });

  // couleurs : pas deux voisins de même couleur principale
  const primary: (ColorKey | null)[] = tiles.map(() => null);
  const order = tiles.map((_, i) => i).sort(() => rng() - 0.5);
  for (const id of order) {
    const taken = new Set([...neighbours[id]].map((n) => primary[n]).filter(Boolean));
    const size = tiles[id].length;
    const options = PALETTE.filter((c) => !taken.has(c));
    primary[id] = pickWeighted(
      options.length ? options : PALETTE,
      (c) => BASE_W[c] * (c === 'pink' ? (size <= 2 ? 3 : size >= 6 ? 0.2 : 1) : 1),
      rng,
    );
  }

  // liens : régions assez larges sur leur première ligne, bien réparties
  const info = tiles.map((cs, id) => {
    const first = [...cs].sort((a, b) => a[1] - b[1] || a[0] - b[0])[0];
    let run = 0;
    while (cs.some(([x, y]) => x === first[0] + run && y === first[1])) run++;
    const cx = cs.reduce((s, c) => s + c[0] + 0.5, 0) / cs.length;
    const cy = cs.reduce((s, c) => s + c[1] + 0.5, 0) / cs.length;
    return { id, first, run, cx, cy, size: cs.length };
  });
  const linkAt = new Map<number, LinkKey>();
  const candidates = info.filter((r) => r.run >= 2 && r.size >= 3);
  const chosen: typeof info = [];
  const pool = [...candidates];
  pool.sort((a, b) => b.size - a.size);
  if (pool.length) chosen.push(pool.shift()!);
  while (chosen.length < links.length && pool.length) {
    let bestC = pool[0];
    let bestD = -1;
    for (const c of pool) {
      const d = Math.min(...chosen.map((s) => Math.hypot(s.cx - c.cx, s.cy - c.cy))) + Math.sqrt(c.size) * 0.15;
      if (d > bestD) {
        bestD = d;
        bestC = c;
      }
    }
    chosen.push(bestC);
    pool.splice(pool.indexOf(bestC), 1);
  }
  chosen.forEach((c, i) => linkAt.set(c.id, links[i]));

  const regions: Region[] = tiles.map((cs, id) => {
    const c1 = primary[id]!;
    const others = PALETTE.filter((c) => c !== c1);
    const c2 = pickWeighted(others, (c) => (c === 'pink' ? 1.4 : 1), rng);
    const angle = Math.floor(rng() * 8) * (Math.PI / 4) + (rng() - 0.5) * 0.5;
    const link = linkAt.get(id);
    const inf = info[id];
    const [fx, fy] = inf.first;
    void labelSize;
    return {
      id,
      size: cs.length,
      path: outlinePath(cs),
      color: c1,
      color2: c2,
      grad: {
        x1: 0.5 - Math.cos(angle) * 0.5,
        y1: 0.5 - Math.sin(angle) * 0.5,
        x2: 0.5 + Math.cos(angle) * 0.5,
        y2: 0.5 + Math.sin(angle) * 0.5,
      },
      link,
      label: link ? { x: fx * UNIT + 36, y: fy * UNIT + 58, link } : undefined,
      delay: Math.round((inf.cy / rows) * 900 + rng() * 500),
    };
  });

  return {
    cols,
    rows,
    unit: UNIT,
    pad: PAD,
    width: cols * UNIT,
    height: rows * UNIT,
    regions,
  };
};
