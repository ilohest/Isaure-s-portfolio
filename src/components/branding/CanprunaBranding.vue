<template>
  <div id="app" class="main flex flex-col gap-4 pt-4">
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
        src="@/assets/img/canpruna1.png"
        alt="Can Pruna 1"
        class="border-round-xl block h-auto max-w-full bg-[#fff] p-4 md:p-8"
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

          <!-- Colonne centre -->
          <div class="md:w-4/12">
            <h3 class="mb-2 uppercase">Project</h3>
            <p class="leading-relaxed">
              Our design distilled Can Pruna’s Masía into a cohesive visual story, anchored by an
              earthy palette of charcoal, off-white, bright olive, and deep forest green drawn
              directly from the site. Hand-sketched elements bring an artisanal touch that feels
              both welcoming and authentic. We paired a generously spaced sans-serif for headings
              with a humanist serif for body text, allowing ample white space for imagery and line
              art to breathe. I also photographed and retouched all site imagery, ensuring each shot
              reflects the Masía’s tranquil, hospitable spirit. Together, these choices create an
              inviting, narrative-driven interface that evokes rest and reconnection from first
              glance.
            </p>
          </div>

          <!-- Colonne droite -->
          <div class="md:w-5/12">
            <h3 class="mb-2 tracking-wide uppercase">Branding</h3>
            <p class="leading-relaxed">
              The Can Pruna logo features three stylized cypress trees set in subtle perspective.
              The trio conveys true hospitality: three trees speak to abundance and generosity,
              inviting visitors to join in a shared experience of rest and reconnection. In
              Mediterranean lore, one tree invites travelers for a drink, two promise food and
              drink, and three, just like here, signal full accommodation (drink, a meal, and a bed
              for the night). It underscores the Masía’s promise to offer not just shelter, but a
              gracious, inclusive welcome under the Montseny sky.
            </p>
          </div>
        </div>
      </template>
    </Card>

    <!-- Sequence of images -->
    <div class="flex items-center justify-center">
      <img
        src="@/assets/img/canpruna2.png"
        class="border-round-xl block h-auto max-w-full bg-[#fff] p-4 md:p-8"
        alt="Can Pruna map"
      />
    </div>

    <section class="flex gap-4 overflow-hidden rounded-xl md:grid-cols-2">
      <!-- Colonne gauche -->
      <div class="border-round-xl flex w-full items-center justify-center bg-[#153d27] p-4 md:p-8">
        <img
          src="@/assets/img/canpruna-logo2.png"
          alt="Can Pruna logo"
          class="block h-auto w-full max-w-[150px]"
        />
      </div>

      <!-- Colonne droite -->
      <div class="border-round-xl flex w-full items-center justify-center bg-[#153d27] p-4 md:p-8">
        <img
          src="@/assets/img/canpruna3.png"
          alt="Can Pruna logo"
          class="block h-auto w-full max-w-[500px]"
        />
      </div>
    </section>

    <div class="flex items-center justify-center">
      <img
        src="@/assets/img/canpruna4.png"
        alt="Can Pruna 4"
        class="border-round-xl block h-auto max-w-full"
      />
    </div>
    <div class="flex items-center justify-center">
      <img
        src="@/assets/img/canpruna5.png"
        alt="Can Pruna 5"
        class="border-round-xl block h-auto max-w-full"
      />
    </div>

    <!-- Grid 3x3 responsive -->
    <section class="image-grid">
      <img src="@/assets/img/DSCF3669-1.jpg" alt="Grid image 1" />
      <img src="@/assets/img/DSCF3638-1.jpg" alt="Grid image 2" />
      <img src="@/assets/img/DSCF9479-1.jpg" alt="Grid image 3" />
      <img src="@/assets/img/DSCF9614-1.jpg" alt="Grid image 4" />
      <img src="@/assets/img/DSCF3622-1.jpg" alt="Grid image 5" />
      <img src="@/assets/img/DSCF9439-1.jpg" alt="Grid image 6" />
      <img src="@/assets/img/DSCF3659-1.jpg" alt="Grid image 7" />
      <img src="@/assets/img/DSCF3662-1.jpg" alt="Grid image 8" />
      <img src="@/assets/img/DSCF9586-1.jpg" alt="Grid image 9" />
    </section>

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
  </div>
</template>

<script>
import Card from 'primevue/card';
import Button from 'primevue/button';
import projects from '@/branding-projects.js';

export default {
  name: 'CanprunaBranding',
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
/* Grille 3x3 responsive, images carrées, pas de débordement */
.image-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.image-grid img {
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 10px;
}

@media (max-width: 970px) {
  .image-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 628px) {
  .image-grid {
    grid-template-columns: 1fr;
  }
}

/* Bouton texte “Back” si tu utilises la classe btn-link en global */
:deep(.p-button.p-button-text.btn-link) {
  gap: 0.5rem;
  padding: 0.25rem 0;
}

:deep(.p-button.p-button-text.btn-link .p-button-icon) {
  margin: 0;
}
</style>
