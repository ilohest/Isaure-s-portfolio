/**
 * Prairie au bas de l'écran, dans la direction artistique de la rivière :
 * rubans bleus aux bords irréguliers qui s'amincissent, traits d'encre, fleurs dessinées à la main.
 * Elle ondule avec le vent et se couche sous la souris ; le contenu passe derrière.
 */
const canvas = document.querySelector<HTMLCanvasElement>('.meadow__canvas');
const ctx = canvas?.getContext('2d');
if (canvas && ctx) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const rnd = (seed: number) => {
    let a = seed >>> 0;
    return () => {
      a = (a + 0x6d2b79f5) >>> 0;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  };

  const INK = '#2a5cc8';
  const PAPER = '#fffdf7';
  const FRONT = ['#3f80df', '#3a74d6', '#4a8de3', '#4f95e7', '#3a78dc'];
  const BACK = ['#a5c8f4', '#94bdf0', '#b3d1f6', '#9cc2f2'];
  const SEG = 8;

  interface Blade {
    x: number;
    h: number;
    w: number;
    lean: number;
    phase: number;
    color: string;
    layer: number; // 0 fond, 1 devant
    thin: boolean;
    jl: number[];
    jr: number[];
  }
  interface Petal {
    a: number;
    len: number;
    wid: number;
  }
  interface Flower {
    x: number;
    h: number;
    phase: number;
    r: number;
    rot: number;
    petals: Petal[];
    leaf: number;
  }

  let W = 0;
  let H = 0;
  let dpr = 1;
  let blades: Blade[] = [];
  let flowers: Flower[] = [];
  const pointer = { x: -9999, y: -9999 };
  let raf = 0;

  const build = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    const box = canvas.getBoundingClientRect();
    W = Math.round(box.width);
    H = Math.round(box.height);
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    const r = rnd(5);
    blades = [];
    const n = Math.max(95, Math.round(W / 6.4));
    for (let i = 0; i < n; i++) {
      const layer = r() < 0.42 ? 0 : 1;
      const thin = layer === 1 && r() < 0.28;
      blades.push({
        x: (i / n) * (W + 40) - 20 + (r() - 0.5) * 12,
        h: (layer === 0 ? 0.26 + r() * 0.3 : 0.38 + r() * 0.55) * H,
        w: thin ? 1.6 : layer === 0 ? 4 + r() * 4 : 4.5 + r() * 6,
        lean: (r() - 0.5) * 0.4,
        phase: r() * 6.28,
        color: layer === 0 ? BACK[Math.floor(r() * BACK.length)] : FRONT[Math.floor(r() * FRONT.length)],
        layer,
        thin,
        jl: Array.from({ length: SEG + 1 }, () => (r() - 0.5) * 1.5),
        jr: Array.from({ length: SEG + 1 }, () => (r() - 0.5) * 1.5),
      });
    }
    blades.sort((a, b) => a.layer - b.layer);

    flowers = [];
    const nf = W < 600 ? 4 : Math.max(6, Math.round(W / 175));
    for (let i = 0; i < nf; i++) {
      const count = 5 + Math.floor(r() * 3);
      flowers.push({
        x: ((i + 0.3 + r() * 0.5) / nf) * W,
        h: (0.62 + r() * 0.34) * H,
        phase: r() * 6.28,
        r: 11 + r() * 7,
        rot: r() * 6.28,
        leaf: r() < 0.5 ? 1 : -1,
        petals: Array.from({ length: count }, (_, k) => ({
          a: (k / count) * Math.PI * 2 + (r() - 0.5) * 0.35,
          len: 0.8 + r() * 0.45,
          wid: 0.55 + r() * 0.3,
        })),
      });
    }
  };

  const wind = (t: number, x: number) => {
    const gust = 0.55 + 0.45 * Math.sin(t * 0.23 + x * 0.0016);
    return (Math.sin(t * 1.1 + x * 0.006) * 0.62 + Math.sin(t * 2.3 + x * 0.013) * 0.24 + Math.sin(t * 0.5 + x * 0.002) * 0.3) * gust;
  };

  const push = (x: number) => {
    const fromBottom = window.innerHeight - pointer.y;
    if (fromBottom > H + 50 || fromBottom < -10) return 0;
    const d = x - pointer.x;
    const R = 100;
    if (Math.abs(d) > R) return 0;
    return Math.sign(d || 1) * (1 - Math.abs(d) / R) ** 2 * 0.85;
  };

  // point sur une courbe quadratique
  const quad = (x0: number, y0: number, cx: number, cy: number, x1: number, y1: number, u: number): [number, number] => {
    const v = 1 - u;
    return [v * v * x0 + 2 * v * u * cx + u * u * x1, v * v * y0 + 2 * v * u * cy + u * u * y1];
  };

  const drawBlade = (b: Blade, t: number) => {
    const bend = b.lean + wind(t + b.phase * 0.05, b.x) * (b.layer ? 0.55 : 0.4) + push(b.x);
    const tipX = b.x + Math.sin(bend) * b.h;
    const tipY = H - Math.cos(bend) * b.h;
    const cpX = b.x + Math.sin(bend * 0.35) * b.h * 0.55;
    const cpY = H - b.h * 0.56;
    if (b.thin) {
      // filet d'encre, comme les petits affluents
      ctx.beginPath();
      for (let k = 0; k <= SEG; k++) {
        const [px, py] = quad(b.x, H + 2, cpX, cpY, tipX, tipY, k / SEG);
        if (k) ctx.lineTo(px, py);
        else ctx.moveTo(px, py);
      }
      ctx.strokeStyle = INK;
      ctx.lineWidth = b.w;
      ctx.lineCap = 'round';
      ctx.stroke();
      return;
    }
    const L: [number, number][] = [];
    const R: [number, number][] = [];
    for (let k = 0; k <= SEG; k++) {
      const u = k / SEG;
      const [px, py] = quad(b.x, H + 2, cpX, cpY, tipX, tipY, u);
      const [qx, qy] = quad(b.x, H + 2, cpX, cpY, tipX, tipY, Math.min(1, u + 0.02));
      const [ox, oy] = quad(b.x, H + 2, cpX, cpY, tipX, tipY, Math.max(0, u - 0.02));
      const l = Math.hypot(qx - ox, qy - oy) || 1;
      const nx = -(qy - oy) / l;
      const ny = (qx - ox) / l;
      // largeur : pleine à la base, affinée en pointe, bords irréguliers
      const half = (b.w / 2) * (1 - u) ** 0.85 + 0.15;
      L.push([px + nx * (half + b.jl[k]), py + ny * (half + b.jl[k])]);
      R.push([px - nx * (half + b.jr[k]), py - ny * (half + b.jr[k])]);
    }
    ctx.beginPath();
    ctx.moveTo(L[0][0], L[0][1]);
    for (let k = 1; k <= SEG; k++) ctx.lineTo(L[k][0], L[k][1]);
    for (let k = SEG; k >= 0; k--) ctx.lineTo(R[k][0], R[k][1]);
    ctx.closePath();
    ctx.fillStyle = b.color;
    ctx.fill();
  };

  const drawFlower = (f: Flower, t: number) => {
    const bend = wind(t + f.phase * 0.05, f.x) * 0.38 + push(f.x) * 0.8;
    const tipX = f.x + Math.sin(bend) * f.h;
    const tipY = H - Math.cos(bend) * f.h;
    const cpX = f.x + Math.sin(bend * 0.3) * f.h * 0.5;
    const cpY = H - f.h * 0.5;

    // tige : trait d'encre
    ctx.beginPath();
    ctx.moveTo(f.x, H + 2);
    ctx.quadraticCurveTo(cpX, cpY, tipX, tipY);
    ctx.strokeStyle = INK;
    ctx.lineWidth = 2.2;
    ctx.lineCap = 'round';
    ctx.stroke();

    // feuille : deux traits
    const [lx, ly] = quad(f.x, H + 2, cpX, cpY, tipX, tipY, 0.46);
    ctx.beginPath();
    ctx.moveTo(lx, ly);
    ctx.quadraticCurveTo(lx + f.leaf * 14, ly - 14 + bend * 6, lx + f.leaf * 26, ly - 4 + bend * 10);
    ctx.quadraticCurveTo(lx + f.leaf * 14, ly + 1, lx, ly);
    ctx.fillStyle = FRONT[3];
    ctx.globalAlpha = 0.85;
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.strokeStyle = INK;
    ctx.lineWidth = 1.4;
    ctx.stroke();

    // pétales : boucles ouvertes, papier + encre
    const spin = f.rot + bend * 1.3 + Math.sin(t * 0.8 + f.phase) * 0.07;
    for (const p of f.petals) {
      const a = spin + p.a;
      const len = f.r * p.len;
      const wid = f.r * p.wid * 0.5;
      const ca = Math.cos(a);
      const sa = Math.sin(a);
      const ex = tipX + ca * len;
      const ey = tipY + sa * len;
      ctx.beginPath();
      ctx.moveTo(tipX, tipY);
      ctx.quadraticCurveTo(tipX + ca * len * 0.55 - sa * wid, tipY + sa * len * 0.55 + ca * wid, ex, ey);
      ctx.quadraticCurveTo(tipX + ca * len * 0.55 + sa * wid, tipY + sa * len * 0.55 - ca * wid, tipX, tipY);
      ctx.fillStyle = PAPER;
      ctx.fill();
      ctx.strokeStyle = INK;
      ctx.lineWidth = 1.5;
      ctx.lineJoin = 'round';
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.arc(tipX, tipY, f.r * 0.24, 0, Math.PI * 2);
    ctx.fillStyle = '#f2cf6e';
    ctx.fill();
    ctx.strokeStyle = INK;
    ctx.lineWidth = 1.2;
    ctx.stroke();
  };

  const frame = (ms: number) => {
    const t = reduce ? 0 : ms / 1000;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    for (const b of blades) drawBlade(b, t);
    for (const f of flowers) drawFlower(f, t);
    if (!reduce) raf = requestAnimationFrame(frame);
  };

  build();
  raf = requestAnimationFrame(frame);
  let rt = 0;
  window.addEventListener('resize', () => {
    window.clearTimeout(rt);
    rt = window.setTimeout(() => {
      build();
      if (reduce) raf = requestAnimationFrame(frame);
    }, 150);
  });
  window.addEventListener('pointermove', (e) => {
    pointer.x = e.clientX;
    pointer.y = e.clientY;
  });
  window.addEventListener('pointerleave', () => {
    pointer.x = pointer.y = -9999;
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(raf);
    else if (!reduce) raf = requestAnimationFrame(frame);
  });
}
