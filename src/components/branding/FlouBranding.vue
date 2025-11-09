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

    <div class="justify-content-center align-items-center m-0 flex p-0 md:my-6">
      <img
        src="@/assets/img/flou1.png"
        alt="Flou "
        class="border-round-xl block h-auto max-w-full md:p-8"
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
              </ul>
            </section>

            <section>
              <h3 class="mb-2 uppercase">About</h3>
              <div class="flex flex-col gap-1 text-base">
                <p><i class="uppercase">Client: </i>Flouwers</p>
                <p><i class="uppercase">Sector: </i>Floral scenography</p>
                <p><i class="uppercase">Country: </i>Belgium</p>
                <p><i class="uppercase">Instagram: </i>
                  <a
                    href=https://www.instagram.com/f.lou.wers/
                    target="_blank"
                    class="text-inherit"
                    >
                    @f.lou.wers
                    </a>
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
              is a brand that feels alive, playful yet elegant, earthy yet poetic. "Half Lou, half
              mad, 100% Flou".
            </p>
          </div>
        </div>
      </template>
    </Card>

    <!-- masonry -->
    <section class="masonry">
      <div class="masonry-item">
        <img src="@/assets/img/flou-1.png" alt="Flou" loading="lazy" />
      </div>
      <div class="masonry-item">
        <img src="@/assets/img/flou-15.png" alt="Flou" loading="lazy" />
      </div>
      <div class="masonry-item">
        <img src="@/assets/img/flou-2.png" alt="Flou" loading="lazy" />
      </div>
      <div class="masonry-item">
        <img src="@/assets/img/flou-3.png" alt="Flou" loading="lazy" />
      </div>
      <div class="masonry-item">
        <img src="@/assets/img/flou-16.png" alt="Flou" loading="lazy" />
      </div>
      <div class="masonry-item">
        <img src="@/assets/img/flou-4.png" alt="Flou" loading="lazy" />
      </div>
      <div class="masonry-item">
        <img src="@/assets/img/flou-17.png" alt="Flou" loading="lazy" />
      </div>
      <div class="masonry-item">
        <img src="@/assets/img/flou-5.png" alt="Flou" loading="lazy" />
      </div>
      <div class="masonry-item">
        <img src="@/assets/img/flou-6.png" alt="Flou" loading="lazy" />
      </div>
      <div class="masonry-item">
        <img src="@/assets/img/flou-21.png" class="no-radius" alt="Flou" loading="lazy" />
      </div>
      <div class="masonry-item">
        <img src="@/assets/img/flou-13.png" alt="Flou" loading="lazy" />
      </div>
      <div class="masonry-item">
        <img src="@/assets/img/flou-7.png" alt="Flou" loading="lazy" />
      </div>
      <div class="masonry-item">
        <img src="@/assets/img/flou-8.png" alt="Flou" loading="lazy" />
      </div>
      <div class="masonry-item">
        <img src="@/assets/img/flou-9.png" alt="Flou" loading="lazy" />
      </div>
      <div class="masonry-item">
        <img src="@/assets/img/flou-10.png" alt="Flou" loading="lazy" />
      </div>
      <div class="masonry-item">
        <img src="@/assets/img/flou-12.png" alt="Flou" loading="lazy" />
      </div>
      <div class="masonry-item">
        <img src="@/assets/img/flou-11.png" alt="Flou" loading="lazy" />
      </div>
      <div class="masonry-item">
        <img src="@/assets/img/flou-14.png" alt="Flou" loading="lazy" />
      </div>
      <div class="masonry-item">
        <img src="@/assets/img/flou-18.png" alt="Flou" loading="lazy" />
      </div>
      <div class="masonry-item">
        <img src="@/assets/img/flou-19.png" alt="Flou" loading="lazy" />
      </div>
      <div class="masonry-item">
        <img src="@/assets/img/flou-20.png" alt="Flou" loading="lazy" />
      </div>
      <div class="masonry-item">
        <img src="@/assets/img/flou-22.png" alt="Flou" loading="lazy" />
      </div>
      <div class="masonry-item">
        <img src="@/assets/img/flou-palette.png" alt="Elinor 11" loading="lazy" />
      </div>
    </section>

    <img
      src="@/assets/img/flou-brandbook.png"
      alt="Flou brandbook"
      class="border-round-xl block h-auto w-full max-w-full"
    />

    <!-- Bottom prev/next -->
    <div class="mt-6 mb-8 flex items-center gap-2 justify-between">
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
  name: 'FlouBranding',
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
.masonry {
  column-count: 4;
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
</style>
