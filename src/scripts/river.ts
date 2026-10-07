/**
 * Accueil « rivière » : un ruban bleu aux berges irrégulières qui coule à travers l'écran.
 * Les liens sont écrits le long du courant. Tout est généré côté client à la taille de la fenêtre.
 */
type Pt = [number, number];
type LinkKey = 'work' | 'services' | 'about' | 'process' | 'contact' | 'ai';

const root = document.querySelector<HTMLElement>('[data-river]');

// ------------------------------------------------------------------ bruit
const hash = (i: number) => {
  let h = Math.imul(i ^ 0x9e3779b9, 0x85ebca6b);
  h ^= h >>> 13;
  h = Math.imul(h, 0xc2b2ae35);
  h ^= h >>> 16;
  return ((h >>> 0) / 4294967295) * 2 - 1;
};
const vnoise = (x: number, seed: number) => {
  const i = Math.floor(x);
  const f = x - i;
  const u = f * f * (3 - 2 * f);
  return hash(i + seed * 7919) * (1 - u) + hash(i + 1 + seed * 7919) * u;
};
const mulberry = (seed: number) => {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

// ------------------------------------------------------------------ géométrie
const catmull = (pts: Pt[], sub = 24): Pt[] => {
  const out: Pt[] = [];
  const n = pts.length;
  for (let i = 0; i < n - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(n - 1, i + 2)];
    for (let k = 0; k < sub; k++) {
      const t = k / sub;
      const t2 = t * t;
      const t3 = t2 * t;
      const f = (a: number, b: number, c: number, d: number) =>
        0.5 * (2 * b + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t2 + (-a + 3 * b - 3 * c + d) * t3);
      out.push([f(p0[0], p1[0], p2[0], p3[0]), f(p0[1], p1[1], p2[1], p3[1])]);
    }
  }
  out.push(pts[n - 1]);
  return out;
};

const resample = (poly: Pt[], step: number): Pt[] => {
  const out: Pt[] = [poly[0]];
  let carry = 0;
  for (let i = 1; i < poly.length; i++) {
    let [ax, ay] = poly[i - 1];
    const [bx, by] = poly[i];
    let seg = Math.hypot(bx - ax, by - ay);
    while (carry + seg >= step) {
      const k = (step - carry) / seg;
      ax += (bx - ax) * k;
      ay += (by - ay) * k;
      out.push([ax, ay]);
      seg = Math.hypot(bx - ax, by - ay);
      carry = 0;
    }
    carry += seg;
  }
  return out;
};

const LANDSCAPE: Pt[] = [
  [-0.08, 0.68], [0.08, 0.665], [0.22, 0.655], [0.36, 0.625], [0.48, 0.6], [0.58, 0.635],
  [0.68, 0.69], [0.78, 0.715], [0.87, 0.7], [0.94, 0.64], [0.95, 0.52], [0.915, 0.4],
  [0.935, 0.28], [1.04, 0.2],
];
const PORTRAIT: Pt[] = [
  [-0.1, 0.2], [0.12, 0.19], [0.4, 0.215], [0.7, 0.23], [0.93, 0.27], [1.0, 0.33], [0.93, 0.4],
  [0.7, 0.435], [0.4, 0.44], [0.12, 0.46], [0.0, 0.52], [0.1, 0.585], [0.35, 0.6], [0.62, 0.615],
  [0.85, 0.64], [1.12, 0.7],
];

const STEP = 4;

// ------------------------------------------------------------------ montage
if (root) {
  const labels = JSON.parse(root.dataset.labels ?? '{}') as Record<LinkKey, string>;
  const hrefs = JSON.parse(root.dataset.hrefs ?? '{}') as Record<LinkKey, string>;
  const ORDER: LinkKey[] = ['work', 'services', 'about', 'process', 'contact', 'ai'];
  const NS = 'http://www.w3.org/2000/svg';
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

  let W = 0;
  let H = 0;
  let X: number[] = [];
  let Y: number[] = [];
  let NX: number[] = [];
  let NY: number[] = [];
  let W0 = 34;
  let islands: { i0: number; len: number; off: number; hw: number }[] = [];
  let tribs: Pt[][] = [];
  let labelWin: { key: LinkKey; i0: number; i1: number; rev: boolean }[] = [];
  let svg: SVGSVGElement;
  let riverEl: SVGPathElement;
  let streakEls: SVGPathElement[] = [];
  let labelPaths: SVGPathElement[] = [];
  let hitPaths: SVGPathElement[] = [];
  let raf = 0;
  let t0 = 0;
  const pointer = { x: -9999, y: -9999 };
  let hoverKey: LinkKey | null = null;

  const build = () => {
    const rect = root.getBoundingClientRect();
    W = Math.max(280, Math.round(rect.width));
    H = Math.max(360, Math.round(rect.height));
    const portrait = W / H < 0.9;
    const ctrl = (portrait ? PORTRAIT : LANDSCAPE).map(([x, y]) => [x * W, y * H] as Pt);
    const pts = resample(catmull(ctrl), STEP);
    const n = pts.length;
    X = pts.map((p) => p[0]);
    Y = pts.map((p) => p[1]);
    NX = [];
    NY = [];
    for (let i = 0; i < n; i++) {
      const a = Math.max(0, i - 1);
      const b = Math.min(n - 1, i + 1);
      const tx = X[b] - X[a];
      const ty = Y[b] - Y[a];
      const l = Math.hypot(tx, ty) || 1;
      NX.push(-ty / l);
      NY.push(tx / l);
    }
    W0 = portrait ? 36 : Math.min(72, Math.max(38, H * 0.058));

    // fenêtres de texte : zones plutôt plates et droites, lues de gauche à droite
    const lens = ORDER.map((k) => (labels[k]?.length ?? 4) * 13 + 30);
    const fracs = portrait ? [0.05, 0.15, 0.3, 0.39, 0.62, 0.74] : [0.07, 0.18, 0.29, 0.4, 0.52, 0.63];
    const taken: [number, number][] = [];
    labelWin = ORDER.map((key, k) => {
      const m = Math.ceil(lens[k] / STEP);
      let best = Math.floor(n * fracs[k]);
      let bestScore = Infinity;
      for (let off = -70; off <= 70; off += 3) {
        const i0 = Math.max(4, Math.min(n - m - 4, Math.floor(n * fracs[k]) + off));
        const i1 = i0 + m;
        if (taken.some(([a, b]) => i0 < b + 12 && i1 > a - 12)) continue;
        const ang = (i: number) => Math.atan2(Y[i + 2] - Y[i - 2], X[i + 2] - X[i - 2]);
        const chord = Math.atan2(Y[i1] - Y[i0], X[i1] - X[i0]);
        const flatness = Math.min(Math.abs(chord), Math.PI - Math.abs(chord));
        let turn = 0;
        for (let i = i0; i < i1; i += 4) turn = Math.max(turn, Math.abs(ang(i) - ang(i0)));
        let out = 0;
        for (let i = i0; i <= i1; i += 3) if (X[i] < 34 || X[i] > W - 34 || Y[i] < 80 || Y[i] > H - 50) out += 4;
        const score = flatness * 2 + Math.min(turn, Math.PI) * 2.5 + out + Math.abs(off) * 0.002;
        if (score < bestScore) {
          bestScore = score;
          best = i0;
        }
      }
      taken.push([best, best + m]);
      return { key, i0: best, i1: best + m, rev: X[best + m] < X[best] };
    });

    // îlots (trous blancs dans le courant)
    const rng = mulberry(42 + W + H);
    islands = [];
    const nIsl = portrait ? 2 : 3;
    for (let k = 0; k < nIsl; k++) {
      const i0 = Math.floor(n * (0.14 + k * 0.27 + rng() * 0.06));
      const len = Math.round((38 + rng() * 40) / STEP);
      let at = i0;
      for (let tries = 0; tries < 8; tries++) {
        const hit = labelWin.find((l) => at < l.i1 + 10 && at + len > l.i0 - 10);
        if (!hit) break;
        at = hit.i1 + 14;
      }
      if (at + len < n - 20) islands.push({ i0: at, len, off: (rng() - 0.5) * 0.3, hw: 0.2 + rng() * 0.08 });
    }

    // affluents fins, vers le coin le plus proche en bas
    const r2 = mulberry(7 + W);
    tribs = [];
    const starts = portrait ? [0.12, 0.5, 0.68] : [0.2, 0.26, 0.34];
    starts.forEach((f, k) => {
      let i = Math.floor(n * f);
      const side = NY[i] > 0 ? 1 : -1; // berge côté bas de l'écran
      let x = X[i] + NX[i] * side * W0 * 0.3;
      let y = Y[i] + NY[i] * side * W0 * 0.3;
      let a = Math.atan2(NY[i] * side, NX[i] * side) + (r2() - 0.5) * 0.6 - (k % 2 ? 0.25 : 0);
      const out: Pt[] = [[x, y]];
      const pull = Math.atan2(H * 1.1 - y, -W * 0.3 - x);
      for (let s = 0; s < 260; s++) {
        a += (pull - a) * 0.012 + (r2() - 0.5) * 0.5;
        x += Math.cos(a) * 5;
        y += Math.sin(a) * 5;
        out.push([x, y]);
        if (x < -20 || y > H + 20 || x > W + 20) break;
      }
      tribs.push(out);
      i += 0;
    });

    // DOM
    root.innerHTML = '';
    svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('class', 'river__svg');
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    svg.setAttribute('width', String(W));
    svg.setAttribute('height', String(H));
    svg.setAttribute('role', 'group');
    svg.setAttribute('aria-label', root.dataset.title ?? '');

    const fs = portrait ? 11 : 13;
    const tribSvg = tribs
      .map(
        (tr) =>
          `<path class="river__trib" pathLength="1" d="M${tr.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' L')}"/>`,
      )
      .join('');
    const labelSvg = labelWin
      .map(
        (l, k) =>
          `<a class="river__link" data-key="${l.key}" href="${hrefs[l.key] ?? '#'}"${
            l.key === 'ai' ? ' target="_blank" rel="noopener noreferrer"' : ''
          } aria-label="${esc(labels[l.key] ?? '')}">` +
          `<path class="river__hit" id="hit-${k}" d=""/>` +
          `<text class="river__text" style="font-size:${fs}px" dy="${(fs * 0.36).toFixed(1)}"><textPath href="#lp-${k}" startOffset="50%" text-anchor="middle">${esc(
            labels[l.key] ?? '',
          )}</textPath></text></a>`,
      )
      .join('');
    svg.innerHTML =
      `<defs><linearGradient id="river-grad" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="${W}" y2="0">` +
      `<stop offset="0" stop-color="#1b30ff"/><stop offset="0.55" stop-color="#0a64e6"/><stop offset="1" stop-color="#0a8fea"/></linearGradient>` +
      labelWin.map((_, k) => `<path id="lp-${k}" d=""/>`).join('') +
      `</defs>` +
      tribSvg +
      `<path class="river__body" fill="url(#river-grad)" fill-rule="evenodd" d=""/>` +
      `<path class="river__streak" d=""/><path class="river__streak river__streak--b" d=""/>` +
      labelSvg;
    root.appendChild(svg);

    riverEl = svg.querySelector('.river__body') as SVGPathElement;
    streakEls = [...svg.querySelectorAll<SVGPathElement>('.river__streak')];
    labelPaths = labelWin.map((_, k) => svg.querySelector(`#lp-${k}`) as SVGPathElement);
    hitPaths = labelWin.map((_, k) => svg.querySelector(`#hit-${k}`) as SVGPathElement);

    svg.querySelectorAll<SVGAnchorElement>('.river__link').forEach((a) => {
      a.addEventListener('pointerenter', () => (hoverKey = a.dataset.key as LinkKey));
      a.addEventListener('pointerleave', () => (hoverKey = null));
    });
    tribs.forEach((_, k) => {
      const el = svg.querySelectorAll<SVGPathElement>('.river__trib')[k];
      el.style.setProperty('--d', `${1400 + k * 500}ms`);
    });
  };

  // ------------------------------------------------------------------ rendu d'une image
  const f1 = (v: number) => v.toFixed(1);

  const frame = (now: number) => {
    const t = reduce ? 0 : (now - t0) / 1000;
    const n = X.length;
    const progress = reduce ? 1 : Math.min(1, t / 3.4);
    const eased = 1 - (1 - progress) ** 3;
    const count = Math.max(2, Math.floor(n * eased));
    const flow = t * 38; // px/s : la matière avance le long du lit

    const cx: number[] = new Array(count);
    const cy: number[] = new Array(count);
    const hw: number[] = new Array(count);
    const eL: number[] = new Array(count);
    const eR: number[] = new Array(count);

    for (let i = 0; i < count; i++) {
      const s = i * STEP;
      const taper = Math.min(1, (count - i) / 16) * (progress < 1 ? 1 : 1);
      const sway = Math.sin((s - flow * 1.6) / 150) * 7 + Math.sin((s - flow * 2.3) / 57) * 2.2;
      cx[i] = X[i] + NX[i] * sway;
      cy[i] = Y[i] + NY[i] * sway;
      let w = W0 * (0.95 + 0.32 * vnoise((s - flow) / 120, 1) + 0.12 * vnoise((s - flow * 1.4) / 37, 2));
      const dx = X[i] - pointer.x;
      const dy = Y[i] - pointer.y;
      const d2 = dx * dx + dy * dy;
      if (d2 < 130 * 130) w += 12 * (1 - Math.sqrt(d2) / 130) ** 2;
      if (hoverKey) {
        const lw = labelWin.find((l) => l.key === hoverKey);
        if (lw && i >= lw.i0 - 6 && i <= lw.i1 + 6) w += 5;
      }
      hw[i] = (w / 2) * taper;
      eL[i] = 2.4 * vnoise(s / 85, 11) + 1.1 * vnoise((s - flow * 0.15) / 15, 12) + 0.55 * vnoise(s / 4.2, 13);
      eR[i] = 2.4 * vnoise(s / 95, 21) + 1.1 * vnoise((s - flow * 0.15) / 14, 22) + 0.55 * vnoise(s / 4.6, 23);
    }

    // contour du ruban
    let d = '';
    for (let i = 0; i < count; i++) {
      const r = hw[i] + eL[i];
      d += `${i ? 'L' : 'M'}${f1(cx[i] + NX[i] * r)},${f1(cy[i] + NY[i] * r)}`;
    }
    for (let i = count - 1; i >= 0; i--) {
      const r = hw[i] + eR[i];
      d += `L${f1(cx[i] - NX[i] * r)},${f1(cy[i] - NY[i] * r)}`;
    }
    d += 'Z';

    // îlots
    for (const isl of islands) {
      if (isl.i0 + isl.len >= count) continue;
      const top: Pt[] = [];
      const bot: Pt[] = [];
      for (let j = 0; j <= isl.len; j++) {
        const i = isl.i0 + j;
        const k = Math.sin((Math.PI * j) / isl.len) ** 0.8;
        const base = isl.off * hw[i] * 2;
        const h = hw[i] * isl.hw * 2 * k + 0.4 * Math.abs(vnoise(j * 0.9, 31));
        top.push([cx[i] + NX[i] * (base + h), cy[i] + NY[i] * (base + h)]);
        bot.push([cx[i] + NX[i] * (base - h * 0.7), cy[i] + NY[i] * (base - h * 0.7)]);
      }
      d += `M${top.map((p) => `${f1(p[0])},${f1(p[1])}`).join('L')}L${bot
        .reverse()
        .map((p) => `${f1(p[0])},${f1(p[1])}`)
        .join('L')}Z`;
    }
    riverEl.setAttribute('d', d);

    // filets de courant (reflets clairs)
    streakEls.forEach((el, k) => {
      const o = k === 0 ? 0.2 : -0.16;
      let sd = '';
      for (let i = 4; i < count - 4; i += 2) {
        const r = hw[i] * o * 2;
        sd += `${sd ? 'L' : 'M'}${f1(cx[i] + NX[i] * r)},${f1(cy[i] + NY[i] * r)}`;
      }
      el.setAttribute('d', sd);
    });

    // chemins de texte (toujours lus de gauche à droite)
    labelWin.forEach((l, k) => {
      if (l.i1 >= count) return;
      let ld = '';
      const idx: number[] = [];
      for (let i = l.i0; i <= l.i1; i++) idx.push(i);
      if (l.rev) idx.reverse();
      idx.forEach((i, j) => {
        ld += `${j ? 'L' : 'M'}${f1(cx[i])},${f1(cy[i])}`;
      });
      labelPaths[k].setAttribute('d', ld);
      hitPaths[k].setAttribute('d', ld);
    });

    if (!reduce) raf = requestAnimationFrame(frame);
  };

  const start = () => {
    cancelAnimationFrame(raf);
    build();
    t0 = performance.now();
    raf = requestAnimationFrame(frame);
    window.setTimeout(() => svg.classList.add('is-ready'), reduce ? 0 : 1800);
  };

  start();
  let rt = 0;
  let lastKey = `${W}x${H}`;
  window.addEventListener('resize', () => {
    window.clearTimeout(rt);
    rt = window.setTimeout(() => {
      const r = root.getBoundingClientRect();
      const k = `${Math.round(r.width)}x${Math.round(r.height)}`;
      if (k === lastKey) return;
      lastKey = k;
      start();
      svg.classList.add('is-ready');
    }, 200);
  });
  window.addEventListener('pointermove', (e) => {
    const r = root.getBoundingClientRect();
    pointer.x = e.clientX - r.left;
    pointer.y = e.clientY - r.top;
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(raf);
    else if (!reduce) raf = requestAnimationFrame(frame);
  });
}
