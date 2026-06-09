// Galerie horizontale pilotée au scroll vertical (sticky stage + track
// translaté selon la progression). Port vanilla de CanprunaProject.vue.
//
// Structure .astro :
//   <section data-hscroll>
//     <div data-hscroll-stage>            (sticky)
//       <div class="…viewport overflow-hidden">
//         <div data-hscroll-track>…items à plat…</div>
//       </div>
//     </div>
//   </section>

type Section = HTMLElement & {
  _max?: number;
  _stickyTop?: number;
  _stageH?: number;
  _scrollH?: number;
};

const scrollerEl = () => document.querySelector<HTMLElement>('main[data-scroll-container]');

const measure = (section: Section) => {
  const stage = section.querySelector<HTMLElement>('[data-hscroll-stage]');
  const track = section.querySelector<HTMLElement>('[data-hscroll-track]');
  const scroller = scrollerEl();
  if (!stage || !track || !scroller) return;

  const viewportWidth = stage.clientWidth;
  const stageHeight = stage.offsetHeight;
  const maxTranslate = Math.max(track.scrollWidth - viewportWidth, 0);
  const stickyTop = Math.max((scroller.clientHeight - stageHeight) / 2, 16);

  section._max = maxTranslate;
  section._stickyTop = stickyTop;
  section._stageH = stageHeight;
  section._scrollH = stickyTop + stageHeight + maxTranslate;
  section.style.height = `${section._scrollH}px`;
  stage.style.top = `${stickyTop}px`;
  sync(section);
};

const sync = (section: Section) => {
  const track = section.querySelector<HTMLElement>('[data-hscroll-track]');
  const scroller = scrollerEl();
  if (!track || !scroller) return;

  const max = section._max ?? 0;
  if (max <= 0) {
    track.style.transform = 'translate3d(0, 0, 0)';
    return;
  }
  const scrollerRect = scroller.getBoundingClientRect();
  const sectionRect = section.getBoundingClientRect();
  const scrolledThrough = scrollerRect.top + (section._stickyTop ?? 16) - sectionRect.top;
  const scrollRange = Math.max(
    (section._scrollH ?? 0) - (section._stickyTop ?? 16) - (section._stageH ?? 0),
    1,
  );
  const progress = Math.min(Math.max(scrolledThrough / scrollRange, 0), 1);
  track.style.transform = `translate3d(${-(progress * max)}px, 0, 0)`;
};

let measureRaf: number | null = null;
let scrollRaf: number | null = null;
let ro: ResizeObserver | null = null;
let scroller: HTMLElement | null = null;
let onScroll: (() => void) | null = null;

const sections = () => Array.from(document.querySelectorAll<Section>('[data-hscroll]'));

const scheduleMeasure = () => {
  if (measureRaf != null) return;
  measureRaf = window.requestAnimationFrame(() => {
    measureRaf = null;
    sections().forEach(measure);
  });
};

const scheduleSync = () => {
  if (scrollRaf != null) return;
  scrollRaf = window.requestAnimationFrame(() => {
    scrollRaf = null;
    sections().forEach(sync);
  });
};

const teardown = () => {
  ro?.disconnect();
  ro = null;
  if (scroller && onScroll) scroller.removeEventListener('scroll', onScroll);
  window.removeEventListener('resize', scheduleMeasure);
  scroller = null;
};

const setup = () => {
  const list = sections();
  if (!list.length) return;
  teardown();

  scroller = scrollerEl();
  onScroll = scheduleSync;
  scroller?.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', scheduleMeasure, { passive: true });

  if (typeof ResizeObserver === 'function') {
    ro = new ResizeObserver(scheduleMeasure);
    list.forEach((s) => {
      const track = s.querySelector('[data-hscroll-track]');
      if (track) ro!.observe(track);
    });
  }

  // Re-mesure quand les médias se chargent (dimensions connues tardivement).
  list.forEach((s) =>
    s.querySelectorAll<HTMLImageElement | HTMLVideoElement>('img, video').forEach((m) => {
      if (m.tagName === 'IMG') m.addEventListener('load', scheduleMeasure, { once: true });
      else m.addEventListener('loadedmetadata', scheduleMeasure, { once: true });
    }),
  );

  scheduleMeasure();
};

document.addEventListener('astro:page-load', setup);
document.addEventListener('astro:before-swap', teardown);
if (document.readyState !== 'loading') setup();
