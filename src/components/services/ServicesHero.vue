<template>
  <section
    class="services-hero tangle-hero"
    aria-labelledby="services-hero-title"
    @pointermove="onHeroPointerMove"
    @pointerleave="resetHeroLetters"
  >
    <picture>
      <source v-if="heroAvifSrcset" type="image/avif" :srcset="heroAvifSrcset" />
      <img
        class="hero-image"
        src="/assets/media/pages/services/allison-saeng-BF9I4IwF6xs-unsplash-960.png"
        alt="Editorial services hero"
        loading="eager"
        decoding="async"
        fetchpriority="high"
      />
    </picture>
    <div class="hero-overlay"></div>
    <div class="services-container hero-content">
      <div class="hero-copy">
        <h1
          id="services-hero-title"
          class="services-hero-title"
          aria-label="Crafted Digital Experiences"
        >
          <span class="services-hero-word" aria-hidden="true">
            <span
              v-for="(letter, index) in heroLineOne"
              :key="`services-line-one-${index}`"
              :ref="(el) => setHeroLetterRef(el, index)"
              class="services-hero-letter"
              :class="{ 'services-hero-letter--space': letter === ' ' }"
              :style="heroLetterStyles[index]"
            >
              {{ letter === ' ' ? '\u00A0' : letter }}
            </span>
          </span>
          <span class="services-hero-word" aria-hidden="true">
            <span
              v-for="(letter, index) in heroLineTwo"
              :key="`services-line-two-${index}`"
              :ref="(el) => setHeroLetterRef(el, heroLineOne.length + index)"
              class="services-hero-letter"
              :class="{ 'services-hero-letter--space': letter === ' ' }"
              :style="heroLetterStyles[heroLineOne.length + index]"
            >
              {{ letter === ' ' ? '\u00A0' : letter }}
            </span>
          </span>
        </h1>
        <div class="hero-columns">
          <p>
            Most digital projects fail not because of bad execution — but because the thinking
            wasn't deep enough at the start.
          </p>
          <p>
            I work at the intersection of strategy and craft. Every project begins with a real
            conversation about what you're building, who it's for, and what it needs to communicate
            beyond the obvious. Then I design and build it — with precision, intention, and nothing
            superfluous.
          </p>
        </div>
      </div>
    </div>
    <button
      class="scroll-cue"
      type="button"
      aria-label="Scroll to services"
      @click="scrollToServices"
    >
      <span aria-hidden="true">↓</span>
    </button>
  </section>
</template>

<script>
const HERO_LINES = ['Crafted Digital', 'Experiences'];

export default {
  name: 'ServicesHero',
  props: {
    heroAvifSrcset: {
      type: String,
      default: '',
    },
  },
  data() {
    const heroLineOne = HERO_LINES[0].split('');
    const heroLineTwo = HERO_LINES[1].split('');
    const totalLetters = heroLineOne.length + heroLineTwo.length;

    return {
      heroLineOne,
      heroLineTwo,
      heroLetterElements: Array.from({ length: totalLetters }, () => null),
      heroLetterStyles: Array.from({ length: totalLetters }, () => ({
        transform: 'translate3d(0px, 0px, 0) scale(1)',
      })),
    };
  },
  methods: {
    setHeroLetterRef(el, index) {
      this.heroLetterElements[index] = el;
    },
    resetHeroLetters() {
      this.heroLetterStyles = this.heroLetterStyles.map(() => ({
        transform: 'translate3d(0px, 0px, 0) scale(1)',
      }));
    },
    onHeroPointerMove(event) {
      if (window.matchMedia?.('(pointer: coarse)')?.matches) return;

      this.heroLetterStyles = this.heroLetterElements.map((el) => {
        if (!(el instanceof HTMLElement)) {
          return { transform: 'translate3d(0px, 0px, 0) scale(1)' };
        }

        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = event.clientX - centerX;
        const dy = event.clientY - centerY;
        const distance = Math.hypot(dx, dy);
        const influence = Math.max(0, 1 - distance / 170);
        const shiftX = dx * 0.12 * influence;
        const shiftY = dy * 0.08 * influence;
        const lift = -10 * influence;
        const scale = 1 + 0.24 * influence;

        return {
          transform: `translate3d(${shiftX.toFixed(2)}px, ${(shiftY + lift).toFixed(2)}px, 0) scale(${scale.toFixed(3)})`,
        };
      });
    },
    scrollToServices() {
      const target = document.getElementById('services-grid-title');
      if (!target) return;

      const scroller = document.querySelector('main[data-scroll-container]');

      if (scroller instanceof HTMLElement) {
        const targetRect = target.getBoundingClientRect();
        const scrollerRect = scroller.getBoundingClientRect();
        const nextTop = scroller.scrollTop + (targetRect.top - scrollerRect.top) - 24;

        scroller.scrollTo({
          top: Math.max(0, nextTop),
          behavior: 'smooth',
        });
        return;
      }

      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },
  },
  mounted() {
    this.resetHeroLetters();
    window.addEventListener('resize', this.resetHeroLetters, { passive: true });
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.resetHeroLetters);
  },
};
</script>

<style scoped>
.services-hero {
  position: relative;
  min-height: 100vh;
  min-height: 100svh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.services-container {
  max-width: 1160px;
  margin: 0 auto;
  padding: 0 24px;
  width: 100%;
}

.hero-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  inset: 0;
}

.hero-content {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
}

.services-hero-title {
  margin: 0;
  font-family: var(--font-family-display);
  text-transform: uppercase;
  line-height: 0.98;
  text-align: left;
  color: var(--text-inverse);
}

.services-hero-word {
  display: block;
  white-space: nowrap;
}

.services-hero-letter {
  display: inline-block;
  font-size: clamp(2.2rem, 5.2vw, 4.3rem);
  letter-spacing: 0.02em;
  transform-origin: 50% 80%;
  transition: transform 260ms cubic-bezier(0.2, 0.9, 0.2, 1);
  will-change: transform;
}

.services-hero-letter--space {
  width: 0.38em;
}

.hero-columns {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 30ch));
  justify-content: start;
  gap: clamp(1.2rem, 3vw, 2rem);
  margin: clamp(1.1rem, 2.4vw, 1.8rem) 0 0;
  max-width: 68ch;
}

.hero-columns p {
  margin: 0;
  font-weight: 400;
  font-size: clamp(0.88rem, 1vw, 0.98rem);
  line-height: 1.55;
  color: var(--text-inverse);
  text-align: left;
}

.scroll-cue {
  position: absolute;
  left: 50%;
  bottom: 28px;
  transform: translateX(-50%);
  z-index: 2;
  width: 40px;
  height: 40px;
  border: 1px solid var(--text-primary);
  background: rgba(255, 255, 255, 0.06);
  color: var(--text-inverse);
  border-radius: 999px;
  cursor: pointer;
  font-size: 1.2rem;
  line-height: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  animation: float-cue 1.8s ease-in-out infinite;
}

@keyframes float-cue {
  0%,
  100% {
    transform: translateX(-50%) translateY(0);
  }
  50% {
    transform: translateX(-50%) translateY(4px);
  }
}

@media (max-width: 640px) {
  .services-container {
    padding: 0 18px;
  }

  .services-hero-letter {
    font-size: clamp(1.95rem, 8vw, 3rem);
  }

  .hero-columns {
    grid-template-columns: 1fr;
    max-width: 34ch;
    gap: 0.85rem;
  }

  .scroll-cue {
    bottom: 18px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .services-hero-letter {
    transition: none;
  }
}
</style>
