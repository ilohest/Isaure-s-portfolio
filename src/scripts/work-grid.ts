/**
 * Page Work : grille d'images masquées. Survoler la carte d'un projet dévoile toutes ses images,
 * survoler une cellule dévoile son image ; tout se referme tout seul après quelques secondes.
 * Le bateau en papier navigue dans la marge jusqu'au projet survolé.
 */
import { drawInkRules } from './ink';

const root = document.querySelector<HTMLElement>('[data-work]');
if (root) {
  const rowsEl = root.querySelector<HTMLElement>('[data-rows]')!;
  const boat = rowsEl.querySelector<SVGElement>('.work__boat');
  const projs = [...rowsEl.querySelectorAll<HTMLElement>('[data-proj]')];
  const hoverDevice = window.matchMedia('(hover: hover)').matches;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const HOLD = hoverDevice ? 4300 : 7000; // durée visible
  const LEAVE = 1300; // durée visible après avoir quitté la cellule
  const timers = new WeakMap<Element, number>();
  const videoTimers = new WeakMap<Element, number>();

  const stopVideo = (cell: HTMLElement) => {
    const v = cell.querySelector<HTMLVideoElement>('video');
    if (!v) return;
    window.clearTimeout(videoTimers.get(cell));
    videoTimers.set(
      cell,
      window.setTimeout(() => v.pause(), 1200),
    );
  };
  const playVideo = (cell: HTMLElement) => {
    const v = cell.querySelector<HTMLVideoElement>('video');
    if (!v) return;
    window.clearTimeout(videoTimers.get(cell));
    if (!v.src && v.dataset.src) v.src = v.dataset.src;
    void v.play().catch(() => undefined);
  };

  const hide = (cell: HTMLElement) => {
    cell.classList.remove('is-shown');
    stopVideo(cell);
  };
  const schedule = (cell: HTMLElement, ms: number) => {
    window.clearTimeout(timers.get(cell));
    timers.set(
      cell,
      window.setTimeout(() => hide(cell), ms),
    );
  };
  const show = (cell: HTMLElement, rd = 0, hold = HOLD) => {
    cell.style.setProperty('--rd', reduce ? '0ms' : `${rd}ms`);
    cell.classList.add('is-shown');
    playVideo(cell);
    schedule(cell, hold + rd);
  };

  // ------------------------------------------------ le bateau
  let sailTimer = 0;
  const sailTo = (y: number) => {
    if (!boat) return;
    boat.style.transform = `translateY(${y}px)`;
    boat.classList.add('is-sailing');
    window.clearTimeout(sailTimer);
    sailTimer = window.setTimeout(() => boat.classList.remove('is-sailing'), 900);
  };

  projs.forEach((proj) => {
    const info = proj.querySelector<HTMLElement>('[data-info]')!;
    const cells = [...proj.querySelectorAll<HTMLElement>('[data-media]')];

    // carte d'info → toutes les images du projet, en cascade
    const revealAll = () => {
      cells.forEach((c, i) => show(c, i * 70));
      sailTo(proj.offsetTop + 4);
    };
    const leaveAll = () => cells.forEach((c) => schedule(c, LEAVE));

    if (hoverDevice) {
      info.addEventListener('pointerenter', revealAll);
      info.addEventListener('pointerleave', leaveAll);
      info.addEventListener('focusin', revealAll);
    } else {
      info.addEventListener('click', (e) => {
        if ((e.target as HTMLElement).closest('a')) return;
        const any = cells.some((c) => c.classList.contains('is-shown'));
        if (any) cells.forEach(hide);
        else revealAll();
      });
    }

    // cellule seule → son image
    cells.forEach((cell) => {
      if (hoverDevice) {
        cell.addEventListener('pointerenter', () => show(cell));
        cell.addEventListener('pointerleave', () => schedule(cell, LEAVE));
      } else {
        cell.addEventListener('click', () => (cell.classList.contains('is-shown') ? hide(cell) : show(cell)));
      }
    });
  });

  rowsEl.addEventListener('pointerleave', () => sailTo(0));

  // lignes dessinées à la main : tracées une fois, puis qui se dessinent en entrant dans l'écran
  const rules = [...rowsEl.querySelectorAll<HTMLElement>('[data-rule]')];
  drawInkRules(rules, 53);
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-seen');
          io.unobserve(e.target);
        }
      }),
    { rootMargin: '0px 0px -6% 0px' },
  );
  rules.forEach((r) => io.observe(r));
  let rt = 0;
  window.addEventListener('resize', () => {
    window.clearTimeout(rt);
    rt = window.setTimeout(() => drawInkRules(rules, 53), 150);
  });
}
