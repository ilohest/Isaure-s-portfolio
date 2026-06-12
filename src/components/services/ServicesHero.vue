<template>
  <section
    ref="hero"
    class="services-hero"
    aria-labelledby="services-hero-title"
    @pointermove="onHeroPointerMove"
    @pointerleave="onHeroPointerLeave"
  >
    <canvas ref="particleCanvas" class="particle-canvas" aria-hidden="true"></canvas>

    <div class="services-container hero-content">
      <div class="hero-copy">
        <h1 id="services-hero-title" class="services-hero-title">
          Most digital projects fail not because of bad execution, but because the thinking wasn't
          <span>deep enough</span> at the start.
        </h1>
        <p class="hero-support">
          I work at the intersection of strategy and craft: shaping the message, designing the
          experience, then building it with intention and nothing superfluous.
        </p>
      </div>
    </div>
  </section>
</template>

<script>
const POINTER_RADIUS = 230;
const POINTER_STRENGTH = 74;
const PARTICLE_DENSITY = 1 / 2100;
const MAX_PARTICLES = 920;

const getParticleSpill = (width, height) => {
  const responsiveSpill = width < 700 ? height * 0.055 : height * 0.065;
  return Math.round(Math.min(Math.max(responsiveSpill, 44), 72));
};

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export default {
  name: 'ServicesHero',
  props: {
    heroAvifSrcset: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      prefersReducedMotion: false,
    };
  },
  methods: {
    getCanvasContext() {
      const canvas = this.$refs.particleCanvas;
      if (!(canvas instanceof HTMLCanvasElement)) return null;

      return {
        canvas,
        context: canvas.getContext('2d'),
      };
    },
    createParticle(width, height, index) {
      const edgeBias = Math.random();
      let x = Math.random() * width;
      let y = Math.random() * height;

      if (edgeBias < 0.7) {
        const edge = Math.floor(Math.random() * 3);
        const inset = Math.random() ** 2 * Math.min(width, height) * 0.24;

        if (edge === 0) y = inset;
        if (edge === 1) x = width - inset;
        if (edge === 2) x = inset;
      }

      return {
        x,
        y,
        originX: x,
        originY: y,
        vx: 0,
        vy: 0,
        radius: 0.8 + Math.random() * 2.8,
        phase: index * 0.37 + Math.random() * 8,
        drift: 0.75 + Math.random() * 1.85,
      };
    },
    setupParticles() {
      const canvasContext = this.getCanvasContext();
      const hero = this.$refs.hero;
      if (!canvasContext?.context || !(hero instanceof HTMLElement)) return;

      const { canvas } = canvasContext;
      const rect = hero.getBoundingClientRect();
      const width = Math.max(1, Math.round(rect.width));
      const heroHeight = Math.max(1, Math.round(rect.height));
      const spill = getParticleSpill(width, heroHeight);
      const height = heroHeight + spill;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      this.canvasSize = { width, height, heroHeight, spill, pixelRatio };

      const particleCount = Math.min(MAX_PARTICLES, Math.round(width * height * PARTICLE_DENSITY));
      this.particles = Array.from({ length: particleCount }, (_, index) =>
        this.createParticle(width, height, index),
      );

      this.drawParticles(0);
    },
    updatePointerFromClient() {
      if (!this.pointer?.active) return;

      const hero = this.$refs.hero;
      if (!(hero instanceof HTMLElement)) return;

      const rect = hero.getBoundingClientRect();
      this.pointer.x = this.pointer.clientX - rect.left;
      this.pointer.y = this.pointer.clientY - rect.top;
    },
    drawParticles(time) {
      const canvasContext = this.getCanvasContext();
      if (!canvasContext?.context || !this.canvasSize || !this.particles) return;

      const { context } = canvasContext;
      const { width, height, pixelRatio } = this.canvasSize;
      const timeSeconds = time * 0.001;

      this.updatePointerFromClient();

      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      context.clearRect(0, 0, width, height);
      const styles = getComputedStyle(this.$refs.hero);
      context.fillStyle = styles.getPropertyValue('--services-particle-color').trim() || '#302b28';

      this.particles.forEach((particle) => {
        if (!this.prefersReducedMotion) {
          const wobbleX = Math.cos(timeSeconds * particle.drift + particle.phase) * 3.2;
          const wobbleY = Math.sin(timeSeconds * particle.drift * 1.28 + particle.phase) * 3.2;
          let forceX = particle.originX + wobbleX - particle.x;
          let forceY = particle.originY + wobbleY - particle.y;

          if (this.pointer?.active) {
            const dx = particle.x - this.pointer.x;
            const dy = particle.y - this.pointer.y;
            const distance = Math.hypot(dx, dy);

            if (distance < POINTER_RADIUS) {
              const falloff = (1 - distance / POINTER_RADIUS) ** 2;
              const angle = Math.atan2(dy, dx);
              forceX += Math.cos(angle) * POINTER_STRENGTH * falloff;
              forceY += Math.sin(angle) * POINTER_STRENGTH * falloff;
            }
          }

          particle.vx = (particle.vx + forceX * 0.045) * 0.9;
          particle.vy = (particle.vy + forceY * 0.045) * 0.9;
          particle.x = clamp(particle.x + particle.vx, particle.radius, width - particle.radius);
          particle.y = clamp(particle.y + particle.vy, particle.radius, height - particle.radius);
        }

        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fill();
      });
    },
    animateParticles(time = 0) {
      this.drawParticles(time);

      if (!this.prefersReducedMotion) {
        this.animationFrame = window.requestAnimationFrame(this.animateParticles);
      }
    },
    onHeroPointerMove(event) {
      if (window.matchMedia?.('(pointer: coarse)')?.matches) return;

      this.pointer.active = true;
      this.pointer.clientX = event.clientX;
      this.pointer.clientY = event.clientY;
      this.updatePointerFromClient();
    },
    onHeroPointerLeave() {
      if (this.pointer) this.pointer.active = false;
    },
    onResize() {
      window.cancelAnimationFrame(this.resizeFrame);
      this.resizeFrame = window.requestAnimationFrame(() => {
        this.setupParticles();
      });
    },
  },
  mounted() {
    this.pointer = { active: false, x: 0, y: 0, clientX: 0, clientY: 0 };
    this.prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    this.setupParticles();
    this.animateParticles();
    window.addEventListener('resize', this.onResize, { passive: true });
  },
  beforeUnmount() {
    window.cancelAnimationFrame(this.animationFrame);
    window.cancelAnimationFrame(this.resizeFrame);
    window.removeEventListener('resize', this.onResize);
  },
};
</script>

<style scoped>
.services-hero {
  --services-particle-color: var(--text-primary);

  position: relative;
  z-index: 1;
  box-sizing: border-box;
  height: 100vh;
  height: 100svh;
  min-height: 100vh;
  min-height: 100svh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  overflow: visible;
  background: var(--surface-base);
  color: var(--text-primary);
  cursor: crosshair;
}

.particle-canvas {
  position: absolute;
  inset: 0 0 auto;
  width: 100%;
  height: calc(100% + clamp(44px, 6.5vh, 72px));
  z-index: 0;
  pointer-events: none;
}

.services-container {
  box-sizing: border-box;
  width: 100%;
  max-width: none;
  height: 100%;
  margin: 0 auto;
  padding: clamp(82px, 13vh, 136px) clamp(18px, 4.5vw, 86px) clamp(96px, 12vh, 136px);
}

.hero-content {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: flex-start;
}

.hero-copy {
  width: min(100%, 1680px);
  margin: 0 auto;
}

.services-hero-title {
  width: min(85vw, 1580px);
  margin: 0;
  text-indent: clamp(4.8rem, 26vw, 31rem);
  font-family: 'Red Hat Display', var(--font-family-body);
  font-size: clamp(2.9rem, 4.8vw, 7rem);
  font-weight: 400;
  line-height: 1.04;
  letter-spacing: 0;
  text-align: left;
  color: var(--text-primary);
}

.services-hero-title span {
  color: var(--interactive-primary);
}

.hero-support {
  width: min(71vw, 1220px);
  margin: clamp(1.6rem, 3.2vw, 3.4rem) 0 0;
  text-indent: clamp(9rem, 26vw, 31rem);
  font-family: 'Red Hat Display', var(--font-family-body);
  font-weight: 400;
  font-size: clamp(1.25rem, 2.05vw, 2.8rem);
  line-height: 1.15;
  color: var(--text-primary);
  text-align: left;
}

@media (max-width: 900px) {
  .services-hero-title {
    width: 92vw;
    text-indent: clamp(3rem, 18vw, 8rem);
    font-size: clamp(2.45rem, 8.8vw, 4.8rem);
  }

  .hero-support {
    width: 86vw;
    text-indent: clamp(3rem, 18vw, 8rem);
    font-size: clamp(1.15rem, 4.1vw, 2rem);
  }
}

@media (max-width: 640px) {
  .services-hero {
    align-items: flex-start;
  }

  .services-container {
    padding: 82px 18px 112px;
  }

  .services-hero-title {
    width: 100%;
    text-indent: 16vw;
    font-size: clamp(2rem, 9vw, 3.4rem);
  }

  .hero-support {
    width: 100%;
    margin-top: 1.8rem;
    text-indent: 16vw;
    font-size: clamp(1rem, 4.45vw, 1.45rem);
  }
}

@media (prefers-reduced-motion: reduce) {
  .services-hero {
    cursor: default;
  }
}
</style>
