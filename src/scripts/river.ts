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
  const ctaText = root.dataset.cta ?? '';
  const ctaHref = root.dataset.ctaHref ?? '#';
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
  let maxHw: number[] = [];
  let islands: { i0: number; len: number; off: number; hw: number }[] = [];
  interface Branch {
    pts: Pt[];
    nx: number[];
    ny: number[];
    w0: number;
    delay: number;
  }
  let branches: Branch[] = [];
  let branchEls: SVGPathElement[] = [];
  let fishEl: SVGGElement | null = null;
  let fishTail: SVGGElement | null = null;
  let fishBody: SVGGElement | null = null;
  let ctaEl: SVGGElement | null = null;
  let ctaBoat: SVGGElement | null = null;
  let ctaPos: SVGGElement | null = null;
  let ctaIdx = 0;
  let ctaHover = 0;
  let ctaOn = false;
  let ctaShift = 0;
  let fishAng = 0;
  let fishReady = false;
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
    // rayon de courbure : le ruban ne doit jamais se replier sur lui-même
    const theta = (i: number) => Math.atan2(Y[Math.min(n - 1, i + 1)] - Y[Math.max(0, i - 1)], X[Math.min(n - 1, i + 1)] - X[Math.max(0, i - 1)]);
    maxHw = X.map((_, i) => {
      const a = theta(Math.max(0, i - 4));
      const b = theta(Math.min(n - 1, i + 4));
      const dd = Math.abs(((b - a + Math.PI * 3) % (Math.PI * 2)) - Math.PI);
      const kappa = dd / (8 * STEP);
      return kappa > 1e-4 ? 0.8 / kappa : 1e9;
    });
    W0 = portrait ? 36 : Math.min(72, Math.max(38, H * 0.058));

    // fenêtres de texte : zones plutôt plates et droites, lues de gauche à droite
    const lens = ORDER.map((k) => (labels[k]?.length ?? 4) * 13 + 30);
    const fracs = portrait ? [0.05, 0.15, 0.3, 0.39, 0.62, 0.74] : [0.1, 0.19, 0.28, 0.37, 0.46, 0.54];
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

    // îles : dans les intervalles libres entre les mots
    const rng = mulberry(42 + W + H);
    islands = [];
    const wins = [...labelWin].sort((p, q) => p.i0 - q.i0);
    const gaps: [number, number][] = [];
    let prev = 14;
    for (const w of wins) {
      gaps.push([prev, w.i0 - 8]);
      prev = w.i1 + 8;
    }
    gaps.push([prev, n - 60]);
    gaps
      .map(([a0, b0]) => ({ a0, b0, size: b0 - a0 }))
      .filter((g) => g.size > 34)
      .sort((p, q) => q.size - p.size)
      .slice(0, portrait ? 2 : 3)
      .forEach((g) => {
        const len = Math.min(Math.round((80 + rng() * 70) / STEP), g.size - 12);
        const at = g.a0 + Math.floor((g.size - len) * (0.3 + rng() * 0.4));
        islands.push({ i0: at, len, off: (rng() < 0.5 ? -1 : 1) * (0.16 + rng() * 0.06), hw: 0.27 + rng() * 0.08 });
      });

    // affluents : arbres de ruisseaux qui se ramifient et s'amenuisent
    const r2 = mulberry(7 + W);
    branches = [];
    const angDiff = (to: number, from: number) => ((((to - from + Math.PI) % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2)) - Math.PI;
    const makeBranch = (x0: number, y0: number, a0: number, steps: number, w0: number, delay: number, depth: number, pull: number) => {
      const raw: Pt[] = [[x0, y0]];
      let x = x0;
      let y = y0;
      let a = a0;
      const ph = r2() * 6.28;
      const amp = 0.03 + r2() * 0.02;
      const ph2 = r2() * 6.28;
      for (let k = 0; k < steps; k++) {
        a += angDiff(pull, a) * 0.03 + (r2() - 0.5) * 0.09 + Math.sin(k * 0.05 + ph) * amp + Math.sin(k * 0.13 + ph2) * 0.016;
        if (r2() < 0.014) a += (r2() < 0.5 ? -1 : 1) * (0.5 + r2() * 0.5); // petits crochets, comme un lit naturel
        x += Math.cos(a) * STEP;
        y += Math.sin(a) * STEP;
        raw.push([x, y]);
        if (x < -30 || x > W + 30 || y > H + 30 || y < -30) break;
      }
      // lissage
      let pts = raw;
      for (let pass = 0; pass < 3; pass++) {
        pts = pts.map((p, i) => {
          if (i === 0 || i === pts.length - 1) return p;
          return [(pts[i - 1][0] + p[0] * 2 + pts[i + 1][0]) / 4, (pts[i - 1][1] + p[1] * 2 + pts[i + 1][1]) / 4] as Pt;
        });
      }
      const nx: number[] = [];
      const ny: number[] = [];
      pts.forEach((_, i) => {
        const p = pts[Math.max(0, i - 1)];
        const q = pts[Math.min(pts.length - 1, i + 1)];
        const l = Math.hypot(q[0] - p[0], q[1] - p[1]) || 1;
        nx.push(-(q[1] - p[1]) / l);
        ny.push((q[0] - p[0]) / l);
      });
      branches.push({ pts, nx, ny, w0, delay, });
      if (depth < 2 && pts.length > 30) {
        const fr = depth === 0 ? (w0 > W0 * 0.35 ? [0.3, 0.52, 0.76] : [0.5]) : [0.55];
        fr.forEach((f, q) => {
          const j = Math.floor(pts.length * f);
          const tang = Math.atan2(pts[j + 1][1] - pts[j - 1][1], pts[j + 1][0] - pts[j - 1][0]);
          const side = (q + depth) % 2 ? 1 : -1;
          const aa = tang + side * (0.28 + r2() * 0.3);
          makeBranch(pts[j][0], pts[j][1], aa, 70 + Math.floor(r2() * 70), w0 * 0.62, delay + f * 2400, depth + 1, aa + angDiff(pull, aa) * 0.5);
        });
      }
    };
    // confluences à angle faible : les affluents remontent le courant, dans le même sens que le fleuve
    // [position sur la rivière, cible x, cible y] — des deux côtés du fleuve
    const starts: [number, number, number, number][] = portrait
      ? [[0.12, -0.3, 0.0, 0.16], [0.52, -0.3, 1.05, 0.55], [0.8, 0.3, 1.15, 0.16]]
      : [[0.24, -0.35, 1.0, 0.55], [0.34, -0.3, 0.05, 0.16], [0.6, 0.1, -0.1, 0.16]];
    starts.forEach(([f, tx, ty, wf], k) => {
      const i = Math.floor(n * f);
      const x0 = X[i];
      const y0 = Y[i];
      const side = (tx * W - x0) * NX[i] + (ty * H - y0) * NY[i] >= 0 ? 1 : -1;
      const tx0 = X[i + 1] - X[i - 1];
      const ty0 = Y[i + 1] - Y[i - 1];
      const tl = Math.hypot(tx0, ty0) || 1;
      const th = 0.32 + r2() * 0.22;
      const dx = (-tx0 / tl) * Math.cos(th) + NX[i] * side * Math.sin(th);
      const dy = (-ty0 / tl) * Math.cos(th) + NY[i] * side * Math.sin(th);
      const x = x0 + NX[i] * side * W0 * 0.1;
      const y = y0 + NY[i] * side * W0 * 0.1;
      const pull = Math.atan2(ty * H - y, tx * W - x);
      makeBranch(x, y, Math.atan2(dy, dx), wf > 0.3 ? 320 : portrait ? 190 : 240, W0 * wf, 1200 + k * 450, 0, pull);
    });

    // CTA : un bateau en papier posé sur le courant, juste après le dernier mot
    {
      const lastWord = Math.max(...labelWin.map((l) => l.i1));
      ctaIdx = Math.min(Math.floor(n * 0.9), lastWord + 34);
      const half = (ctaText.length + 2) * 4.6;
      ctaShift = Math.min(0, W - 14 - (X[ctaIdx] + half)) + Math.max(0, 14 - (X[ctaIdx] - half));
    }

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
    const branchSvg = branches.map(() => '<path class="river__branch" fill="url(#river-grad)" d=""/>').join('');
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
      `<stop offset="0" stop-color="#3a74d6"/><stop offset="0.4" stop-color="#3f80df"/><stop offset="0.75" stop-color="#4a8de3"/><stop offset="1" stop-color="#4f95e7"/></linearGradient>` +
      `<filter id="rough" x="-10%" y="-30%" width="120%" height="160%"><feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="2" seed="4" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="3"/></filter>` +
      labelWin.map((_, k) => `<path id="lp-${k}" d=""/>`).join('') +
      `</defs>` +
      `<g class="river__water">` +
      branchSvg +
      `<path class="river__body" fill="url(#river-grad)" fill-rule="evenodd" d=""/></g>` +
      `<path class="river__streak" d=""/><path class="river__streak river__streak--b" d=""/><path class="river__streak river__streak--c" d=""/>` +
      `<g class="river__fish" opacity="0" aria-hidden="true"><g class="fish__body" filter="url(#rough)">` +
      `<path class="fish__line" d="M10,3 C12,-11 44,-15 70,-1"/>` +
      `<path class="fish__line fish__line--thin" d="M10,3 C14,14 46,15 70,0"/>` +
      `<path class="fish__line fish__line--thick" d="M16,-8 C28,-13 42,-13 56,-7"/>` +
      `<path class="fish__line fish__line--thin" d="M20,1 C32,-3 46,-3 60,1"/>` +
      `<path class="fish__line" d="M30,-10 C36,-24 46,-27 54,-21"/>` +
      `<path class="fish__line fish__line--thin" d="M40,10 C44,18 50,20 56,17"/>` +
      `<circle class="fish__eye" cx="21" cy="-2.5" r="1.9"/></g>` +
      `<g class="fish__tail" filter="url(#rough)">` +
      `<path class="fish__line" d="M66,-1 C76,-13 88,-17 100,-15"/>` +
      `<path class="fish__line" d="M67,1 C79,9 90,17 102,15"/>` +
      `<path class="fish__line fish__line--thick" d="M72,-2 L96,11"/>` +
      `<path class="fish__line fish__line--thin" d="M70,2 C80,0 90,-6 98,-12"/></g></g>` +
      `<a class="river__cta" href="${ctaHref}" aria-label="${esc(ctaText)}"><g class="cta__boatg"><g class="cta__boat" filter="url(#rough)">` +
      `<path class="cta__sail" d="M31,2 L52,18 L31,18 Z"/><path class="cta__sail cta__sail--b" d="M28,7 L10,18 L28,18 Z"/>` +
      `<path class="cta__hull" d="M3,19 L58,19 L48,32 L13,32 Z"/><path class="cta__fold" d="M8,19 L16,29 M53,19 L45,29 M31,19 L31,31"/></g></g>` +
      `<g class="cta__pos"><text class="cta__text" x="${ctaShift.toFixed(1)}" y="${(W0 * 0.5 + 46).toFixed(0)}" text-anchor="middle">${esc(ctaText)} →</text>` +
      `<rect class="cta__hit" x="${(ctaShift - 120).toFixed(0)}" y="-34" width="240" height="${(W0 + 86).toFixed(0)}"/></g></a>` +
      labelSvg;
    root.appendChild(svg);

    riverEl = svg.querySelector('.river__body') as SVGPathElement;
    streakEls = [...svg.querySelectorAll<SVGPathElement>('.river__streak')];
    labelPaths = labelWin.map((_, k) => svg.querySelector(`#lp-${k}`) as SVGPathElement);
    hitPaths = labelWin.map((_, k) => svg.querySelector(`#hit-${k}`) as SVGPathElement);

    svg.querySelectorAll<SVGAElement>('.river__link').forEach((a) => {
      a.addEventListener('pointerenter', () => (hoverKey = a.dataset.key as LinkKey));
      a.addEventListener('pointerleave', () => (hoverKey = null));
    });
    branchEls = [...svg.querySelectorAll<SVGPathElement>('.river__branch')];
    fishEl = svg.querySelector('.river__fish');
    fishTail = svg.querySelector('.fish__tail');
    fishBody = svg.querySelector('.fish__body');
    ctaEl = svg.querySelector('.river__cta');
    ctaBoat = svg.querySelector('.cta__boatg');
    ctaPos = svg.querySelector('.cta__pos');
    ctaEl?.addEventListener('pointerenter', () => (ctaOn = true));
    ctaEl?.addEventListener('pointerleave', () => (ctaOn = false));
    fishReady = false;
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
      hw[i] = Math.min(w / 2, maxHw[i]) * taper;
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

    // îles : lames allongées collées à une berge, bouts pointus, fond presque plat
    for (const isl of islands) {
      if (isl.i0 + isl.len >= count) continue;
      const side = Math.sign(isl.off);
      const top: Pt[] = [];
      const bot: Pt[] = [];
      for (let j = 0; j <= isl.len; j++) {
        const i = isl.i0 + j;
        const k = Math.sin((Math.PI * j) / isl.len) ** 1.1;
        const w = hw[i] * 2;
        const base = isl.off * w;
        const room = hw[i] - 5 - Math.abs(base);
        const h1 = Math.max(0, Math.min(w * isl.hw * k * (0.9 + 0.2 * vnoise(j * 0.6, 33)), room));
        const h2 = w * isl.hw * 0.28 * k * (0.7 + 0.5 * Math.abs(vnoise(j * 0.9, 34)));
        top.push([cx[i] + NX[i] * (base + side * h1), cy[i] + NY[i] * (base + side * h1)]);
        bot.push([cx[i] + NX[i] * (base - side * h2), cy[i] + NY[i] * (base - side * h2)]);
      }
      d += `M${top.map((p) => `${f1(p[0])},${f1(p[1])}`).join('L')}L${bot
        .reverse()
        .map((p) => `${f1(p[0])},${f1(p[1])}`)
        .join('L')}Z`;
    }
    riverEl.setAttribute('d', d);

    // filets de courant : petits reflets sinueux, qui suivent le courant sans le quitter
    streakEls.forEach((el, k) => {
      const o = k === 0 ? 0.2 : k === 1 ? -0.17 : 0.02;
      let sd = '';
      for (let i = 4; i < count - 4; i += 2) {
        const s = i * STEP;
        const wob = 0.2 * vnoise((s - flow * 0.8) / 46, 81 + k) + 0.06 * vnoise((s - flow * 1.1) / 15, 85 + k);
        const r = Math.max(-0.58, Math.min(0.58, o * 2 + wob * 2)) * hw[i];
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

    // affluents : même matière que la rivière, plus fins vers l'extrémité
    branches.forEach((b, bi) => {
      const total = b.pts.length;
      const g = reduce ? 1 : Math.max(0, Math.min(1, (t * 1000 - b.delay) / 3200));
      const cnt = Math.floor(total * (1 - (1 - g) ** 3));
      if (cnt < 3) {
        branchEls[bi].setAttribute('d', '');
        return;
      }
      const L: string[] = [];
      const R: string[] = [];
      for (let i = 0; i < cnt; i++) {
        const u = i / (total - 1);
        const s = i * STEP;
        const head = Math.min(1, (cnt - i) / 8);
        let w = (b.w0 * (1 - u) ** 0.9 * (0.85 + 0.3 * vnoise((s - flow * 1.2) / 45, 51 + bi)) + 1.1) * head;
        const bx = b.pts[i][0] - pointer.x;
        const by = b.pts[i][1] - pointer.y;
        const bd2 = bx * bx + by * by;
        if (bd2 < 110 * 110) w += (6 + b.w0 * 0.35) * (1 - Math.sqrt(bd2) / 110) ** 2 * head;
        const sway = Math.sin((s - flow * 1.4) / 60 + bi) * 1.6 * (1 - u);
        const px = b.pts[i][0] + b.nx[i] * sway;
        const py = b.pts[i][1] + b.ny[i] * sway;
        const rg = 0.8 + b.w0 * 0.03;
        const jl = rg * (0.9 * vnoise(s / 9, 61 + bi) + 0.35 * vnoise(s / 3.4, 62 + bi));
        const jr = rg * (0.9 * vnoise(s / 10, 71 + bi) + 0.35 * vnoise(s / 3.6, 72 + bi));
        L.push(`${f1(px + b.nx[i] * (w / 2 + jl))},${f1(py + b.ny[i] * (w / 2 + jl))}`);
        R.push(`${f1(px - b.nx[i] * (w / 2 + jr))},${f1(py - b.ny[i] * (w / 2 + jr))}`);
      }
      branchEls[bi].setAttribute('d', `M${L.join('L')}L${R.reverse().join('L')}Z`);
    });

    // le bateau en papier : tangue sur l'eau, avance un peu au survol (le texte reste droit)
    if (ctaEl && ctaBoat && ctaPos && count === n) {
      ctaHover += ((ctaOn ? 1 : 0) - ctaHover) * 0.08;
      const i = ctaIdx;
      const tx = X[i + 4] - X[i - 4];
      const ty = Y[i + 4] - Y[i - 4];
      const tl = Math.hypot(tx, ty) || 1;
      const rock = Math.sin(t * 1.3) * 3.5 - ctaHover * 6;
      const along = Math.sin(t * 0.55) * 5 + ctaHover * 16;
      const ang = Math.max(-0.35, Math.min(0.35, Math.atan2(ty, tx)));
      const px = cx[i] + (tx / tl) * along;
      const py = cy[i] + (ty / tl) * along + Math.sin(t * 1.7) * 2;
      ctaBoat.setAttribute('transform', `translate(${(px - 30).toFixed(2)} ${(py - 22).toFixed(2)}) rotate(${((ang * 180) / Math.PI + rock).toFixed(2)} 30 22)`);
      ctaPos.setAttribute('transform', `translate(${cx[i].toFixed(2)} ${cy[i].toFixed(2)})`);
    }

    // le poisson remonte le courant, au-dessus de la rivière (position interpolée, cap lissé)
    if (fishEl && fishTail && fishBody && count === n) {
      const cycle = 70; // secondes pour un trajet
      const ph = reduce ? 0.5 : ((t - 3.6) / cycle) % 1;
      if (ph >= 0) {
        const fiF = Math.max(8, Math.min(n - 9, n * (0.9 - ph * 0.8)));
        const at = (u: number): Pt => {
          const i = Math.floor(u);
          const k = u - i;
          const up = NY[i] < 0 ? 1 : -1;
          const off = up * W0 * 2.2;
          const ax = cx[i] + NX[i] * off;
          const ay = cy[i] + NY[i] * off;
          const bx = cx[i + 1] + NX[i + 1] * off;
          const by = cy[i + 1] + NY[i + 1] * off;
          return [ax + (bx - ax) * k, ay + (by - ay) * k];
        };
        const p = at(fiF);
        const a = at(fiF - 7);
        const q = at(fiF + 7);
        const phi = Math.atan2(a[1] - q[1], a[0] - q[0]); // direction de nage (vers l'amont)
        if (!fishReady) {
          fishAng = phi;
          fishReady = true;
        }
        let dA = phi - fishAng;
        dA = ((((dA + Math.PI) % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2)) - Math.PI;
        fishAng += dA * 0.06;
        const bob = Math.sin(t * 0.8) * 5;
        const sway = Math.sin(t * 2.6) * 0.07; // le corps ondule en nageant
        const deg = (r: number) => ((r * 180) / Math.PI).toFixed(2);
        const sc = ((W0 / 52) * 0.75).toFixed(3);
        const nx = -Math.sin(fishAng);
        const ny = Math.cos(fishAng);
        const px = p[0] + nx * bob;
        const py = p[1] + ny * bob;
        const left = Math.cos(fishAng) < 0;
        const tf = left
          ? `translate(${px.toFixed(2)} ${py.toFixed(2)}) rotate(${deg(fishAng - Math.PI + sway)}) scale(${sc}) translate(-50 0)`
          : `translate(${px.toFixed(2)} ${py.toFixed(2)}) rotate(${deg(fishAng - sway)}) scale(-${sc} ${sc}) translate(-50 0)`;
        fishEl.setAttribute('transform', tf);
        fishBody.setAttribute('transform', `rotate(${(Math.sin(t * 2.6 - 0.9) * 2.4).toFixed(2)} 40 0)`);
        fishTail.setAttribute('transform', `rotate(${(Math.sin(t * 2.6 - 0.2) * 12).toFixed(2)} 67 0)`);
        const edge = Math.min(ph / 0.05, (1 - ph) / 0.06, 1);
        fishEl.setAttribute('opacity', Math.max(0, edge).toFixed(2));
      }
    }

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
