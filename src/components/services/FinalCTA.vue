<template>
  <section class="final-cta" aria-labelledby="final-cta-title">
    <div class="final-cta-inner">
      <h2
        id="final-cta-title"
        class="final-cta-title"
        @pointermove="handleHeartPointer"
        @pointerenter="handleHeartPointer"
      >
        Let&apos;s build something intentional.
      </h2>
      <div class="final-cta-actions">
        <figure
          class="final-cta-visual"
          aria-hidden="true"
          @pointermove="handleHeartPointer"
          @pointerenter="handleHeartPointer"
        >
          <img
            src="/assets/media/pages/services/final-cta-pixel-heart.avif"
            alt=""
            loading="lazy"
            decoding="async"
          />
        </figure>

        <div class="final-cta-content">
          <p class="final-cta-copy">
            Tell me where you are headed, and we will shape the right next step.
          </p>
          <a class="portfolio-pill-link final-cta-link" href="/contact"> Start a conversation </a>
        </div>
      </div>
    </div>
    <span class="heart-layer" aria-hidden="true">
      <span
        v-for="heart in hearts"
        :key="heart.id"
        class="pixel-heart"
        :style="{
          left: `${heart.x}px`,
          top: `${heart.y}px`,
          '--heart-dx': `${heart.dx}px`,
          '--heart-dy': `${heart.dy}px`,
          '--heart-rot': `${heart.rotate}deg`,
          '--heart-scale': heart.scale,
        }"
      ></span>
    </span>
  </section>
</template>

<script>
export default {
  name: 'FinalCTA',
  data() {
    return {
      hearts: [],
      heartId: 0,
      lastHeartAt: 0,
      reducedMotion: false,
      heartTimers: [],
    };
  },
  mounted() {
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },
  beforeUnmount() {
    this.heartTimers.forEach((timer) => window.clearTimeout(timer));
  },
  methods: {
    handleHeartPointer(event) {
      if (this.reducedMotion) return;

      const now = performance.now();
      if (now - this.lastHeartAt < 58) return;
      this.lastHeartAt = now;

      const rect = this.$el.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      for (let i = 0; i < 4; i += 1) {
        this.emitHeart(x, y);
      }
    },
    emitHeart(x, y) {
      const id = this.heartId;
      this.heartId += 1;

      const heart = {
        id,
        x: x + (Math.random() - 0.5) * 18,
        y: y + (Math.random() - 0.5) * 14,
        dx: (Math.random() - 0.5) * 66,
        dy: -56 - Math.random() * 72,
        rotate: -24 + Math.random() * 48,
        scale: (0.76 + Math.random() * 0.58).toFixed(2),
      };

      this.hearts.push(heart);
      if (this.hearts.length > 52) {
        this.hearts.splice(0, this.hearts.length - 52);
      }

      const timer = window.setTimeout(() => {
        this.hearts = this.hearts.filter((item) => item.id !== id);
        this.heartTimers = this.heartTimers.filter((item) => item !== timer);
      }, 1500);
      this.heartTimers.push(timer);
    },
  },
};
</script>

<style scoped>
.final-cta {
  position: relative;
  padding: clamp(48px, 6vw, 84px) 0 clamp(36px, 5vw, 68px);
  background: var(--surface-base);
}

.final-cta-inner {
  position: relative;
  z-index: 1;
  align-items: end;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(300px, 32vw);
  gap: clamp(2.5rem, 8vw, 8.5rem);
  margin-inline: auto;
  width: min(100%, 1680px);
  padding: 0 clamp(18px, 4.5vw, 86px);
}

.final-cta-title {
  max-width: 10ch;
  margin: 0;
  font-family: var(--font-family-display);
  font-size: clamp(4.2rem, 8vw, 9.6rem);
  font-weight: 400;
  line-height: 0.96;
  letter-spacing: 0;
  text-transform: uppercase;
  cursor: crosshair;
}

.final-cta-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  justify-self: end;
  min-height: clamp(25rem, 31vw, 38rem);
  width: min(100%, 470px);
  text-align: right;
}

.final-cta-visual {
  position: relative;
  width: min(100%, clamp(13.5rem, 15.5vw, 18rem));
  margin: 0 0 clamp(2.5rem, 4vw, 4.8rem);
  overflow: visible;
  cursor: crosshair;
  isolation: isolate;
}

.final-cta-visual img {
  display: block;
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
}

.heart-layer {
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  overflow: visible;
}

.pixel-heart {
  --heart-dx: 0px;
  --heart-dy: -90px;
  --heart-rot: 0deg;
  --heart-scale: 1;
  --heart-pixel: 4px;
  position: absolute;
  width: calc(var(--heart-pixel) * 7);
  height: calc(var(--heart-pixel) * 6);
  transform: translate(-50%, -50%) scale(var(--heart-scale));
  animation: pixel-heart-fly 1500ms cubic-bezier(0.16, 0.72, 0.24, 1) forwards;
  image-rendering: pixelated;
}

.pixel-heart::before {
  content: '';
  position: absolute;
  left: var(--heart-pixel);
  top: 0;
  width: var(--heart-pixel);
  height: var(--heart-pixel);
  background: #ff78b6;
  box-shadow:
    calc(var(--heart-pixel) * 1) 0 #ff78b6,
    calc(var(--heart-pixel) * 3) 0 #ff78b6,
    calc(var(--heart-pixel) * 4) 0 #ff78b6,
    calc(var(--heart-pixel) * -1) var(--heart-pixel) #ff78b6,
    0 var(--heart-pixel) #ff9acb,
    var(--heart-pixel) var(--heart-pixel) #ff9acb,
    calc(var(--heart-pixel) * 2) var(--heart-pixel) #ff78b6,
    calc(var(--heart-pixel) * 3) var(--heart-pixel) #ff9acb,
    calc(var(--heart-pixel) * 4) var(--heart-pixel) #ff78b6,
    calc(var(--heart-pixel) * 5) var(--heart-pixel) #ff5fa8,
    calc(var(--heart-pixel) * -1) calc(var(--heart-pixel) * 2) #ff5fa8,
    0 calc(var(--heart-pixel) * 2) #ff78b6,
    var(--heart-pixel) calc(var(--heart-pixel) * 2) #ffc0dc,
    calc(var(--heart-pixel) * 2) calc(var(--heart-pixel) * 2) #ff9acb,
    calc(var(--heart-pixel) * 3) calc(var(--heart-pixel) * 2) #ff78b6,
    calc(var(--heart-pixel) * 4) calc(var(--heart-pixel) * 2) #ff5fa8,
    calc(var(--heart-pixel) * 5) calc(var(--heart-pixel) * 2) #f24d99,
    0 calc(var(--heart-pixel) * 3) #ff5fa8,
    var(--heart-pixel) calc(var(--heart-pixel) * 3) #ff78b6,
    calc(var(--heart-pixel) * 2) calc(var(--heart-pixel) * 3) #ff78b6,
    calc(var(--heart-pixel) * 3) calc(var(--heart-pixel) * 3) #ff5fa8,
    calc(var(--heart-pixel) * 4) calc(var(--heart-pixel) * 3) #e93e8f,
    var(--heart-pixel) calc(var(--heart-pixel) * 4) #ff5fa8,
    calc(var(--heart-pixel) * 2) calc(var(--heart-pixel) * 4) #ff5fa8,
    calc(var(--heart-pixel) * 3) calc(var(--heart-pixel) * 4) #e93e8f,
    calc(var(--heart-pixel) * 2) calc(var(--heart-pixel) * 5) #d93683;
}

.final-cta-content {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.final-cta-copy {
  max-width: 34ch;
  margin: 0;
  font-family: 'Red Hat Display', var(--font-family-body);
  font-size: clamp(1.08rem, 1.2vw, 1.35rem);
  font-weight: 400;
  line-height: 1.35;
}

.final-cta-link {
  margin-top: clamp(1.8rem, 2.6vw, 2.35rem);
}

@media (max-width: 640px) {
  .final-cta {
    margin-top: clamp(52px, 14vw, 76px);
    padding: clamp(64px, 17vw, 96px) 0 clamp(64px, 17vw, 92px);
  }

  .final-cta-inner {
    grid-template-columns: minmax(0, 1fr);
    gap: clamp(2.5rem, 11vw, 4.5rem);
    padding-inline: 18px;
  }

  .final-cta-title {
    max-width: calc(100vw - 36px);
    font-size: clamp(2.65rem, 10.8vw, 3.05rem);
    overflow-wrap: break-word;
  }

  .final-cta-actions {
    justify-self: stretch;
    align-items: flex-start;
    min-height: 0;
    text-align: left;
  }

  .final-cta-visual {
    align-self: center;
    width: min(100%, 17rem);
    margin-bottom: clamp(2rem, 8vw, 3rem);
  }

  .final-cta-content {
    align-items: flex-start;
  }
}

@keyframes pixel-heart-fly {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(calc(var(--heart-scale) * 0.55)) rotate(0deg);
  }

  12% {
    opacity: 1;
  }

  100% {
    opacity: 0;
    transform:
      translate(calc(-50% + var(--heart-dx)), calc(-50% + var(--heart-dy)))
      scale(calc(var(--heart-scale) * 1.25))
      rotate(var(--heart-rot));
  }
}

@media (prefers-reduced-motion: reduce) {
  .pixel-heart {
    display: none;
  }
}

:global(.final-cta-link) {
  background: var(--text-primary);
  border-color: var(--text-primary);
  color: var(--text-inverse);
  min-height: clamp(4.45rem, 5.2vw, 5.35rem);
  padding: clamp(1rem, 1.2vw, 1.25rem) clamp(2rem, 3vw, 3rem);
  font-size: clamp(1.35rem, 1.7vw, 2rem);
}

/* Hover aligné sur le bouton « Get in touch » de la page d'accueil. */
:global(.final-cta-link:hover),
:global(.final-cta-link:focus-visible) {
  background: var(--interactive-primary);
  border-color: var(--interactive-primary);
  color: var(--text-inverse);
}
</style>
