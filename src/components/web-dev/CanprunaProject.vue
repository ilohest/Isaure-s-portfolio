<template>
  <section
    class="relative container mx-auto flex flex-col gap-4 px-4 py-4 md:top-[40px] md:px-6 md:py-8"
  >
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
    <Card class="project-summary-card bg-[var(--surface-muted)] text-[var(--text-secondary)] shadow-none">
      <template #content>
        <div class="flex flex-col gap-4 p-4 md:p-6">
          <h2 class="m-0 font-display text-4xl uppercase">Can Pruna accomodation</h2>

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

    <div class="flex justify-center">
      <img
        src="/assets/media/common/legacy-img/web-dev/canpruna/canpruna-desktop1-960.avif"
        alt="Can Pruna - mockup 1"
        class="border-round-xl block h-auto w-full max-w-full object-cover"
      />
    </div>

    <div class="gallery-grid project-bg">
      <!-- Ligne 2 -->
      <div class="grid-row row2">
        <div class="grid-item stack">
          <div class="stack-item">
            <img src="/assets/media/common/legacy-img/web-dev/canpruna/canpruna-desktop-image1-960.avif" alt="Desktop image 1" />
          </div>
          <div class="stack-item">
            <img src="/assets/media/common/legacy-img/web-dev/canpruna/canpruna-desktop-image2-960.avif" alt="Desktop image 2" />
          </div>
        </div>
        <div class="grid-item portrait">
          <img src="/assets/media/common/legacy-img/web-dev/canpruna/canpruna-mobile-image1-960.avif" alt="Mobile image 1" />
        </div>
        <div class="grid-item portrait">
          <img src="/assets/media/common/legacy-img/web-dev/canpruna/canpruna-mobile-image2-960.avif" alt="Mobile image 2" />
        </div>
      </div>

      <!-- Ligne 3 -->
      <div class="grid-row row3">
        <div class="grid-item portrait">
          <img src="/assets/media/common/legacy-img/web-dev/canpruna/canpruna-mobile-image3-960.avif" alt="Mobile image 3" />
        </div>
        <div class="grid-item stack landscape-stack">
          <div class="stack-item">
            <img src="/assets/media/common/legacy-img/web-dev/canpruna/canpruna-desktop-image3-960.avif" alt="Desktop image 3" />
          </div>
          <div class="stack-item">
            <img src="/assets/media/common/legacy-img/web-dev/canpruna/canpruna-desktop-image4-960.avif" alt="Desktop image 4" />
          </div>
        </div>
        <div class="grid-item portrait">
          <img src="/assets/media/common/legacy-img/web-dev/canpruna/canpruna-mobile-image4-960.avif" alt="Mobile image 4" />
        </div>
      </div>
    </div>

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

export default {
  name: 'CanPrunaAccomodationProject',
  components: { Card, Button },
  data() {
    return { projects };
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
      return this.projects.filter((p) => ![1, 2, 3].includes(p.id));
    },
    navCurrentIndex() {
      if (!this.navProjects.length) return 0;
      const idx = this.navProjects.findIndex((p) => p.projectLink === this.current?.projectLink);
      return idx === -1 ? 0 : idx;
    },
    hasPrevProject() {
      return this.navProjects.length > 1 && this.navCurrentIndex > 0;
    },
    prevProject() {
      if (!this.navProjects.length) return this.current;
      if (!this.hasPrevProject) return this.current;
      return this.navProjects[this.navCurrentIndex - 1];
    },
    nextProject() {
      if (!this.navProjects.length) return this.current;
      const i = (this.navCurrentIndex + 1) % this.navProjects.length;
      return this.navProjects[i];
    },
  },
  methods: {
    navigateTo(project) {
      if (project?.projectLink) this.$router.push(project.projectLink);
    },
  },
  mounted() {
    window.scrollTo(0, 0);
  },
};
</script>

<style scoped>
/* Galerie */
.gallery-grid {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.grid-row {
  display: grid;
  gap: 20px;
  height: 100%;
}
.row2 {
  grid-template-columns: 2fr 1fr 1fr;
}
.row3 {
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-areas: 'portrait1 stack portrait2';
}
.row3 > .grid-item:nth-child(1) {
  grid-area: portrait1;
}
.row3 > .grid-item:nth-child(2) {
  grid-area: stack;
}
.row3 > .grid-item:nth-child(3) {
  grid-area: portrait2;
}

.grid-item img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  border-radius: var(--project-card-radius);
  border: 2px var(--surface-muted) solid;
}
.landscape img,
.landscape-stack img {
  aspect-ratio: 16 / 9;
}
.portrait img {
  aspect-ratio: 3 / 4;
}
.stack {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.stack-item {
  flex: 1;
  overflow: hidden;
}

/* Responsive */
@media screen and (max-width: 970px) {
  .row2 {
    grid-template-columns: repeat(2, 1fr);
  }
  .row2 > .grid-item.stack {
    grid-column: 1 / -1;
  }
  .row3 {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      'stack stack'
      'portrait1 portrait2';
  }
  .portrait img {
    aspect-ratio: unset;
  }
}
</style>
