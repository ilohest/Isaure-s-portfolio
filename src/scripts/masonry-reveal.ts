// Reveal au scroll des items `.masonry-reveal` (port du IntersectionObserver
// local des composants projet). Réutilisable, ré-armé à chaque navigation.
const setup = () => {
  const scroller = document.querySelector<HTMLElement>('main[data-scroll-container]');
  const targets = document.querySelectorAll<HTMLElement>('.masonry-reveal:not(.is-visible)');
  if (!targets.length) return;

  if (typeof window.IntersectionObserver !== 'function') {
    targets.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      });
    },
    { root: scroller, rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
  );

  targets.forEach((el) => observer.observe(el));
};

document.addEventListener('astro:page-load', setup);
