<template>
  <section
    class="relative container mx-auto flex flex-col gap-4 px-4 py-4 md:top-[40px] md:px-6 md:py-8"
  >
    <div class="flex items-center justify-between">
      <Button
        label="Back to projects"
        icon="pi pi-arrow-left"
        text
        class="btn-link"
        @click="$router.push('/achievements')"
      />
    </div>

    <Card class="project-summary-card bg-[var(--surface-muted)] text-[var(--text-secondary)] shadow-none">
      <template #content>
        <div class="flex flex-col gap-4 p-4 md:p-6">
          <h2 class="m-0 font-display text-4xl uppercase">Mark Conlan</h2>

          <div class="font-['Red_Hat_Text'] font-light">
            <p>
              For this e-commerce project, I collaborated with Irish illustrator Mark Conlan to
              translate his playful, expressive universe into a refined and high-performing online
              store. The objective was to create a digital space that feels as intentional as his
              artwork, balancing spontaneity with structure.
              <br /><br />
              Built on Shopify, the platform was carefully customized to showcase original
              artworks, limited prints, and ongoing collections with clarity and flexibility. We
              developed tailored product templates, structured collections (Personal Work,
              Sketchbook, Projects), and a masonry-style gallery that preserves the integrity of
              each format without unnecessary cropping.
              <br /><br />
              Particular attention was given to typography, spacing, and color balance, allowing
              the illustrations to take center stage while reinforcing a cohesive brand identity.
              Behind the scenes, I implemented scalable structures and editing tools to give Mark
              autonomy in managing his catalog as his body of work evolves.
              <br /><br />
              The result is a clean, engaging, and intuitive storefront, one that honors the
              character of his illustrations while providing a professional, fluid shopping
              experience.
            </p>
          </div>

          <div class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div class="md:w-8/12">
              <h2 class="mb-3 text-xl tracking-wide uppercase">Responsibilities</h2>
              <p class="font-['Red_Hat_Text'] font-light">
                Web design personalization, Shopify setup, site development and features
                personalization, website launch.
              </p>
            </div>

            <div class="md:w-4/12 md:pl-10">
              <h2 class="mb-3 text-xl tracking-wide uppercase">URL</h2>
              <a
                href="https://markconlan.com/"
                target="_blank"
                rel="noopener noreferrer"
                class="font-['Red_Hat_Text'] font-light text-inherit"
              >
                markconlan.com
              </a>
            </div>
          </div>
        </div>
      </template>
    </Card>

    <div class="project-card project-card-video">
      <video
        src="/media/videos/mark-conlan-2-web.mp4"
        class="video-projet"
        autoplay
        loop
        muted
        playsinline
        preload="metadata"
      ></video>
    </div>

    <div ref="secondVideoTrigger" class="project-card project-card-video">
      <img
        v-if="!showSecondVideo"
        src="../../assets/img/canpruna-temp.png"
        class="video-placeholder"
        alt="Placeholder Mark Conlan project second video"
      />
      <video
        v-else
        src="/media/videos/mark-conlan-1-web.mp4"
        class="video-projet"
        autoplay
        loop
        muted
        playsinline
        preload="metadata"
      ></video>
    </div>

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
import projects from '@/web-dev-projects';

export default {
  name: 'MarkConlanProject',
  components: { Card, Button },
  data() {
    return {
      projects,
      showSecondVideo: false,
      secondVideoObserver: null,
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
    navigateTo(project) {
      if (project?.projectLink) this.$router.push(project.projectLink);
    },
  },
  mounted() {
    window.scrollTo(0, 0);

    if (!('IntersectionObserver' in window)) {
      this.showSecondVideo = true;
      return;
    }

    const target = this.$refs.secondVideoTrigger;
    if (!(target instanceof Element)) {
      this.showSecondVideo = true;
      return;
    }

    this.secondVideoObserver = new IntersectionObserver(
      (entries, observer) => {
        const [entry] = entries;
        if (!entry?.isIntersecting) return;
        this.showSecondVideo = true;
        observer.disconnect();
        this.secondVideoObserver = null;
      },
      { root: null, rootMargin: '200px 0px', threshold: 0.05 },
    );

    this.secondVideoObserver.observe(target);
  },
  beforeUnmount() {
    if (this.secondVideoObserver) {
      this.secondVideoObserver.disconnect();
      this.secondVideoObserver = null;
    }
  },
};
</script>

<style scoped>
.project-card-video {
  overflow: hidden;
}

.video-projet {
  width: 100%;
  display: block;
  border: 1px solid var(--interactive-primary);
}

.video-placeholder {
  width: 100%;
  display: block;
  border: 1px solid var(--interactive-primary);
}

.video-projet {
  object-fit: contain;
}
</style>
