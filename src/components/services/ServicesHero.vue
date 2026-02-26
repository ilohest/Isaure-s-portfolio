<template>
  <section class="services-hero tangle-hero" aria-labelledby="services-hero-title">
    <img
      class="hero-image"
      :src="'/assets/media/pages/services/allison-saeng-BF9I4IwF6xs-unsplash-960.png'"
      alt="Editorial services hero"
      loading="eager"
      decoding="async"
    />
    <div class="hero-overlay"></div>
    <div class="services-container hero-content">
      <div class="hero-copy">
        <h1 id="services-hero-title">Crafted Digital Experiences</h1>
        <p>I create thoughtful digital spaces where aesthetics meet structure.</p>
        <p>
          Each project begins with listening, understanding your vision, your rhythm, your ambition,
          and translating it into a refined and lasting digital presence.
        </p>
      </div>
    </div>
    <button class="scroll-cue" type="button" aria-label="Scroll to services" @click="scrollToServices">
      <span aria-hidden="true">↓</span>
    </button>
  </section>
</template>

<script>
export default {
  name: 'ServicesHero',
  methods: {
    scrollToServices() {
      const target = document.getElementById('services-grid-title');
      if (!target) return;
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },
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
  background:
    linear-gradient(180deg, rgba(0, 0, 0, 0.28) 0%, rgba(0, 0, 0, 0.4) 100%);
}

.hero-content {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
}

.hero-copy {
  width: min(100%, 980px);
}

.hero-copy h1 {
  margin: 0;
  font-family: var(--font-family-display);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-size: clamp(2.2rem, 5.2vw, 4.3rem);
  line-height: 0.98;
  color: var(--text-inverse);
  text-align: center;
}

.hero-copy p {
  margin: 0.9rem auto 0;
  font-weight: 400;
  line-height: 1.65;
  max-width: 58ch;
  color: var(--text-inverse);
  text-align: center;
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

  .scroll-cue {
    bottom: 18px;
  }
}
</style>
