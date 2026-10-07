/**
 * Page Contact : une rivière discrète qui entre par la gauche et serpente autour du formulaire.
 * Même matière que l'accueil (ruban aux bords irréguliers), mais plus fine, plus pâle, en retrait.
 */
type Pt = [number, number];
const NS = 'http://www.w3.org/2000/svg';

const wrap = document.querySelector<HTMLElement>('[data-cwrap]');
const form = document.querySelector<HTMLElement>('.contact__form');
const intro = document.querySelector<HTMLElement>('.contact__intro');
if (wrap && form && intro) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const f1 = (v: number) => v.toFixed(1);

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

  const catmull = (pts: Pt[], sub = 22): Pt[] => {
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

  const draw = () => {
    wrap.querySelector('.contact__river')?.remove();
    const W = wrap.clientWidth;
    const H = wrap.clientHeight;
    const wb = wrap.getBoundingClientRect();
    const fb = form.getBoundingClientRect();
    const fx0 = fb.left - wb.left;
    const fx1 = fb.right - wb.left;
    const fy0 = fb.top - wb.top;
    const fy1 = fb.bottom - wb.top;
    const ib = intro.getBoundingClientRect().bottom - wb.top; // la rivière passe sous le titre
    const narrow = W < 860;
    const m = narrow ? 34 : 56; // distance de sécurité autour du formulaire

    // parcours : entre à gauche, serpente, contourne le formulaire par le bas puis remonte à sa droite
    const ctrl: Pt[] = narrow
      ? [
          [-40, fy0 - 70],
          [W * 0.2, fy0 - 40],
          [W * 0.1, fy0 + (fy1 - fy0) * 0.35],
          [W * 0.04, fy1 + 10],
          [W * 0.3, fy1 + m],
          [W * 0.7, fy1 + m + 18],
          [W + 40, fy1 + 40],
        ]
      : [
          [-50, ib + 40],
          [W * 0.1, ib + 78],
          [W * 0.2, ib + 46],
          [fx0 - m * 2.3, ib + 70],
          [fx0 - m, Math.max(ib + 90, fy0 + (fy1 - fy0) * 0.7)],
          [fx0 - m * 0.4, fy1 + m * 0.7],
          [(fx0 + fx1) / 2, fy1 + m * 1.15],
          [fx1 + m * 0.7, fy1 + m * 0.6],
          [fx1 + m * 1.1, fy0 + (fy1 - fy0) * 0.5],
          [fx1 + m * 0.6, fy0 - m * 0.4],
          [Math.min(W + 50, fx1 + m * 3), fy0 - m * 1.6],
        ];
    const poly = resample(catmull(ctrl), 6);
    const n = poly.length;
    const baseW = narrow ? 11 : 16;
    const L: string[] = [];
    const R: string[] = [];
    const center: Pt[] = [];
    for (let i = 0; i < n; i++) {
      const a = poly[Math.max(0, i - 1)];
      const b = poly[Math.min(n - 1, i + 1)];
      const l = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
      const nx = -(b[1] - a[1]) / l;
      const ny = (b[0] - a[0]) / l;
      const s = i * 6;
      const taper = Math.min(1, i / 40, (n - i) / 40);
      const w = baseW * (0.8 + 0.3 * vnoise(s / 110, 3) + 0.1 * vnoise(s / 35, 4)) * Math.max(0.08, taper);
      const jl = 1.5 * vnoise(s / 70, 11) + 0.7 * vnoise(s / 13, 12) + 0.35 * vnoise(s / 4.4, 13);
      const jr = 1.5 * vnoise(s / 80, 21) + 0.7 * vnoise(s / 12, 22) + 0.35 * vnoise(s / 4.6, 23);
      L.push(`${f1(poly[i][0] + nx * (w / 2 + jl))},${f1(poly[i][1] + ny * (w / 2 + jl))}`);
      R.push(`${f1(poly[i][0] - nx * (w / 2 + jr))},${f1(poly[i][1] - ny * (w / 2 + jr))}`);
      center.push(poly[i]);
    }
    const body = `M${L.join('L')}L${R.reverse().join('L')}Z`;
    const streak = center
      .filter((_, i) => i > 6 && i < n - 6)
      .map((p, i) => `${i ? 'L' : 'M'}${f1(p[0])},${f1(p[1] + Math.sin(i / 7) * 1.4)}`)
      .join('');

    const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('class', 'contact__river');
    svg.setAttribute('width', String(W));
    svg.setAttribute('height', String(H));
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    svg.setAttribute('aria-hidden', 'true');
    svg.innerHTML =
      `<defs><linearGradient id="cr-grad" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="${W}" y2="0">` +
      `<stop offset="0" stop-color="#8fb5f0"/><stop offset="1" stop-color="#b7d2f6"/></linearGradient></defs>` +
      `<path class="cr__body" fill="url(#cr-grad)" d="${body}"/><path class="cr__streak" d="${streak}"/>`;
    wrap.prepend(svg);
    requestAnimationFrame(() => svg.classList.add('is-ready'));
  };

  draw();
  if (!reduce) {
    // l'image se redessine si le formulaire change de taille (message d'état, redimensionnement)
    let rt = 0;
    const redo = () => {
      window.clearTimeout(rt);
      rt = window.setTimeout(draw, 160);
    };
    window.addEventListener('resize', redo);
    new ResizeObserver(redo).observe(form);
  }
}
