<template>
  <section class="services-grid" aria-labelledby="services-grid-title">
    <div class="services-container">
      <h2 id="services-grid-title">Services</h2>

      <div class="services-list">
        <article v-for="(card, index) in serviceCards" :key="card.title" class="service-card">
          <header class="card-header">
            <h3>{{ card.title }}</h3>
            <span class="card-index" aria-hidden="true">[{{ index + 1 }}]</span>
          </header>

          <div class="card-layout">
            <figure class="card-figure" :class="`note-${index + 1}`">
              <div class="card-media" :class="card.mediaClass" aria-hidden="true">
                <picture v-if="card.imageSrc">
                  <source v-if="card.avifSrcset" type="image/avif" :srcset="card.avifSrcset" />
                  <img :src="card.imageSrc" :alt="card.imageAlt" loading="lazy" decoding="async" />
                </picture>
                <div v-else class="media-placeholder"></div>
              </div>

              <figcaption class="card-closing">{{ card.closing }}</figcaption>
            </figure>

            <div class="card-body">
              <p class="card-intro">{{ card.intro }}</p>

              <ul>
                <li v-for="bullet in card.bullets" :key="bullet">{{ bullet }}</li>
              </ul>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ServicesGrid',
  props: {
    gridCardAvifSrcsets: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    serviceCards() {
      const base = [
        {
          title: 'Custom Websites & Strategic Digital Experiences',
          intro:
            'Your website should feel like you, while working hard behind the scenes. I design and build custom digital presences that hold their own — visually distinct, technically solid, and shaped around what the project actually needs to communicate. The brief is just the starting point. What gets built is something that lasts.',
          bullets: [
            '· Custom interface design',
            '· Responsive, intuitive layouts',
            '· Clean and maintainable development',
            '· Performance-focused builds',
            '· SEO-conscious structure',
          ],
          closing: 'A site with character, clarity and staying power.',
          imageSrc: '/assets/media/pages/services/getty-images-OPCEau8Ondk-unsplash-960.png',
          imageAlt: 'Custom website design direction',
          mediaClass: 'media-soft',
        },
        {
          title: 'Digital Platforms & Applications',
          intro:
            'When your work needs more than a simple website. Some workflows are too specific for off-the-shelf tools. I build platforms shaped around how a business actually operates — turning complexity into something clear, usable, and ready to scale.',
          bullets: [
            '· Custom dashboards',
            '· Role-based access',
            '· Real-time data',
            '· API integrations',
            '· AI-powered features integrations',
          ],
          closing: 'Not more tools. The right tool, built properly.',
          imageSrc: '/assets/media/pages/services/image-960.png',
          imageAlt: 'Digital platform and application architecture',
          mediaClass: 'media-deep',
        },
        {
          title: 'E-commerce Experiences & Conversion Optimization',
          intro:
            "An online store is not just a product list. It's a sales environment — and every detail shapes whether someone buys or leaves. I build e-commerce experiences that feel effortless for customers and manageable for the people running them.",
          bullets: [
            '· Tailored builds',
            '· Advanced customizations',
            '· Refined product presentation',
            '· Optimized user flows',
            '· Performance & usability refinement',
          ],
          closing: 'Every interaction matters.',
          imageSrc: '/assets/media/pages/services/jade-marchand-I-chqgKXC_g-unsplash-960.png',
          imageAlt: 'E-commerce product and conversion flow',
          mediaClass: 'media-warm',
        },
      ];
      return base.map((card, i) => ({
        ...card,
        avifSrcset: this.gridCardAvifSrcsets[i] || '',
      }));
    },
  },
};
</script>

<style scoped>
.services-grid {
  position: relative;
  z-index: 2;
  margin-top: 0;
  padding: clamp(48px, 6vw, 84px) 0 clamp(36px, 5vw, 68px);
  background: transparent;
  color: var(--text-primary);
}

.services-container {
  max-width: 1780px;
  margin: 0 auto;
  padding: 0 clamp(18px, 6.5vw, 130px);
}

.services-grid h2 {
  margin: 0;
  font-size: clamp(0.9rem, 1vw, 1.05rem);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-family: var(--font-family-display);
}

.services-list {
  margin-top: clamp(2.1rem, 3.4vw, 4rem);
}

.service-card {
  padding: clamp(2rem, 3.2vw, 3.8rem) 0 clamp(3.4rem, 5.4vw, 6.6rem);
}

.card-header {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: clamp(1.5rem, 4vw, 5rem);
  align-items: start;
  padding-bottom: clamp(1.15rem, 1.8vw, 2rem);
  border-bottom: 1px solid color-mix(in srgb, var(--text-primary) 72%, transparent);
}

.card-header h3 {
  max-width: 38rem;
  margin: 0;
  font-family: var(--font-family-display);
  text-transform: uppercase;
  letter-spacing: 0;
  line-height: 1.02;
  font-size: clamp(1.75rem, 2.45vw, 3.45rem);
}

.card-index {
  justify-self: end;
  font-family: var(--font-family-display);
  font-size: clamp(3.2rem, 4.8vw, 6.25rem);
  line-height: 0.78;
  letter-spacing: 0;
  color: var(--text-primary);
  white-space: nowrap;
}

.card-layout {
  display: grid;
  grid-template-columns: minmax(240px, 0.78fr) minmax(0, 1fr);
  gap: clamp(2rem, 7vw, 9rem);
  align-items: start;
  margin-top: clamp(1.7rem, 2.7vw, 3.2rem);
}

.card-figure {
  position: relative;
  width: min(100%, 470px);
  margin: 0;
  --note-x: clamp(5rem, 17vw, 13.5rem);
  --note-y: clamp(1.3rem, 4vw, 4.2rem);
  --note-rotate: -9deg;
}

.card-media {
  width: 100%;
  aspect-ratio: 1.62 / 1;
  overflow: hidden;
  border-radius: var(--image-radius);
}

.card-media img,
.media-placeholder {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

.media-placeholder {
  background:
    radial-gradient(
      circle at 20% 20%,
      color-mix(in srgb, var(--text-primary) 14%, transparent),
      transparent 45%
    ),
    linear-gradient(
      120deg,
      color-mix(in srgb, var(--surface-muted) 88%, #c9c3b9),
      color-mix(in srgb, var(--surface-muted) 74%, #b5aea2)
    );
}

.card-body {
  display: grid;
  grid-template-columns: minmax(0, 0.82fr) minmax(12rem, 0.82fr);
  gap: clamp(1.4rem, 4vw, 5rem);
  align-items: start;
}

.card-intro {
  margin: 0;
  font-weight: 300;
  line-height: 1.48;
  font-size: 1rem;
}

.card-closing {
  position: absolute;
  left: var(--note-x);
  bottom: calc(-1 * var(--note-y));
  max-width: 18rem;
  margin: 0;
  font-family: var(--font-family-script);
  font-size: clamp(1.5rem, 2vw, 2.2rem);
  line-height: 0.95;
  color: #1d2230;
  text-shadow:
    0 1px 0 rgba(255, 255, 255, 0.95),
    0 -1px 0 rgba(255, 255, 255, 0.82),
    1px 0 0 rgba(255, 255, 255, 0.82),
    -1px 0 0 rgba(255, 255, 255, 0.82),
    0 0 12px rgba(255, 255, 255, 0.72);
  transform: rotate(var(--note-rotate));
  transform-origin: left center;
  z-index: 2;
  pointer-events: none;
}

.note-1 {
  --note-x: clamp(9rem, 19vw, 15.8rem);
  --note-y: clamp(1.3rem, 4.2vw, 4.4rem);
  --note-rotate: -8deg;
}

.note-2 {
  --note-x: clamp(1rem, 4vw, 2.4rem);
  --note-y: clamp(-1.2rem, -1.1vw, -0.4rem);
  --note-rotate: 7deg;
}

.note-2 .card-closing {
  bottom: clamp(0.7rem, 1.4vw, 1.35rem);
}

.note-3 {
  --note-x: clamp(7rem, 16vw, 12.5rem);
  --note-y: clamp(0.5rem, 2.6vw, 2.6rem);
  --note-rotate: -13deg;
}

.card-body ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.card-body li {
  margin: 0;
  font-size: 1rem;
  line-height: 1.48;
}

@media (max-width: 1024px) {
  .card-layout {
    grid-template-columns: 1fr;
    gap: 1.8rem;
  }

  .card-body {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  }

  .card-closing {
    left: min(var(--note-x), calc(100% - 14.5rem));
    bottom: -3.2rem;
  }

  .note-2 .card-closing {
    bottom: 1rem;
  }
}

@media (max-width: 640px) {
  .services-container {
    padding: 0 18px;
  }

  .service-card {
    padding: 1.8rem 0 3.2rem;
  }

  .card-body {
    grid-template-columns: 1fr;
    gap: 1.15rem;
  }

  .card-figure {
    width: min(100%, 430px);
    padding-bottom: 3.6rem;
    --note-x: 42%;
    --note-y: 0;
  }

  .card-closing {
    left: min(var(--note-x), calc(100% - 12rem));
    bottom: 0.25rem;
    max-width: 14rem;
    font-size: 1.45rem;
  }

  .note-1 {
    --note-x: 40%;
    --note-rotate: -7deg;
  }

  .note-2 {
    --note-x: 7%;
    --note-rotate: 6deg;
    padding-bottom: 0;
  }

  .note-2 .card-closing {
    bottom: 0.7rem;
  }

  .note-3 {
    --note-x: 35%;
    --note-rotate: -12deg;
  }

  .card-header h3 {
    font-size: clamp(1.45rem, 8vw, 2.4rem);
  }

  .card-index {
    font-size: clamp(2.25rem, 11vw, 3.8rem);
  }

  .card-intro,
  .card-body li {
    font-size: 1rem;
  }
}
</style>
