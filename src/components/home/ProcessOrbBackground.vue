<template>
  <canvas ref="canvas" class="process-orb-background" aria-hidden="true"></canvas>
</template>

<script>
const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const seededRandom = (seed) => {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
};

const parseColor = (value) => {
  const color = value.trim();
  const hex = color.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);

  if (hex) {
    const raw = hex[1].length === 3
      ? hex[1].split('').map((char) => char + char).join('')
      : hex[1];

    return [
      Number.parseInt(raw.slice(0, 2), 16),
      Number.parseInt(raw.slice(2, 4), 16),
      Number.parseInt(raw.slice(4, 6), 16),
    ];
  }

  const rgb = color.match(/rgba?\(([^)]+)\)/i);
  if (rgb) {
    return rgb[1]
      .replace(/\s*\/.*$/, '')
      .split(/[,\s]+/)
      .filter(Boolean)
      .slice(0, 3)
      .map((part) => clamp(Number.parseFloat(part), 0, 255));
  }

  return [76, 94, 247];
};

const rgba = ([r, g, b], alpha) => `rgba(${r}, ${g}, ${b}, ${alpha})`;

export default {
  name: 'ProcessOrbBackground',
  data() {
    return {
      prefersReducedMotion: false,
    };
  },
  mounted() {
    this.mouse = { active: false, x: 0, y: 0 };
    this.orbs = [];
    this.frameId = 0;
    this.resizeObserver = null;
    this.prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;

    this.resizeCanvas();

    const canvas = this.$refs.canvas;
    if (canvas instanceof HTMLCanvasElement && 'ResizeObserver' in window) {
      this.resizeObserver = new ResizeObserver(this.resizeCanvas);
      this.resizeObserver.observe(canvas);
    }

    window.addEventListener('pointermove', this.handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', this.handlePointerLeave, { passive: true });

    if (!this.prefersReducedMotion) {
      this.frameId = window.requestAnimationFrame(this.draw);
    }
  },
  beforeUnmount() {
    window.cancelAnimationFrame(this.frameId);
    this.resizeObserver?.disconnect();
    window.removeEventListener('pointermove', this.handlePointerMove);
    window.removeEventListener('pointerleave', this.handlePointerLeave);
  },
  methods: {
    getPaletteColor() {
      const styles = getComputedStyle(this.$el);
      return parseColor(styles.getPropertyValue('--interactive-primary') || '#4c5ef7');
    },
    createOrbs() {
      const width = this.width || 1;
      const height = this.height || 1;
      const orbCount = width < 760 ? 18 : 30;
      const color = this.getPaletteColor();

      this.orbs = Array.from({ length: orbCount }, (_, index) => {
        const xSeed = seededRandom(index + 1);
        const ySeed = seededRandom(index + 18);
        const baseX = (xSeed * 1.18 - 0.09) * width;
        const baseY = (0.1 + ySeed * 0.86) * height;
        const radiusBase = width < 760
          ? clamp(70 + seededRandom(index + 34) * 110, 60, 160)
          : clamp(150 + seededRandom(index + 34) * 260, 130, 420);

        return {
          baseX,
          baseY,
          x: baseX,
          y: baseY,
          vx: 0,
          vy: 0,
          radiusBase,
          currentRadius: radiusBase,
          color,
          phase: seededRandom(index + 51) * Math.PI * 2,
          speed: 0.00038 + seededRandom(index + 68) * 0.0009,
          amplitudeX: 72 + seededRandom(index + 85) * 130,
          amplitudeY: 70 + seededRandom(index + 102) * 125,
        };
      });
    },
    resizeCanvas() {
      const canvas = this.$refs.canvas;
      if (!(canvas instanceof HTMLCanvasElement)) return;

      const bounds = canvas.getBoundingClientRect();
      this.width = Math.max(1, bounds.width);
      this.height = Math.max(1, bounds.height);
      this.pixelRatio = Math.min(window.devicePixelRatio || 1, 1.35);

      canvas.width = Math.round(this.width * this.pixelRatio);
      canvas.height = Math.round(this.height * this.pixelRatio);

      this.context = canvas.getContext('2d', { alpha: true });
      if (!this.context) return;

      this.context.setTransform(this.pixelRatio, 0, 0, this.pixelRatio, 0, 0);
      this.context.imageSmoothingEnabled = true;
      this.context.imageSmoothingQuality = 'high';

      this.createOrbs();
      this.draw(performance.now());
    },
    updateOrb(orb, time) {
      const idleX = orb.baseX + Math.sin(time * orb.speed + orb.phase) * orb.amplitudeX;
      const idleY = orb.baseY + Math.cos(time * orb.speed * 0.8 + orb.phase) * orb.amplitudeY;
      let targetX = idleX;
      let targetY = idleY;

      if (this.mouse?.active) {
        const dx = orb.x - this.mouse.x;
        const dy = orb.y - this.mouse.y;
        const distance = Math.hypot(dx, dy) || 1;
        const influenceRadius = 390;

        if (distance < influenceRadius) {
          const force = (influenceRadius - distance) / influenceRadius;
          const angle = Math.atan2(dy, dx);
          orb.vx += Math.cos(angle) * force * 2.6;
          orb.vy += Math.sin(angle) * force * 2.6;
          orb.currentRadius += (orb.radiusBase * 0.72 - orb.currentRadius) * 0.1;
        } else {
          orb.currentRadius += (orb.radiusBase - orb.currentRadius) * 0.05;
        }
      } else {
        orb.currentRadius += (orb.radiusBase - orb.currentRadius) * 0.05;
      }

      const tension = 0.014;
      const friction = 0.9;
      orb.vx = (orb.vx + (targetX - orb.x) * tension) * friction;
      orb.vy = (orb.vy + (targetY - orb.y) * tension) * friction;
      orb.x += orb.vx;
      orb.y += orb.vy;
    },
    drawOrb(orb) {
      if (!this.context) return;

      const gradient = this.context.createRadialGradient(
        orb.x,
        orb.y,
        0,
        orb.x,
        orb.y,
        orb.currentRadius,
      );

      gradient.addColorStop(0, rgba(orb.color, 0.58));
      gradient.addColorStop(0.35, rgba(orb.color, 0.34));
      gradient.addColorStop(0.72, rgba(orb.color, 0.13));
      gradient.addColorStop(1, rgba(orb.color, 0));

      this.context.fillStyle = gradient;
      this.context.beginPath();
      this.context.arc(orb.x, orb.y, orb.currentRadius, 0, Math.PI * 2);
      this.context.fill();
    },
    draw(time = 0) {
      if (!this.context) return;

      this.context.clearRect(0, 0, this.width, this.height);
      this.context.globalCompositeOperation = 'multiply';

      this.orbs.forEach((orb) => {
        if (!this.prefersReducedMotion) this.updateOrb(orb, time);
        this.drawOrb(orb);
      });

      this.context.globalCompositeOperation = 'source-over';

      if (!this.prefersReducedMotion) {
        this.frameId = window.requestAnimationFrame(this.draw);
      }
    },
    handlePointerMove(event) {
      const canvas = this.$refs.canvas;
      if (!(canvas instanceof HTMLCanvasElement)) return;

      const bounds = canvas.getBoundingClientRect();
      this.mouse.active =
        event.clientX >= bounds.left &&
        event.clientX <= bounds.right &&
        event.clientY >= bounds.top &&
        event.clientY <= bounds.bottom;
      this.mouse.x = event.clientX - bounds.left;
      this.mouse.y = event.clientY - bounds.top;
    },
    handlePointerLeave() {
      if (this.mouse) this.mouse.active = false;
    },
  },
};
</script>

<style scoped>
.process-orb-background {
  position: absolute;
  inset: -16% -8%;
  z-index: 0;
  width: 116%;
  height: 132%;
  filter: blur(52px) saturate(1.08);
  pointer-events: none;
  transform: translateZ(0);
}
</style>
