/**
 * Particules discrètes : points colorés qui dérivent et s'écartent du pointeur.
 * Elles remplissent le parent du canvas et ne tournent que lorsqu'il est à l'écran.
 */
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
  // bleus de la rivière + un peu d'encre
  const palette = ['#3f80df', '#8fb5f0', '#a9cbf7', '#4f95e7', '#1f2a52'];

  let w = 0;
  let h = 0;
  let dpr = 1;
  let ps: P[] = [];
  const pointer = { x: -9999, y: -9999 };
  const RADIUS = 130;

  const build = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    const box = canvas.parentElement ?? document.body;
    w = box.clientWidth;
    h = box.clientHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    const count = Math.min(650, Math.round((w * h) / 3600));
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
        color: palette[i % 4 === 3 ? 4 : i % 3],
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
      ctx.globalAlpha = p.color === palette[4] ? 0.3 : 0.7;
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
  if (canvas.parentElement && 'ResizeObserver' in window) {
    new ResizeObserver(build).observe(canvas.parentElement);
  } else window.addEventListener('resize', build);
  window.addEventListener('pointermove', (e) => {
    const rect = canvas.getBoundingClientRect();
    pointer.x = e.clientX - rect.left;
    pointer.y = e.clientY - rect.top;
  });
  window.addEventListener('pointerleave', () => {
    pointer.x = pointer.y = -9999;
  });

  let onScreen = true;
  const sync = () => {
    cancelAnimationFrame(raf);
    if (!document.hidden && onScreen && !reduce) raf = requestAnimationFrame(frame);
  };
  document.addEventListener('visibilitychange', sync);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver((entries) => {
      onScreen = entries.some((e) => e.isIntersecting);
      sync();
    }).observe(canvas);
  }
};
