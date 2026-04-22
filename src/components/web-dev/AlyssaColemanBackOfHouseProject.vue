<template>
  <section class="relative container mx-auto flex flex-col gap-4 px-4 py-4">
    <div class="flex items-center justify-between">
      <Button
        label="Back to projects"
        icon="pi pi-arrow-left"
        text
        class="btn-link"
        @click="$router.push('/achievements')"
      />
    </div>

    <section v-if="isPreviewMode" class="preview-shell">
      <div class="preview-stage">
        <div class="preview-sticker" aria-label="Project coming soon">
          <span>Soon to be released</span>
        </div>

        <video
          :src="previewVideo.src"
          :aria-label="previewVideo.alt"
          class="preview-video"
          autoplay
          loop
          muted
          playsinline
          preload="metadata"
        ></video>
      </div>
    </section>

    <template v-else>
      <Card
        class="project-summary-card bg-[var(--surface-muted)] text-[var(--text-secondary)] shadow-none"
      >
        <template #content>
          <div class="flex flex-col gap-5 p-4 md:p-6">
            <h2 class="font-display m-0 text-4xl uppercase">Alyssa Coleman - Back of House</h2>

            <div class="font-['Red_Hat_Text'] font-light">
              <p v-for="paragraph in descriptionParagraphs" :key="paragraph" class="mb-4 last:mb-0">
                {{ paragraph }}
              </p>
            </div>

            <div class="flex flex-col gap-4 md:flex-row md:items-start md:gap-10">
              <div class="w-full md:max-w-8/12 md:min-w-0 md:basis-8/12">
                <h2 class="mb-3 text-xl tracking-wide uppercase">Responsibilities</h2>
                <p class="font-['Red_Hat_Text'] font-light">
                  {{ responsibilitiesLine }}
                </p>
              </div>

              <div class="w-full md:max-w-4/12 md:basis-4/12">
                <h2 class="mb-3 text-xl tracking-wide uppercase">URL</h2>
                <a
                  href="https://alyssacoleman.ca/"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="font-['Red_Hat_Text'] font-light text-inherit"
                >
                  alyssacoleman.ca
                </a>
              </div>
            </div>
          </div>
        </template>
      </Card>

      <section ref="galleryRoot" class="justified-gallery" :class="{ 'is-ready': galleryReady }">
        <div
          v-for="(row, rowIndex) in justifiedRows"
          :key="`row-${rowIndex}`"
          class="justified-row"
        >
          <article
            v-for="(item, index) in row.items"
            :key="item.key"
            class="justified-item masonry-reveal"
            :style="{
              width: `${item.width}px`,
              '--reveal-delay': `${Math.min((rowIndex * 4 + index) * 35, 420)}ms`,
            }"
          >
            <picture v-if="item.type === 'image'">
              <source type="image/webp" :srcset="item.webpSrc" />
              <img
                :src="item.src"
                :alt="item.alt"
                class="justified-media"
                loading="lazy"
                decoding="async"
              />
            </picture>

            <video
              v-else
              :src="item.src"
              :aria-label="item.alt"
              class="justified-media"
              autoplay
              loop
              muted
              playsinline
              preload="metadata"
            ></video>
          </article>
        </div>
      </section>

      <div class="mt-6 mb-8 flex flex-col items-center justify-between gap-4 md:flex-row md:gap-2">
        <Button
          v-if="hasPrevProject"
          label="Previous"
          icon="pi pi-arrow-left"
          class="p-button-outlined"
          @click="navigateTo(prevProject)"
        />

        <span class="text-xl font-semibold uppercase">{{ current.title }}</span>

        <Button
          v-if="hasNextProject"
          label="Next"
          icon-pos="right"
          icon="pi pi-arrow-right"
          @click="navigateTo(nextProject)"
        />
      </div>
    </template>

    <div class="h-24 flex-none"></div>
  </section>
</template>

<script>
import Card from 'primevue/card';
import Button from 'primevue/button';
import projects from '@/web-dev-projects';
import allProjects from '@/all-projects';

const imageBase = '/assets/media/projects/web-dev/alyssa-coleman-back-of-house';
const isPreviewMode = true;

const descriptionParagraphs = [
  'Design and development of a high-conversion website for Alyssa Coleman’s signature program, Back of House. The goal was to translate her bold, no-fluff positioning into a digital experience that feels both editorial and strategic, where personality drives structure, and every section serves conversion.',
  'The project focused on creating a clear narrative flow: guiding the user from curiosity to decision through punchy messaging, layered storytelling, and strong visual hierarchy. Inspired by the culinary metaphor behind the brand, the interface plays with menu-like structures, structured sections, and unexpected interactions to keep the experience engaging without overwhelming. Particular attention was given to rhythm and pacing: how elements appear, how content is revealed, and how users move through the page.',
  'The project was developed in collaboration with Lara Gonzalez, who defined the brand direction (logo, tone of voice, brandbook). The website design and overall digital experience were then fully translated and crafted into a functional interface. The result is a website that balances personality and precision, expressive, but controlled, designed to convert while reinforcing a strong, recognizable brand voice.',
];

const responsibilities = [
  'UX strategy and page architecture',
  'Website design and layout creation',
  'Integration and customization in Showit',
  'Development of custom interactions and animations',
  'Content structuring and hierarchy optimization for conversion',
  'Responsive adaptation',
];

const galleryItems = [
  {
    key: 'still-01',
    type: 'image',
    src: `${imageBase}/alyssa-coleman-back-of-house-still-01.png`,
    webpSrc: `${imageBase}/alyssa-coleman-back-of-house-still-01.webp`,
    alt: 'Back of House screen still 01',
  },
  {
    key: 'motion-01',
    type: 'video',
    src: '/media/videos/alyssa-coleman-back-of-house-motion-01.mp4',
    alt: 'Back of House motion 01',
  },
  {
    key: 'still-02',
    type: 'image',
    src: `${imageBase}/alyssa-coleman-back-of-house-still-02.png`,
    webpSrc: `${imageBase}/alyssa-coleman-back-of-house-still-02.webp`,
    alt: 'Back of House screen still 02',
  },
  {
    key: 'still-03',
    type: 'image',
    src: `${imageBase}/alyssa-coleman-back-of-house-still-03.png`,
    webpSrc: `${imageBase}/alyssa-coleman-back-of-house-still-03.webp`,
    alt: 'Back of House screen still 03',
  },
  {
    key: 'still-04',
    type: 'image',
    src: `${imageBase}/alyssa-coleman-back-of-house-still-04.png`,
    webpSrc: `${imageBase}/alyssa-coleman-back-of-house-still-04.webp`,
    alt: 'Back of House screen still 04',
  },
  {
    key: 'still-05',
    type: 'image',
    src: `${imageBase}/alyssa-coleman-back-of-house-still-05.png`,
    webpSrc: `${imageBase}/alyssa-coleman-back-of-house-still-05.webp`,
    alt: 'Back of House screen still 05',
  },
  {
    key: 'motion-02',
    type: 'video',
    src: '/media/videos/alyssa-coleman-back-of-house-motion-02.mp4',
    alt: 'Back of House motion 02',
  },
  {
    key: 'still-06',
    type: 'image',
    src: `${imageBase}/alyssa-coleman-back-of-house-still-06.png`,
    webpSrc: `${imageBase}/alyssa-coleman-back-of-house-still-06.webp`,
    alt: 'Back of House screen still 06',
  },
  {
    key: 'still-07',
    type: 'image',
    src: `${imageBase}/alyssa-coleman-back-of-house-still-07.png`,
    webpSrc: `${imageBase}/alyssa-coleman-back-of-house-still-07.webp`,
    alt: 'Back of House screen still 07',
  },
  {
    key: 'still-08',
    type: 'image',
    src: `${imageBase}/alyssa-coleman-back-of-house-still-08.png`,
    webpSrc: `${imageBase}/alyssa-coleman-back-of-house-still-08.webp`,
    alt: 'Back of House screen still 08',
  },
  {
    key: 'motion-03',
    type: 'video',
    src: '/media/videos/alyssa-coleman-back-of-house-motion-03.mp4',
    alt: 'Back of House motion 03',
  },
  {
    key: 'still-09',
    type: 'image',
    src: `${imageBase}/alyssa-coleman-back-of-house-still-09.png`,
    webpSrc: `${imageBase}/alyssa-coleman-back-of-house-still-09.webp`,
    alt: 'Back of House screen still 09',
  },
  {
    key: 'still-10',
    type: 'image',
    src: `${imageBase}/alyssa-coleman-back-of-house-still-10.png`,
    webpSrc: `${imageBase}/alyssa-coleman-back-of-house-still-10.webp`,
    alt: 'Back of House screen still 10',
  },
  {
    key: 'motion-04',
    type: 'video',
    src: '/media/videos/alyssa-coleman-back-of-house-motion-04.mp4',
    alt: 'Back of House motion 04',
  },
  {
    key: 'still-11',
    type: 'image',
    src: `${imageBase}/alyssa-coleman-back-of-house-still-11.png`,
    webpSrc: `${imageBase}/alyssa-coleman-back-of-house-still-11.webp`,
    alt: 'Back of House screen still 11',
  },
  {
    key: 'still-12',
    type: 'image',
    src: `${imageBase}/alyssa-coleman-back-of-house-still-12.png`,
    webpSrc: `${imageBase}/alyssa-coleman-back-of-house-still-12.webp`,
    alt: 'Back of House screen still 12',
  },
  {
    key: 'still-13',
    type: 'image',
    src: `${imageBase}/alyssa-coleman-back-of-house-still-13.png`,
    webpSrc: `${imageBase}/alyssa-coleman-back-of-house-still-13.webp`,
    alt: 'Back of House screen still 13',
  },
  {
    key: 'still-14',
    type: 'image',
    src: `${imageBase}/alyssa-coleman-back-of-house-still-14.png`,
    webpSrc: `${imageBase}/alyssa-coleman-back-of-house-still-14.webp`,
    alt: 'Back of House screen still 14',
  },
  {
    key: 'motion-05',
    type: 'video',
    src: '/media/videos/alyssa-coleman-back-of-house-motion-05.mp4',
    alt: 'Back of House motion 05',
  },
  {
    key: 'still-15',
    type: 'image',
    src: `${imageBase}/alyssa-coleman-back-of-house-still-15.png`,
    webpSrc: `${imageBase}/alyssa-coleman-back-of-house-still-15.webp`,
    alt: 'Back of House screen still 15',
  },
  {
    key: 'still-16',
    type: 'image',
    src: `${imageBase}/alyssa-coleman-back-of-house-still-16.png`,
    webpSrc: `${imageBase}/alyssa-coleman-back-of-house-still-16.webp`,
    alt: 'Back of House screen still 16',
  },
  {
    key: 'motion-06',
    type: 'video',
    src: '/media/videos/alyssa-coleman-back-of-house-motion-06.mp4',
    alt: 'Back of House motion 06',
  },
  {
    key: 'still-17',
    type: 'image',
    src: `${imageBase}/alyssa-coleman-back-of-house-still-17.png`,
    webpSrc: `${imageBase}/alyssa-coleman-back-of-house-still-17.webp`,
    alt: 'Back of House screen still 17',
  },
  {
    key: 'home-motion',
    type: 'video',
    src: '/media/videos/alyssa-coleman-back-of-house-home.mp4',
    alt: 'Back of House home motion',
  },
  {
    key: 'still-18',
    type: 'image',
    src: `${imageBase}/alyssa-coleman-back-of-house-still-18.png`,
    webpSrc: `${imageBase}/alyssa-coleman-back-of-house-still-18.webp`,
    alt: 'Back of House screen still 18',
  },
  {
    key: 'still-19',
    type: 'image',
    src: `${imageBase}/alyssa-coleman-back-of-house-still-19.png`,
    webpSrc: `${imageBase}/alyssa-coleman-back-of-house-still-19.webp`,
    alt: 'Back of House screen still 19',
  },
  {
    key: 'still-20',
    type: 'image',
    src: `${imageBase}/alyssa-coleman-back-of-house-still-20.png`,
    webpSrc: `${imageBase}/alyssa-coleman-back-of-house-still-20.webp`,
    alt: 'Back of House screen still 20',
  },
  {
    key: 'still-21',
    type: 'image',
    src: `${imageBase}/alyssa-coleman-back-of-house-still-21.png`,
    webpSrc: `${imageBase}/alyssa-coleman-back-of-house-still-21.webp`,
    alt: 'Back of House screen still 21',
  },
];

export default {
  name: 'AlyssaColemanBackOfHouseProject',
  components: { Card, Button },
  data() {
    return {
      isPreviewMode,
      projects,
      descriptionParagraphs,
      responsibilitiesLine: responsibilities.join(', '),
      galleryItems,
      masonryObserver: null,
      galleryResizeObserver: null,
      galleryResizeRaf: null,
      galleryWidth: 0,
      mediaAspectRatios: {},
      justifiedRows: [],
      galleryReady: false,
    };
  },
  computed: {
    previewVideo() {
      return (
        this.galleryItems.find((item) => item.key === 'motion-01') || {
          src: '/media/videos/alyssa-coleman-back-of-house-motion-01.mp4',
          alt: 'Back of House motion 01',
        }
      );
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
      if (!this.navProjects.length) return this.current;
      if (!this.hasPrevProject) return this.current;
      return this.navProjects[this.navCurrentIndex - 1];
    },
    nextProject() {
      if (!this.navProjects.length) return this.current;
      if (!this.hasNextProject) return this.current;
      return this.navProjects[this.navCurrentIndex + 1];
    },
  },
  methods: {
    navigateTo(project) {
      if (project?.projectLink) this.$router.push(project.projectLink);
    },
    getImageSrc(item) {
      return item.src;
    },
    getEditorialRowPattern() {
      if (this.galleryWidth >= 1200) return [1, 2, 1, 2, 2, 1];
      if (this.galleryWidth >= 900) return [1, 2, 2, 1, 2];
      if (this.galleryWidth >= 640) return [1, 2, 1, 2];
      return [1];
    },
    buildJustifiedRow(items, gap) {
      const ratioSum = items.reduce((sum, item) => sum + item.aspectRatio, 0) || items.length || 1;
      const availableWidth = Math.max(this.galleryWidth - gap * Math.max(items.length - 1, 0), 1);
      const rowHeight = availableWidth / ratioSum;
      let consumedWidth = 0;

      const laidOutItems = items.map((item, index) => {
        if (index === items.length - 1) {
          const width = Math.max(1, Math.round(availableWidth - consumedWidth));
          return { ...item, width };
        }

        const width = Math.max(1, Math.round(rowHeight * item.aspectRatio));
        consumedWidth += width;
        return { ...item, width };
      });

      return {
        height: rowHeight,
        items: laidOutItems,
      };
    },
    refreshJustifiedRows() {
      if (!this.galleryWidth) return;

      const gap = 16;
      const items = this.galleryItems.map((item) => ({
        ...item,
        aspectRatio: this.mediaAspectRatios[item.key] || (item.type === 'video' ? 16 / 9 : 1),
      }));
      const pattern = this.getEditorialRowPattern();
      const rows = [];
      let cursor = 0;
      let patternIndex = 0;

      while (cursor < items.length) {
        const remainingItems = items.length - cursor;
        const rowSize = remainingItems === 2 ? 2 : pattern[patternIndex % pattern.length] || 1;
        const rowItems = items.slice(cursor, cursor + rowSize);
        if (!rowItems.length) break;
        rows.push(this.buildJustifiedRow(rowItems, gap));
        cursor += rowItems.length;
        patternIndex += 1;
      }

      this.justifiedRows = rows;
      this.$nextTick(() => {
        this.setupMasonryReveal();
      });
    },
    loadAspectRatio(item) {
      if (item.type === 'image') {
        return new Promise((resolve) => {
          const image = new Image();
          image.onload = () => resolve(image.naturalWidth / image.naturalHeight || 1);
          image.onerror = () => resolve(1);
          image.src = this.getImageSrc(item);
        });
      }

      return new Promise((resolve) => {
        const video = document.createElement('video');
        video.preload = 'metadata';
        video.onloadedmetadata = () => resolve(video.videoWidth / video.videoHeight || 16 / 9);
        video.onerror = () => resolve(16 / 9);
        video.src = item.src;
      });
    },
    async primeAspectRatios() {
      const ratios = await Promise.all(
        this.galleryItems.map(async (item) => [item.key, await this.loadAspectRatio(item)]),
      );

      this.mediaAspectRatios = ratios.reduce((acc, [key, ratio]) => {
        acc[key] = ratio;
        return acc;
      }, {});

      this.galleryReady = true;
      this.refreshJustifiedRows();
    },
    setupJustifiedGallery() {
      const gallery = this.$refs.galleryRoot;
      if (!gallery || typeof window === 'undefined') return;

      const updateWidth = () => {
        const nextWidth = Math.max(Math.floor(gallery.clientWidth), 0);
        if (!nextWidth || nextWidth === this.galleryWidth) return;
        this.galleryWidth = nextWidth;
        this.refreshJustifiedRows();
      };

      const scheduleWidthUpdate = () => {
        if (this.galleryResizeRaf != null) return;
        this.galleryResizeRaf = window.requestAnimationFrame(() => {
          this.galleryResizeRaf = null;
          updateWidth();
        });
      };

      updateWidth();

      if (typeof window.ResizeObserver === 'function') {
        this.galleryResizeObserver = new ResizeObserver(() => {
          scheduleWidthUpdate();
        });
        this.galleryResizeObserver.observe(gallery);
      } else {
        window.addEventListener('resize', scheduleWidthUpdate);
        this._fallbackGalleryResize = scheduleWidthUpdate;
      }
    },
    setupMasonryReveal() {
      if (this.masonryObserver) {
        this.masonryObserver.disconnect();
        this.masonryObserver = null;
      }

      const targets = this.$el?.querySelectorAll?.('.masonry-reveal');
      if (!targets?.length) return;

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
        { root: null, rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
      );

      targets.forEach((el) => this.masonryObserver.observe(el));
    },
  },
  mounted() {
    window.scrollTo(0, 0);
    if (!this.isPreviewMode) {
      this.setupJustifiedGallery();
      this.primeAspectRatios();
    }
  },
  beforeUnmount() {
    if (this.masonryObserver) {
      this.masonryObserver.disconnect();
      this.masonryObserver = null;
    }
    if (this.galleryResizeObserver) {
      this.galleryResizeObserver.disconnect();
      this.galleryResizeObserver = null;
    }
    if (this.galleryResizeRaf != null && typeof window !== 'undefined') {
      window.cancelAnimationFrame(this.galleryResizeRaf);
      this.galleryResizeRaf = null;
    }
    if (this._fallbackGalleryResize && typeof window !== 'undefined') {
      window.removeEventListener('resize', this._fallbackGalleryResize);
    }
  },
};
</script>

<style scoped>
.preview-shell {
  position: relative;
  min-height: calc(100vh - 9rem);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(1rem, 2vw, 1.5rem) 0 2rem;
}

.preview-stage {
  position: relative;
  width: min(100%, 1120px);
}

.preview-stage::after {
  content: none;
}

.preview-video {
  position: relative;
  display: block;
  width: 100%;
  min-height: min(78vh, 880px);
  max-height: 82vh;
  object-fit: cover;
  border-radius: var(--project-card-radius);
  border: 1px solid var(--surface-muted);
  background: #d8c2b1;
}

.preview-sticker {
  position: absolute;
  z-index: 2;
  top: clamp(1.75rem, 5vw, 4rem);
  right: clamp(-4.75rem, -3vw, -2rem);
  transform: rotate(18deg);
  padding: 0.95rem 5.75rem;
  border: 1px solid var(--surface-accent);
  border-radius: var(--project-card-radius);
  background: var(--surface-accent);
  animation: preview-sticker-float 4.8s ease-in-out infinite;
  box-shadow:
    0 18px 35px rgb(37 80 123 / 0.2),
    inset 0 1px 0 rgb(255 255 255 / 0.18);
  pointer-events: none;
}

.preview-sticker span {
  display: block;
  color: var(--surface-base, #fff);
  font-family: 'Synt Mono Regular', monospace;
  font-size: clamp(1.1rem, 1.8vw, 1.65rem);
  line-height: 1.1;
  font-weight: 400;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  white-space: nowrap;
}

@keyframes preview-sticker-float {
  0%,
  100% {
    transform: rotate(18deg) translate3d(0, 0, 0);
  }

  50% {
    transform: rotate(18deg) translate3d(0, -10px, 0);
  }
}

.justified-gallery {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  opacity: 0;
  transition: opacity 0.24s ease;
}

.justified-gallery.is-ready {
  opacity: 1;
}

.justified-row {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.justified-item {
  min-width: 0;
  flex: 0 0 auto;
}

.justified-item picture {
  display: block;
}

.justified-media {
  width: 100%;
  display: block;
  border-radius: var(--project-card-radius);
  border: 1px solid var(--surface-muted);
  background: #f5efe8;
}

.masonry-reveal {
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity 0.6s ease,
    transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: var(--reveal-delay, 0ms);
}

.masonry-reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 960px) {
  .preview-video {
    min-height: 62vh;
  }

  .justified-gallery,
  .justified-row {
    gap: 0.75rem;
  }
}

@media (max-width: 640px) {
  .preview-shell {
    min-height: auto;
    padding-bottom: 1rem;
  }

  .preview-video {
    min-height: auto;
    max-height: none;
    aspect-ratio: 9 / 16;
    border-radius: var(--project-card-radius);
  }

  .preview-sticker {
    top: 1.5rem;
    right: -5.9rem;
    padding: 0.7rem 4.5rem;
  }

  .preview-sticker span {
    font-size: 1.15rem;
  }

  .justified-gallery,
  .justified-row {
    gap: 0.625rem;
  }

  .masonry-reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .preview-sticker {
    animation: none;
  }
}
</style>
