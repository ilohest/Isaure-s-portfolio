<template>
  <section class="services-grid" aria-labelledby="services-grid-title">
    <div class="services-container">
      <h2 id="services-grid-title">Services</h2>

      <div class="cards-grid">
        <article v-for="card in serviceCards" :key="card.title" class="service-card">
          <div class="card-media" :class="card.mediaClass" aria-hidden="true">
            <picture v-if="card.imageSrc">
              <source v-if="card.avifSrcset" type="image/avif" :srcset="card.avifSrcset" />
              <img
                :src="card.imageSrc"
                :alt="card.imageAlt"
                loading="lazy"
                decoding="async"
              />
            </picture>
            <div v-else class="media-placeholder"></div>
          </div>

          <div class="card-body">
            <h3>{{ card.title }}</h3>
            <p class="card-intro">{{ card.intro }}</p>

            <ul>
              <li v-for="bullet in card.bullets" :key="bullet">{{ bullet }}</li>
            </ul>

            <p class="card-closing">{{ card.closing }}</p>
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
            'Your website should feel like you, while working hard behind the scenes. I design and develop tailored sites that balance visual character, usability and reliable implementation.',
          bullets: [
            'Custom interface design',
            'Responsive, intuitive layouts',
            'Clean and maintainable development',
            'Performance-focused builds',
            'SEO-conscious structure',
          ],
          closing: 'A site with character, clarity and staying power.',
          imageSrc: '/assets/media/pages/services/getty-images-OPCEau8Ondk-unsplash-960.png',
          imageAlt: 'Custom website design direction',
          mediaClass: 'media-soft',
        },
        {
          title: 'Digital Platforms & Applications',
          intro:
            'When your work needs more than a simple website, I turn operational complexity into tools that are clear to use and ready to grow with your business.',
          bullets: [
            'Secure login and role-based access',
            'Client and admin dashboards',
            'Real-time data and dynamic views',
            'Business logic implementation',
            'API integrations',
            'Scalable and maintainable architecture',
            'AI-powered features integrations',
          ],
          closing: 'Complexity becomes clarity.',
          imageSrc: '/assets/media/pages/services/image-960.png',
          imageAlt: 'Digital platform and application architecture',
          mediaClass: 'media-deep',
        },
        {
          title: 'E-commerce Experiences & Conversion Optimization',
          intro: 'Online stores should feel effortless for your customers, and manageable for the team running them.',
          bullets: [
            'Tailored builds & advanced customization',
            'Refined product presentation',
            'Optimized user flows',
            'Performance & usability refinement',
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
  margin-top: clamp(56px, 7vw, 74px);
}

.services-container {
  max-width: 1160px;
  margin: 0 auto;
  padding: 0 24px;
}

.services-grid h2 {
  margin: 0;
  font-size: 0.95rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-family: var(--font-family-display);
}

.cards-grid {
  margin-top: 1.1rem;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: clamp(24px, 2.4vw, 32px);
  grid-auto-rows: 1fr;
}

.service-card {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  border: 1px solid var(--text-primary);
  border-radius: 2px;
  background: var(--surface-muted);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.service-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px color-mix(in srgb, var(--text-primary) 10%, transparent);
}

.card-media {
  height: clamp(220px, 20vw, 270px);
  border-bottom: 1px solid var(--text-primary);
  overflow: hidden;
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
  padding: 1.2rem 1.1rem 1rem;
}

.card-body h3 {
  margin: 0;
  font-family: var(--font-family-display);
  text-transform: uppercase;
  letter-spacing: 0.045em;
  line-height: 1.08;
  font-size: clamp(1.08rem, 1.75vw, 1.42rem);
}

.card-intro,
.card-closing {
  margin: 0.72rem 0 0;
  font-weight: 300;
  line-height: 1.62;
  font-size: 0.95rem;
}

.card-closing {
  text-align: center;
  font-family: var(--font-family-script);
  font-size: 1.22rem;
}

.card-body ul {
  margin: 0.86rem 0 0;
  padding-left: 1.18rem;
  list-style: disc outside;
}

.card-body li {
  margin: 0.3rem 0;
  font-size: 0.9rem;
  line-height: 1.52;
}

.card-body li::marker {
  color: var(--text-primary);
  font-size: 0.72em;
}

@media (max-width: 1024px) {
  .cards-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .card-media {
    height: clamp(220px, 32vw, 300px);
  }
}

@media (max-width: 640px) {
  .services-container {
    padding: 0 18px;
  }

  .cards-grid {
    grid-template-columns: 1fr;
    grid-auto-rows: auto;
  }

  .service-card {
    min-height: 0;
  }

  .card-media {
    height: clamp(210px, 62vw, 280px);
  }
}
</style>
