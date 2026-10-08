/**
 * Page 404 : une rivière fine qui coule, gonfle sous le pointeur, et se perd dans un tourbillon, où le bateau tourne à la dérive.
 */
export {};

type Pt = [number, number];
const NS = 'http://www.w3.org/2000/svg';
const stage = document.querySelector<HTMLElement>('[data-adrift]');
if (stage) {
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

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const pointer = { x: -9999, y: -9999 };
  let raf = 0;
  window.addEventListener('pointermove', (e) => {
    const r = stage.getBoundingClientRect();
    pointer.x = e.clientX - r.left;
    pointer.y = e.clientY - r.top;
  });

  const draw = () => {
    stage.querySelector('.adrift__svg')?.remove();
    const boatEl = stage.querySelector<HTMLElement>('.adrift__boat')!;
    const W = stage.clientWidth;
    const H = stage.clientHeight;
    const narrow = W < 800;
    // tourbillon : centre à droite sur grand écran, en bas sur mobile
    const cx = narrow ? W * 0.5 : W * 0.7;
    const cy = narrow ? H * 0.72 : H * 0.56;
    const R = narrow ? Math.min(W * 0.22, 90) : Math.min(H * 0.26, 150);
    const entry: Pt[] = narrow
      ? [[-40, cy - R * 1.6], [W * 0.2, cy - R * 2.1], [W * 0.62, cy - R * 1.8], [cx + R * 1.1, cy - R * 0.6]]
      : [[-50, H * 0.88], [W * 0.12, H * 0.84], [W * 0.3, H * 0.9], [W * 0.46, H * 0.76], [cx - R * 1.4, cy + R * 0.9], [cx - R * 1.05, cy + R * 0.1]];
    // spirale qui se resserre vers le centre
    const spiral: Pt[] = [];
    for (let k = 0; k <= 22; k++) {
      const a = Math.PI + k * 0.52;
      const r = R * (1.05 - (k / 22) * 0.86);
      spiral.push([cx + Math.cos(a) * r * 1.12, cy + Math.sin(a) * r * 0.82]);
    }
    const poly = resample(catmull([...entry, ...spiral]), 5);
    const n = poly.length;
    const NX: number[] = [];
    const NY: number[] = [];
    for (let i = 0; i < n; i++) {
      const a = poly[Math.max(0, i - 1)];
      const b = poly[Math.min(n - 1, i + 1)];
      const l = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
      NX.push(-(b[1] - a[1]) / l);
      NY.push((b[0] - a[0]) / l);
    }
    const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('class', 'adrift__svg');
    svg.setAttribute('width', String(W));
    svg.setAttribute('height', String(H));
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    svg.setAttribute('aria-hidden', 'true');
    svg.innerHTML =
      `<defs><linearGradient id="ad-grad" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="${W}" y2="0">` +
      `<stop offset="0" stop-color="#3a74d6"/><stop offset="1" stop-color="#5a9be8"/></linearGradient></defs>` +
      `<path class="ad__body" fill="url(#ad-grad)"/>`;
    const body = svg.querySelector('.ad__body')!;
    const t0 = performance.now();

    // une image : la matière coule le long du lit, et le ruban gonfle près du pointeur
    const frame = (now: number) => {
      const t = reduce ? 0 : (now - t0) / 1000;
      const flow = t * 38;
      // la rivière se trace le long de son lit, dans le sens du courant, la tête effilée en pointe
      const progress = reduce ? 1 : Math.min(1, t / 3.4);
      const eased = 1 - (1 - progress) ** 3;
      const count = Math.max(2, Math.floor(n * eased));
      const L: string[] = [];
      const Rr: string[] = [];
      for (let i = 0; i < count; i++) {
        const s = i * 5;
        const u = i / n;
        const taper = progress < 1 ? Math.min(1, (count - i) / 16) : 1;
        const sway = reduce ? 0 : Math.sin((s - flow * 1.6) / 150) * 5 + Math.sin((s - flow * 2.3) / 57) * 1.6;
        const px = poly[i][0] + NX[i] * sway;
        const py = poly[i][1] + NY[i] * sway;
        // le ruban s'amincit en se rapprochant du centre du tourbillon
        let w = (narrow ? 12 : 17) * (0.85 + 0.25 * vnoise((s - flow) / 90, 3)) * Math.max(0.1, Math.min(1, i / 30) * (1 - u * 0.78));
        w *= taper;
        const dx = poly[i][0] - pointer.x;
        const dy = poly[i][1] - pointer.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 130 * 130) w += 12 * (1 - Math.sqrt(d2) / 130) ** 2 * Math.min(1, i / 30);
        const jl = 1.4 * vnoise(s / 60, 11) + 0.6 * vnoise((s - flow * 0.15) / 12, 12) + 0.3 * vnoise(s / 4, 13);
        const jr = 1.4 * vnoise(s / 70, 21) + 0.6 * vnoise((s - flow * 0.15) / 11, 22) + 0.3 * vnoise(s / 4.4, 23);
        L.push(`${f1(px + NX[i] * (w / 2 + jl))},${f1(py + NY[i] * (w / 2 + jl))}`);
        Rr.push(`${f1(px - NX[i] * (w / 2 + jr))},${f1(py - NY[i] * (w / 2 + jr))}`);
      }
      body.setAttribute('d', `M${L.join('L')}L${Rr.reverse().join('L')}Z`);
      if (!reduce) raf = requestAnimationFrame(frame);
    };
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(frame);
    stage.prepend(svg);
    boatEl.style.left = `${cx - 31}px`;
    boatEl.style.top = `${cy - 20}px`;
  };

  draw();
  let rt = 0;
  window.addEventListener('resize', () => {
    window.clearTimeout(rt);
    rt = window.setTimeout(draw, 160);
  });

  // langue : /en/… → anglais, sinon français (une seule 404.html pour tout le site)
  if (location.pathname === '/en' || location.pathname.startsWith('/en/')) {
    document.documentElement.lang = 'en';
    document.querySelectorAll<HTMLElement>('[data-l="fr"]').forEach((e) => (e.hidden = true));
    document.querySelectorAll<HTMLElement>('[data-l="en"]').forEach((e) => (e.hidden = false));
  }
}
