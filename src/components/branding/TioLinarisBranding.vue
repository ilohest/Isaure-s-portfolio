<template>
  <section class="relative container mx-auto flex flex-col gap-6 px-4 py-4 md:top-[40px]">
    <div class="flex items-center justify-between">
      <Button
        label="Back to projects"
        icon="pi pi-arrow-left"
        text
        class="btn-link"
        @click="$router.push('/achievements')"
      />
    </div>

    <div class="tio-hero m-0 flex items-center justify-center p-0">
      <picture class="tio-hero-picture">
        <source
          type="image/avif"
          :srcset="`
            ${heroBaseUrl}-640.avif 640w,
            ${heroBaseUrl}-960.avif 960w,
            ${heroBaseUrl}-1280.avif 1280w,
            ${heroBaseUrl}-1920.avif 1920w
          `"
          sizes="(min-width: 1280px) 72vw, (min-width: 970px) 84vw, 92vw"
        />
        <source
          type="image/webp"
          :srcset="`
            ${heroBaseUrl}-640.webp 640w,
            ${heroBaseUrl}-960.webp 960w,
            ${heroBaseUrl}-1280.webp 1280w,
            ${heroBaseUrl}-1920.webp 1920w
          `"
          sizes="(min-width: 1280px) 72vw, (min-width: 970px) 84vw, 92vw"
        />
        <img
          :src="`${heroBaseUrl}-960.png`"
          alt="Trio Linaris title composition"
          class="tio-hero-img border-round-xl block h-auto max-w-full"
          fetchpriority="high"
          decoding="async"
        />
      </picture>
    </div>

    <section
      v-if="galleryItems.length"
      class="tio-loop-section m-0 flex items-center justify-center p-0"
      aria-label="Animated gallery preview"
    >
      <div class="tio-loop-frame">
        <div
          v-for="(image, index) in galleryItems"
          :key="image.key"
          class="tio-loop-slide"
          :class="{ 'is-active': index === activeGalleryIndex }"
          :aria-hidden="index === activeGalleryIndex ? 'false' : 'true'"
        >
          <img
            :src="image.src"
            :alt="image.alt"
            loading="lazy"
            decoding="async"
            fetchpriority="low"
          />
        </div>
      </div>
    </section>

    <section class="masonry masonry-horizontal">
      <div v-for="(col, colIdx) in masonryColumns" :key="`col-${colIdx}`" class="masonry-col">
        <div
          v-for="item in col"
          :key="item.key"
          class="masonry-item masonry-reveal"
          :style="{ '--reveal-delay': revealDelayByKey[item.key] || '0ms' }"
        >
          <Card
            v-if="item.type === 'card'"
            class="project-summary-card bg-[var(--surface-muted)] font-['Red_Hat_Text'] font-light text-[var(--text-secondary)] shadow-none"
          >
            <template #content>
              <div class="p-4 md:p-6">
                <div v-if="item.variant === 'meta'" class="flex flex-col gap-4">
                  <section>
                    <h3 class="mb-2 uppercase">Responsibilities</h3>
                    <ul class="list-inside list-disc pl-6 text-base">
                      <li>Editorial design</li>
                      <li>Art direction</li>
                      <li>Layout system</li>
                    </ul>
                  </section>

                  <section>
                    <h3 class="mb-2 uppercase">About</h3>
                    <div class="flex flex-col gap-1 text-base">
                      <p><i class="uppercase">Client: </i>Trio Linaris</p>
                      <p><i class="uppercase">Sector: </i>Classical music</p>
                      <p><i class="uppercase">Format: </i>Presentation dossier</p>
                    </div>
                  </section>
                </div>

                <div v-else class="flex flex-col gap-2">
                  <h3 v-if="item.title && item.title.trim()" class="tracking-wide uppercase">
                    {{ item.title }}
                  </h3>
                  <div class="flex flex-col gap-3 leading-relaxed">
                    <p
                      v-for="(paragraph, idx) in item.paragraphs"
                      :key="`p-${item.key}-${idx}`"
                      :class="item.mono ? 'font-display tio-intro' : ''"
                    >
                      {{ paragraph }}
                    </p>
                  </div>
                </div>
              </div>
            </template>
          </Card>

          <div
            v-else-if="item.type === 'palette'"
            class="palette-card bg-[var(--surface-muted)] font-['Red_Hat_Text'] font-light text-[var(--text-secondary)] shadow-none"
            role="group"
            aria-label="Trio Linaris color palette"
          >
            <div class="palette-grid">
              <div
                v-for="swatch in item.swatches"
                :key="swatch.hex"
                class="palette-swatch"
                :style="{ backgroundColor: swatch.hex, color: swatch.textColor }"
              >
                <div class="palette-label">
                  <p class="palette-line">{{ swatch.hex }}</p>
                </div>
              </div>
            </div>
          </div>

          <picture v-else>
            <source
              type="image/avif"
              :srcset="`
                ${item.baseUrl}-640.avif 640w,
                ${item.baseUrl}-960.avif 960w,
                ${item.baseUrl}-1280.avif 1280w,
                ${item.baseUrl}-1920.avif 1920w
              `"
              sizes="(min-width: 1280px) 45vw, (min-width: 970px) 48vw, 92vw"
            />
            <source
              type="image/webp"
              :srcset="`
                ${item.baseUrl}-640.webp 640w,
                ${item.baseUrl}-960.webp 960w,
                ${item.baseUrl}-1280.webp 1280w,
                ${item.baseUrl}-1920.webp 1920w
              `"
              sizes="(min-width: 1280px) 45vw, (min-width: 970px) 48vw, 92vw"
            />
            <img
              :src="`${item.baseUrl}-960.png`"
              :alt="item.alt"
              loading="lazy"
              decoding="async"
              fetchpriority="low"
            />
          </picture>
        </div>
      </div>
    </section>

    <div class="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row md:gap-2">
      <Button
        v-if="hasPrevProject"
        label="Previous"
        icon="pi pi-arrow-left"
        class="p-button-outlined"
        @click="navigateTo(prevProject)"
      />
      <span v-else class="invisible hidden md:block md:w-[120px]"></span>

      <span class="text-center text-xl font-semibold uppercase">{{ current.title }}</span>

      <Button
        v-if="hasNextProject"
        label="Next"
        icon-pos="right"
        icon="pi pi-arrow-right"
        @click="navigateTo(nextProject)"
      />
      <span v-else class="invisible hidden md:block md:w-[120px]"></span>
    </div>

    <div class="h-24 flex-none"></div>
  </section>
</template>

<script>
import Card from 'primevue/card';
import Button from 'primevue/button';
import projects from '@/branding-projects';
import allProjects from '@/all-projects';

const TIO_MEDIA_DIR = '/assets/media/projects/branding/tio-linaris';

export default {
  name: 'TioLinarisBranding',
  components: { Card, Button },
  data() {
    return {
      projects,
      heroBase: 'tio-linaris-title-cover',
      masonryColumnCount: 2,
      masonryObserver: null,
      galleryRotationInterval: null,
      activeGalleryIndex: 0,
      slideshowItems: [
        {
          key: 'slide-01',
          alt: 'Trio Linaris cover portrait',
          src: `${TIO_MEDIA_DIR}/slideshow/trio-linaris-slide-01.png`,
        },
        {
          key: 'slide-03',
          alt: 'Pierre Cornu-Deyme profile page',
          src: `${TIO_MEDIA_DIR}/slideshow/trio-linaris-slide-03.png`,
        },
        {
          key: 'slide-04',
          alt: 'Vinciane Vinckenbosch profile page',
          src: `${TIO_MEDIA_DIR}/slideshow/trio-linaris-slide-04.png`,
        },
        {
          key: 'slide-05',
          alt: 'Alexandra Bidi profile page',
          src: `${TIO_MEDIA_DIR}/slideshow/trio-linaris-slide-05.png`,
        },
        {
          key: 'slide-06',
          alt: 'Trio Linaris contact page',
          src: `${TIO_MEDIA_DIR}/slideshow/trio-linaris-slide-06.png`,
        },
        {
          key: 'slide-07',
          alt: 'Trio Linaris performance photo overlay',
          src: `${TIO_MEDIA_DIR}/slideshow/trio-linaris-slide-07.png`,
        },
        {
          key: 'slide-08',
          alt: 'Trio Linaris logo page',
          src: `${TIO_MEDIA_DIR}/slideshow/trio-linaris-slide-08.png`,
        },
        {
          key: 'slide-09',
          alt: 'Trio Linaris programme page',
          src: `${TIO_MEDIA_DIR}/slideshow/trio-linaris-slide-09.png`,
        },
        {
          key: 'slide-10',
          alt: 'Trio Linaris appendix page',
          src: `${TIO_MEDIA_DIR}/slideshow/trio-linaris-slide-10.png`,
        },
        {
          key: 'slide-02',
          alt: 'Trio Linaris editorial introduction spread',
          src: `${TIO_MEDIA_DIR}/slideshow/trio-linaris-slide-02.png`,
        },
      ],
      items: [
        {
          key: 'card-0',
          type: 'card',
          mono: true,
          paragraphs: ['Trio Linaris — Editorial Design for a Classical Music Ensemble'],
        },
        { key: 'card-1', type: 'card', variant: 'meta' },
        {
          key: 'img-cover',
          type: 'image',
          base: 'tio-linaris-cover',
          alt: 'Trio Linaris editorial cover with musicians portrait',
        },
        {
          key: 'img-2',
          type: 'image',
          base: 'tio-linaris-linaris-concept',
          alt: 'Trio Linaris editorial spread introducing the concept',
        },
        {
          key: 'card-2',
          type: 'card',
          title: 'Project',
          paragraphs: [
            'This project consists of the art direction and editorial design of a presentation dossier, conceived as a PDF document for Trio Linaris, a chamber music ensemble bringing together flute, viola and harp.',
            'The visual approach draws directly from the codes of the classical music world: elegance, precision, and timelessness. The layout is built on a strong sense of rhythm and balance, echoing the structure of musical composition itself. Typography plays a central role, with refined serif contrasts and large-scale compositions that evoke both tradition and contemporary sophistication.',
          ],
        },
        {
          key: 'card-3',
          type: 'card',
          title: 'Concept',
          paragraphs: [
            'The identity revolves around the idea of a “line” — inspired by the meaning of Linaris — translated visually through structured grids, subtle alignments, and flowing transitions between pages.',
            'A restrained color palette, warm tones, and generous negative space create a calm and immersive reading experience, allowing the photography and the musicians’ presence to stand out with clarity. The compositions alternate between editorial density and visual breathing space, reinforcing a sense of movement across the document.',
            'The result is a refined and modern interpretation of classical music aesthetics — bridging heritage and contemporary design, much like the trio’s own artistic positioning.',
          ],
        },
        {
          key: 'img-6',
          type: 'image',
          base: 'tio-linaris-performance-overlay',
          alt: 'Trio Linaris performance imagery with typographic overlay',
        },
        {
          key: 'img-3',
          type: 'image',
          base: 'tio-linaris-pierre-cornu-deyme',
          alt: 'Trio Linaris musician profile for Pierre Cornu-Deyme',
        },
        {
          key: 'img-4',
          type: 'image',
          base: 'tio-linaris-vinciane-vinckenbosch',
          alt: 'Trio Linaris musician profile for Vinciane Vinckenbosch',
        },
        {
          key: 'card-palette',
          type: 'palette',
          swatches: [
            { hex: '#C3964B', textColor: '#FFFDFD' },
            { hex: '#FFFDFD', textColor: '#232323' },
            { hex: '#8B0000', textColor: '#FFFDFD' },
            { hex: '#5C1616', textColor: '#FFFDFD' },
            { hex: '#232323', textColor: '#FFFDFD' },
          ],
        },
        {
          key: 'card-4',
          type: 'card',
          title: 'Color palette',
          paragraphs: [
            'A warm, refined palette built on contrast and materiality.',
            'Deep charcoal anchors the composition, paired with a range of reds — from burgundy to vibrant tones — echoing details like lipstick, laces, and harp strings. A soft off-white brings light and balance.',
            'The ensemble is unified by a warm golden ochre, inspired by concert hall gilding and the harp, adding richness and a distinctly classical elegance.',
          ],
        },
        {
          key: 'img-5',
          type: 'image',
          base: 'tio-linaris-alexandra-bidi',
          alt: 'Trio Linaris musician profile for Alexandra Bidi',
        },
        {
          key: 'img-7',
          type: 'image',
          base: 'tio-linaris-contact',
          alt: 'Trio Linaris contact page with email address',
        },
        {
          key: 'img-8',
          type: 'image',
          base: 'tio-linaris-logo',
          alt: 'Trio Linaris logotype with flute alto harp signature',
        },
        {
          key: 'img-9',
          type: 'image',
          base: 'tio-linaris-programme',
          alt: 'Trio Linaris programme spread with repertoire listing',
        },
        {
          key: 'img-10',
          type: 'image',
          base: 'tio-linaris-annexe',
          alt: 'Trio Linaris annex spread with programme notes',
        },
      ],
    };
  },
  computed: {
    heroBaseUrl() {
      return `${TIO_MEDIA_DIR}/${this.heroBase}`;
    },
    resolvedItems() {
      return this.items.map((item) => {
        if (item.type !== 'image') return item;
        return {
          ...item,
          baseUrl: `${TIO_MEDIA_DIR}/${item.base}`,
        };
      });
    },
    galleryItems() {
      return this.slideshowItems;
    },
    masonryItems() {
      return this.resolvedItems.filter((item) => item.type !== 'image');
    },
    currentGalleryImage() {
      if (!this.galleryItems.length) return null;
      return this.galleryItems[this.activeGalleryIndex] || this.galleryItems[0];
    },
    masonryColumns() {
      const count = Math.max(1, Number(this.masonryColumnCount) || 1);
      const cols = Array.from({ length: count }, () => []);
      this.masonryItems.forEach((item, index) => {
        cols[index % count].push(item);
      });
      return cols;
    },
    revealDelayByKey() {
      return this.masonryItems.reduce((acc, item, index) => {
        acc[item.key] = `${Math.min(index * 36, 420)}ms`;
        return acc;
      }, {});
    },
    currentIndex() {
      const path = this.$route?.path || '';
      let idx = this.projects.findIndex((p) => p.projectLink === path);
      if (idx !== -1) return idx;

      const id = parseInt(this.$route?.params?.id, 10);
      if (!Number.isNaN(id)) {
        idx = this.projects.findIndex((p) => p.id === id);
        if (idx !== -1) return idx;
      }
      return 0;
    },
    current() {
      return this.projects[this.currentIndex] || this.projects[0];
    },
    navProjects() {
      return [...allProjects].sort((a, b) => a.order - b.order);
    },
    navCurrentIndex() {
      if (!this.navProjects.length) return 0;
      const idx = this.navProjects.findIndex((p) => p.projectLink === this.current?.projectLink);
      return idx === -1 ? 0 : idx;
    },
    hasPrevProject() {
      return this.navProjects.length > 1 && this.navCurrentIndex > 0;
    },
    hasNextProject() {
      return this.navProjects.length > 1 && this.navCurrentIndex < this.navProjects.length - 1;
    },
    prevProject() {
      if (!this.navProjects.length || !this.hasPrevProject) return this.current;
      return this.navProjects[this.navCurrentIndex - 1];
    },
    nextProject() {
      if (!this.navProjects.length || !this.hasNextProject) return this.current;
      return this.navProjects[this.navCurrentIndex + 1];
    },
  },
  methods: {
    navigateTo(project) {
      if (project?.projectLink) this.$router.push(project.projectLink);
    },
    syncMasonryColumnCount() {
      const width = window?.innerWidth ?? 1200;
      this.masonryColumnCount = width <= 760 ? 1 : 2;
      this.$nextTick(() => this.setupMasonryReveal());
    },
    setupMasonryReveal() {
      const targets = this.$el?.querySelectorAll?.('.masonry-reveal');
      if (!targets?.length) return;

      if (this.masonryObserver) {
        this.masonryObserver.disconnect();
        this.masonryObserver = null;
      }

      if (typeof window.IntersectionObserver !== 'function') {
        targets.forEach((el) => el.classList.add('is-visible'));
        return;
      }

      this.masonryObserver = new IntersectionObserver(
        (entries, observer) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        },
        { root: null, rootMargin: '0px 0px -8% 0px', threshold: 0.1 },
      );

      targets.forEach((el) => {
        if (el.classList.contains('is-visible')) return;
        this.masonryObserver.observe(el);
      });
    },
    startGalleryRotation() {
      if (this.galleryRotationInterval || this.galleryItems.length <= 1) return;
      this.galleryRotationInterval = window.setInterval(() => {
        this.activeGalleryIndex = (this.activeGalleryIndex + 1) % this.galleryItems.length;
      }, 1000);
    },
    stopGalleryRotation() {
      if (!this.galleryRotationInterval) return;
      window.clearInterval(this.galleryRotationInterval);
      this.galleryRotationInterval = null;
    },
  },
  mounted() {
    window.scrollTo(0, 0);
    this.syncMasonryColumnCount();
    this.$nextTick(() => this.setupMasonryReveal());
    this.startGalleryRotation();
    window.addEventListener('resize', this.syncMasonryColumnCount, { passive: true });
  },
  beforeUnmount() {
    if (this.masonryObserver) {
      this.masonryObserver.disconnect();
      this.masonryObserver = null;
    }
    this.stopGalleryRotation();
    window.removeEventListener('resize', this.syncMasonryColumnCount);
  },
};
</script>

<style scoped>
.masonry {
  border-radius: var(--project-card-radius);
}

.masonry-item {
  margin-bottom: 1rem;
}

.masonry-reveal {
  opacity: 0;
  transform: translate3d(0, 24px, 0) scale(0.985);
  transition:
    opacity 520ms cubic-bezier(0.22, 1, 0.36, 1),
    transform 680ms cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: var(--reveal-delay, 0ms);
  will-change: opacity, transform;
}

.masonry-reveal.is-visible {
  opacity: 1;
  transform: translate3d(0, 0, 0) scale(1);
}

.masonry-item img {
  width: 100%;
  height: auto;
  display: block;
  border-radius: var(--image-radius);
}

.tio-hero,
.tio-loop-section,
.masonry {
  width: 100%;
}

.tio-hero-picture,
.tio-loop-frame {
  display: block;
  width: 100%;
}

.tio-loop-frame {
  display: grid;
  position: relative;
  overflow: hidden;
  border-radius: var(--image-radius);
  box-shadow: 0 20px 60px rgba(35, 35, 35, 0.08);
  background: #f6f1eb;
}

.tio-loop-slide {
  display: block;
  grid-area: 1 / 1;
  width: 100%;
  flex: 0 0 auto;
  opacity: 0;
  transition: opacity 420ms ease-in-out;
  pointer-events: none;
}

.tio-loop-slide img {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 0;
}

.tio-loop-slide.is-active {
  opacity: 1;
  z-index: 1;
}

.tio-intro {
  font-size: clamp(1.2rem, 1.8vw, 1.55rem);
  line-height: 1.15;
  text-transform: uppercase;
}

.palette-card {
  border-radius: var(--image-radius);
  overflow: hidden;
}

.palette-grid {
  display: flex;
  width: 100%;
  flex-direction: column;
}

.palette-swatch {
  min-height: 96px;
  display: flex;
  align-items: flex-end;
}

.palette-label {
  padding: 1rem;
  line-height: 1.25;
  letter-spacing: 0.03em;
}

.palette-line {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 500;
}

.masonry-horizontal {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.masonry-col {
  flex: 1 1 0;
  min-width: 0;
}

.masonry-col:first-child {
  flex: 1.18 1 0;
}

.masonry-col:last-child {
  flex: 0.82 1 0;
}

.tio-hero-img {
  box-shadow: 0 20px 60px rgba(35, 35, 35, 0.08);
}

@media (min-width: 1280px) {
  .tio-loop-frame {
    width: 72vw;
  }
}

@media (min-width: 970px) and (max-width: 1279px) {
  .tio-loop-frame {
    width: 84vw;
  }
}

@media (max-width: 760px) {
  .masonry-horizontal {
    flex-direction: column;
    gap: 0.75rem;
  }

  .masonry-col:first-child,
  .masonry-col:last-child {
    flex: 1 1 auto;
  }

  .palette-swatch {
    min-height: 84px;
  }

  .tio-hero {
    margin-left: calc(50% - 50vw);
    margin-right: calc(50% - 50vw);
  }

  .tio-hero-img {
    width: 100%;
    max-width: 100% !important;
    border-radius: 0 !important;
  }

  .tio-loop-section {
    margin-left: calc(50% - 50vw);
    margin-right: calc(50% - 50vw);
  }

  .tio-loop-frame {
    width: 100%;
    border-radius: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .tio-loop-slide {
    transition: none;
  }

  .masonry-reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
