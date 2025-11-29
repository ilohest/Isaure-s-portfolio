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

    <Card class="border-round-xl bg-[var(--blue-bg)] text-[var(--light-content)] shadow-none">
      <template #content>
        <div class="flex flex-col gap-4 p-4 md:p-6">
          <h2 class="m-0 font-['Xanh_Mono'] text-4xl uppercase">Louis Cattiaux</h2>

          <div class="font-['Red_Hat_Text'] font-light">
            <p>
              This website serves as a comprehensive portal dedicated to the life and works of Louis
              Cattiaux, an enigmatic figure in the realm of mystical and esoteric art. Designed as a
              digital archive, the site hosts an extensive collection of articles, essays, and
              analyses that explore Cattiaux’s profound influence on spiritual art and thought. A
              curated gallery of high-resolution images showcases Cattiaux’s most notable artworks,
              providing visitors with a visual understanding of his unique style and thematic
              preoccupations. This website is fully multilingual, allowing users to navigate in
              their preferred language, and it offers both a light and dark mode for an optimal
              viewing experience.
            </p>
          </div>

          <div class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div class="md:w-8/12">
              <h2 class="mb-3 text-xl uppercase">Responsibilities</h2>
              <p class="font-['Red_Hat_Text'] font-light">
                Web design personalization, WordPress installation and database setup, Site
                development, SEO optimization for improved visibility, Website launch, Client
                training on back-office management.
              </p>
            </div>

            <div class="md:w-4/12 md:pl-10">
              <h2 class="mb-3 text-xl uppercase">URL</h2>
              <a
                href="http://louiscattiaux.com"
                target="_blank"
                class="font-['Red_Hat_Text'] font-light text-inherit"
              >
                louiscattiaux.com
              </a>
            </div>
          </div>
        </div>
      </template>
    </Card>

    <div class="gallery-grid border-round-xl">
      <!-- Ligne 1 : Deux colonnes en format paysage -->
      <div class="grid-row row1">
        <div class="grid-item landscape">
          <img src="../../assets/img/lc-desktop-image1.png" alt="Desktop image 1" />
        </div>
        <div class="grid-item landscape">
          <img src="../../assets/img/lc-desktop-image2.png" alt="Desktop image 2" />
        </div>
      </div>

      <!-- Ligne 2 : Trois colonnes
        - Colonne 1 (50%) : Deux images en pile
        - Colonnes 2 et 3 (25% chacune) : Une image chacune -->
      <div class="grid-row row2">
        <div class="grid-item stack">
          <div class="stack-item">
            <img src="../../assets/img/lc-desktop-image4.png" alt="Desktop image 3" />
          </div>
          <div class="stack-item">
            <img src="../../assets/img/lc-desktop-image5.png" alt="Desktop image 4" />
          </div>
        </div>
        <div class="grid-item portrait">
          <img src="../../assets/img/lc-mobile-image1.png" alt="Mobile image 5" />
        </div>
        <div class="grid-item portrait">
          <img src="../../assets/img/lc-mobile-image2.png" alt="Mobile image 6" />
        </div>
      </div>

      <!-- Ligne 3 modifiée :
        - Colonne 1 : Image portrait
        - Colonne 2 : Conteneur stack avec 2 images paysage superposées
        - Colonne 3 : Image portrait -->
      <div class="grid-row row3">
        <div class="grid-item portrait">
          <img src="../../assets/img/lc-mobile-image3.png" alt="Mobile image 1" />
        </div>
        <div class="grid-item stack landscape-stack">
          <div class="stack-item">
            <img src="../../assets/img/lc-desktop-image6.png" alt="Stacked Landscape image 1" />
          </div>
          <div class="stack-item">
            <img src="../../assets/img/lc-desktop-image3.png" alt="Stacked Landscape image 2" />
          </div>
        </div>
        <div class="grid-item portrait">
          <img src="../../assets/img/lc-mobile-image4.png" alt="Mobile image 4" />
        </div>
      </div>
    </div>

    <!-- Bottom prev/next -->
    <div class="mt-6 mb-8 flex flex-col items-center justify-between gap-4 md:flex-row md:gap-2">
      <Button
        :label="`Previous - ${prevProject.title}`"
        icon="pi pi-arrow-left"
        class="p-button-outlined"
        @click="navigateTo(prevProject)"
      />

      <span class="text-xl font-semibold uppercase">{{ current.title }}</span>

      <Button
        :label="`Next - ${nextProject.title}`"
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
import projects from '@/web-dev-projects.js';

export default {
  name: 'LouisCattiauxProject',
  components: { Card, Button },
  data() {
    return {
      videoLoaded: false,
      projects,
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
    markVideoAsLoaded() {
      this.videoLoaded = true;
    },
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
.gallery-grid {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Chaque ligne de la galerie utilise CSS Grid */
.grid-row {
  display: grid;
  gap: 20px;
}

/* Ligne 1 : deux colonnes pour images paysage */
.row1 {
  grid-template-columns: 1fr 1fr;
}

/* Ligne 2 : trois colonnes (50% pour le stack + 25% pour chaque portrait) */
.row2 {
  grid-template-columns: 2fr 1fr 1fr;
}

/* Ligne 3 (desktop) : trois colonnes (portrait - stack - portrait) */
.row3 {
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-areas: 'portrait1 stack portrait2';
}

/* Attribution des grid-areas aux enfants de row3 */
.row3 > .grid-item:nth-child(1) {
  grid-area: portrait1;
}
.row3 > .grid-item:nth-child(2) {
  grid-area: stack;
}
.row3 > .grid-item:nth-child(3) {
  grid-area: portrait2;
}

/* Styles généraux pour les images */
.grid-item img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  border-radius: 10px;
}

/* Ratio pour les images paysage */
.landscape img,
.landscape-stack img {
  aspect-ratio: 16 / 9;
}

/* Ratio pour les images portrait */
.portrait img {
  aspect-ratio: 3 / 4;
}

/* Pour les conteneurs en pile */
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
  /* Pour les lignes contenant des images paysage, on passe à 1 colonne */
  .row1 {
    grid-template-columns: 1fr;
  }
  /* Ligne 2 passe à 2 colonnes :
      Le conteneur stack occupe les deux colonnes, les images portrait restent en grille */
  .row2 {
    grid-template-columns: repeat(2, 1fr);
  }
  .row2 > .grid-item.stack {
    grid-column: 1 / -1;
  }
  /* Ligne 3 passe à 2 colonnes.
      On force le conteneur stack (landscape-stack) à occuper toute la largeur */
  .row3 {
    grid-template-columns: 1fr 1fr;
    /* Le conteneur stack occupe la première ligne et s'étend sur deux colonnes,
        les deux images portrait s'affichent côte à côte sur la deuxième ligne */
    grid-template-areas:
      'stack stack'
      'portrait1 portrait2';
  }
  .portrait img {
    aspect-ratio: unset;
  }
  .dark-light-button {
    height: 20px !important;
    bottom: 40px !important;
    left: 40px !important;
  }
  .line {
    flex-wrap: wrap;
    height: 100%;
  }
  .line:nth-of-type(2) {
    display: none;
  }
  .project-info {
    font-size: var(--fs-18);
  }
  .project-container {
    font-size: var(--fs-24);
  }

  .project-resp {
    font-size: var(--fs-18);
  }
  .project-url {
    font-size: var(--fs-18);
  }
  h1 {
    font-size: var(--fs-30);
  }
  .project-resp {
    width: 100%;
    text-align: left;
    margin-bottom: 30px;
  }
  .project-url {
    width: 100%;
    margin-left: 0;
  }
}
@media screen and (max-width: 628px) {
  main {
    max-width: 299px !important;
  }
  .header {
    flex-direction: column;
  }
  .line {
    flex-direction: column;
  }
  .project-info {
    margin: 30px 0;
  }
  h1 {
    margin-top: 50px;
  }
  .button {
    margin-bottom: 50px;
  }
  .project-summary {
    margin-top: 0;
  }
}
</style>
