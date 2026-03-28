<!-- src/components/branding/FlouBranding.vue -->
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
    <div class="flou-hero m-0 flex items-center justify-center p-0 md:my-6">
      <picture class="flou-hero-picture">
        <img
          src="/assets/media/branding/flou/flou-hero-960.png"
          alt="Flou"
          class="flou-hero-img border-round-xl block h-auto max-w-full bg-[#fff] p-4 md:p-8"
          fetchpriority="high"
          decoding="async"
        />
      </picture>
    </div>

    <!-- Project summary -->
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
              </ul>
            </section>

            <section>
              <h3 class="mb-2 uppercase">About</h3>
              <div class="flex flex-col gap-1 text-base">
                <p><i class="uppercase">Client: </i>Flouwers</p>
                <p><i class="uppercase">Sector: </i>Floral scenography</p>
                <p><i class="uppercase">Country: </i>Belgium</p>
                <p>
                  <i class="uppercase">Instagram: </i>
                  <a
                    href="https://www.instagram.com/f.lou.wers/"
                    target="_blank"
                    class="text-inherit"
                    >@f.lou.wers</a
                  >
                </p>
              </div>
            </section>
          </div>

          <div class="md:w-4/12">
            <h3 class="mb-2 uppercase">Project</h3>
            <p>
              Flou brings a poetic touch to floral design, where emotion meets artistry. Founded by
              Mary-Lou, this Brussels-based floral studio crafts refined, imaginative compositions
              that blend texture, color, and whimsy in perfect balance. From bespoke bouquets to
              immersive event scenography, every creation embodies her signature mix of intuition
              and precision. Whether for weddings, birthdays, or intimate gatherings, Flou
              transforms spaces into living art, fleeting yet unforgettable.
            </p>
          </div>

          <div class="md:w-5/12">
            <h3 class="mb-2 tracking-wide uppercase">Branding</h3>
            <p>
              The identity of Flou translates Mary-Lou’s floral world into a sensory, living brand.
              The logo, composed of organic petals cut from a rectangle, captures both structure and
              spontaneity, like a bouquet balanced between precision and wildness. Its negative
              space allows it to morph with its background, blending into photographs and textures
              to echo the natural flow of petals, light, and movement. Typography combines softness
              and character. The color palette — a dialogue between mulberry, dark purple, and moss
              green — celebrates nature in all its contrasts: lush, daring, and tender. The result
              is a brand that feels alive, playful yet elegant, earthy yet poetic. "Moitié Lou,
              moitié fou, 100% Flou".
            </p>
          </div>
        </div>
      </template>
    </Card>

    <!-- Masonry optimisé -->
    <section class="masonry">
      <div
        class="masonry-item masonry-reveal"
        v-for="(img, index) in flouImages"
        :key="img.base"
        :style="{ '--reveal-delay': `${Math.min(index * 35, 420)}ms` }"
      >
        <picture>
          <img
            :src="`/assets/media/branding/flou/${img.base}-960.png`"
            :alt="img.alt"
            loading="lazy"
            decoding="async"
            fetchpriority="low"
            :class="img.noRadius ? 'no-radius' : ''"
          />
        </picture>
      </div>
    </section>

    <!-- Brandbook bas de page -->
    <picture>
      <img
        src="/assets/media/branding/flou/flou-brandbook-960.png"
        alt="Flou brandbook"
        class="border-round-xl block h-auto w-full max-w-full"
        loading="lazy"
        decoding="async"
        fetchpriority="low"
        width="1503"
        height="1276"
      />
    </picture>

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

export default {
  name: 'FlouBranding',
  components: { Card, Button },
  data() {
    return {
      projects,
      masonryObserver: null,
      // Liste des images du masonry (base = nom de fichier sans suffixe taille/extension)
      flouImages: [
        { base: 'flou-1', alt: 'Flou 1' },
        { base: 'flou-15', alt: 'Flou 15' },
        { base: 'flou-2', alt: 'Flou 2' },
        { base: 'flou-3', alt: 'Flou 3' },
        { base: 'flou-16', alt: 'Flou 16' },
        { base: 'flou-4', alt: 'Flou 4' },
        { base: 'flou-17', alt: 'Flou 17' },
        { base: 'flou-5', alt: 'Flou 5' },
        { base: 'flou-6', alt: 'Flou 6' },
        { base: 'flou-21', alt: 'Flou 21', noRadius: true },
        { base: 'flou-13', alt: 'Flou 13' },
        { base: 'flou-7', alt: 'Flou 7' },
        { base: 'flou-8', alt: 'Flou 8' },
        { base: 'flou-9', alt: 'Flou 9' },
        { base: 'flou-10', alt: 'Flou 10' },
        { base: 'flou-12', alt: 'Flou 12' },
        { base: 'flou-11', alt: 'Flou 11' },
        { base: 'flou-14', alt: 'Flou 14' },
        { base: 'flou-18', alt: 'Flou 18' },
        { base: 'flou-19', alt: 'Flou 19' },
        { base: 'flou-20', alt: 'Flou 20' },
        { base: 'flou-22', alt: 'Flou 22' },
        { base: 'flou-palette', alt: 'Flou palette' },
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
    setupMasonryReveal() {
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
    this.setupMasonryReveal();
  },
  beforeUnmount() {
    if (this.masonryObserver) {
      this.masonryObserver.disconnect();
      this.masonryObserver = null;
    }
  },
};
</script>

<style scoped>
.masonry {
  column-count: 4;
  column-gap: 1rem;
  border-radius: var(--project-card-radius);
}

/* Rendu plus rapide: évite de tout peindre d’un coup */
.masonry-item picture,
.masonry-item img {
  content-visibility: auto;
  contain-intrinsic-size: 800px auto; /* ajuste si besoin */
}

.masonry-item {
  break-inside: avoid;
  -webkit-column-break-inside: avoid;
  -moz-column-break-inside: avoid;
  page-break-inside: avoid;
  margin-bottom: 1rem;
}

.masonry-item img {
  width: 100%;
  height: auto;
  display: block;
  border-radius: var(--image-radius);
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

/* Tablet ≤ 970px: 3 colonnes */
@media (max-width: 970px) {
  .masonry {
    column-count: 3;
  }
}

/* Mobile ≤ 628px: 2 colonnes */
@media (max-width: 628px) {
  .masonry {
    column-count: 2;
    column-gap: 0.75rem;
  }
}

.masonry-item img.no-radius,
img.no-radius {
  border-radius: 0 !important;
}

@media (max-width: 628px) {
  .flou-hero {
    margin-left: calc(50% - 50vw);
    margin-right: calc(50% - 50vw);
  }

  .flou-hero-picture {
    display: block;
    width: 100%;
  }

  .flou-hero-img {
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
