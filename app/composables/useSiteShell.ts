import Lenis from 'lenis';

export function useSiteShell() {
  const route = useRoute();

  const isOnHero = ref(false);
  const isAtTop = ref(true);
  const isHeaderVisible = ref(true);
  const revealObserver = ref<IntersectionObserver | null>(null);
  const lenis = ref<Lenis | null>(null);
  const lenisRafId = ref<number | null>(null);
  const lastScrollTop = ref(0);
  const birdEnabled = ref(false);

  const mainScroller = ref<HTMLElement | null>(null);
  const mainContent = ref<HTMLElement | null>(null);

  const showSiteFooter = computed(() => {
    const normalizedPath = route.path.replace(/\/+$/, '') || '/';
    return normalizedPath !== '/2026-inspo';
  });

  const isHomeFooter = computed(() => (route.path.replace(/\/+$/, '') || '/') === '/');

  const updateHeaderBackground = () => {
    if (!import.meta.client) return;

    const scroller = mainScroller.value;
    if (!scroller) {
      isOnHero.value = false;
      isAtTop.value = true;
      isHeaderVisible.value = true;
      lastScrollTop.value = 0;
      return;
    }

    const currentScrollTop = Math.max(scroller.scrollTop, 0);
    const scrollDelta = currentScrollTop - lastScrollTop.value;

    isAtTop.value = currentScrollTop <= 2;
    if (isAtTop.value) {
      isHeaderVisible.value = true;
    } else if (scrollDelta > 8) {
      isHeaderVisible.value = false;
    } else if (scrollDelta < -8) {
      isHeaderVisible.value = true;
    }

    lastScrollTop.value = currentScrollTop;

    const hero = scroller.querySelector('.tangle-hero');
    const header = document.querySelector('header');

    if (!hero || !header) {
      isOnHero.value = false;
      return;
    }

    const heroRect = hero.getBoundingClientRect();
    const headerRect = header.getBoundingClientRect();
    isOnHero.value = heroRect.top < headerRect.bottom && heroRect.bottom > headerRect.top;
  };

  const teardownHeroObserver = () => {
    if (!import.meta.client) return;

    const scroller = mainScroller.value;
    if (scroller) {
      scroller.removeEventListener('scroll', updateHeaderBackground);
    }

    window.removeEventListener('resize', updateHeaderBackground);

    if (lenis.value) {
      lenis.value.off('scroll', updateHeaderBackground);
    }
  };

  const attachHeroObserver = () => {
    if (!import.meta.client) return;

    teardownHeroObserver();
    const scroller = mainScroller.value;
    if (!scroller) return;

    if (lenis.value) {
      lenis.value.on('scroll', updateHeaderBackground);
    } else {
      scroller.addEventListener('scroll', updateHeaderBackground, { passive: true });
    }

    window.addEventListener('resize', updateHeaderBackground);
    updateHeaderBackground();
  };

  const shouldEnableSmoothScroll = () => {
    if (!import.meta.client) return false;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return false;
    }

    if (
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(hover: none)').matches
    ) {
      return false;
    }

    const normalizedPath = route.path.replace(/\/+$/, '') || '/';

    if (normalizedPath === '/') {
      return false;
    }

    if (normalizedPath.startsWith('/achievements') && normalizedPath !== '/achievements') {
      return false;
    }

    if (normalizedPath === '/2026-inspo') {
      return false;
    }

    return true;
  };

  const destroySmoothScroll = () => {
    if (!import.meta.client) return;

    if (lenisRafId.value !== null) {
      window.cancelAnimationFrame(lenisRafId.value);
      lenisRafId.value = null;
    }

    if (lenis.value) {
      lenis.value.off('scroll', updateHeaderBackground);
      lenis.value.destroy();
      lenis.value = null;
    }
  };

  const setupSmoothScroll = () => {
    if (!import.meta.client) return;

    const scroller = mainScroller.value;
    const content = mainContent.value;
    if (!scroller || !content || !shouldEnableSmoothScroll()) return;

    const lenisInstance = new Lenis({
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

    lenis.value = lenisInstance;

    const raf = (time: number) => {
      lenisInstance.raf(time);
      lenisRafId.value = window.requestAnimationFrame(raf);
    };

    lenisRafId.value = window.requestAnimationFrame(raf);
  };

  const refreshSmoothScroll = () => {
    const shouldEnable = shouldEnableSmoothScroll();
    if (shouldEnable && !lenis.value) {
      setupSmoothScroll();
      attachHeroObserver();
      return;
    }

    if (!shouldEnable && lenis.value) {
      destroySmoothScroll();
      attachHeroObserver();
    }
  };

  const cleanupGlobalRevealObserver = () => {
    if (revealObserver.value) {
      revealObserver.value.disconnect();
      revealObserver.value = null;
    }
  };

  const initGlobalRevealAnimations = () => {
    if (!import.meta.client) return;

    const scroller = mainScroller.value;
    if (!scroller) return;

    cleanupGlobalRevealObserver();

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealTargets = Array.from(
      scroller.querySelectorAll(
        'footer, .border-round-xl, .project-navigation, .work-copy, .work-scatter-item',
      ),
    ).filter((element) => {
      const node = element as HTMLElement;
      return (
        !node.classList.contains('reveal-on-scroll') &&
        !node.classList.contains('global-fade-up') &&
        !node.classList.contains('mobile-menu-content') &&
        !node.hasAttribute('data-reveal-ignore') &&
        !node.closest('[data-reveal-ignore]')
      );
    }) as HTMLElement[];

    if (!revealTargets.length) return;

    if (reducedMotion || typeof window.IntersectionObserver !== 'function') {
      revealTargets.forEach((element) => {
        element.classList.remove('global-fade-up');
        element.classList.add('global-fade-visible');
        element.style.removeProperty('--global-reveal-delay');
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const target = entry.target as HTMLElement;
          target.classList.add('global-fade-visible');
          currentObserver.unobserve(target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -8% 0px',
        root: scroller,
      },
    );

    revealTargets.forEach((element, index) => {
      element.classList.add('global-fade-up');
      element.style.setProperty('--global-reveal-delay', `${Math.min((index % 7) * 70, 420)}ms`);
      observer.observe(element);
    });

    revealObserver.value = observer;
  };

  const computeBirdEnabled = () => {
    if (!import.meta.client) return true;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarsePointer =
      window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(hover: none)').matches;
    const mobileViewport = window.matchMedia('(max-width: 970px)').matches;
    return !(reducedMotion || coarsePointer || mobileViewport);
  };

  watch(
    () => route.fullPath,
    () => {
      if (!import.meta.client) return;

      nextTick(() => {
        isHeaderVisible.value = true;
        lastScrollTop.value = 0;
        refreshSmoothScroll();

        if (lenis.value) {
          lenis.value.scrollTo(0, { immediate: true, force: true });
        } else {
          mainScroller.value?.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        }

        updateHeaderBackground();
        initGlobalRevealAnimations();
      });
    },
  );

  onMounted(() => {
    birdEnabled.value = computeBirdEnabled();

    nextTick(() => {
      refreshSmoothScroll();
      attachHeroObserver();
      initGlobalRevealAnimations();
    });

    window.scrollTo(0, 0);
  });

  onBeforeUnmount(() => {
    teardownHeroObserver();
    cleanupGlobalRevealObserver();
    destroySmoothScroll();
  });

  return {
    mainScroller,
    mainContent,
    isOnHero,
    isAtTop,
    isHeaderVisible,
    birdEnabled,
    showSiteFooter,
    isHomeFooter,
  };
}
