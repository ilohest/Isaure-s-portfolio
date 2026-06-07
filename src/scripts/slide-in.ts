// Animation slide-in au scroll : ajoute la classe `is-in` aux `.js-slide-item`
// quand ils entrent dans le viewport. Port de EventDashboardProject.vue.
const setup = () => {
  const scroller = document.querySelector<HTMLElement>('main[data-scroll-container]');
  // Active l'état initial caché (sinon le contenu reste visible : fallback no-JS).
  document.querySelectorAll('[data-slide-enable]').forEach((c) => c.classList.add('enable-slide'));

  const items = document.querySelectorAll<HTMLElement>('.js-slide-item:not(.is-in)');
  if (!items.length) return;

  if (typeof window.IntersectionObserver !== 'function') {
    items.forEach((el) => el.classList.add('is-in'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        obs.unobserve(entry.target);
      });
    },
    { root: scroller, threshold: 0.2, rootMargin: '-8% 0px -8% 0px' },
  );

  items.forEach((el) => observer.observe(el));
};

document.addEventListener('astro:page-load', setup);
if (document.readyState !== 'loading') setup();
