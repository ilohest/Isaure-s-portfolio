// Masonry à remplissage horizontal (gauche → droite) : distribue des items
// dans N colonnes selon le viewport, re-réparti au resize. Remplace la logique
// Vue `syncMasonryColumnCount`/`masonryColumns` des composants projet, en vanilla.
//
// Usage .astro :
//   <div class="masonry-horizontal" data-masonry
//        data-cols-desktop="3" data-cols-tablet="2" data-cols-mobile="1">
//     <div class="masonry-item masonry-reveal">…</div>
//     …items à plat…
//   </div>

type MasonryEl = HTMLElement & { _items?: HTMLElement[]; _cols?: number };

const colCount = (el: HTMLElement): number => {
  const w = window.innerWidth;
  const d = el.dataset;
  if (w <= 628) return Number(d.colsMobile ?? 1) || 1;
  if (w <= 970) return Number(d.colsTablet ?? 2) || 2;
  return Number(d.colsDesktop ?? 3) || 3;
};

const layout = (container: MasonryEl) => {
  // Mémorise les items d'origine une seule fois (à plat).
  if (!container._items) {
    container._items = Array.from(container.children) as HTMLElement[];
  }
  const cols = colCount(container);
  if (container._cols === cols) return;
  container._cols = cols;

  const colEls: HTMLElement[] = [];
  for (let i = 0; i < cols; i += 1) {
    const col = document.createElement('div');
    col.className = 'masonry-col';
    colEls.push(col);
  }
  container._items.forEach((item, i) => colEls[i % cols].appendChild(item));

  container.replaceChildren(...colEls);
};

const layoutAll = () => {
  document.querySelectorAll<MasonryEl>('[data-masonry]').forEach(layout);
};

let rafId: number | null = null;
const onResize = () => {
  if (rafId !== null) return;
  rafId = window.requestAnimationFrame(() => {
    rafId = null;
    layoutAll();
  });
};

const setup = () => {
  layoutAll();
  window.removeEventListener('resize', onResize);
  window.addEventListener('resize', onResize, { passive: true });
};

document.addEventListener('astro:page-load', setup);
document.addEventListener('astro:before-swap', () => window.removeEventListener('resize', onResize));
