<template>
  <section
    class="relative container mx-auto flex flex-col gap-4 px-4 py-4 md:top-[40px] md:px-6 md:py-8"
  >
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

    <div class="flex items-center justify-center">
      <img
        src="@/assets/img/elinor1.png"
        alt="Elinor 1"
        class="border-round-xl block h-auto max-w-full md:m-8"
      />
    </div>

    <!-- Project summary -->
    <Card
      class="border-round-xl bg-[var(--blue-bg)] font-['Red_Hat_Text'] font-light text-[var(--light-content)] shadow-none"
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
              This logo is built on a continuous, flowing line that forms an infinity loop — an
              intentional nod to the unending cycle of energy in the body. Its shape subtly echoes
              the therapist’s hands in motion, listening and responding to the body’s own signals.
              By bridging earth and sky, the logo embodies restored balance and the seamless
              connection between physical sensation and emotional well-being. With its clean,
              organic form, it communicates professionalism, trust, and the core kinesiological
              promise of guiding clients back to their natural state of harmony. The typography uses
              slender, elegant typefaces with generous letter-spacing, projecting both precision and
              refinement. The color palette is built from soft pastels—muted tones that work
              together to soothe the senses and reinforce the brand’s promise of balanced,
              restorative care.
            </p>
          </div>
        </div>
      </template>
    </Card>

    <div class="border-round-xl flex items-center justify-center bg-[#DCB2A2] py-[15rem] md:py-40">
      <img
        src="@/assets/img/elinor8.png"
        alt="Elinor 8"
        class="block h-auto w-1/2 max-w-[370px] sm:w-2/5"
      />
    </div>

    <!-- Séquence d’images -->
    <div class="flex items-center justify-center">
      <img
        src="@/assets/img/elinor2.png"
        alt="Elinor 2"
        class="border-round-xl block h-auto max-w-full"
      />
    </div>

    <div class="flex items-center justify-center">
      <img
        src="@/assets/img/elinor3.png"
        alt="Elinor 3"
        class="border-round-xl block h-auto max-w-full"
      />
    </div>
    <div class="flex items-center justify-center">
      <img
        src="@/assets/img/elinor4.png"
        alt="Elinor 4"
        class="border-round-xl block h-auto max-w-full"
      />
    </div>
    <div class="flex items-center justify-center">
      <img
        src="@/assets/img/elinor5.png"
        alt="Elinor 5"
        class="border-round-xl block h-auto max-w-full"
      />
    </div>

    <!-- Grilles 3 colonnes -->
    <section class="three-block">
      <div class="three-grid">
        <img src="@/assets/img/elinor9.png" alt="Elinor 9" />
        <img src="@/assets/img/elinor10.png" alt="Elinor 10" />
        <img src="@/assets/img/elinor11.png" alt="Elinor 11" />
      </div>

      <div class="three-grid">
        <img src="@/assets/img/elinor12.png" alt="Elinor 12" />
        <img src="@/assets/img/elinor13.png" alt="Elinor 13" />
        <img src="@/assets/img/elinor14.png" alt="Elinor 14" />
      </div>
    </section>
    <div class="flex items-center justify-center">
      <img
        src="@/assets/img/elinor6.png"
        alt="Elinor 6"
        class="border-round-xl block h-auto max-w-full"
      />
    </div>

    <div class="flex items-center justify-center">
      <img
        src="@/assets/img/elinor7.png"
        alt="Elinor 7"
        class="border-round-xl block h-auto max-w-full"
      />
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
import projects from '@/branding-projects.js';

export default {
  name: 'ElinorBranding',
  components: { Card, Button },
  data() {
    return { projects };
  },
  computed: {
    currentIndex() {
      const path = this.$route?.path || '';
      let idx = this.projects.findIndex((p) => p.projectLink === path);
      if (idx !== -1) return idx;

      // fallback par id si tu utilises un paramètre
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
.three-block {
  background: #f7efe4;
  border-radius: 12px;
  padding: 24px; /* mobile */
}

.three-grid {
  display: grid;
  grid-template-columns: 1fr; /* 1 colonne par défaut */
  gap: 16px;
  margin-bottom: 7px;
}

@media (min-width: 640px) {
  .three-block {
    padding: 40px;
  }

  .three-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 7px;
  }
}

.three-grid img {
  display: block;
  width: 100%;
  height: auto;
  max-width: 100%;
  border-radius: 12px;
}
</style>
