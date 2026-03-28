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

    <Card
      class="project-summary-card bg-[var(--surface-muted)] text-[var(--text-secondary)] shadow-none"
    >
      <template #content>
        <div class="flex flex-col gap-4 p-4 md:p-6">
          <h2 class="font-display m-0 text-4xl uppercase">Académie Clé Do Ré</h2>

          <div class="font-['Red_Hat_Text'] font-light">
            <p>
              Designed a charming and minimalist website for a music academy based in Toulouse,
              managed by Bérangère. The site features a light color palette that complements the
              academy's logo, enhanced with playful yellow and black accents. Embodying a
              child-friendly and light-hearted aesthetic, the website integrates delightful
              animations and whimsical drawings of little characters engaged in musical activities.
              It offers a user-friendly interface where visitors can effortlessly view the academy’s
              offerings, pricing, and other services. This design ensures an engaging and visually
              appealing experience for visitors of all ages.
            </p>
          </div>

          <div class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div class="md:w-8/12">
              <h2 class="mb-3 text-xl tracking-wide uppercase">Responsibilities</h2>
              <p class="font-['Red_Hat_Text'] font-light">
                Web design personalization, Squarespace setup, Site development, Website launch.
              </p>
            </div>

            <div class="md:w-4/12 md:pl-10">
              <h2 class="mb-3 text-xl tracking-wide uppercase">URL</h2>
              <a
                href="http://academiecledore.fr/"
                target="_blank"
                rel="noopener noreferrer"
                class="font-['Red_Hat_Text'] font-light text-inherit"
              >
                academiecledore.fr
              </a>
            </div>
          </div>
        </div>
      </template>
    </Card>

    <section ref="galleryRoot" class="justified-gallery" :class="{ 'is-ready': galleryReady }">
      <div v-for="(row, rowIndex) in justifiedRows" :key="`row-${rowIndex}`" class="justified-row">
        <article
          v-for="(item, index) in row.items"
          :key="item.key"
          class="justified-item masonry-reveal"
          :style="{
            width: `${item.width}px`,
            '--reveal-delay': `${Math.min((rowIndex * 4 + index) * 35, 420)}ms`,
          }"
        >
          <component
            :is="item.href ? 'a' : 'div'"
            class="justified-media-link"
            :href="item.href || undefined"
            :target="item.href ? '_blank' : undefined"
            :rel="item.href ? 'noopener noreferrer' : undefined"
            :aria-label="item.href ? `${item.alt} — open project website` : undefined"
          >
            <picture v-if="item.type === 'image'">
              <source
                type="image/avif"
                :srcset="`
                  ${item.basePath}-640.avif 640w,
                  ${item.basePath}-960.avif 960w,
                  ${item.basePath}-1280.avif 1280w,
                  ${item.basePath}-1920.avif 1920w
                `"
                sizes="100vw"
              />
              <source
                type="image/webp"
                :srcset="`
                  ${item.basePath}-640.webp 640w,
                  ${item.basePath}-960.webp 960w,
                  ${item.basePath}-1280.webp 1280w,
                  ${item.basePath}-1920.webp 1920w
                `"
                sizes="100vw"
              />
              <img
                :src="`${item.basePath}-960.png`"
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
          </component>
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

    <div class="h-24 flex-none"></div>
  </section>
</template>

<script>
import Card from 'primevue/card';
import Button from 'primevue/button';
import projects from '@/web-dev-projects';
import allProjects from '@/all-projects';

export default {
  name: 'AcademieCleDoReProject',
  components: { Card, Button },
  data() {
    return {
      projects,
      masonryObserver: null,
      galleryResizeObserver: null,
      galleryResizeRaf: null,
      galleryWidth: 0,
      mediaAspectRatios: {},
      justifiedRows: [],
      galleryReady: false,
      galleryItems: [
        {
          key: 'academie-scroll-1',
          type: 'video',
          src: '/media/videos/academie-cle-do-re-scroll-1.mp4',
          alt: 'Académie Clé Do Ré website preview video 1',
        },
        {
          key: 'academie-hero',
          type: 'image',
          basePath: '/assets/media/projects/web-dev/academie-cle-do-re/academie-cle-do-re-hero',
          alt: 'Académie Clé Do Ré homepage hero section',
        },
        {
          key: 'academie-melodie',
          type: 'image',
          basePath:
            '/assets/media/projects/web-dev/academie-cle-do-re/academie-cle-do-re-melodie',
          alt: 'Académie Clé Do Ré melody section',
        },
        {
          key: 'academie-scroll-2',
          type: 'video',
          src: '/media/videos/academie-cle-do-re-scroll-2.mp4',
          alt: 'Académie Clé Do Ré website preview video 2',
        },
        {
          key: 'academie-reductions',
          type: 'image',
          basePath:
            '/assets/media/projects/web-dev/academie-cle-do-re/academie-cle-do-re-reductions',
          alt: 'Académie Clé Do Ré reductions section',
        },
        {
          key: 'academie-programme',
          type: 'image',
          basePath:
            '/assets/media/projects/web-dev/academie-cle-do-re/academie-cle-do-re-programme',
          alt: 'Académie Clé Do Ré program section',
        },
        {
          key: 'academie-adresses',
          type: 'image',
          basePath:
            '/assets/media/projects/web-dev/academie-cle-do-re/academie-cle-do-re-adresses',
          alt: 'Académie Clé Do Ré addresses section',
        },
        {
          key: 'academie-nouveaute',
          type: 'image',
          basePath:
            '/assets/media/projects/web-dev/academie-cle-do-re/academie-cle-do-re-nouveaute',
          alt: 'Académie Clé Do Ré news section',
        },
      ],
    };
  },
  computed: {
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
    getTargetRowHeight() {
      if (this.galleryWidth >= 1280) return 300;
      if (this.galleryWidth >= 960) return 260;
      if (this.galleryWidth >= 720) return 220;
      return 180;
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
        const rowSize = pattern[patternIndex % pattern.length] || 1;
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
          image.src = `${item.basePath}-960.png`;
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
    this.setupJustifiedGallery();
    this.primeAspectRatios();
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

.justified-media-link {
  display: block;
  overflow: hidden;
  text-decoration: none;
  border-radius: var(--project-card-radius);
  border: 1px solid var(--surface-muted);
  background: #f5efe8;
}

.justified-media {
  width: 100%;
  display: block;
  border-radius: var(--project-card-radius);
  transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
}

@media (hover: hover) and (pointer: fine) {
  .justified-media-link[href]:hover .justified-media,
  .justified-media-link[href]:focus-visible .justified-media {
    transform: scale(1.04);
  }
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
  .justified-gallery,
  .justified-row {
    gap: 0.75rem;
  }
}

@media (max-width: 640px) {
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
</style>
