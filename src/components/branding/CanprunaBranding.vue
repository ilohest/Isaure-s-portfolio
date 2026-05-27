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

    <div class="canpruna-hero m-0 flex items-center justify-center p-0 md:my-6">
      <picture class="canpruna-hero-picture">
        <source
          type="image/avif"
          :srcset="`
            ${heroBaseUrl}-640.avif   640w,
            ${heroBaseUrl}-1280.avif 1280w,
            ${heroBaseUrl}-1920.avif 1920w
          `"
          sizes="(min-width: 970px) 70vw, 92vw"
        />
        <img
          :src="`${heroBaseUrl}-960.png`"
          alt="Can Pruna accomodation visual identity"
          class="canpruna-hero-img border-round-xl block h-auto max-w-full bg-[#fff] p-4 md:p-8"
          fetchpriority="high"
          decoding="async"
        />
      </picture>
    </div>

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
                      <li>Visual identity</li>
                      <li>Web design</li>
                      <li>Photography</li>
                    </ul>
                  </section>

                  <section>
                    <h3 class="mb-2 uppercase">About</h3>
                    <div class="flex flex-col gap-1 text-base">
                      <p><i class="uppercase">Client: </i>Can Pruna</p>
                      <p><i class="uppercase">Sector: </i>Hospitality &amp; tourism</p>
                      <p><i class="uppercase">Country: </i>Catalonia, Spain</p>
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
                      :class="item.intro ? 'font-display canpruna-intro' : ''"
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
            aria-label="Can Pruna color palette"
          >
            <div class="palette-grid" aria-hidden="false">
              <div
                v-for="swatch in item.swatches"
                :key="swatch.hex"
                class="palette-swatch"
                :style="{ backgroundColor: swatch.hex, color: swatch.textColor }"
              >
                <div class="palette-label">
                  <p class="palette-line">{{ swatch.hex.replace('#', '') }}</p>
                  <p class="palette-name">{{ swatch.name }}</p>
                </div>
              </div>
            </div>
          </div>

          <picture v-else-if="item.generated">
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
            <img
              :src="`${item.baseUrl}-960.avif`"
              :alt="item.alt"
              loading="lazy"
              decoding="async"
              fetchpriority="low"
            />
          </picture>
        </div>
      </div>
    </section>

    <div class="mt-6 mb-8 flex flex-col items-center justify-between gap-4 md:flex-row md:gap-2">
      <Button
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
import projects from '@/branding-projects';
import allProjects from '@/all-projects';

const CANPRUNA_MEDIA_DIR = '/assets/media/projects/branding/canpruna-accomodation';

const encodeFileBase = (base) => encodeURIComponent(base);

export default {
  name: 'CanprunaBranding',
  components: { Card, Button },
  data() {
    return {
      projects,
      heroBase: 'Group 1000001787',
      masonryColumnCount: 3,
      masonryObserver: null,
      items: [
        {
          key: 'intro',
          type: 'card',
          intro: true,
          paragraphs: ['A warm visual identity for a rural accomodation rooted in Catalan landscape.'],
        },
        { key: 'meta', type: 'card', variant: 'meta' },
        {
          key: 'project',
          type: 'card',
          title: 'Project',
          paragraphs: [
            'The identity distills Can Pruna into a calm, cohesive visual story anchored by earth, olive, stone, and soft white tones drawn from the site.',
            'Hand-sketched elements bring an artisanal touch, while generous spacing gives the photography and line art room to breathe.',
            'I also photographed and retouched the site imagery so the visual world feels quiet, hospitable, and directly connected to the Masia.',
          ],
        },
        {
          key: 'group-1798',
          type: 'image',
          generated: true,
          base: 'Group 1000001798',
          alt: 'Can Pruna brand emblem application',
        },
        {
          key: 'branding',
          type: 'card',
          title: 'Branding',
          paragraphs: [
            'The logo features three stylized cypress trees set in subtle perspective.',
            'In Mediterranean lore, one cypress offers a drink, two promise food and drink, and three signal full accommodation: drink, a meal, and a bed for the night.',
            'That symbolism became the heart of the brand: a gracious welcome under the Montseny sky.',
          ],
        },
        {
          key: 'palette',
          type: 'palette',
          swatches: [
            { hex: '#1B1816', name: 'Charcoal', textColor: '#F6F3EE' },
            { hex: '#272C1F', name: 'Forest', textColor: '#F6F3EE' },
            { hex: '#ADB49E', name: 'Olive', textColor: '#1B1816' },
            { hex: '#EBE3DB', name: 'Stone', textColor: '#1B1816' },
            { hex: '#F6F3EE', name: 'Warm white', textColor: '#1B1816' },
            { hex: '#FFFFFF', name: 'White', textColor: '#1B1816' },
          ],
        },
        {
          key: 'palette-text',
          type: 'card',
          title: 'Palette',
          paragraphs: [
            'The color system balances deep natural anchors with soft mineral neutrals.',
            'Charcoal and forest green bring structure and depth, olive adds a vegetal note, and the two pale tones keep the identity breathable and luminous.',
          ],
        },
        {
          key: 'business-card',
          type: 'image',
          generated: true,
          base: 'Business_Card_Mockup_1',
          alt: 'Can Pruna business card mockup',
        },
        {
          key: 'posters',
          type: 'image',
          generated: true,
          base: 'Posters_Mockup',
          alt: 'Can Pruna posters mockup',
        },
        {
          key: 'group-1785',
          type: 'image',
          generated: true,
          base: 'Group 1000001785',
          alt: 'Can Pruna brand composition',
        },
        {
          key: 'photo-3669',
          type: 'image',
          base: 'DSCF3669-1',
          alt: 'Can Pruna accomodation exterior detail',
        },
        {
          key: 'group-1794',
          type: 'image',
          generated: true,
          base: 'Group 1000001794',
          alt: 'Can Pruna brand application layout',
        },
        {
          key: 'applications',
          type: 'card',
          title: 'Applications',
          paragraphs: [
            'The system was designed to move easily between print, signage, digital touchpoints, and the slower rhythm of the place itself.',
            'Mockups keep the identity tangible: from arrival signage and posters to business cards and guest-facing visual material.',
          ],
        },
        {
          key: 'billboard',
          type: 'image',
          generated: true,
          base: 'MDU069_Billboard_Mockup',
          alt: 'Can Pruna billboard mockup',
        },
        {
          key: 'photo-9614',
          type: 'image',
          base: 'DSCF9614-1',
          alt: 'Can Pruna accomodation textile detail',
        },
        {
          key: 'group-1795',
          type: 'image',
          generated: true,
          base: 'Group 1000001795',
          alt: 'Can Pruna vertical brand application',
        },
        {
          key: 'photo-3622',
          type: 'image',
          base: 'DSCF3622-1',
          alt: 'Can Pruna accomodation terrace detail',
        },
        {
          key: 'tall-stand',
          type: 'image',
          generated: true,
          base: 'Free Tall Stand with Construction Mockup',
          alt: 'Can Pruna tall stand mockup',
        },
        {
          key: 'photo-9439',
          type: 'image',
          base: 'DSCF9439-1',
          alt: 'Can Pruna accomodation natural detail',
        },
        {
          key: 'group-1797',
          type: 'image',
          generated: true,
          base: 'Group 1000001797',
          alt: 'Can Pruna printed brand material',
        },
        {
          key: 'photo-3659',
          type: 'image',
          base: 'DSCF3659-1',
          alt: 'Can Pruna accomodation landscape detail',
        },
        {
          key: 'group-1801',
          type: 'image',
          generated: true,
          base: 'Group 1000001801',
          alt: 'Can Pruna tall branded layout',
        },
        {
          key: 'photo-3662',
          type: 'image',
          base: 'DSCF3662-1',
          alt: 'Can Pruna accomodation garden detail',
        },
        {
          key: 'photo-9586',
          type: 'image',
          base: 'DSCF9586-1',
          alt: 'Can Pruna accomodation bedroom detail',
        },
        {
          key: 'signboard',
          type: 'image',
          generated: true,
          base: 'Signbaord_Mockup',
          alt: 'Can Pruna signboard mockup',
        },
        {
          key: 'group-1804',
          type: 'image',
          generated: true,
          base: 'Group 1000001804',
          alt: 'Can Pruna brand touchpoint',
        },
        {
          key: 'group-1789',
          type: 'image',
          generated: true,
          base: 'Group 1000001789',
          alt: 'Can Pruna logo detail',
        },
        {
          key: 'result',
          type: 'card',
          paragraphs: [
            'A grounded identity system for hospitality, built to feel welcoming before the guest even arrives.',
          ],
        },
      ],
    };
  },
  computed: {
    heroBaseUrl() {
      return `${CANPRUNA_MEDIA_DIR}/${encodeFileBase(this.heroBase)}`;
    },
    resolvedItems() {
      return this.items.map((item) => {
        if (item.type !== 'image') return item;
        return {
          ...item,
          baseUrl: `${CANPRUNA_MEDIA_DIR}/${encodeFileBase(item.base)}`,
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
    revealDelayByKey() {
      return this.resolvedItems.reduce((acc, item, index) => {
        acc[item.key] = `${Math.min(index * 32, 420)}ms`;
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
    syncMasonryColumnCount() {
      const w = window?.innerWidth ?? 1200;
      if (w <= 628) this.masonryColumnCount = 1;
      else if (w <= 970) this.masonryColumnCount = 2;
      else this.masonryColumnCount = 3;
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
  },
  mounted() {
    window.scrollTo(0, 0);
    this.syncMasonryColumnCount();
    this.$nextTick(() => this.setupMasonryReveal());
    window.addEventListener('resize', this.syncMasonryColumnCount, { passive: true });
  },
  beforeUnmount() {
    if (this.masonryObserver) {
      this.masonryObserver.disconnect();
      this.masonryObserver = null;
    }
    window.removeEventListener('resize', this.syncMasonryColumnCount);
  },
};
</script>

<style scoped>
.masonry {
  border-radius: var(--project-card-radius);
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

.canpruna-intro {
  font-size: clamp(1.25rem, 1.9vw, 1.6rem);
  line-height: 1.15;
  text-transform: uppercase;
  transition: letter-spacing 220ms ease;
}

.masonry-item:hover .canpruna-intro {
  letter-spacing: 0.08em;
}

.masonry-item h3 {
  transition: letter-spacing 220ms ease;
}

.masonry-item:hover h3 {
  letter-spacing: 0.12em;
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
  min-height: 86px;
  display: flex;
  align-items: flex-end;
  transform-origin: center center;
  transition:
    flex-grow 260ms cubic-bezier(0.22, 1, 0.36, 1),
    transform 260ms cubic-bezier(0.22, 1, 0.36, 1),
    filter 260ms ease;
}

.palette-label {
  position: static;
  padding: 1rem;
  line-height: 1.2;
  transition:
    padding 260ms cubic-bezier(0.22, 1, 0.36, 1),
    letter-spacing 260ms ease,
    transform 260ms cubic-bezier(0.22, 1, 0.36, 1);
}

.palette-line {
  margin: 0;
  white-space: nowrap;
  font-size: 1rem;
  letter-spacing: 0.04em;
}

.palette-name {
  margin: 0.2rem 0 0;
  white-space: nowrap;
  font-size: 0.78rem;
  text-transform: uppercase;
}

.palette-swatch:hover {
  flex-grow: 1.18;
  transform: scale(1.035);
  filter: saturate(1.08) brightness(1.02);
  z-index: 1;
}

.palette-swatch:hover .palette-label {
  padding: 1.2rem;
  letter-spacing: 0.06em;
  transform: translateY(-2px);
}

@media (max-width: 628px) {
  .masonry-horizontal {
    flex-direction: column;
    gap: 0.75rem;
  }

  .palette-swatch {
    min-height: 80px;
  }

  .canpruna-hero {
    margin-left: calc(50% - 50vw);
    margin-right: calc(50% - 50vw);
  }

  .canpruna-hero-picture {
    display: block;
    width: 100%;
  }

  .canpruna-hero-img {
    width: 100%;
    max-width: 100% !important;
    padding: 0 !important;
    border-radius: 0 !important;
  }
}

@media (prefers-reduced-motion: reduce) {
  .masonry-reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
