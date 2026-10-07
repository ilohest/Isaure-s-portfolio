import { colsForWidth, gridFor, isSolved, orderedSlots, shuffleSlots, slideTile } from '../lib/puzzle';
import type { Grid } from '../lib/puzzle';

const root = document.querySelector<HTMLElement>('[data-puzzle]');
if (root) {
  const board = root.querySelector<HTMLElement>('.puzzle__board')!;
  const tiles = Array.from(board.querySelectorAll<HTMLElement>('.ptile'));
  const n = tiles.length;
  const playBtn = root.querySelector<HTMLButtonElement>('[data-play]')!;
  const resetBtn = root.querySelector<HTMLButtonElement>('[data-reset]')!;
  const hintBtn = root.querySelector<HTMLButtonElement>('[data-hint]')!;
  const movesEl = root.querySelector<HTMLElement>('[data-moves]')!;
  const msgEl = root.querySelector<HTMLElement>('[data-msg]')!;
  const { solvedMsg, helpMsg } = root.dataset;

  let grid: Grid = gridFor(n, colsForWidth(window.innerWidth));
  let solved = orderedSlots(n, grid);
  let slots = solved.slice();
  let playing = false;
  let moves = 0;
  let cells: HTMLElement[] = [];

  const setMessage = (text: string) => {
    msgEl.textContent = text;
  };

  const buildCells = () => {
    cells.forEach((c) => c.remove());
    cells = [];
    for (let s = 0; s < grid.cols * grid.rows; s++) {
      const el = document.createElement('div');
      el.className = 'pcell';
      el.setAttribute('aria-hidden', 'true');
      el.style.setProperty('--c', String(s % grid.cols));
      el.style.setProperty('--r', String(Math.floor(s / grid.cols)));
      board.prepend(el);
      cells.push(el);
    }
  };

  const render = () => {
    board.style.setProperty('--cols', String(grid.cols));
    board.style.setProperty('--rows', String(grid.rows));
    tiles.forEach((t, i) => {
      const s = slots.indexOf(i);
      t.style.setProperty('--c', String(s % grid.cols));
      t.style.setProperty('--r', String(Math.floor(s / grid.cols)));
      t.dataset.target = String(i + 1);
    });
    movesEl.textContent = String(moves);
  };

  const setPlaying = (on: boolean) => {
    playing = on;
    root.classList.toggle('is-play', on);
    playBtn.setAttribute('aria-pressed', String(on));
    board.classList.remove('is-solved');
    setMessage(on ? (helpMsg ?? '') : '');
  };

  const reset = () => {
    slots = solved.slice();
    moves = 0;
    setPlaying(false);
    hintBtn.setAttribute('aria-pressed', 'false');
    root.classList.remove('show-hint');
    render();
  };

  const play = () => {
    slots = shuffleSlots(solved, grid);
    moves = 0;
    setPlaying(true);
    render();
  };

  const attempt = (i: number) => {
    const next = slideTile(slots, grid, slots.indexOf(i));
    if (!next) return;
    slots = next;
    moves++;
    render();
    if (isSolved(slots, solved)) {
      board.classList.add('is-solved');
      setMessage(solvedMsg ?? '');
    }
  };

  tiles.forEach((t, i) => {
    const link = t.querySelector<HTMLAnchorElement>('.ptile__link');
    const eye = t.querySelector<HTMLButtonElement>('.ptile__eye');
    link?.addEventListener('click', (e) => {
      if (!playing) return;
      e.preventDefault();
      attempt(i);
    });
    eye?.addEventListener('click', (e) => {
      e.stopPropagation();
      const flipped = t.classList.toggle('is-flipped');
      eye.setAttribute('aria-pressed', String(flipped));
      t.style.zIndex = flipped ? '5' : '';
    });
  });

  playBtn.addEventListener('click', () => (playing ? reset() : play()));
  resetBtn.addEventListener('click', reset);
  hintBtn.addEventListener('click', () => {
    const on = root.classList.toggle('show-hint');
    hintBtn.setAttribute('aria-pressed', String(on));
  });

  // Changement de nombre de colonnes (resize / rotation) → on repart en ordre.
  let lastCols = grid.cols;
  window.addEventListener('resize', () => {
    const cols = colsForWidth(window.innerWidth);
    if (cols === lastCols) return;
    lastCols = cols;
    grid = gridFor(n, cols);
    solved = orderedSlots(n, grid);
    buildCells();
    reset();
  });

  buildCells();
  render();
  requestAnimationFrame(() => root.classList.add('is-ready'));
}
