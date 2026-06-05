// Galerie "justified" (lignes équilibrées façon Google Photos), portée en
// vanilla depuis l'algorithme Vue de ElinorBranding/AverysProject.
//
// Les ratios d'aspect sont fournis au build (vite-imagetools donne w/h) via
// data-ar sur chaque .justified-item → pas de chargement d'image au runtime.
//
// Usage .astro :
//   <section class="justified-gallery" data-justified>
//     <article class="justified-item masonry-reveal" data-ar="1.33">…</article>
//     …items à plat (le script les répartit en lignes)…
//   </section>

type Gallery = HTMLElement & { _items?: { el: HTMLElement; ar: number }[]; _w?: number };

const GAP = 16;

const rowPattern = (w: number): number[] => {
  if (w >= 1200) return [2, 3];
  if (w >= 900) return [2, 2, 3];
  if (w >= 640) return [2, 2];
  return [1];
};

const minItemWidth = (w: number, ar: number): number => {
  const portrait = ar < 0.95;
  if (w >= 1200) return portrait ? 190 : 280;
  if (w >= 900) return portrait ? 160 : 230;
  if (w >= 640) return portrait ? 132 : 180;
  return 0;
};

const buildRow = (items: { el: HTMLElement; ar: number }[], width: number) => {
  const ratioSum = items.reduce((s, it) => s + it.ar, 0) || items.length || 1;
  const available = Math.max(width - GAP * Math.max(items.length - 1, 0), 1);
  const minWidths = items.map((it) => minItemWidth(width, it.ar));
  const widths = items.map((it, i) => Math.max((available * it.ar) / ratioSum, minWidths[i]));

  let overflow = widths.reduce((s, x) => s + x, 0) - available;
  while (overflow > 0.5) {
    const shrinkable = widths.map((x, i) => Math.max(x - minWidths[i], 0));
    const total = shrinkable.reduce((s, x) => s + x, 0);
    if (total <= 0.5) break;
    widths.forEach((x, i) => {
      if (!shrinkable[i]) return;
      widths[i] = Math.max(minWidths[i], x - (overflow * shrinkable[i]) / total);
    });
    overflow = widths.reduce((s, x) => s + x, 0) - available;
  }

  const rounded = widths.map((x) => Math.max(1, Math.round(x)));
  const delta = available - rounded.reduce((s, x) => s + x, 0);
  if (delta !== 0) rounded[rounded.length - 1] = Math.max(1, rounded[rounded.length - 1] + delta);
  return rounded;
};

const relayout = (gallery: Gallery) => {
  if (!gallery._items) {
    gallery._items = Array.from(
      gallery.querySelectorAll<HTMLElement>('.justified-item'),
    ).map((el) => ({ el, ar: Math.max(Number(el.dataset.ar) || 1, 0.3) }));
  }
  const items = gallery._items;
  if (!items.length) return;

  const width = Math.max(Math.floor(gallery.clientWidth), 0);
  if (!width) return;
  gallery._w = width;

  const pattern = rowPattern(width);
  const rows: HTMLElement[] = [];
  let cursor = 0;
  let pi = 0;

  while (cursor < items.length) {
    const size = pattern[pi % pattern.length] || 1;
    const rowItems = items.slice(cursor, cursor + size);
    if (!rowItems.length) break;
    const widths = buildRow(rowItems, width);

    const row = document.createElement('div');
    row.className = 'justified-row';
    rowItems.forEach((it, i) => {
      it.el.style.width = `${widths[i]}px`;
      row.appendChild(it.el);
    });
    rows.push(row);

    cursor += rowItems.length;
    pi += 1;
  }

  gallery.replaceChildren(...rows);
  gallery.classList.add('is-ready');
};

let observer: ResizeObserver | null = null;
let rafId: number | null = null;

// Au 1er paint la largeur peut être 0 (layout pas encore stabilisé) → on
// retente au frame suivant tant qu'elle l'est.
const ensureLayout = (g: Gallery, tries = 0) => {
  if (Math.floor(g.clientWidth) > 0) {
    relayout(g);
  } else if (tries < 30) {
    window.requestAnimationFrame(() => ensureLayout(g, tries + 1));
  }
};

const setup = () => {
  const galleries = Array.from(document.querySelectorAll<Gallery>('[data-justified]'));
  if (!galleries.length) return;

  galleries.forEach((g) => ensureLayout(g));

  observer?.disconnect();
  if (typeof ResizeObserver === 'function') {
    observer = new ResizeObserver(() => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        galleries.forEach((g) => {
          if (Math.floor(g.clientWidth) !== g._w) relayout(g);
        });
      });
    });
    galleries.forEach((g) => observer!.observe(g));
  }
};

document.addEventListener('astro:page-load', setup);
document.addEventListener('astro:before-swap', () => observer?.disconnect());
// Fallback : si le module se charge après l'émission de astro:page-load
// (chargement initial), exécuter setup immédiatement (idempotent).
if (document.readyState !== 'loading') setup();
