<template>
  <section class="relative container mx-auto flex flex-col gap-4 px-4 py-4">
    <!-- Back to list -->
    <div class="flex items-center justify-between">
      <Button
        label="Back to projects"
        icon="pi pi-arrow-left"
        text
        class="btn-link"
        @click="$router.push('/achievements')"
      />
    </div>

    <!-- Project summary -->
    <Card
      class="project-summary-card bg-[var(--surface-muted)] text-[var(--text-secondary)] shadow-none"
    >
      <template #content>
        <div class="flex flex-col gap-4 p-4 md:p-6">
          <h2 class="font-display m-0 text-4xl uppercase">Can Pruna accomodation</h2>

          <div class="font-['Red_Hat_Text'] font-light">
            <p>
              The website, built with Nuxt.js, Vue 3, and Vite, adapts seamlessly across desktop,
              tablet, and mobile screens, ensuring every visitor enjoys a smooth experience. An
              elegant, responsive photo gallery showcases the Masía’s interiors and Montseny
              surroundings, while a custom map component pinpoints Can Pruna’s location in the
              natural park. A dedicated testimonials section brings guest reviews to life, and a
              clear, user-friendly inquiry form makes it easy to send questions. The site is fully
              bilingual, offering content in Catalan and Spanish to serve its local audience. Under
              the hood, static-site generation and image optimization keep load times fast, while
              Vue’s transition system adds subtle, polished interactions throughout.
            </p>
          </div>

          <div class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div class="md:w-8/12">
              <h2 class="mb-3 text-xl tracking-wide uppercase">Responsibilities</h2>
              <p class="font-['Red_Hat_Text'] font-light">
                Visual identity & brand illustration, Web design personalization, Full-stack site
                development, Website launch, On-site photography & retouching
              </p>
            </div>

            <div class="md:w-4/12 md:pl-10">
              <h2 class="mb-3 text-xl tracking-wide uppercase">URL</h2>
              <a
                href="https://canprunaderiells.es/"
                target="_blank"
                class="font-['Red_Hat_Text'] font-light text-inherit"
              >
                canprunaderiells.es
              </a>
            </div>
          </div>
        </div>
      </template>
    </Card>

    <section
      ref="gallerySection"
      class="canpruna-gallery"
      :style="gallerySectionStyle"
      aria-label="Can Pruna project gallery"
    >
      <div ref="galleryStage" class="canpruna-gallery-stage" :style="galleryStageStyle">
        <div class="canpruna-gallery-viewport">
          <div ref="galleryTrack" class="canpruna-gallery-track" :style="galleryTrackStyle">
            <figure v-for="media in galleryMedia" :key="media.src" class="canpruna-gallery-item">
              <video
                v-if="media.type === 'video'"
                :src="media.src"
                :aria-label="media.alt"
                autoplay
                muted
                loop
                playsinline
                preload="metadata"
                class="canpruna-gallery-media"
                @loadedmetadata="scheduleGalleryMeasure"
              ></video>
              <img
                v-else
                :src="media.src"
                :alt="media.alt"
                loading="lazy"
                decoding="async"
                class="canpruna-gallery-media"
                @load="scheduleGalleryMeasure"
              />
            </figure>
          </div>
        </div>
      </div>
    </section>

    <!-- Bottom prev/next -->
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
        class="p-button-outlined"
        icon-pos="right"
        icon="pi pi-arrow-right"
        @click="navigateTo(nextProject)"
      />
    </div>
    <div class="h-24 flex-none"></div>
  </section>
</template>

<script>
import Card from 'primevue/card';
import Button from 'primevue/button';
import projects from '@/web-dev-projects';
import allProjects from '@/all-projects';

export default {
  name: 'CanPrunaAccomodationProject',
  components: { Card, Button },
  data() {
    return {
      projects,
      galleryScrollHeight: 0,
      galleryTranslate: 0,
      galleryMaxTranslate: 0,
      galleryStickyTop: 16,
      galleryStageHeight: 0,
      galleryMeasureRaf: null,
      galleryScrollRaf: null,
      galleryResizeObserver: null,
      galleryScroller: null,
      galleryMedia: [
        {
          type: 'image',
          src: '/assets/media/projects/web-dev/canpruna-accomodation/canpruna-full-01-1920.avif',
          alt: 'Can Pruna portfolio image 1',
        },
        {
          type: 'video',
          src: '/media/videos/canpruna-gallery.mp4',
          alt: 'Can Pruna gallery video',
        },
        ...[8, 2, 12, 9, 3, 13, 10, 4, 11, 5, 6, 7].map((imageNumber) => ({
          type: 'image',
          src: `/assets/media/projects/web-dev/canpruna-accomodation/canpruna-full-${String(imageNumber).padStart(2, '0')}-1920.avif`,
          alt: `Can Pruna portfolio image ${imageNumber}`,
        })),
      ],
    };
  },
  computed: {
    gallerySectionStyle() {
      if (!this.galleryScrollHeight) return undefined;
      return { height: `${this.galleryScrollHeight}px` };
    },
    galleryStageStyle() {
      return { top: `${this.galleryStickyTop}px` };
    },
    galleryTrackStyle() {
      return {
        transform: `translate3d(${-this.galleryTranslate}px, 0, 0)`,
      };
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
    getGalleryScroller() {
      const scroller = document.querySelector('main[data-scroll-container]');
      return scroller instanceof HTMLElement ? scroller : null;
    },
    measureGallery() {
      const stage = this.$refs.galleryStage;
      const track = this.$refs.galleryTrack;
      const scroller = this.galleryScroller || this.getGalleryScroller();
      if (!(stage instanceof HTMLElement)) return;
      if (!(track instanceof HTMLElement)) return;
      if (!(scroller instanceof HTMLElement)) return;

      const viewportWidth = stage.clientWidth;
      const stageHeight = stage.offsetHeight;
      const maxTranslate = Math.max(track.scrollWidth - viewportWidth, 0);
      const stickyTop = Math.max((scroller.clientHeight - stageHeight) / 2, 16);

      this.galleryMaxTranslate = maxTranslate;
      this.galleryStickyTop = stickyTop;
      this.galleryStageHeight = stageHeight;
      this.galleryScrollHeight = stickyTop + stageHeight + maxTranslate;
      this.syncGalleryScroll();
    },
    scheduleGalleryMeasure() {
      if (this.galleryMeasureRaf != null) return;
      this.galleryMeasureRaf = window.requestAnimationFrame(() => {
        this.galleryMeasureRaf = null;
        this.measureGallery();
      });
    },
    syncGalleryScroll() {
      const section = this.$refs.gallerySection;
      const scroller = this.galleryScroller || this.getGalleryScroller();
      if (!(section instanceof HTMLElement)) return;
      if (!(scroller instanceof HTMLElement)) return;

      const maxTranslate = this.galleryMaxTranslate;
      if (maxTranslate <= 0) {
        this.galleryTranslate = 0;
        return;
      }

      const scrollerRect = scroller.getBoundingClientRect();
      const sectionRect = section.getBoundingClientRect();
      const scrolledThrough = scrollerRect.top + this.galleryStickyTop - sectionRect.top;
      const scrollRange = Math.max(
        this.galleryScrollHeight - this.galleryStickyTop - this.galleryStageHeight,
        1,
      );
      const progress = Math.min(Math.max(scrolledThrough / scrollRange, 0), 1);
      this.galleryTranslate = progress * maxTranslate;
    },
    scheduleGalleryScroll() {
      if (this.galleryScrollRaf != null) return;
      this.galleryScrollRaf = window.requestAnimationFrame(() => {
        this.galleryScrollRaf = null;
        this.syncGalleryScroll();
      });
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.galleryScroller = this.getGalleryScroller();
      if (this.galleryScroller) {
        this.galleryScroller.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      }

      this.measureGallery();

      if (this.galleryScroller) {
        this.galleryScroller.addEventListener('scroll', this.scheduleGalleryScroll, {
          passive: true,
        });
      }
      window.addEventListener('resize', this.scheduleGalleryMeasure, { passive: true });

      const section = this.$refs.gallerySection;
      if (section instanceof HTMLElement && typeof ResizeObserver === 'function') {
        this.galleryResizeObserver = new ResizeObserver(this.scheduleGalleryMeasure);
        this.galleryResizeObserver.observe(section);
      }
    });
  },
  beforeUnmount() {
    if (this.galleryScroller) {
      this.galleryScroller.removeEventListener('scroll', this.scheduleGalleryScroll);
      this.galleryScroller = null;
    }
    window.removeEventListener('resize', this.scheduleGalleryMeasure);

    if (this.galleryResizeObserver) {
      this.galleryResizeObserver.disconnect();
      this.galleryResizeObserver = null;
    }
    if (this.galleryMeasureRaf != null) {
      window.cancelAnimationFrame(this.galleryMeasureRaf);
      this.galleryMeasureRaf = null;
    }
    if (this.galleryScrollRaf != null) {
      window.cancelAnimationFrame(this.galleryScrollRaf);
      this.galleryScrollRaf = null;
    }
  },
};
</script>

<style scoped>
.canpruna-gallery {
  position: relative;
  width: 100%;
}

.canpruna-gallery-stage {
  position: sticky;
  top: 1rem;
  width: 100%;
  overflow: hidden;
}

.canpruna-gallery-viewport {
  width: 100%;
  overflow: hidden;
}

.canpruna-gallery-track {
  display: flex;
  gap: 1rem;
  width: max-content;
  will-change: transform;
}

.canpruna-gallery-item {
  flex: 0 0 auto;
  margin: 0;
  height: min(68vh, 42rem);
  max-height: calc(100vh - 8rem);
  display: flex;
  align-items: center;
}

.canpruna-gallery-media {
  display: block;
  width: auto;
  height: 100%;
  max-width: none;
  object-fit: cover;
}

@media screen and (min-width: 768px) {
  .canpruna-gallery-track {
    gap: 1.25rem;
  }

  .canpruna-gallery-item {
    height: min(76vh, 48rem);
    max-height: calc(100vh - 10rem);
  }
}

@media (max-width: 767px) {
  .canpruna-gallery-track {
    gap: 0.75rem;
  }

  .canpruna-gallery-item {
    height: min(68vh, 36rem);
    max-height: calc(100vh - 7rem);
  }
}
</style>
