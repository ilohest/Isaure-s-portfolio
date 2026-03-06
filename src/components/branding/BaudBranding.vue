<!-- src/components/branding/BaudBranding.vue -->
<template>
  <section class="relative container mx-auto flex flex-col gap-4 px-4 py-4 md:top-[40px]">
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

    <!-- HERO responsive (AVIF/WEBP + fallback) -->
    <div class="baud-hero m-0 flex items-center justify-center p-0 md:my-6">
      <picture class="baud-hero-picture">
        <source
          type="image/avif"
          :srcset="`
            ${heroBaseUrl}-640.avif   640w,
            ${heroBaseUrl}-1280.avif 1280w,
            ${heroBaseUrl}-1920.avif 1920w
          `"
          sizes="(min-width: 970px) 70vw, 92vw"
        />
        <source
          type="image/webp"
          :srcset="`
            ${heroBaseUrl}-640.webp   640w,
            ${heroBaseUrl}-1280.webp 1280w,
            ${heroBaseUrl}-1920.webp 1920w
          `"
          sizes="(min-width: 970px) 70vw, 92vw"
        />
        <img
          :src="`${heroBaseUrl}-960.png`"
          alt="Baud Architectes"
          class="baud-hero-img border-round-xl block h-auto max-w-full bg-[#fff] p-4 md:p-8"
          fetchpriority="high"
          decoding="async"
        />
      </picture>
    </div>

    <!-- Masonry: horizontal fill (left → right, then next row) -->
    <section class="masonry masonry-horizontal">
      <div v-for="(col, colIdx) in masonryColumns" :key="`col-${colIdx}`" class="masonry-col">
        <div class="masonry-item" v-for="item in col" :key="item.key">
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
                      <li>Visual identity</li>
                      <li>Art direction</li>
                    </ul>
                  </section>

                  <section>
                    <h3 class="mb-2 uppercase">About</h3>
                    <div class="flex flex-col gap-1 text-base">
                      <p class="uppercase">Identity concept</p>
                      <p><i class="uppercase">Client: </i>Baud architects</p>
                      <p><i class="uppercase">Sector: </i>Urban architecture</p>
                      <p><i class="uppercase">Country: </i>Belgium</p>
                    </div>
                  </section>
                </div>

                <div v-else class="flex flex-col gap-2">
                  <h3 v-if="item.title && item.title.trim()" class="tracking-wide uppercase">
                    {{ item.title }}
                  </h3>
                  <div class="flex flex-col gap-3 leading-relaxed">
                    <p
                      v-for="(p, idx) in item.paragraphs"
                      :key="`p-${item.key}-${idx}`"
                      :class="item.mono ? 'font-display baud-intro' : ''"
                    >
                      {{ p }}
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
            aria-label="Baud Architectes color palette"
          >
            <div class="palette-grid" aria-hidden="false">
              <div
                v-for="swatch in item.swatches"
                :key="swatch.hex"
                class="palette-swatch"
                :style="{ backgroundColor: swatch.hex, color: swatch.textColor }"
              >
                <div class="palette-label">
                  <p class="palette-line">HEX {{ swatch.hex }}</p>
                  <p class="palette-line">RGB {{ swatch.rgb }}</p>
                  <p class="palette-line">CMYK {{ swatch.cmyk }}</p>
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
                ${item.baseUrl}-1280.avif 1280w
              `"
              sizes="(min-width: 970px) 28vw, (min-width: 628px) 44vw, 92vw"
            />
            <source
              type="image/webp"
              :srcset="`
                ${item.baseUrl}-640.webp 640w,
                ${item.baseUrl}-960.webp 960w,
                ${item.baseUrl}-1280.webp 1280w
              `"
              sizes="(min-width: 970px) 28vw, (min-width: 628px) 44vw, 92vw"
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

    <!-- Bottom prev/next -->
    <div class="mt-6 mb-8 flex flex-col items-center justify-between gap-4 md:flex-row md:gap-2">
      <Button
        label="Previous"
        icon="pi pi-arrow-left"
        class="p-button-outlined"
        @click="navigateTo(prevProject)"
      />

      <span class="text-xl font-semibold uppercase">{{ current.title }}</span>

      <Button
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
import projects from '@/branding-projects';

const BAUD_MEDIA_DIR = '/assets/media/projects/branding/baud';

const encodeFileBase = (base) => encodeURIComponent(base);

export default {
  name: 'BaudBranding',
  components: { Card, Button },
  data() {
    return {
      projects,
      heroBase: 'Fichier 34',
      masonryColumnCount: 3,
      items: [
        {
          key: 'card-0',
          type: 'card',
          mono: true,
          paragraphs: ['Designing a modular identity system inspired by architectural profiles.'],
        },
        { key: 'card-1', type: 'card', variant: 'meta' },
        { key: 'img-18', type: 'image', base: 'Fichier 18', alt: 'Baud Architects — Visual' },
        {
          key: 'card-2',
          type: 'card',
          title: 'Context',
          paragraphs: [
            'Baud Architectes is an architectural studio working across architecture, urbanism, expertise, and design consulting.',
            'The objective of this branding exploration was to create a visual identity that reflects the studio’s architectural thinking: structured, precise, and adaptable to a wide variety of projects.',
            'The challenge was to design an identity system capable of evolving with each project while maintaining a strong and recognizable brand signature.',
          ],
        },
        { key: 'img-19', type: 'image', base: 'Fichier 19', alt: 'Baud Architects — Visual' },
        { key: 'img-20', type: 'image', base: 'Fichier 20', alt: 'Baud Architects — Visual' },
        { key: 'img-35', type: 'image', base: 'Fichier 35', alt: 'Baud Architects — Visual' },
        {
          key: 'card-3',
          type: 'card',
          title: 'Concept',
          paragraphs: [
            'The identity is built around the idea that every architectural project has its own distinctive silhouette.',
            'Instead of creating a single static logo, the branding introduces a system where each project receives a unique graphic profile derived from the geometry of the building.',
            'These simplified line drawings translate architectural volumes into abstract graphic elements. Each profile becomes a visual signature for the project while remaining part of the same visual language.',
            'This approach allows the identity to evolve organically alongside the studio’s portfolio.',
          ],
        },
        { key: 'img-21', type: 'image', base: 'Fichier 21', alt: 'Baud Architects — Visual' },
        {
          key: 'card-4',
          type: 'card',
          title: 'The Logo',
          paragraphs: [
            'The BAUD logotype uses a contemporary geometric typeface that emphasizes clarity and balance.',
            'Its clean curves and generous spacing convey precision and professionalism — values central to architectural practice.',
            'At the heart of the identity lies a stylized “a”, extracted from the logotype itself. This symbol becomes the distinctive element of the brand.',
            'Its continuous rounded form evokes architectural lines and structural fluidity while maintaining a strong visual simplicity.',
          ],
        },
        { key: 'img-22', type: 'image', base: 'Fichier 22', alt: 'Baud Architects — Visual' },
        {
          key: 'card-5',
          type: 'card',
          title: 'The Project Marker',
          paragraphs: [
            'The stylized “a” also functions as a project marker within the identity system.',
            'When paired with a project name, it acts as a visual indicator — similar to the logic of a digital tag or “@”.',
            'This creates a clear connection between the studio and its individual projects while maintaining a consistent brand language.',
            'The symbol becomes both a signature and a navigational element within the studio’s communication.',
          ],
        },
        { key: 'img-23', type: 'image', base: 'Fichier 23', alt: 'Baud Architects — Visual' },
        { key: 'img-24', type: 'image', base: 'Fichier 24', alt: 'Baud Architects — Visual' },
        { key: 'img-32', type: 'image', base: 'Fichier 32', alt: 'Baud Architects — Visual' },
        {
          key: 'card-6',
          type: 'card',
          title: 'Graphic Profiles',
          paragraphs: [
            'Each architectural project is represented by a unique graphic profile derived from its characteristic forms.',
            'These line-based icons abstract key structural elements of the buildings — façades, angles, volumes, or silhouettes.',
            'Together they create a visual library of architectural identities linked to the studio’s work.',
          ],
        },
        { key: 'img-30', type: 'image', base: 'Fichier 30', alt: 'Baud Architects — Visual' },
        {
          key: 'card-7',
          type: 'card',
          title: 'Applications',
          paragraphs: [
            'The identity is designed to function across architectural contexts — from construction sites to presentation documents.',
            'Large-scale applications such as construction banners reinforce visibility on site, while printed materials maintain a refined and professional aesthetic.',
            'The minimal graphic language ensures clarity across both technical and visual communication.',
          ],
        },
        {
          key: 'img-banner',
          type: 'image',
          base: 'Construction_Banner_Mockup',
          alt: 'Baud Architects — Construction banner',
        },
        {
          key: 'img-paper-logo',
          type: 'image',
          base: 'paper logo mockup',
          alt: 'Baud Architects — Logo mockup',
        },
        { key: 'img-31', type: 'image', base: 'Fichier 31', alt: 'Baud Architects — Visual' },
        {
          key: 'card-8',
          type: 'card',
          title: 'Result',
          paragraphs: [
            'The result is a modular visual identity that mirrors the nature of architectural practice: structured, adaptable, and evolving with each project.',
            'Rather than a static logo, the system becomes a living archive of the studio’s architecture.',
          ],
        },
        { key: 'img-46', type: 'image', base: 'Fichier 46', alt: 'Baud Architects — Visual' },
        { key: 'img-g24', type: 'image', base: 'Group 24', alt: 'Baud Architects — Visual' },
        { key: 'img-g27', type: 'image', base: 'Group 27', alt: 'Baud Architects — Visual' },
        { key: 'img-a4', type: 'image', base: 'A4paper', alt: 'Baud Architects — Visual' },
        {
          key: 'img-cap',
          type: 'image',
          base: 'Construction Cap',
          alt: 'Baud Architects — Construction cap',
        },
        {
          key: 'img-flyer',
          type: 'image',
          base: 'Free Letter Size PSD Flyer Mockup Design For Branding',
          alt: 'Baud Architects — Flyer mockup',
        },
        {
          key: 'img-wrinkled',
          type: 'image',
          base: 'Wrinkled_Construction_Banner_Mockup',
          alt: 'Baud Architects — Banner mockup',
        },
        {
          key: 'img-fence',
          type: 'image',
          base: 'construction fence',
          alt: 'Baud Architects — Construction fence',
        },
        {
          key: 'card-palette',
          type: 'palette',
          swatches: [
            { hex: '#1F1F21', rgb: '31, 31, 33', cmyk: '6, 6, 0, 87', textColor: '#F4F4F2' },
            { hex: '#F4F4F2', rgb: '244, 244, 242', cmyk: '0, 0, 1, 4', textColor: '#1F1F21' },
            { hex: '#C6DCDA', rgb: '198, 220, 218', cmyk: '10, 0, 1, 14', textColor: '#1F1F21' },
            { hex: '#0C4651', rgb: '12, 70, 81', cmyk: '85, 14, 0, 68', textColor: '#F4F4F2' },
            { hex: '#CAF567', rgb: '202, 245, 103', cmyk: '18, 0, 58, 4', textColor: '#1F1F21' },
          ],
        },
        {
          key: 'card-palette-text',
          type: 'card',
          title: 'Color palette',
          paragraphs: [
            'The color palette reflects the balance between architectural rigor and contemporary sensibility.',
            'A deep charcoal forms the foundation of the identity, conveying precision, stability, and professionalism. It is paired with an off-white tone that softens the composition and introduces a sense of clarity and space — much like the neutral materials often found in architectural environments.',
            'Cool teal and muted aqua tones introduce a subtle reference to construction materials, technical drawings, and urban landscapes. These colors bring depth to the identity while maintaining a restrained and professional aesthetic.',
            'A vibrant lime accent is used sparingly to introduce contrast and highlight key elements, adding a modern and dynamic touch to the otherwise minimal palette.',
          ],
        },
        {
          key: 'card-typography',
          type: 'card',
          title: 'Typography',
          paragraphs: [
            'The typographic system combines elegance with functional clarity.',
            'Floreal, used for titles and headings, introduces a refined editorial tone. Its distinctive serif shapes bring sophistication and character to the identity, reinforcing the studio’s positioning within a design-driven architectural context.',
            'For body text, Corbel provides balance through a clean and highly legible sans-serif structure. Its neutral geometry ensures clarity across documents, presentations, and technical communication.',
            'Together, the combination of Floreal and Corbel creates a dialogue between expression and precision — reflecting the balance between creativity and structure inherent to architectural practice.',
          ],
        },
        {
          key: 'card-last',
          type: 'card',
          paragraphs: ['Concept proposal for the visual identity of Baud Architectes.'],
        },
      ],
    };
  },
  computed: {
    heroBaseUrl() {
      return `${BAUD_MEDIA_DIR}/${encodeFileBase(this.heroBase)}`;
    },
    resolvedItems() {
      return this.items.map((item) => {
        if (item.type !== 'image') return item;
        return {
          ...item,
          baseUrl: `${BAUD_MEDIA_DIR}/${encodeFileBase(item.base)}`,
        };
      });
    },
    masonryColumns() {
      const count = Math.max(1, Number(this.masonryColumnCount) || 1);
      const cols = Array.from({ length: count }, () => []);
      this.resolvedItems.forEach((item, index) => {
        cols[index % count].push(item);
      });
      return cols;
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
    prevProject() {
      const i = (this.currentIndex - 1 + this.projects.length) % this.projects.length;
      return this.projects[i];
    },
    nextProject() {
      const i = (this.currentIndex + 1) % this.projects.length;
      return this.projects[i];
    },
  },
  methods: {
    navigateTo(project) {
      if (project?.projectLink) this.$router.push(project.projectLink);
    },
    syncMasonryColumnCount() {
      const w = window?.innerWidth ?? 1200;
      if (w <= 628) this.masonryColumnCount = 1;
      else if (w <= 970) this.masonryColumnCount = 2;
      else this.masonryColumnCount = 3;
    },
  },
  mounted() {
    window.scrollTo(0, 0);
    this.syncMasonryColumnCount();
    window.addEventListener('resize', this.syncMasonryColumnCount, { passive: true });
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.syncMasonryColumnCount);
  },
};
</script>

<style scoped>
.masonry {
  border-radius: var(--project-card-radius);
}

/* Rendu plus rapide: évite de tout peindre d’un coup */
.masonry-item picture,
.masonry-item img {
  content-visibility: auto;
  contain-intrinsic-size: 800px auto;
}

.masonry-item {
  margin-bottom: 1rem;
}

.masonry-item img {
  width: 100%;
  height: auto;
  display: block;
  border-radius: var(--image-radius);
}

.baud-intro {
  font-size: clamp(1.25rem, 1.9vw, 1.6rem);
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
  height: auto;
}

.palette-swatch {
  position: relative;
  flex: 1 1 0;
  min-width: 0;
  min-height: 90px;
  display: flex;
  align-items: flex-end;
}

.palette-label {
  position: static;
  padding: 1rem;
  line-height: 1.25;
  letter-spacing: 0.01em;
}

.palette-line {
  margin: 0;
  white-space: nowrap;
  font-size: 0.9rem;
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

@media (max-width: 628px) {
  .masonry-horizontal {
    flex-direction: column;
    gap: 0.75rem;
  }

  .palette-swatch {
    min-height: 80px;
  }

  .baud-hero {
    margin-left: calc(50% - 50vw);
    margin-right: calc(50% - 50vw);
  }

  .baud-hero-picture {
    display: block;
    width: 100%;
  }

  .baud-hero-img {
    width: 100%;
    max-width: 100% !important;
    padding: 0 !important;
    border-radius: 0 !important;
  }
}
</style>
