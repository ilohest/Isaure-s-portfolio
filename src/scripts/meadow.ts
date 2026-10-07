/**
 * Prairie au bas de l'écran : herbes et fleurs dessinées en aplats, qui ondulent avec le vent
 * et se couchent doucement sous la souris. Le contenu de la page passe derrière.
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

  interface Blade {
    x: number;
    h: number;
    w: number;
    lean: number;
    phase: number;
    color: string;
    layer: number;
  }
  interface Flower {
    x: number;
    h: number;
    phase: number;
    r: number;
    petal: string;
    core: string;
    petals: number;
    rot: number;
  }

  const GREENS_BACK = ['#8db892', '#82ad89', '#98c09b', '#7da683'];
  const GREENS_FRONT = ['#5f8f68', '#4f8059', '#6b9d73', '#477650', '#5a8a62'];
  const FLOWERS: { petal: string; core: string; petals: number }[] = [
    { petal: '#fffdf7', core: '#f2b826', petals: 8 },
    { petal: '#f3b3cf', core: '#f2b826', petals: 6 },
    { petal: '#4a8ee2', core: '#25417f', petals: 7 },
    { petal: '#f2b826', core: '#c9861a', petals: 6 },
    { petal: '#ef7a63', core: '#2b2a28', petals: 5 },
  ];

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
    const n = Math.max(110, Math.round(W / 5.2));
    for (let i = 0; i < n; i++) {
      const layer = r() < 0.45 ? 0 : 1;
      blades.push({
        x: (i / n) * (W + 40) - 20 + (r() - 0.5) * 10,
        h: (layer === 0 ? 0.28 + r() * 0.3 : 0.4 + r() * 0.5) * H,
        w: 3 + r() * 4.5,
        lean: (r() - 0.5) * 0.35,
        phase: r() * 6.28,
        color: (layer === 0 ? GREENS_BACK : GREENS_FRONT)[Math.floor(r() * (layer === 0 ? 4 : 5))],
        layer,
      });
    }
    blades.sort((a, b) => a.layer - b.layer);
    flowers = [];
    const nf = W < 600 ? 5 : Math.round(W / 130);
    for (let i = 0; i < nf; i++) {
      const kind = FLOWERS[Math.floor(r() * FLOWERS.length)];
      flowers.push({
        x: ((i + 0.3 + r() * 0.5) / nf) * W,
        h: (0.62 + r() * 0.34) * H,
        phase: r() * 6.28,
        r: 8 + r() * 6,
        rot: r() * 6.28,
        ...kind,
      });
    }
  };

  // vent : rafales qui voyagent le long de l'écran
  const wind = (t: number, x: number) => {
    const gust = 0.55 + 0.45 * Math.sin(t * 0.23 + x * 0.0016);
    return (Math.sin(t * 1.1 + x * 0.006) * 0.62 + Math.sin(t * 2.3 + x * 0.013) * 0.24 + Math.sin(t * 0.5 + x * 0.002) * 0.3) * gust;
  };

  const push = (x: number) => {
    // la souris couche les herbes qui l'entourent (l'herbe est collée au bas de l'écran)
    const fromBottom = window.innerHeight - pointer.y;
    if (fromBottom > H + 50 || fromBottom < -10) return 0;
    const d = x - pointer.x;
    const R = 95;
    if (Math.abs(d) > R) return 0;
    return Math.sign(d || 1) * (1 - Math.abs(d) / R) ** 2 * 0.85;
  };

  const frame = (ms: number) => {
    const t = reduce ? 0 : ms / 1000;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);

    for (const b of blades) {
      const bend = b.lean + wind(t + b.phase * 0.05, b.x) * (b.layer ? 0.55 : 0.4) + push(b.x);
      const tipX = b.x + Math.sin(bend) * b.h;
      const tipY = H - Math.cos(bend) * b.h;
      const cpX = b.x + Math.sin(bend * 0.35) * b.h * 0.55;
      const cpY = H - b.h * 0.56;
      ctx.beginPath();
      ctx.moveTo(b.x - b.w / 2, H + 2);
      ctx.quadraticCurveTo(cpX - b.w * 0.32, cpY, tipX, tipY);
      ctx.quadraticCurveTo(cpX + b.w * 0.32, cpY, b.x + b.w / 2, H + 2);
      ctx.closePath();
      ctx.fillStyle = b.color;
      ctx.fill();
    }

    for (const f of flowers) {
      const bend = wind(t + f.phase * 0.05, f.x) * 0.38 + push(f.x) * 0.8;
      const tipX = f.x + Math.sin(bend) * f.h;
      const tipY = H - Math.cos(bend) * f.h;
      const cpX = f.x + Math.sin(bend * 0.3) * f.h * 0.5;
      const cpY = H - f.h * 0.5;
      ctx.beginPath();
      ctx.moveTo(f.x, H + 2);
      ctx.quadraticCurveTo(cpX, cpY, tipX, tipY);
      ctx.strokeStyle = '#4f8059';
      ctx.lineWidth = 2.1;
      ctx.lineCap = 'round';
      ctx.stroke();
      // petite feuille
      const lx = cpX;
      const ly = cpY;
      ctx.beginPath();
      ctx.ellipse(lx + 7, ly + 2, 8, 2.6, -0.5 + bend, 0, Math.PI * 2);
      ctx.fillStyle = '#5f8f68';
      ctx.fill();
      // tête de fleur
      const spin = f.rot + bend * 1.4 + Math.sin(t * 0.8 + f.phase) * 0.08;
      for (let k = 0; k < f.petals; k++) {
        const a = spin + (k / f.petals) * Math.PI * 2;
        ctx.beginPath();
        ctx.ellipse(tipX + Math.cos(a) * f.r * 0.62, tipY + Math.sin(a) * f.r * 0.62, f.r * 0.62, f.r * 0.3, a, 0, Math.PI * 2);
        ctx.fillStyle = f.petal;
        ctx.fill();
      }
      ctx.beginPath();
      ctx.arc(tipX, tipY, f.r * 0.3, 0, Math.PI * 2);
      ctx.fillStyle = f.core;
      ctx.fill();
    }

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
