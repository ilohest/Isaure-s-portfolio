/** Logique du puzzle coulissant de la page Work (partagée serveur / client). */

export interface Grid {
  cols: number;
  rows: number;
}

/** Nombre minimum de cases vides garanti pour pouvoir jouer. */
export const MIN_HOLES = 3;

export const gridFor = (n: number, cols: number): Grid => ({
  cols,
  rows: Math.ceil((n + MIN_HOLES) / cols),
});

/**
 * Disposition « en ordre » : projets du plus récent au plus ancien, avec des cases
 * vides réparties dans la grille (comme dans une planche découpée).
 * Retourne un tableau slot → index de projet (-1 = case vide).
 */
export const orderedSlots = (n: number, { cols, rows }: Grid): number[] => {
  const total = cols * rows;
  const holes = total - n;
  const holeAt = new Set<number>();
  for (let k = 0; k < holes; k++) holeAt.add(Math.floor(((k + 1) * total) / (holes + 1)));
  const slots: number[] = [];
  let next = 0;
  for (let s = 0; s < total; s++) slots.push(holeAt.has(s) ? -1 : next < n ? next++ : -1);
  return slots;
};

const neighbours = (s: number, { cols, rows }: Grid): number[] => {
  const r = Math.floor(s / cols);
  const c = s % cols;
  const out: number[] = [];
  if (r > 0) out.push(s - cols);
  if (r < rows - 1) out.push(s + cols);
  if (c > 0) out.push(s - 1);
  if (c < cols - 1) out.push(s + 1);
  return out;
};

/**
 * Déplace la case `slot` vers la case vide la plus proche dans sa ligne ou sa colonne
 * (les cases intermédiaires coulissent avec elle). Retourne les nouveaux slots, ou null.
 */
export const slideTile = (slots: number[], grid: Grid, slot: number): number[] | null => {
  if (slots[slot] === -1) return null;
  const { cols, rows } = grid;
  const r0 = Math.floor(slot / cols);
  const c0 = slot % cols;
  const dirs: [number, number][] = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
  let best: { dr: number; dc: number; dist: number } | null = null;
  for (const [dr, dc] of dirs) {
    let r = r0 + dr;
    let c = c0 + dc;
    let dist = 1;
    while (r >= 0 && r < rows && c >= 0 && c < cols) {
      if (slots[r * cols + c] === -1) {
        if (!best || dist < best.dist) best = { dr, dc, dist };
        break;
      }
      r += dr;
      c += dc;
      dist++;
    }
  }
  if (!best) return null;
  const next = slots.slice();
  // on recule depuis le trou jusqu'à la case cliquée
  for (let k = best.dist; k >= 1; k--) {
    const to = (r0 + best.dr * k) * cols + (c0 + best.dc * k);
    const from = (r0 + best.dr * (k - 1)) * cols + (c0 + best.dc * (k - 1));
    next[to] = next[from];
  }
  next[slot] = -1;
  return next;
};

/** Mélange par coups légaux depuis l'état résolu → toujours résoluble. */
export const shuffleSlots = (solved: number[], grid: Grid, moves = 260): number[] => {
  let slots = solved.slice();
  let last = -1;
  for (let i = 0; i < moves; i++) {
    const holes = slots.flatMap((v, s) => (v === -1 ? [s] : []));
    const hole = holes[Math.floor(Math.random() * holes.length)];
    const options = neighbours(hole, grid).filter((s) => slots[s] !== -1 && s !== last);
    if (!options.length) continue;
    const from = options[Math.floor(Math.random() * options.length)];
    slots[hole] = slots[from];
    slots[from] = -1;
    last = hole;
  }
  if (slots.every((v, i) => v === solved[i])) slots = shuffleSlots(solved, grid, moves + 40);
  return slots;
};

export const isSolved = (slots: number[], solved: number[]) => slots.every((v, i) => v === solved[i]);

export const colsForWidth = (w: number) => (w >= 1100 ? 6 : w >= 760 ? 5 : w >= 480 ? 4 : 3);
