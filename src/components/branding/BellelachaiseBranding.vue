<template>
  <div id="app" class="main flex flex-col gap-4">
    <!-- Back to list -->
    <div class="flex items-center justify-between">
      <Button
        label="Back to branding projects"
        icon="pi pi-arrow-left"
        text
        class="btn-link"
        @click="$router.push('/achievements/branding')"
      />
    </div>

    <!-- Hero image -->
    <div class="m-0 flex items-center justify-center p-0 md:my-6">
      <img
        src="@/assets/img/blc1.png"
        alt="Bellelachaise 1"
        class="border-round-xl block h-auto max-w-full"
      />
    </div>

    <!-- Project summary -->
    <Card
      class="border-round-xl bg-[var(--blue-bg)] font-['Red_Hat_Text'] font-light text-[var(--light-content)] shadow-none"
    >
      <template #content>
        <div class="flex flex-col gap-4 p-4 md:flex-row md:p-6">
          <!-- Colonne gauche -->
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
                <p><i class="uppercase">Client: </i>Bellelachaise</p>
                <p>
                  <i class="uppercase">Sector: </i>Home décor &amp; interior design (vintage
                  furniture)
                </p>
                <p><i class="uppercase">Country: </i>Belgium</p>
                <p>
                  <i class="uppercase">Instagram: </i>
                  <a
                    href="https://www.instagram.com/bellelachaise/"
                    target="_blank"
                    class="text-inherit"
                  >
                    @bellelachaise
                  </a>
                </p>
              </div>
            </section>
          </div>

          <!-- Colonne centre -->
          <div class="md:w-4/12">
            <h3 class="mb-2 uppercase">Project</h3>
            <p class="leading-relaxed">
              This project brings iconic 1970s–80s vintage furniture through a minimalist lens. Each
              piece — carefully selected for its era-defining form and quality — is refined to its
              essence: clean lines, natural materials, and a muted palette that blends simplicity
              with warmth. The result is a cohesive collection that honors the bold silhouettes of
              the past while delivering a serene, contemporary aesthetic. Perfectly balanced between
              nostalgia and modern restraint, this curated lineup brings timeless character and
              effortless sophistication to any living space.
            </p>
          </div>

          <!-- Colonne droite -->
          <div class="md:w-5/12">
            <h3 class="mb-2 tracking-wide uppercase">Branding</h3>
            <p class="leading-relaxed">
              This logo takes the clean outline of a classic mid-century chair and distills it into
              a single, uninterrupted line—an abstract “Pantone silhouette” that immediately
              suggests both design precision and timeless comfort. The slender serifs and
              high-contrast strokes lend a timeless, upscale feel with a modern, approachable touch.
              Rendered in a deep, muted charcoal, the palette hints at sophistication and pairs
              beautifully with the color palette. The palette draws directly from Pantone’s 2024
              selection evoking a sense of contemporary sophistication. Together, type and icon form
              a cohesive logo that speaks directly to the brand’s promise: carefully curated,
              design-forward vintage furnishings brought to life in a minimalist, boutique setting.
            </p>
          </div>
        </div>
      </template>
    </Card>

    <div class="border-round-xl flex items-center justify-center bg-[#a47764] py-[15rem] md:py-40">
      <img
        src="@/assets/img/blc8.png"
        alt="Bellelachaise 8"
        class="border-round-xl block h-auto w-1/2 max-w-[370px] sm:w-2/5"
      />
    </div>

    <!-- masonry -->
    <section class="masonry">
      <div class="masonry-item">
        <img src="@/assets/img/blc-desktop-image2.png" alt="Flou" loading="lazy" />
      </div>
      <div class="masonry-item">
        <img src="@/assets/img/blc4.png" alt="Flou" loading="lazy" />
      </div>
      <div class="masonry-item">
        <img src="@/assets/img/blc3.png" alt="Flou" loading="lazy" />
      </div>
      <div class="masonry-item">
        <img src="@/assets/img/blc2.jpg" alt="Flou" loading="lazy" />
      </div>
      <div class="masonry-item">
        <img src="@/assets/img/blc10.png" alt="Flou" loading="lazy" />
      </div>
      <div class="masonry-item">
        <img src="@/assets/img/blc13.png" alt="Flou" loading="lazy" />
      </div>
      <div class="masonry-item">
        <img src="@/assets/img/blc-vitrine1.jpg" alt="Flou" loading="lazy" />
      </div>
      <div class="masonry-item border-round-xl bg-[#372e3a]">
        <img src="@/assets/img/blc8.png" alt="Flou" loading="lazy" class="w-50" />
      </div>
      <div class="masonry-item">
        <img src="@/assets/img/blc5.png" alt="Flou" loading="lazy" />
      </div>
      <div class="masonry-item">
        <img src="@/assets/img/blc12.png" alt="Flou" loading="lazy" />
      </div>
      <div class="masonry-item">
        <img src="@/assets/img/blc6.png" alt="Flou" loading="lazy" />
      </div>
      <div class="masonry-item">
        <img src="@/assets/img/blc9.png" alt="Flou" loading="lazy" />
      </div>
      <div class="masonry-item">
        <img src="@/assets/img/blc11.png" alt="Flou" loading="lazy" />
      </div>
      <div class="masonry-item">
        <img src="@/assets/img/blc14.jpg" alt="Flou" loading="lazy" />
      </div>
    </section>

    <div class="flex items-center justify-center">
      <img
        src="@/assets/img/blc7.png"
        alt="Bellelachaise 7"
        class="border-round-xl block h-auto max-w-full"
      />
    </div>

    <!-- Bottom prev/next -->
    <div class="mt-6 mb-8 flex items-center justify-between">
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
  </div>
</template>

<script>
import Card from 'primevue/card';
import Button from 'primevue/button';
import projects from '@/branding-projects.js';

export default {
  name: 'BellelachaiseBranding',
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
  },
  mounted() {
    window.scrollTo(0, 0);
  },
};
</script>

<style scoped>
/* Deux images côte à côte, responsive */
.two-image-row {
  display: flex;
  gap: 1rem;
  padding: 2rem 0;
  justify-content: center;
  align-items: center;
}
.two-image-row img {
  width: calc(50% - 0.5rem);
  height: auto;
  object-fit: cover;
  border-radius: 10px;
}
@media (max-width: 768px) {
  .two-image-row {
    flex-direction: column;
    gap: 1.5rem;
  }
  .two-image-row img {
    width: 100%;
  }
}

.masonry {
  column-count: 3;
  column-gap: 1rem;
  border-radius: 10px;
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
  border-radius: 10px;
}

/* Tablet ≤ 970px: 3 colonnes */
@media (max-width: 970px) {
  .masonry {
    column-count: 2;
  }
}

/* Mobile ≤ 628px: 2 colonnes */
@media (max-width: 628px) {
  .masonry {
    column-count: 1;
    column-gap: 0.75rem;
  }
}

.masonry-item img.no-radius,
img.no-radius {
  border-radius: 0 !important;
}
</style>
