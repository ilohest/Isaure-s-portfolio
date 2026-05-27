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

    <section class="mark-case-study" aria-labelledby="mark-conlan-title">
      <div class="mark-case-study__intro">
        <header class="mark-project-header">
          <h1 id="mark-conlan-title" class="font-display m-0 uppercase">Mark Conlan</h1>
          <ul class="mark-project-tags" aria-label="Project tags">
            <li>Shopify</li>
            <li>Liquid</li>
            <li>E-commerce</li>
          </ul>
        </header>

        <div class="mark-challenge">
          <h2>The challenge</h2>
          <p>
            Mark Conlan is an Irish illustrator with a growing catalog of originals, prints, and
            collections. He had a Squarespace site that did its job: clean, presentable, his work on
            display. But as his catalog grew, the cracks started showing. The e-commerce was too
            rigid to handle the way he actually sells. The gallery looked fine, but couldn't adapt
            to the specifics of each project. He needed a platform that could grow with his
            practice, not hold it back. So we moved to Shopify, and built everything around how he
            actually works.
          </p>
        </div>

        <div class="mark-responsibilities">
          <h2>Responsibilities</h2>
          <p>
            Shopify setup & migration - Liquid theme customization - Masonry gallery development -
            Product & collection architecture - Launch
          </p>
        </div>
      </div>

      <div class="mark-built" aria-labelledby="mark-built-title">
        <h2 id="mark-built-title">What we built</h2>
        <article class="mark-built-card">
          <h3>Custom portfolio gallery</h3>
          <p>
            Squarespace's grid options couldn't handle the variety of Mark's formats. I built a
            masonry-style gallery in Liquid, 100% tailored to how his illustrations are meant to be
            seen: format-aware, flexible, and fully editable by Mark without touching code.
          </p>
        </article>

        <article class="mark-built-card">
          <h3>E-commerce built to scale</h3>
          <p>
            Product templates, structured collections, variant logic: everything was set up to
            handle a growing catalog cleanly. Adding new works, new series, or new product types
            doesn't require rebuilding anything.
          </p>
        </article>

        <article class="mark-built-card">
          <h3>His store, his control</h3>
          <p>
            One of the core goals was autonomy. Mark can now manage his entire catalog, update
            collections, and launch new pieces without depending on a developer. The back-end is as
            considered as the front.
          </p>
        </article>

        <article class="mark-url-card">
          <h3>URL</h3>
          <a
            href="https://markconlan.com/"
            target="_blank"
            rel="noopener noreferrer"
            class="mark-project-url"
          >
            markconlan.com
          </a>
        </article>
      </div>
    </section>

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

    <div class="project-card project-card-media">
      <picture>
        <source
          type="image/webp"
          srcset="
            /assets/media/projects/web-dev/mark-conlan/mockup-mark-conlan-640.webp   640w,
            /assets/media/projects/web-dev/mark-conlan/mockup-mark-conlan-960.webp   960w,
            /assets/media/projects/web-dev/mark-conlan/mockup-mark-conlan-1280.webp 1280w,
            /assets/media/projects/web-dev/mark-conlan/mockup-mark-conlan-1920.webp 1920w
          "
          sizes="(max-width: 768px) 100vw, 1200px"
        />
        <img
          src="/assets/media/projects/web-dev/mark-conlan/mockup-mark-conlan-960.png"
          alt="Mark Conlan ecommerce mockup"
          class="project-media"
          loading="lazy"
          decoding="async"
        />
      </picture>
    </div>

    <div ref="secondVideoTrigger" class="project-card project-card-video">
      <img
        v-if="!showSecondVideo"
        src="/assets/media/projects/web-dev/mark-conlan/mark-conlan-temp-960.avif"
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

    <div class="project-card project-card-mockup">
      <iframe
        src="/mark-conlan-animated-mockup.html"
        title="Mark Conlan animated mockup"
        class="animated-mockup-frame"
        loading="lazy"
        allow="autoplay"
      ></iframe>
    </div>

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
import Button from 'primevue/button';
import projects from '@/web-dev-projects';
import allProjects from '@/all-projects';

export default {
  name: 'MarkConlanProject',
  components: { Button },
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
.mark-case-study {
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(320px, 1.05fr);
  gap: 1rem;
  color: var(--text-secondary);
}

.mark-case-study__intro,
.mark-built {
  padding: 0;
}

.mark-case-study__intro {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
  min-height: clamp(520px, 62vh, 720px);
}

.mark-project-header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.mark-project-header h1 {
  max-width: 8ch;
  font-size: clamp(3.4rem, 9vw, 8.5rem);
  line-height: 0.86;
  color: var(--text-primary);
}

.mark-project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0;
  margin: 0;
  list-style: none;
}

.mark-project-tags li {
  border: 1px solid currentColor;
  border-radius: 999px;
  padding: 0.42rem 0.7rem;
  font-family: var(--font-family-display);
  font-size: 0.78rem;
  line-height: 1;
  text-transform: uppercase;
  color: var(--text-primary);
}

.mark-challenge,
.mark-responsibilities,
.mark-built-card,
.mark-url-card {
  border-radius: var(--project-summary-radius);
  background: var(--surface-muted);
  padding: clamp(1rem, 2vw, 1.35rem);
  font-family: var(--font-family-body);
  font-weight: 300;
}

.mark-challenge h2,
.mark-responsibilities h2,
.mark-built h2,
.mark-built-card h3,
.mark-url-card h3 {
  margin: 0;
  color: var(--text-primary);
  font-family: var(--font-family-display);
  font-weight: 400;
  letter-spacing: 0;
  text-transform: uppercase;
}

.mark-challenge h2,
.mark-responsibilities h2 {
  margin-bottom: 0.75rem;
  font-size: clamp(1.25rem, 1.6vw, 1.7rem);
}

.mark-built h2 {
  margin-bottom: 0.5rem;
  font-size: clamp(2rem, 4vw, 4rem);
  line-height: 0.95;
}

.mark-challenge p,
.mark-responsibilities p,
.mark-built-card p {
  margin: 0;
  max-width: 68ch;
  line-height: 1.6;
}

.mark-responsibilities p {
  max-width: 54ch;
}

.mark-built {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.mark-built-card {
  border-radius: var(--project-card-radius);
}

.mark-built-card h3 {
  margin-bottom: 0.85rem;
  font-size: clamp(1.2rem, 1.8vw, 1.8rem);
  line-height: 1.05;
}

.mark-url-card h3 {
  font-size: clamp(1.25rem, 1.6vw, 1.7rem);
}

.mark-url-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.mark-project-url {
  color: var(--text-secondary);
  font-family: var(--font-family-display);
  text-transform: uppercase;
  text-decoration: none;
}

.mark-project-url:hover,
.mark-project-url:focus-visible {
  color: var(--text-primary);
}

.project-card-video {
  overflow: hidden;
}

.video-projet {
  width: 100%;
  display: block;
  border: 1px solid var(--interactive-primary);
}

.project-media {
  width: 100%;
  display: block;
}

.video-placeholder {
  width: 100%;
  display: block;
  border: 1px solid var(--interactive-primary);
}

.video-projet {
  object-fit: contain;
}

.project-card-mockup {
  overflow: hidden;
  border: 1px solid var(--interactive-primary);
  background: #000;
}

.animated-mockup-frame {
  width: 100%;
  height: clamp(640px, 88vh, 1120px);
  display: block;
  border: 0;
}

@media (max-width: 768px) {
  .mark-case-study {
    grid-template-columns: 1fr;
  }

  .mark-case-study__intro,
  .mark-built {
    padding: 0;
  }

  .mark-case-study__intro {
    min-height: auto;
    gap: 1rem;
  }

  .mark-project-header h1 {
    max-width: none;
    font-size: clamp(3rem, 19vw, 4.8rem);
  }

  .mark-url-card {
    align-items: flex-start;
  }

  .animated-mockup-frame {
    height: min(82vh, 760px);
  }
}
</style>
