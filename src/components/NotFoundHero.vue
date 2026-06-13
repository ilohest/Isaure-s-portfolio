<template>
  <section
    ref="hero"
    class="not-found-hero"
    aria-labelledby="not-found-title"
    @pointermove="onPointerMove"
    @pointerleave="onPointerLeave"
  >
    <canvas ref="particleCanvas" class="particle-canvas" aria-hidden="true"></canvas>

    <div class="not-found-content">
      <p class="not-found-eyebrow">Error 404</p>
      <h1 id="not-found-title" class="not-found-title">Lost in space</h1>
      <p class="not-found-copy">
        Somewhere between your click and this server, this page crossed the event horizon and got
        spaghettified into stardust. The rest of the site survived the trip just fine — promise.
      </p>
      <div class="not-found-actions">
        <a class="p-button p-button-icon-right font-display" href="/">
          <span class="p-button-label">Back to home</span>
          <span class="p-button-icon pi-arrow-right" aria-hidden="true"></span>
        </a>
        <a class="p-button p-button-outlined p-button-icon-right font-display" href="/work">
          <span class="p-button-label">See what made it out alive</span>
          <span class="p-button-icon pi-arrow-right" aria-hidden="true"></span>
        </a>
      </div>
    </div>
  </section>
</template>

<script>
const STAR_DENSITY = 1 / 2600;
const MAX_STARS = 620;
const GRAVITY_RADIUS = 120;
const GRAVITY_STRENGTH = 0.42;
const SWIRL_STRENGTH = 1.35;
const EVENT_HORIZON = 12;
const DRAG = 0.94;
const RETURN_EASE = 0.045;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export default {
  name: 'NotFoundHero',
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
    createStar(width, height, index) {
      const x = Math.random() * width;
      const y = Math.random() * height;

      return {
        x,
        y,
        originX: x,
        originY: y,
        vx: 0,
        vy: 0,
        radius: 0.6 + Math.random() * 1.9,
        twinklePhase: index * 0.53 + Math.random() * 6.28,
        twinkleSpeed: 0.4 + Math.random() * 1.3,
      };
    },
    respawnStar(star, width, height) {
      const x = Math.random() * width;
      const y = Math.random() * height;

      star.x = x;
      star.y = y;
      star.originX = x;
      star.originY = y;
      star.vx = 0;
      star.vy = 0;
      star.radius = 0.6 + Math.random() * 1.9;
    },
    setupStars() {
      const canvasContext = this.getCanvasContext();
      const hero = this.$refs.hero;
      if (!canvasContext?.context || !(hero instanceof HTMLElement)) return;

      const { canvas } = canvasContext;
      const rect = hero.getBoundingClientRect();
      const width = Math.max(1, Math.round(rect.width));
      const height = Math.max(1, Math.round(rect.height));
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      this.canvasSize = { width, height, pixelRatio };

      const starCount = Math.min(MAX_STARS, Math.round(width * height * STAR_DENSITY));
      this.stars = Array.from({ length: starCount }, (_, index) => this.createStar(width, height, index));

      this.drawStars(0);
    },
    updatePointerFromClient() {
      if (!this.pointer?.active) return;

      const hero = this.$refs.hero;
      if (!(hero instanceof HTMLElement)) return;

      const rect = hero.getBoundingClientRect();
      this.pointer.x = this.pointer.clientX - rect.left;
      this.pointer.y = this.pointer.clientY - rect.top;
    },
    drawStars(time) {
      const canvasContext = this.getCanvasContext();
      if (!canvasContext?.context || !this.canvasSize || !this.stars) return;

      const { context } = canvasContext;
      const { width, height, pixelRatio } = this.canvasSize;
      const timeSeconds = time * 0.001;

      this.updatePointerFromClient();

      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      context.clearRect(0, 0, width, height);

      const styles = getComputedStyle(this.$refs.hero);
      const starColor = styles.getPropertyValue('--not-found-star-color').trim() || '#302b28';
      const pointer = this.pointer;

      this.stars.forEach((star) => {
        const twinkle = this.prefersReducedMotion
          ? 0.75
          : 0.55 + Math.sin(timeSeconds * star.twinkleSpeed + star.twinklePhase) * 0.45;

        let stretchX = 0;
        let stretchY = 0;

        if (!this.prefersReducedMotion && pointer?.active) {
          const dx = pointer.x - star.x;
          const dy = pointer.y - star.y;
          const distance = Math.hypot(dx, dy);

          if (distance < EVENT_HORIZON) {
            this.respawnStar(star, width, height);
          } else if (distance < GRAVITY_RADIUS) {
            const falloff = 1 - distance / GRAVITY_RADIUS;
            const angle = Math.atan2(dy, dx);
            const pull = falloff * falloff * GRAVITY_STRENGTH * distance;
            const swirl = falloff * SWIRL_STRENGTH;

            star.vx += Math.cos(angle) * pull - Math.sin(angle) * swirl;
            star.vy += Math.sin(angle) * pull + Math.cos(angle) * swirl;
            star.vx *= DRAG;
            star.vy *= DRAG;
            star.x += star.vx;
            star.y += star.vy;

            stretchX = star.vx;
            stretchY = star.vy;
          } else {
            star.vx *= DRAG;
            star.vy *= DRAG;
            star.x += (star.originX - star.x) * RETURN_EASE + star.vx;
            star.y += (star.originY - star.y) * RETURN_EASE + star.vy;
          }
        } else if (!this.prefersReducedMotion) {
          star.vx *= DRAG;
          star.vy *= DRAG;
          star.x += (star.originX - star.x) * RETURN_EASE + star.vx;
          star.y += (star.originY - star.y) * RETURN_EASE + star.vy;
        }

        star.x = clamp(star.x, 0, width);
        star.y = clamp(star.y, 0, height);

        const speed = Math.hypot(stretchX, stretchY);
        context.fillStyle = starColor;
        context.globalAlpha = clamp(twinkle, 0.1, 1);

        if (speed > 1.2) {
          const length = clamp(speed * 1.4, star.radius, 26);
          const angle = Math.atan2(stretchY, stretchX);

          context.save();
          context.translate(star.x, star.y);
          context.rotate(angle);
          context.beginPath();
          context.ellipse(0, 0, length, star.radius * 0.6, 0, 0, Math.PI * 2);
          context.fill();
          context.restore();
        } else {
          context.beginPath();
          context.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
          context.fill();
        }
      });

      context.globalAlpha = 1;
    },
    animate(time = 0) {
      this.drawStars(time);

      if (!this.prefersReducedMotion || this.pointer?.active) {
        this.animationFrame = window.requestAnimationFrame(this.animate);
      }
    },
    onPointerMove(event) {
      if (window.matchMedia?.('(pointer: coarse)')?.matches) return;

      const wasActive = this.pointer?.active;
      this.pointer.active = true;
      this.pointer.clientX = event.clientX;
      this.pointer.clientY = event.clientY;
      this.updatePointerFromClient();

      if (!wasActive) this.animate();
    },
    onPointerLeave() {
      if (this.pointer) this.pointer.active = false;
    },
    onResize() {
      window.cancelAnimationFrame(this.resizeFrame);
      this.resizeFrame = window.requestAnimationFrame(() => {
        this.setupStars();
      });
    },
  },
  mounted() {
    this.pointer = { active: false, x: 0, y: 0, clientX: 0, clientY: 0 };
    this.prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    this.setupStars();
    this.animate();
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
.not-found-hero {
  --not-found-star-color: var(--text-primary);

  position: relative;
  z-index: 1;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  min-height: 100svh;
  overflow: hidden;
  background: var(--surface-base);
  color: var(--text-primary);
  text-align: center;
  cursor: crosshair;
}

.particle-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}

.not-found-content {
  position: relative;
  z-index: 1;
  display: grid;
  gap: clamp(0.85rem, 1.6vw, 1.25rem);
  justify-items: center;
  max-width: 38rem;
  padding: clamp(5rem, 8vw, 7rem) clamp(1rem, 4vw, 2.5rem) clamp(2.5rem, 5vw, 4rem);
}

.not-found-eyebrow {
  margin: 0;
  font-family: var(--font-family-display);
  font-size: clamp(0.78rem, 0.9vw, 0.9rem);
  line-height: 1.35;
  letter-spacing: 0;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--text-primary) 58%, transparent);
}

.not-found-title {
  margin: 0;
  font-family: var(--font-family-display);
  font-size: clamp(3rem, 10vw, 7.5rem);
  font-weight: 400;
  line-height: 0.88;
  letter-spacing: 0;
  text-transform: uppercase;
}

.not-found-copy {
  margin: 0;
  font-size: clamp(1rem, 1.25vw, 1.14rem);
  font-weight: 400;
  line-height: 1.55;
  color: color-mix(in srgb, var(--text-primary) 66%, transparent);
}

.not-found-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: clamp(0.6rem, 1.2vw, 1rem);
  margin-top: clamp(0.5rem, 1.4vw, 1rem);
}

.not-found-actions .p-button {
  font-size: clamp(0.85rem, 1vw, 0.95rem);
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  text-decoration: none;
}

@media (min-width: 640px) {
  .not-found-actions {
    flex-wrap: nowrap;
  }
}

@media (prefers-reduced-motion: reduce) {
  .not-found-hero {
    cursor: default;
  }
}
</style>
