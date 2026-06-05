// Bouton "Back to projects" flottant : visible au scroll vers le haut ou
// quand la souris approche du haut. Port de app/pages/.../[slug].vue.
let scrollEl: HTMLElement | null = null;
let lastScrollY = 0;
let scrollVisible = false;
let mouseNearTop = false;

const backEl = () => document.querySelector<HTMLElement>('.back-project-float');

const apply = () => {
  const el = backEl();
  if (el) el.classList.toggle('is-visible', scrollVisible || mouseNearTop);
};

const onScroll = () => {
  if (!scrollEl) return;
  const y = scrollEl.scrollTop;
  const delta = y - lastScrollY;
  if (y > 80) {
    if (delta < -6) scrollVisible = true;
    else if (delta > 6) scrollVisible = false;
  } else {
    scrollVisible = false;
  }
  lastScrollY = y;
  apply();
};

const onPointerMove = (event: PointerEvent) => {
  mouseNearTop = event.clientY <= 120;
  apply();
};

const teardown = () => {
  scrollEl?.removeEventListener('scroll', onScroll);
  window.removeEventListener('pointermove', onPointerMove);
  scrollEl = null;
};

const setup = () => {
  if (!backEl()) return; // pas une page projet
  teardown();
  scrollVisible = false;
  mouseNearTop = false;
  lastScrollY = 0;
  scrollEl = document.querySelector<HTMLElement>('main[data-scroll-container]');
  scrollEl?.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('pointermove', onPointerMove, { passive: true });
  apply();
};

document.addEventListener('astro:page-load', setup);
document.addEventListener('astro:before-swap', teardown);
