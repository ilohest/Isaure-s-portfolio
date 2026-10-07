/** Fond de particules discret : points colorés qui dérivent et s'écartent du pointeur. */
interface P {
  ox: number;
  oy: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  phase: number;
  drift: number;
  color: string;
}

export const initParticles = (canvas: HTMLCanvasElement) => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const css = getComputedStyle(document.documentElement);
  const palette = ['--red', '--blue', '--green', '--yellow', '--pink', '--ink'].map(
    (v) => css.getPropertyValue(v).trim() || '#222',
  );

  let w = 0;
  let h = 0;
  let dpr = 1;
  let ps: P[] = [];
  const pointer = { x: -9999, y: -9999 };
  const RADIUS = 130;

  const build = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    const count = Math.min(650, Math.round((w * h) / 2600));
    ps = Array.from({ length: count }, (_, i) => {
      const ox = Math.random() * w;
      const oy = Math.random() * h;
      return {
        ox,
        oy,
        x: ox,
        y: oy,
        vx: 0,
        vy: 0,
        r: 0.8 + Math.random() * 1.7,
        phase: Math.random() * Math.PI * 2,
        drift: 0.4 + Math.random() * 0.9,
        // surtout de l'encre, quelques touches de couleur
        color: i % 6 === 0 ? palette[i % 5] : palette[5],
      };
    });
  };

  const frame = (ms: number) => {
    const t = ms / 1000;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    for (const p of ps) {
      if (!reduce) {
        let fx = p.ox + Math.cos(t * p.drift + p.phase) * 4 - p.x;
        let fy = p.oy + Math.sin(t * p.drift * 1.25 + p.phase) * 4 - p.y;
        const dx = p.x - pointer.x;
        const dy = p.y - pointer.y;
        const d = Math.hypot(dx, dy);
        if (d < RADIUS && d > 0.01) {
          const f = (1 - d / RADIUS) ** 2 * 26;
          fx += (dx / d) * f;
          fy += (dy / d) * f;
        }
        p.vx = (p.vx + fx * 0.045) * 0.9;
        p.vy = (p.vy + fy * 0.045) * 0.9;
        p.x += p.vx;
        p.y += p.vy;
      }
      ctx.globalAlpha = p.color === palette[5] ? 0.28 : 0.75;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
    if (!reduce) raf = requestAnimationFrame(frame);
  };

  let raf = 0;
  build();
  raf = requestAnimationFrame(frame);
  window.addEventListener('resize', build);
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
};
