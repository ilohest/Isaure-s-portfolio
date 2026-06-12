import Lenis from 'lenis';

// Contrôleur shell vanilla (port de app/composables/useSiteShell.ts).
// Pilote directement les classes du <header> statique (.astro), Lenis et le
// reveal-on-scroll. Aucun store : header/footer sont du HTML statique.

let lenis: Lenis | null = null;
let lenisRafId: number | null = null;
let lastScrollTop = 0;
let headerVisible = true;
let headerToggleAnchorTop = 0;
let scrollDirection: 'down' | 'up' | null = null;
let revealObserver: IntersectionObserver | null = null;

const SCROLL_DIRECTION_EPSILON = 0.6;
const HEADER_HIDE_START = 72;
const HEADER_HIDE_DISTANCE = 34;
const HEADER_SHOW_DISTANCE = 52;

const normalizedPath = () => location.pathname.replace(/\/+$/, '') || '/';
const getScroller = () => document.querySelector<HTMLElement>('main[data-scroll-container]');
const getContent = () => document.querySelector<HTMLElement>('[data-scroll-content]');

const updateHeaderClasses = () => {
  const header = document.querySelector<HTMLElement>('header.header');
  const scroller = getScroller();
  if (!header || !scroller) return;

  const isHome = header.hasAttribute('data-home');
  const isServices = header.hasAttribute('data-services');

  const top = Math.max(scroller.scrollTop, 0);
  const delta = top - lastScrollTop;
  const atTop = top <= 2;
  const nextDirection =
    delta > SCROLL_DIRECTION_EPSILON
      ? 'down'
      : delta < -SCROLL_DIRECTION_EPSILON
        ? 'up'
        : scrollDirection;

  if (nextDirection !== scrollDirection) {
    scrollDirection = nextDirection;
    headerToggleAnchorTop = lastScrollTop;
  }

  if (atTop) {
    headerVisible = true;
    headerToggleAnchorTop = 0;
    scrollDirection = null;
  } else if (
    headerVisible &&
    scrollDirection === 'down' &&
    top > HEADER_HIDE_START &&
    top - headerToggleAnchorTop >= HEADER_HIDE_DISTANCE
  ) {
    headerVisible = false;
    headerToggleAnchorTop = top;
  } else if (
    !headerVisible &&
    scrollDirection === 'up' &&
    headerToggleAnchorTop - top >= HEADER_SHOW_DISTANCE
  ) {
    headerVisible = true;
    headerToggleAnchorTop = top;
  }
  lastScrollTop = top;

  const menuOpen = header.classList.contains('header--menu-open');
  header.classList.toggle('header--hidden', !headerVisible && !menuOpen);

  const hero = scroller.querySelector('.tangle-hero');
  let onHero = false;
  if (hero) {
    const heroRect = hero.getBoundingClientRect();
    const headerRect = header.getBoundingClientRect();
    onHero = heroRect.top < headerRect.bottom && heroRect.bottom > headerRect.top;
  }

  // Sur home/services, le fond ne doit pas apparaître pendant l'amorce du
  // masquage. En scroll très lent, la direction peut rester neutre pendant
  // quelques pixels : on garde donc la sortie depuis le top transparente
  // jusqu'au seuil où le header a assez de distance pour disparaître.
  const exitingTop =
    headerVisible && scrollDirection !== 'up' && top <= HEADER_HIDE_START + HEADER_HIDE_DISTANCE;
  const hidingIntent = scrollDirection === 'down' && top > 8;
  const transparent =
    (atTop || exitingTop || hidingIntent || !headerVisible) && (isHome || isServices);

  const bar = header.querySelector('.header-bar');
  bar?.classList.toggle('header-bar--transparent', transparent);
  bar?.classList.toggle('header-bar--solid', !transparent);

  const nav = header.querySelector('.desktop-menu');
  if (nav) {
    nav.classList.remove('header-nav--transparent', 'header-nav--default', 'header-nav--hero');
    if (transparent) nav.classList.add('header-nav--transparent');
    else if (isServices) nav.classList.add('header-nav--default');
    else nav.classList.add(onHero ? 'header-nav--hero' : 'header-nav--default');
  }

  const logo = header.querySelector<HTMLImageElement>('.logo-desktop');
  if (logo) {
    const useB = !transparent && !isServices && onHero;
    const next = useB ? header.dataset.logoB : header.dataset.logoW;
    if (next && logo.getAttribute('src') !== next) logo.setAttribute('src', next);
  }
};

const teardownScrollListeners = () => {
  const scroller = getScroller();
  scroller?.removeEventListener('scroll', updateHeaderClasses);
  window.removeEventListener('resize', updateHeaderClasses);
  lenis?.off('scroll', updateHeaderClasses);
};

const attachScrollListeners = () => {
  teardownScrollListeners();
  const scroller = getScroller();
  if (!scroller) return;
  if (lenis) lenis.on('scroll', updateHeaderClasses);
  else scroller.addEventListener('scroll', updateHeaderClasses, { passive: true });
  window.addEventListener('resize', updateHeaderClasses);
  updateHeaderClasses();
};

const shouldEnableSmoothScroll = () => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  if (window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(hover: none)').matches)
    return false;
  const path = normalizedPath();
  if (path === '/') return false;
  if (path.startsWith('/work') && path !== '/work') return false;
  if (path === '/2026-inspo') return false;
  return true;
};

const destroySmoothScroll = () => {
  if (lenisRafId !== null) {
    window.cancelAnimationFrame(lenisRafId);
    lenisRafId = null;
  }
  if (lenis) {
    lenis.off('scroll', updateHeaderClasses);
    lenis.destroy();
    lenis = null;
  }
};

const setupSmoothScroll = () => {
  const scroller = getScroller();
  const content = getContent();
  if (!scroller || !content || !shouldEnableSmoothScroll()) return;

  lenis = new Lenis({
    wrapper: scroller,
    content,
    duration: 1.08,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 0.9,
    touchMultiplier: 1,
    syncTouch: false,
    infinite: false,
  });

  const raf = (time: number) => {
    lenis?.raf(time);
    lenisRafId = window.requestAnimationFrame(raf);
  };
  lenisRafId = window.requestAnimationFrame(raf);
};

const refreshSmoothScroll = () => {
  const enable = shouldEnableSmoothScroll();
  if (enable && !lenis) {
    setupSmoothScroll();
    attachScrollListeners();
  } else if (!enable && lenis) {
    destroySmoothScroll();
    attachScrollListeners();
  }
};

const cleanupRevealObserver = () => {
  revealObserver?.disconnect();
  revealObserver = null;
};

const initGlobalRevealAnimations = () => {
  const scroller = getScroller();
  if (!scroller) return;
  cleanupRevealObserver();

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealTargets = (
    Array.from(
      scroller.querySelectorAll(
        'footer, .border-round-xl, .project-navigation, .work-copy, .work-scatter-item',
      ),
    ) as HTMLElement[]
  ).filter(
    (node) =>
      !node.classList.contains('reveal-on-scroll') &&
      !node.classList.contains('global-fade-up') &&
      !node.classList.contains('mobile-menu-content') &&
      !node.hasAttribute('data-reveal-ignore') &&
      !node.closest('[data-reveal-ignore]'),
  );

  if (!revealTargets.length) return;

  if (reducedMotion || typeof window.IntersectionObserver !== 'function') {
    revealTargets.forEach((el) => {
      el.classList.remove('global-fade-up');
      el.classList.add('global-fade-visible');
      el.style.removeProperty('--global-reveal-delay');
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries, current) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const target = entry.target as HTMLElement;
        target.classList.add('global-fade-visible');
        current.unobserve(target);
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px', root: scroller },
  );

  revealTargets.forEach((el, index) => {
    el.classList.add('global-fade-up');
    el.style.setProperty('--global-reveal-delay', `${Math.min((index % 7) * 70, 420)}ms`);
    observer.observe(el);
  });

  revealObserver = observer;
};

// --- Menu mobile : délégation sur document (survit aux View Transitions) ---
const closeMenu = () => {
  const header = document.querySelector<HTMLElement>('header.header');
  if (!header) return;
  header.classList.remove('header--menu-open');
  header.querySelector('.hamburger')?.setAttribute('aria-expanded', 'false');
  header.querySelector('.hamburger')?.setAttribute('aria-label', 'Open menu');
};

document.addEventListener('click', (event) => {
  const target = event.target as HTMLElement;
  const hamburger = target.closest('.hamburger');
  if (hamburger) {
    const header = document.querySelector<HTMLElement>('header.header');
    if (!header) return;
    const open = header.classList.toggle('header--menu-open');
    hamburger.setAttribute('aria-expanded', String(open));
    hamburger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    return;
  }
  if (target.closest('.mobile-menu-content a')) closeMenu();
});

// --- Cycle de vie page (initial + View Transitions) ---
const setup = () => {
  headerVisible = true;
  lastScrollTop = 0;
  headerToggleAnchorTop = 0;
  scrollDirection = null;
  closeMenu();

  refreshSmoothScroll();
  attachScrollListeners();
  initGlobalRevealAnimations();

  if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
  else getScroller()?.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  window.scrollTo(0, 0);
  updateHeaderClasses();
};

const teardown = () => {
  teardownScrollListeners();
  cleanupRevealObserver();
  destroySmoothScroll();
};

document.addEventListener('astro:page-load', setup);
document.addEventListener('astro:before-swap', teardown);
