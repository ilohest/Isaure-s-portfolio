/**
 * Page Work : index typographique. Le bateau en papier navigue le long de la marge jusqu'à la ligne survolée,
 * une vignette suit la souris, et l'on peut basculer entre « index » et « aperçu ».
 */
const root = document.querySelector<HTMLElement>('[data-work]');
if (root) {
  const rowsEl = root.querySelector<HTMLElement>('[data-rows]')!;
  const rows = [...rowsEl.querySelectorAll<HTMLElement>('.row')];
  const boat = rowsEl.querySelector<SVGElement>('.work__boat');
  const thumb = root.querySelector<HTMLImageElement>('[data-thumb]')!;
  const fine = window.matchMedia('(hover: hover) and (min-width: 761px)').matches;

  // ------------------------------------------------ bascule index / aperçu
  const buttons = [...root.querySelectorAll<HTMLButtonElement>('[data-set-view]')];
  const setView = (v: string) => {
    root.dataset.view = v;
    buttons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.setView === v)));
    try {
      sessionStorage.setItem('work-view', v);
    } catch {
      /* stockage indisponible */
    }
  };
  buttons.forEach((b) => b.addEventListener('click', () => setView(b.dataset.setView ?? 'index')));
  try {
    const saved = sessionStorage.getItem('work-view');
    if (saved === 'overview' || saved === 'index') setView(saved);
  } catch {
    /* ignore */
  }

  if (fine && boat) {
    // ------------------------------------------------ le bateau navigue
    const idleY = 0;
    let sailTimer = 0;
    const sailTo = (y: number) => {
      boat.style.transform = `translateY(${y}px)`;
      boat.classList.add('is-sailing');
      window.clearTimeout(sailTimer);
      sailTimer = window.setTimeout(() => boat.classList.remove('is-sailing'), 850);
    };
    const rowY = (row: HTMLElement) => row.offsetTop + row.offsetHeight / 2 + 4;

    // ------------------------------------------------ vignette qui suit la souris
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    let raf = 0;
    const loop = () => {
      cx += (tx - cx) * 0.16;
      cy += (ty - cy) * 0.16;
      thumb.style.transform = `translate(${cx.toFixed(1)}px, ${cy.toFixed(1)}px)`;
      raf = requestAnimationFrame(loop);
    };
    const place = (e: PointerEvent) => {
      const w = 250;
      const h = 176;
      tx = Math.min(window.innerWidth - w - 16, e.clientX + 28);
      ty = Math.max(70, Math.min(window.innerHeight - h - 16, e.clientY - h / 2));
    };

    rows.forEach((row) => {
      const show = (e?: PointerEvent) => {
        sailTo(rowY(row));
        if (thumb.dataset.src !== row.dataset.cover) {
          thumb.dataset.src = row.dataset.cover ?? '';
          thumb.src = row.dataset.cover ?? '';
        }
        if (e) {
          place(e);
          if (!thumb.classList.contains('is-on')) {
            cx = tx;
            cy = ty;
          }
        }
        thumb.classList.add('is-on');
        if (!raf) raf = requestAnimationFrame(loop);
      };
      row.addEventListener('pointerenter', (e) => show(e));
      row.addEventListener('pointermove', place);
      row.addEventListener('focus', () => show());
    });
    rowsEl.addEventListener('pointerleave', () => {
      sailTo(idleY);
      thumb.classList.remove('is-on');
      cancelAnimationFrame(raf);
      raf = 0;
    });
    rowsEl.addEventListener('focusout', () => {
      sailTo(idleY);
      thumb.classList.remove('is-on');
    });
  }
}
