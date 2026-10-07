/**
 * Page Work : une rivière verticale qui serpente, les projets sont des galets posés sur les berges.
 * Chaque galet est la source d'un petit affluent.
 * Jeu : « jouer » mélange les galets ; on les glisse d'une place à l'autre (échange)
 * pour remettre la rivière dans l'ordre chronologique.
 */
import { vnoise, mulberry } from '../lib/noise';

type Pt = [number, number];
const NS = 'http://www.w3.org/2000/svg';

const root = document.querySelector<HTMLElement>('[data-work]');
if (root) {
  const stage = root.querySelector<HTMLElement>('.wr')!;
  const pebbles = [...stage.querySelectorAll<HTMLElement>('.pebble')];
  const n = pebbles.length;
  const playBtn = root.querySelector<HTMLButtonElement>('[data-play]')!;
  const resetBtn = root.querySelector<HTMLButtonElement>('[data-reset]')!;
  const hintBtn = root.querySelector<HTMLButtonElement>('[data-hint]')!;
  const progressEl = root.querySelector<HTMLElement>('[data-progress]')!;
  const msg = root.querySelector<HTMLElement>('[data-msg]')!;
  const helpMsg = root.dataset.helpMsg ?? '';
  const solvedMsg = root.dataset.solvedMsg ?? '';
  const f1 = (v: number) => v.toFixed(1);

  let W = 0;
  let H = 0;
  let wide = true;
  let svg: SVGSVGElement;
  let riverX: (y: number) => number = () => 0;
  let riverW = 50;
  // emplacements (ordre chronologique) et taille propre de chaque galet
  let slots: { cx: number; cy: number }[] = [];
  let own: { w: number; h: number }[] = [];
  const pos: number[] = pebbles.map((_, i) => i); // galet i → emplacement pos[i]
  const dragOff: Pt[] = pebbles.map(() => [0, 0]);
  let streamEls: SVGPathElement[] = [];
  let slotEls: HTMLElement[] = [];
  let playing = false;
  let moves = 0;

  // ------------------------------------------------------------- ruban organique
  const ribbon = (pts: Pt[], widths: number[], seed: number, rough = 1) => {
    const L: string[] = [];
    const R: string[] = [];
    for (let i = 0; i < pts.length; i++) {
      const a = pts[Math.max(0, i - 1)];
      const b = pts[Math.min(pts.length - 1, i + 1)];
      const l = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
      const nx = -(b[1] - a[1]) / l;
      const ny = (b[0] - a[0]) / l;
      const s = i * 6;
      const jl = rough * (2.1 * vnoise(s / 80, seed) + 0.9 * vnoise(s / 14, seed + 1) + 0.45 * vnoise(s / 4.5, seed + 2));
      const jr = rough * (2.1 * vnoise(s / 90, seed + 5) + 0.9 * vnoise(s / 13, seed + 6) + 0.45 * vnoise(s / 4.8, seed + 7));
      const w = widths[i] / 2;
      L.push(`${f1(pts[i][0] + nx * (w + jl))},${f1(pts[i][1] + ny * (w + jl))}`);
      R.push(`${f1(pts[i][0] - nx * (w + jr))},${f1(pts[i][1] - ny * (w + jr))}`);
    }
    return `M${L.join('L')}L${R.reverse().join('L')}Z`;
  };

  // ------------------------------------------------------------- mise en page
  const center = (i: number): Pt => [slots[pos[i]].cx + dragOff[i][0], slots[pos[i]].cy + dragOff[i][1]];

  const applyOffsets = () => {
    pebbles.forEach((p, i) => {
      const ox = slots[pos[i]].cx - slots[i].cx + dragOff[i][0];
      const oy = slots[pos[i]].cy - slots[i].cy + dragOff[i][1];
      p.style.setProperty('--ox', `${ox.toFixed(1)}px`);
      p.style.setProperty('--oy', `${oy.toFixed(1)}px`);
      p.classList.toggle('is-home', pos[i] === i);
    });
    const placed = pos.filter((p, i) => p === i).length;
    progressEl.textContent = `${placed} / ${n}`;
  };

  const layout = () => {
    W = Math.round(stage.getBoundingClientRect().width);
    wide = W >= 900;
    const rng = mulberry(11);
    const A = wide ? Math.min(100, W * 0.075) : 12;
    const A2 = wide ? 34 : 5;
    const cxMid = wide ? W / 2 : 38;
    riverX = (y: number) => cxMid + A * Math.sin(y / 420 + 0.6) + A2 * Math.sin(y / 150 + 2.1);
    riverW = wide ? 54 : 28;

    const widths = [300, 236, 268, 218, 312, 250, 228, 284];
    const ratios = [0.94, 1.06, 0.88, 1.02, 0.96, 1.1];
    slots = [];
    own = [];
    let yc = 0;
    pebbles.forEach((_, i) => {
      const w = wide ? widths[(i * 3 + 1) % widths.length] : W - 96;
      const h = Math.round(w * (wide ? ratios[(i * 5 + 2) % ratios.length] : 0.82));
      const side = wide ? (i % 2 === 0 ? -1 : 1) : 1;
      yc = i === 0 ? h / 2 + 24 : yc + (own[i - 1].h / 2 + h / 2) * (wide ? 0.58 : 1) + (wide ? 36 : 44);
      const rx = riverX(yc);
      let cx = wide ? rx + side * (riverW / 2 + 40 + A * 0.9 + A2 * 0.6 + w / 2) : 64 + w / 2;
      if (wide) cx = Math.max(w / 2 + 14, Math.min(W - w / 2 - 14, cx));
      slots.push({ cx, cy: yc });
      own.push({ w, h });
    });
    const last = own[n - 1];
    H = Math.round(slots[n - 1].cy + last.h / 2 + 200);
    stage.style.height = `${H}px`;
    stage.classList.add('is-river');
    pebbles.forEach((p, i) => {
      p.style.width = `${own[i].w}px`;
      p.style.height = `${own[i].h}px`;
      p.style.left = `${slots[i].cx - own[i].w / 2}px`;
      p.style.top = `${slots[i].cy - own[i].h / 2}px`;
      p.style.setProperty('--rot', `${((rng() - 0.5) * (wide ? 5 : 3)).toFixed(2)}deg`);
      p.style.setProperty('--d', `${(i % 4) * 90}ms`);
    });

    // repères d'emplacement (visibles avec l'indice)
    slotEls.forEach((e) => e.remove());
    slotEls = slots.map((s, i) => {
      const e = document.createElement('div');
      e.className = 'wr__slot';
      e.style.left = `${s.cx - 22}px`;
      e.style.top = `${s.cy - 22}px`;
      e.textContent = String(i + 1);
      stage.appendChild(e);
      return e;
    });
  };

  // ------------------------------------------------------------- affluent d'un galet
  const streamPath = (i: number) => {
    const [sx, sy] = center(i);
    const w = own[i].w;
    const h = own[i].h;
    const dir = riverX(sy) > sx ? 1 : -1; // côté de la rivière
    const mx = sx + dir * w * 0.44;
    const my = sy + h * 0.22;
    const yj = my + 150 + (i % 3) * 22;
    const jx = riverX(yj) - dir * riverW * 0.22;
    const P0: Pt = [mx, my];
    const P1: Pt = [mx + dir * 70, my + 6];
    const P2: Pt = [jx - dir * 16, yj - 90];
    const P3: Pt = [jx, yj];
    const pts: Pt[] = [];
    const widths: number[] = [];
    const N = 34;
    for (let k = 0; k <= N; k++) {
      const u = k / N;
      const v = 1 - u;
      const x = v * v * v * P0[0] + 3 * v * v * u * P1[0] + 3 * v * u * u * P2[0] + u * u * u * P3[0];
      const y = v * v * v * P0[1] + 3 * v * v * u * P1[1] + 3 * v * u * u * P2[1] + u * u * u * P3[1];
      pts.push([x + Math.sin(u * 9 + i) * 3.2 * Math.sin(Math.PI * u), y]);
      widths.push(1.2 + (wide ? 6.5 : 4.2) * u ** 1.25);
    }
    return ribbon(pts, widths, 40 + i, 0.5);
  };

  const redrawStreams = () => streamEls.forEach((el, i) => el.setAttribute('d', streamPath(i)));

  const buildRiver = () => {
    stage.querySelector('.wr__svg')?.remove();
    svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('class', 'wr__svg');
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    svg.setAttribute('width', String(W));
    svg.setAttribute('height', String(H));
    svg.setAttribute('aria-hidden', 'true');

    const pts: Pt[] = [];
    const widths: number[] = [];
    for (let y = -10; y <= H + 10; y += 6) {
      pts.push([riverX(y), y]);
      const taper = Math.min(1, Math.max(0.05, (y + 10) / 160)); // source fine en haut
      widths.push(riverW * (0.82 + 0.26 * vnoise(y / 130, 3) + 0.1 * vnoise(y / 41, 4)) * taper);
    }
    const body = ribbon(pts, widths, 20, 1);

    const streak = (o: number, seed: number) => {
      let d = '';
      for (let i = 4; i < pts.length - 4; i += 2) {
        const a = pts[i - 1];
        const b = pts[i + 1];
        const l = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
        const wob = (0.2 * vnoise(i / 7, seed) + 0.06 * vnoise(i / 2.5, seed + 3)) * 2;
        const r = Math.max(-0.55, Math.min(0.55, o * 2 + wob)) * widths[i];
        d += `${d ? 'L' : 'M'}${f1(pts[i][0] - ((b[1] - a[1]) / l) * r)},${f1(pts[i][1] + ((b[0] - a[0]) / l) * r)}`;
      }
      return d;
    };

    svg.innerHTML =
      `<defs><linearGradient id="wr-grad" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="${H}">` +
      `<stop offset="0" stop-color="#4f95e7"/><stop offset="0.5" stop-color="#3f80df"/><stop offset="1" stop-color="#3a74d6"/></linearGradient></defs>` +
      `<g class="wr__water">` +
      pebbles.map(() => `<path class="wr__stream" fill="url(#wr-grad)" d=""/>`).join('') +
      `<path class="wr__body" fill="url(#wr-grad)" d="${body}"/></g>` +
      `<path class="wr__streak" d="${streak(0.2, 81)}"/><path class="wr__streak wr__streak--b" d="${streak(-0.17, 91)}"/>`;
    stage.prepend(svg);
    streamEls = [...svg.querySelectorAll<SVGPathElement>('.wr__stream')];
    redrawStreams();
    requestAnimationFrame(() => svg.classList.add('is-ready'));
  };

  // ------------------------------------------------------------- jeu
  const settle = (ms = 900) => {
    stage.classList.add('is-settling');
    window.setTimeout(() => stage.classList.remove('is-settling'), ms);
  };

  const setPlaying = (on: boolean) => {
    playing = on;
    root.classList.toggle('is-play', on);
    playBtn.setAttribute('aria-pressed', String(on));
    msg.textContent = on ? helpMsg : '';
    stage.classList.remove('is-solved');
  };

  const reorder = () => {
    settle();
    for (let i = 0; i < n; i++) {
      pos[i] = i;
      dragOff[i] = [0, 0];
    }
    moves = 0;
    applyOffsets();
    redrawStreams();
  };

  const play = () => {
    // mélange local (échanges entre emplacements proches) : les glissements restent courts
    const occ = pebbles.map((_, i) => i); // emplacement → galet
    let tries = 0;
    do {
      for (let k = 0; k < n * 4; k++) {
        const a = Math.floor(Math.random() * n);
        const b = Math.max(0, Math.min(n - 1, a + (Math.random() < 0.5 ? -1 : 1) * (1 + Math.floor(Math.random() * 3))));
        // un galet ne s'éloigne jamais de plus de 4 places de la sienne
        if (a !== b && Math.abs(b - occ[a]) <= 4 && Math.abs(a - occ[b]) <= 4) [occ[a], occ[b]] = [occ[b], occ[a]];
      }
      occ.forEach((pebble, slot) => (pos[pebble] = slot));
      tries++;
    } while (pos.filter((p, i) => p === i).length > n * 0.3 && tries < 10);
    settle(1100);
    dragOff.forEach((d) => ((d[0] = 0), (d[1] = 0)));
    moves = 0;
    setPlaying(true);
    applyOffsets();
    redrawStreams();
  };

  const stop = () => {
    reorder();
    setPlaying(false);
    root.classList.remove('show-hint');
    hintBtn.setAttribute('aria-pressed', 'false');
  };

  let drag: { i: number; sx: number; sy: number; scrollY0: number; moved: boolean; px: number; py: number } | null = null;
  let scrollRaf = 0;

  const updateDrag = () => {
    if (!drag) return;
    const dx = drag.px - drag.sx;
    const dy = drag.py - drag.sy + (window.scrollY - drag.scrollY0);
    if (!drag.moved && Math.hypot(dx, dy) > 5) drag.moved = true;
    if (drag.moved) {
      dragOff[drag.i] = [dx, dy];
      applyOffsets();
      streamEls[drag.i].setAttribute('d', streamPath(drag.i));
    }
  };

  // défilement automatique quand on glisse près du bord de l'écran
  const autoScroll = () => {
    if (!drag) return;
    const edge = 90;
    let v = 0;
    if (drag.py < edge) v = -((edge - drag.py) / edge) * 16;
    else if (drag.py > window.innerHeight - edge) v = ((drag.py - (window.innerHeight - edge)) / edge) * 16;
    if (v) {
      window.scrollBy(0, v);
      updateDrag();
    }
    scrollRaf = requestAnimationFrame(autoScroll);
  };

  pebbles.forEach((p, i) => {
    p.addEventListener('pointerdown', (e) => {
      if (!playing || (e.target as HTMLElement).closest('.pebble__eye')) return;
      drag = { i, sx: e.clientX, sy: e.clientY, scrollY0: window.scrollY, moved: false, px: e.clientX, py: e.clientY };
      cancelAnimationFrame(scrollRaf);
      scrollRaf = requestAnimationFrame(autoScroll);
      p.setPointerCapture(e.pointerId);
      p.classList.add('is-dragging');
    });
    p.addEventListener('pointermove', (e) => {
      if (!drag || drag.i !== i) return;
      drag.px = e.clientX;
      drag.py = e.clientY;
      updateDrag();
    });
    const end = (e: PointerEvent) => {
      if (!drag || drag.i !== i) return;
      cancelAnimationFrame(scrollRaf);
      p.classList.remove('is-dragging');
      if (p.hasPointerCapture(e.pointerId)) p.releasePointerCapture(e.pointerId);
      if (drag.moved) {
        p.addEventListener(
          'click',
          (ev) => {
            ev.preventDefault();
            ev.stopPropagation();
          },
          { capture: true, once: true },
        );
        // l'emplacement le plus proche du galet relâché
        const [cx, cy] = center(i);
        let best = pos[i];
        let bestD = Infinity;
        slots.forEach((s, k) => {
          const d = Math.hypot(s.cx - cx, s.cy - cy);
          if (d < bestD) {
            bestD = d;
            best = k;
          }
        });
        settle(700);
        if (best !== pos[i] && bestD < Math.max(own[i].w, own[i].h) * 0.7) {
          const j = pos.indexOf(best);
          pos[j] = pos[i];
          pos[i] = best;
          dragOff[j] = [0, 0];
          moves++;
        }
        dragOff[i] = [0, 0];
        applyOffsets();
        redrawStreams();
        if (pos.every((v, k) => v === k)) {
          stage.classList.add('is-solved');
          msg.textContent = solvedMsg;
        } else {
          msg.textContent = helpMsg;
        }
      }
      drag = null;
    };
    p.addEventListener('pointerup', end);
    p.addEventListener('pointercancel', end);

    p.querySelector<HTMLButtonElement>('.pebble__eye')?.addEventListener('click', (e) => {
      e.stopPropagation();
      const flipped = p.classList.toggle('is-flipped');
      (e.currentTarget as HTMLElement).setAttribute('aria-pressed', String(flipped));
      p.style.zIndex = flipped ? '6' : '';
    });
  });

  playBtn.addEventListener('click', () => (playing ? stop() : play()));
  resetBtn.addEventListener('click', stop);
  hintBtn.addEventListener('click', () => {
    const on = root.classList.toggle('show-hint');
    hintBtn.setAttribute('aria-pressed', String(on));
  });

  // ------------------------------------------------------------- apparition au scroll
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      }),
    { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
  );

  layout();
  applyOffsets();
  buildRiver();
  pebbles.forEach((p) => io.observe(p));

  let lastW = W;
  let rt = 0;
  window.addEventListener('resize', () => {
    window.clearTimeout(rt);
    rt = window.setTimeout(() => {
      const w = Math.round(stage.getBoundingClientRect().width);
      if (w === lastW) return;
      lastW = w;
      layout();
      applyOffsets();
      buildRiver();
    }, 200);
  });
}
