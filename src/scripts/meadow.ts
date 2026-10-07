/**
 * Prairie au bas de l'écran : herbes et fleurs dessinées à la main — touffes irrégulières,
 * brins tous différents (longueur, courbure, épaisseur, pointe) — qui ondulent très doucement.
 * Le contenu de la page passe derrière.
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

  const GREEN_BACK = ['#9cc3a0', '#8dba94', '#a8cbab', '#85b08c', '#a3c49a'];
  const GREEN_FRONT = ['#5f8f68', '#4f8059', '#6b9d73', '#477650', '#5a8a62', '#6c9a5e', '#7fa35a', '#8eaa5e', '#3f6e4d'];
  const FLOWERS: { petal: string; edge: string; core: string; petals: number; round: number }[] = [
    { petal: '#fffdf7', edge: '#b9b4a6', core: '#f2b826', petals: 9, round: 0.32 }, // marguerite
    { petal: '#f3b3cf', edge: '#cf7fa4', core: '#f2b826', petals: 7, round: 0.5 }, // cosmos
    { petal: '#4a8ee2', edge: '#2a5cc8', core: '#25417f', petals: 8, round: 0.28 }, // bleuet
    { petal: '#f2b826', edge: '#c9861a', core: '#c9861a', petals: 6, round: 0.55 }, // bouton d'or
    { petal: '#ef6a52', edge: '#b83f2c', core: '#2b2a28', petals: 5, round: 0.8 }, // coquelicot
  ];

  interface Blade {
    x: number;
    h: number;
    w: number;
    a: number; // courbure du bas
    b: number; // courbure du haut
    curl: number; // pointe qui retombe
    phase: number;
    amp: number;
    color: string;
    edge: string | null;
    layer: number;
    belly: number;
    jl: number[];
    jr: number[];
  }
  interface Flower {
    x: number;
    h: number;
    phase: number;
    r: number;
    rot: number;
    a: number;
    b: number;
    leaf: number;
    kind: (typeof FLOWERS)[number];
    petals: { a: number; len: number; wid: number; k1: number; k2: number }[];
    bud: boolean;
  }

  const SEG = 10;
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
    const r = rnd(17);
    blades = [];

    // touffes : des brins qui partent d'un même point, dans des directions différentes
    const clumps = Math.max(10, Math.round(W / 62));
    for (let c = 0; c < clumps; c++) {
      const cx = ((c + 0.15 + r() * 0.7) / clumps) * (W + 60) - 30;
      const count = 2 + Math.floor(r() * 6);
      const tallness = 0.4 + r() * 0.6;
      for (let k = 0; k < count; k++) {
        const layer = r() < 0.38 ? 0 : 1;
        const spread = (k - (count - 1) / 2) / Math.max(1, count / 2);
        blades.push({
          x: cx + (r() - 0.5) * 16,
          h: (layer === 0 ? 0.16 + r() * 0.3 : 0.2 + r() * 0.75) * H * (0.55 + tallness * 0.6),
          w: 1.8 + r() * (layer ? 6 : 4),
          a: spread * 0.55 + (r() - 0.5) * 0.4,
          b: spread * 0.9 + (r() - 0.5) * 0.9,
          curl: (r() - 0.5) * (r() < 0.4 ? 1.5 : 0.35),
          phase: r() * 6.28,
          amp: 0.5 + r() * 0.9,
          color: layer === 0 ? GREEN_BACK[Math.floor(r() * GREEN_BACK.length)] : GREEN_FRONT[Math.floor(r() * GREEN_FRONT.length)],
          edge: r() < 0.45 ? 'rgba(40,70,48,0.35)' : null,
          layer,
          belly: 0.6 + r() * 0.9,
          jl: Array.from({ length: SEG + 1 }, () => (r() - 0.5) * 2.4),
          jr: Array.from({ length: SEG + 1 }, () => (r() - 0.5) * 2.4),
        });
      }
    }
    // quelques herbes isolées, plus fines
    const strays = Math.round(W / 70);
    for (let s = 0; s < strays; s++) {
      blades.push({
        x: r() * W,
        h: (0.15 + r() * 0.45) * H,
        w: 1.4 + r() * 2.2,
        a: (r() - 0.5) * 0.8,
        b: (r() - 0.5) * 1.4,
        curl: (r() - 0.5) * 1.1,
        phase: r() * 6.28,
        amp: 0.6 + r(),
        color: GREEN_FRONT[Math.floor(r() * GREEN_FRONT.length)],
        edge: null,
        layer: 1,
        belly: 0.7 + r() * 0.6,
        jl: Array.from({ length: SEG + 1 }, () => (r() - 0.5) * 1.6),
        jr: Array.from({ length: SEG + 1 }, () => (r() - 0.5) * 1.6),
      });
    }
    blades.sort((a, b) => a.layer - b.layer);

    flowers = [];
    const nf = W < 600 ? 4 : Math.max(5, Math.round(W / 230));
    for (let i = 0; i < nf; i++) {
      const kind = FLOWERS[Math.floor(r() * FLOWERS.length)];
      const count = kind.petals + (r() < 0.4 ? 1 : 0);
      flowers.push({
        x: ((i + 0.2 + r() * 0.6) / nf) * W,
        h: (0.42 + r() * 0.55) * H,
        phase: r() * 6.28,
        r: 9 + r() * 8,
        rot: r() * 6.28,
        a: (r() - 0.5) * 0.5,
        b: (r() - 0.5) * 0.9,
        leaf: r() < 0.5 ? 1 : -1,
        kind,
        bud: r() < 0.18,
        petals: Array.from({ length: count }, (_, k) => ({
          a: (k / count) * Math.PI * 2 + (r() - 0.5) * 0.5,
          len: 0.7 + r() * 0.6,
          wid: 0.5 + r() * 0.35,
          k1: (r() - 0.5) * 0.5,
          k2: (r() - 0.5) * 0.5,
        })),
      });
    }
  };

  // vent : très subtil, rafales lentes qui traversent l'écran
  const wind = (t: number, x: number) => {
    const gust = 0.5 + 0.5 * Math.sin(t * 0.14 + x * 0.0012);
    return (Math.sin(t * 0.62 + x * 0.005) * 0.6 + Math.sin(t * 1.3 + x * 0.011) * 0.18 + Math.sin(t * 0.3 + x * 0.0017) * 0.3) * gust;
  };

  const push = (x: number) => {
    const fromBottom = window.innerHeight - pointer.y;
    if (fromBottom > H + 50 || fromBottom < -10) return 0;
    const d = x - pointer.x;
    const R = 90;
    if (Math.abs(d) > R) return 0;
    return Math.sign(d || 1) * (1 - Math.abs(d) / R) ** 2 * 0.5;
  };

  const spine = (x: number, h: number, a: number, b: number, curl: number, sway: number, u: number): [number, number] => {
    // courbe douce : la base reste ancrée, le haut part plus loin
    const dx = (a * u * u * 0.55 + b * u ** 3 * 0.42 + curl * u ** 4 * 0.5 + sway * u ** 1.7) * h;
    const dy = h * u * (1 - 0.18 * Math.abs(a * u + b * u * u) * 0.5);
    return [x + dx, H + 2 - dy];
  };

  const drawBlade = (bl: Blade, t: number) => {
    const sway = (wind(t + bl.phase * 0.08, bl.x) * 0.13 + push(bl.x) * 0.55) * bl.amp * (bl.layer ? 1 : 0.7);
    const L: [number, number][] = [];
    const R: [number, number][] = [];
    for (let k = 0; k <= SEG; k++) {
      const u = k / SEG;
      const [px, py] = spine(bl.x, bl.h, bl.a, bl.b, bl.curl, sway, u);
      const [qx, qy] = spine(bl.x, bl.h, bl.a, bl.b, bl.curl, sway, Math.min(1, u + 0.03));
      const [ox, oy] = spine(bl.x, bl.h, bl.a, bl.b, bl.curl, sway, Math.max(0, u - 0.03));
      const l = Math.hypot(qx - ox, qy - oy) || 1;
      const nx = -(qy - oy) / l;
      const ny = (qx - ox) / l;
      // largeur : ventre irrégulier, pointe fine
      const half = (bl.w / 2) * (1 - u) ** 0.8 * (0.82 + 0.3 * Math.sin(u * 5 * bl.belly + bl.phase)) + 0.1;
      L.push([px + nx * (half + bl.jl[k]), py + ny * (half + bl.jl[k])]);
      R.push([px - nx * (half + bl.jr[k]), py - ny * (half + bl.jr[k])]);
    }
    ctx.beginPath();
    ctx.moveTo(L[0][0], L[0][1]);
    for (let k = 1; k <= SEG; k++) ctx.lineTo(L[k][0], L[k][1]);
    for (let k = SEG; k >= 0; k--) ctx.lineTo(R[k][0], R[k][1]);
    ctx.closePath();
    ctx.fillStyle = bl.color;
    ctx.fill();
    if (bl.edge) {
      ctx.strokeStyle = bl.edge;
      ctx.lineWidth = 0.8;
      ctx.lineJoin = 'round';
      ctx.stroke();
    }
  };

  const drawFlower = (f: Flower, t: number) => {
    const sway = wind(t + f.phase * 0.08, f.x) * 0.1 + push(f.x) * 0.4;
    const pts: [number, number][] = [];
    for (let k = 0; k <= 10; k++) pts.push(spine(f.x, f.h, f.a, f.b, 0, sway, k / 10));
    const [tipX, tipY] = pts[10];

    ctx.beginPath();
    pts.forEach(([px, py], k) => (k ? ctx.lineTo(px, py) : ctx.moveTo(px, py)));
    ctx.strokeStyle = '#4f8059';
    ctx.lineWidth = 1.8 + (f.phase % 1);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();

    // feuille irrégulière
    const [lx, ly] = pts[4];
    ctx.beginPath();
    ctx.moveTo(lx, ly);
    ctx.bezierCurveTo(lx + f.leaf * 8, ly - 13 + sway * 6, lx + f.leaf * 20, ly - 10 + sway * 8, lx + f.leaf * 28, ly - 2 + sway * 12);
    ctx.bezierCurveTo(lx + f.leaf * 18, ly + 2, lx + f.leaf * 8, ly + 1, lx, ly);
    ctx.fillStyle = '#6b9d73';
    ctx.fill();

    if (f.bud) {
      // bouton fermé
      ctx.beginPath();
      ctx.ellipse(tipX, tipY - 4, f.r * 0.34, f.r * 0.55, sway, 0, Math.PI * 2);
      ctx.fillStyle = f.kind.petal;
      ctx.fill();
      ctx.strokeStyle = f.kind.edge;
      ctx.lineWidth = 1;
      ctx.stroke();
      return;
    }

    const spin = f.rot + sway * 1.6;
    for (const p of f.petals) {
      const a = spin + p.a;
      const len = f.r * p.len;
      const wid = f.r * p.wid * (0.35 + f.kind.round * 0.6);
      const ca = Math.cos(a);
      const sa = Math.sin(a);
      const mx = tipX + ca * len * 0.55;
      const my = tipY + sa * len * 0.55;
      ctx.beginPath();
      ctx.moveTo(tipX, tipY);
      ctx.quadraticCurveTo(mx - sa * wid * (1 + p.k1), my + ca * wid * (1 + p.k1), tipX + ca * len, tipY + sa * len);
      ctx.quadraticCurveTo(mx + sa * wid * (1 + p.k2), my - ca * wid * (1 + p.k2), tipX, tipY);
      ctx.fillStyle = f.kind.petal;
      ctx.fill();
      ctx.strokeStyle = f.kind.edge;
      ctx.globalAlpha = 0.55;
      ctx.lineWidth = 0.9;
      ctx.stroke();
      ctx.globalAlpha = 1;
    }
    ctx.beginPath();
    ctx.arc(tipX, tipY, f.r * 0.27, 0, Math.PI * 2);
    ctx.fillStyle = f.kind.core;
    ctx.fill();
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
