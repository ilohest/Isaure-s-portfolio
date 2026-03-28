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

    <div class="flex items-center justify-center">
      <picture>
        <source
          type="image/avif"
          srcset="
            /assets/media/branding/elinor/elinor-logo-blue-640.avif 640w,
            /assets/media/branding/elinor/elinor-logo-blue-960.avif 960w,
            /assets/media/branding/elinor/elinor-logo-blue-1280.avif 1280w,
            /assets/media/branding/elinor/elinor-logo-blue-1920.avif 1920w
          "
          sizes="(min-width: 1280px) 1200px, (min-width: 768px) calc(100vw - 5rem), calc(100vw - 2rem)"
        />
        <source
          type="image/webp"
          srcset="
            /assets/media/branding/elinor/elinor-logo-blue-640.webp 640w,
            /assets/media/branding/elinor/elinor-logo-blue-960.webp 960w,
            /assets/media/branding/elinor/elinor-logo-blue-1280.webp 1280w,
            /assets/media/branding/elinor/elinor-logo-blue-1920.webp 1920w
          "
          sizes="(min-width: 1280px) 1200px, (min-width: 768px) calc(100vw - 5rem), calc(100vw - 2rem)"
        />
        <img
          src="/assets/media/branding/elinor/elinor-logo-blue-1920.webp"
          alt="Elinor van de Werve blue logo composition"
          class="border-round-xl block h-auto max-w-full md:m-8"
        />
      </picture>
    </div>

    <Card
      class="project-summary-card bg-[var(--surface-muted)] font-['Red_Hat_Text'] font-light text-[var(--text-secondary)] shadow-none"
    >
      <template #content>
        <div class="flex flex-col gap-4 p-4 md:flex-row md:p-6">
          <div class="flex w-full flex-col gap-4 md:w-3/12">
            <section>
              <h3 class="mb-2 uppercase">Responsibilities</h3>
              <ul class="list-inside list-disc pl-6 text-base">
                <li>Visual identity</li>
                <li>Art direction</li>
                <li>Social network templates</li>
              </ul>
            </section>

            <section>
              <h3 class="mb-2 uppercase">About</h3>

              <div class="flex flex-col gap-1 text-base">
                <p><i class="uppercase">Client: </i>Elinor kinésiologie</p>
                <p><i class="uppercase">Sector: </i>Health &amp; wellness</p>
                <p><i class="uppercase">Country: </i>Belgium</p>
              </div>
            </section>
          </div>

          <div class="md:w-4/12">
            <h3 class="mb-2 uppercase">Project</h3>
            <p>
              Elinor Kinesiology offers personalized holistic care that gently balances body and
              mind through expert muscle-response testing and tailored energy techniques. Elinor
              creates a nurturing environment for expectant mothers, alleviating stress, easing
              tension, and promoting optimal well-being for both mother and baby. Elinor’s
              compassionate approach adapts the unique needs of the patients, guiding them toward a
              more harmonious, energized, and empowered journey.
            </p>
          </div>

          <div class="md:w-5/12">
            <h3 class="mb-2 uppercase">Branding</h3>
            <p>
              This logo is built on a continuous, flowing line that forms an infinity loop, an
              intentional nod to the unending cycle of energy in the body. Its shape subtly echoes
              the therapist’s hands in motion, listening and responding to the body’s own signals.
              By bridging earth and sky, the logo embodies restored balance and the seamless
              connection between physical sensation and emotional well-being. With its clean,
              organic form, it communicates professionalism, trust, and the core kinesiological
              promise of guiding clients back to their natural state of harmony. The typography uses
              slender, elegant typefaces with generous letter-spacing, projecting both precision and
              refinement. The color palette is built from soft pastels, muted tones that work
              together to soothe the senses and reinforce the brand’s promise of balanced,
              restorative care.
            </p>
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
          <div class="justified-media-link">
            <picture>
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
          </div>
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
import Button from 'primevue/button';
import Card from 'primevue/card';
import projects from '@/branding-projects';
import allProjects from '@/all-projects';

const imageBase = '/assets/media/branding/elinor';

export default {
  name: 'ElinorBranding',
  components: { Button, Card },
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
          key: 'elinor-hands-campaign',
          basePath: `${imageBase}/elinor-hands-campaign`,
          alt: 'Elinor hands campaign visual',
          layoutBias: 0.92,
        },
        {
          key: 'elinor-cover-photo',
          basePath: `${imageBase}/elinor-cover-photo`,
          alt: 'Elinor social cover image',
          layoutBias: 1.04,
        },
        {
          key: 'elinor-logo-light',
          basePath: `${imageBase}/elinor-logo-light`,
          alt: 'Elinor van de Werve light logo composition',
          layoutBias: 1.02,
        },
        {
          key: 'elinor-business-cards',
          basePath: `${imageBase}/elinor-business-cards`,
          alt: 'Elinor business cards mockup',
        },
        {
          key: 'elinor-icon-blue',
          basePath: `${imageBase}/elinor-icon-blue`,
          alt: 'Elinor icon on blue background',
          layoutBias: 1.06,
        },
        {
          key: 'elinor-instagram-profile',
          basePath: `${imageBase}/elinor-instagram-profile`,
          alt: 'Elinor Instagram profile overview',
          layoutBias: 0.7,
        },
        {
          key: 'elinor-post-01',
          basePath: `${imageBase}/elinor-post-01`,
          alt: 'Elinor Instagram post 1',
          layoutBias: 0.82,
        },
        {
          key: 'elinor-instagram-main',
          basePath: `${imageBase}/elinor-instagram-main`,
          alt: 'Elinor Instagram main feed view',
          layoutBias: 0.7,
        },
        {
          key: 'elinor-post-02',
          basePath: `${imageBase}/elinor-post-02`,
          alt: 'Elinor Instagram post 2',
          layoutBias: 0.82,
        },
        {
          key: 'elinor-instagram-search-picks',
          basePath: `${imageBase}/elinor-instagram-search-picks`,
          alt: 'Elinor Instagram search picks view',
          layoutBias: 0.7,
        },
        {
          key: 'elinor-post-03',
          basePath: `${imageBase}/elinor-post-03`,
          alt: 'Elinor Instagram post 3',
          layoutBias: 0.82,
        },
        {
          key: 'elinor-story-08',
          basePath: `${imageBase}/elinor-story-08`,
          alt: 'Elinor Instagram story design 8',
          layoutBias: 0.68,
        },
        {
          key: 'elinor-post-05',
          basePath: `${imageBase}/elinor-post-05`,
          alt: 'Elinor Instagram post 5',
          layoutBias: 0.82,
        },
        {
          key: 'elinor-instagram-story-ui',
          basePath: `${imageBase}/elinor-instagram-story-ui`,
          alt: 'Elinor Instagram story interface view',
          layoutBias: 0.7,
        },
        {
          key: 'elinor-post-07',
          basePath: `${imageBase}/elinor-post-07`,
          alt: 'Elinor Instagram post 7',
          layoutBias: 0.82,
        },
        {
          key: 'elinor-post-08',
          basePath: `${imageBase}/elinor-post-08`,
          alt: 'Elinor Instagram post 8',
          layoutBias: 0.82,
        },
        {
          key: 'elinor-brandbook-spread-08',
          basePath: `${imageBase}/elinor-brandbook-spread-08`,
          alt: 'Elinor brandbook spread 8',
          layoutBias: 1.14,
        },
        {
          key: 'elinor-brandbook-spread-05',
          basePath: `${imageBase}/elinor-brandbook-spread-05`,
          alt: 'Elinor brandbook spread 5',
          layoutBias: 1.32,
        },
        {
          key: 'elinor-post-09',
          basePath: `${imageBase}/elinor-post-09`,
          alt: 'Elinor Instagram post 9',
          layoutBias: 0.82,
        },
        {
          key: 'elinor-post-10',
          basePath: `${imageBase}/elinor-post-10`,
          alt: 'Elinor Instagram post 10',
          layoutBias: 0.82,
        },
        {
          key: 'elinor-post-11',
          basePath: `${imageBase}/elinor-post-11`,
          alt: 'Elinor Instagram post 11',
          layoutBias: 0.82,
        },
        {
          key: 'elinor-post-12',
          basePath: `${imageBase}/elinor-post-12`,
          alt: 'Elinor Instagram post 12',
          layoutBias: 0.82,
        },
        {
          key: 'elinor-brandbook-spread-22',
          basePath: `${imageBase}/elinor-brandbook-spread-22`,
          alt: 'Elinor brandbook spread 22',
          layoutBias: 1.14,
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
    getEditorialRowPattern() {
      if (this.galleryWidth >= 1200) return [2, 3];
      if (this.galleryWidth >= 900) return [2, 2, 3];
      if (this.galleryWidth >= 640) return [2, 2];
      return [1];
    },
    getMinItemWidth(item) {
      const rawAspectRatio = item.rawAspectRatio || item.aspectRatio || 1;
      const isPortrait = rawAspectRatio < 0.95;

      if (this.galleryWidth >= 1200) return isPortrait ? 190 : 280;
      if (this.galleryWidth >= 900) return isPortrait ? 160 : 230;
      if (this.galleryWidth >= 640) return isPortrait ? 132 : 180;
      return 0;
    },
    buildJustifiedRow(items, gap) {
      const ratioSum = items.reduce((sum, item) => sum + item.aspectRatio, 0) || items.length || 1;
      const availableWidth = Math.max(this.galleryWidth - gap * Math.max(items.length - 1, 0), 1);
      const idealWidths = items.map((item) => (availableWidth * item.aspectRatio) / ratioSum);
      const minWidths = items.map((item) => this.getMinItemWidth(item));
      const widths = idealWidths.map((width, index) => Math.max(width, minWidths[index]));

      let overflow = widths.reduce((sum, width) => sum + width, 0) - availableWidth;

      while (overflow > 0.5) {
        const shrinkable = widths.map((width, index) => Math.max(width - minWidths[index], 0));
        const totalShrinkable = shrinkable.reduce((sum, value) => sum + value, 0);
        if (totalShrinkable <= 0.5) break;

        widths.forEach((width, index) => {
          if (!shrinkable[index]) return;
          const reduction = (overflow * shrinkable[index]) / totalShrinkable;
          widths[index] = Math.max(minWidths[index], width - reduction);
        });

        overflow = widths.reduce((sum, width) => sum + width, 0) - availableWidth;
      }

      const roundedWidths = widths.map((width) => Math.max(1, Math.round(width)));
      const roundedTotal = roundedWidths.reduce((sum, width) => sum + width, 0);
      const roundingDelta = availableWidth - roundedTotal;

      if (roundingDelta !== 0) {
        const targetIndex = roundedWidths.length - 1;
        roundedWidths[targetIndex] = Math.max(1, roundedWidths[targetIndex] + roundingDelta);
      }

      const laidOutItems = items.map((item, index) => ({
        ...item,
        width: roundedWidths[index],
      }));

      return {
        height: availableWidth / ratioSum,
        items: laidOutItems,
      };
    },
    getAdjustedAspectRatio(item) {
      const rawRatio = this.mediaAspectRatios[item.key] || 1;
      const adjustedRatio = rawRatio * (item.layoutBias || 1);
      return Math.max(adjustedRatio, 0.3);
    },
    refreshJustifiedRows() {
      if (!this.galleryWidth) return;

      const gap = 16;
      const items = this.galleryItems.map((item) => {
        const rawAspectRatio = this.mediaAspectRatios[item.key] || 1;

        return {
          ...item,
          rawAspectRatio,
          aspectRatio: this.getAdjustedAspectRatio(item),
        };
      });
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
      return new Promise((resolve) => {
        const image = new Image();
        image.onload = () => resolve(image.naturalWidth / image.naturalHeight || 1);
        image.onerror = () => resolve(1);
        image.src = `${item.basePath}-960.png`;
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
  background: #f7efe4;
}

.justified-media {
  width: 100%;
  display: block;
  border-radius: var(--project-card-radius);
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
