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

    <section v-if="isPreviewMode" class="preview-shell">
      <div class="preview-stage">
        <div class="preview-sticker" aria-label="Project coming soon">
          <span>Soon to be released</span>
        </div>

        <video
          :src="previewVideo.src"
          :aria-label="previewVideo.alt"
          class="preview-video"
          autoplay
          loop
          muted
          playsinline
          preload="metadata"
        ></video>
      </div>
    </section>

    <template v-else>
      <section class="alyssa-case-study" aria-labelledby="alyssa-title">
        <div class="alyssa-case-study__intro">
          <header class="alyssa-project-header">
            <h1 id="alyssa-title" class="font-display m-0 uppercase">
              Alyssa Coleman
              <span class="project-title-sub">Back of House</span>
            </h1>
            <ul class="alyssa-project-tags" aria-label="Project tags">
              <li>Showit</li>
              <li>Content architecture</li>
              <li>Web redesign</li>
            </ul>
          </header>

          <div class="alyssa-challenge">
            <h2>The challenge</h2>
            <p>
              Alyssa Coleman came to me with an existing Showit site that had grown organically over
              the years — and it showed. Pages felt disconnected, the visual hierarchy unclear, the
              layout lacking the intentional structure a personal brand at her level deserved.
              Meanwhile, Alyssa was pivoting entirely: new positioning, new audience, new energy —
              slow marketing and soft systems for creative entrepreneurs. The brand direction and
              visual identity were handled by Lara González. My job was to take that new brand and
              build a site that finally matched where she was going — from scratch, pushing Showit
              well beyond its defaults.
            </p>
          </div>

          <div class="alyssa-responsibilities">
            <h2>Responsibilities</h2>
            <p>
              Showit full redesign - Content architecture - Page hierarchy & navigation - Custom
              functionality & interactions - Collaboration with brand designer Lara González -
              Launch
            </p>
          </div>
        </div>

        <div class="alyssa-built" aria-labelledby="alyssa-built-title">
          <h2 id="alyssa-built-title">What we built</h2>
          <article class="alyssa-built-card">
            <h3>Translating a brand into a site</h3>
            <p>
              Lara's branding set the tone: cozy, intentional, soft. My role was to make the site
              feel exactly that way: every layout decision, spacing choice, and interaction designed
              to match the energy of the new positioning, not just apply the colors.
            </p>
          </article>

          <article class="alyssa-built-card">
            <h3>A new content architecture</h3>
            <p>
              The pivot came with a new core offer: Back of House. I redesigned the entire site
              structure around it: new page hierarchy, new navigation logic, new user journey from
              first visit to conversion.
            </p>
          </article>

          <article class="alyssa-built-card">
            <h3>Showit, pushed further</h3>
            <p>
              Showit has limits. I worked around them: customizing functionality, building
              interactions, and personalizing features well beyond what the platform offers out of
              the box.
            </p>
          </article>

          <article class="alyssa-url-card">
            <h3>URL</h3>
            <a
              href="https://alyssa-coleman-3.showit.site/"
              target="_blank"
              rel="noopener noreferrer"
              class="alyssa-project-url"
            >
              alyssacoleman.ca
            </a>
          </article>
        </div>
      </section>

      <section class="before-after-wrapper" aria-labelledby="before-after-title">
        <header class="section-heading-card">
          <h2 id="before-after-title">Visual Shift</h2>
          <p>
            A focused mood comparison: the old site felt functional but scattered; the redesign
            brings a softer, clearer visual system around Back of House.
          </p>
        </header>

        <div class="before-after-grid">
          <article class="before-after-board">
            <div class="board-intro">
              <span class="ba-label">Before</span>
              <h3>Scattered starting point</h3>
              <p>
                A small sample of the previous site mood: uneven pacing, unclear hierarchy, and a
                visual language that no longer matched Alyssa's direction.
              </p>
            </div>
            <div class="ba-image-stack">
              <figure v-for="img in beforeImages" :key="img.key">
                <img :src="img.src" :alt="img.alt" class="ba-img" loading="lazy" decoding="async" />
              </figure>
            </div>
          </article>

          <article class="before-after-board">
            <div class="board-intro">
              <span class="ba-label">After</span>
              <h3>Softened visual system</h3>
              <p>
                A matching edit of final screens showing the new tone: warmer, clearer, softer, and
                built around the Back of House experience.
              </p>
            </div>
            <div class="ba-image-stack">
              <figure v-for="img in afterImages" :key="img.key">
                <img :src="img.src" :alt="img.alt" class="ba-img" loading="lazy" decoding="async" />
              </figure>
            </div>
          </article>
        </div>
      </section>

      <section class="curated-gallery" :class="{ 'is-ready': galleryReady }">
        <div class="curated-gallery-grid">
          <article
            v-for="(item, index) in galleryItems"
            :key="item.key"
            class="curated-gallery-item masonry-reveal"
            :style="{ '--reveal-delay': `${Math.min(index * 45, 420)}ms` }"
          >
            <picture v-if="item.type === 'image'">
              <source type="image/webp" :srcset="item.webpSrc" />
              <img
                :src="item.src"
                :alt="item.alt"
                class="justified-media"
                loading="lazy"
                decoding="async"
              />
            </picture>

            <video
              v-else
              :src="item.src"
              :aria-label="item.alt"
              class="justified-media"
              autoplay
              loop
              muted
              playsinline
              preload="metadata"
            ></video>
          </article>
        </div>
      </section>

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
          class="p-button-outlined"
          icon-pos="right"
          icon="pi pi-arrow-right"
          @click="navigateTo(nextProject)"
        />
      </div>
    </template>

    <div class="h-24 flex-none"></div>
  </section>
</template>

<script>
import Button from 'primevue/button';
import projects from '@/web-dev-projects';
import allProjects from '@/all-projects';

const imageBase = '/assets/media/projects/web-dev/alyssa-coleman-back-of-house';
const isPreviewMode = false;

const normalizeProjectPath = (path) => (path || '').replace(/\/+$/, '');

const beforeImage = (n) => {
  const num = String(n).padStart(2, '0');
  return {
    src: `${imageBase}/before/alyssa-coleman-back-of-house-before-${num}.png`,
    alt: `Alyssa Coleman site before redesign ${num}`,
  };
};

const afterImage = (n) => {
  const num = String(n).padStart(2, '0');
  return {
    src: `${imageBase}/alyssa-coleman-back-of-house-still-${num}.png`,
    alt: `Back of House screen still ${num}`,
  };
};

const stillItem = (n) => {
  const num = String(n).padStart(2, '0');
  return {
    key: `still-${num}`,
    type: 'image',
    src: `${imageBase}/alyssa-coleman-back-of-house-still-${num}.png`,
    webpSrc: `${imageBase}/alyssa-coleman-back-of-house-still-${num}.webp`,
    alt: `Back of House screen still ${num}`,
  };
};

const motionItem = (n) => {
  const num = String(n).padStart(2, '0');
  return {
    key: `motion-${num}`,
    type: 'video',
    src: `/media/videos/alyssa-coleman-back-of-house-motion-${num}.mp4`,
    alt: `Back of House motion ${num}`,
  };
};

// Mood samples, not one-to-one screen pairs.
const beforeImages = [1, 4, 7, 10].map((n) => ({
  key: `before-${String(n).padStart(2, '0')}`,
  ...beforeImage(n),
}));

const afterImages = [11, 2, 7, 13].map((n) => ({
  key: `after-${String(n).padStart(2, '0')}`,
  ...afterImage(n),
}));

const galleryItems = [
  stillItem(12),
  motionItem(1),
  stillItem(1),
  stillItem(2),
  stillItem(14),
  motionItem(5),
  stillItem(7),
  stillItem(9),
  motionItem(4),
  stillItem(13),
  motionItem(6),
];

export default {
  name: 'AlyssaColemanBackOfHouseProject',
  components: { Button },
  data() {
    return {
      isPreviewMode,
      projects,
      galleryItems,
      beforeImages,
      afterImages,
      masonryObserver: null,
      galleryReady: false,
    };
  },
  computed: {
    previewVideo() {
      return (
        this.galleryItems.find((item) => item.key === 'motion-01') || {
          src: '/media/videos/alyssa-coleman-back-of-house-motion-01.mp4',
          alt: 'Back of House motion 01',
        }
      );
    },
    currentIndex() {
      const path = normalizeProjectPath(this.$route?.path);
      let idx = this.projects.findIndex((p) => normalizeProjectPath(p.projectLink) === path);
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
      const currentPath = normalizeProjectPath(this.current?.projectLink);
      const idx = this.navProjects.findIndex(
        (p) => normalizeProjectPath(p.projectLink) === currentPath,
      );
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
      if (this.masonryObserver) {
        this.masonryObserver.disconnect();
        this.masonryObserver = null;
      }

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
    if (!this.isPreviewMode) {
      this.galleryReady = true;
      this.$nextTick(() => {
        this.setupMasonryReveal();
      });
    }
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
.alyssa-case-study {
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(320px, 1.05fr);
  gap: 1rem;
  color: var(--text-secondary);
}

.alyssa-case-study__intro,
.alyssa-built {
  padding: 0;
}

.alyssa-case-study__intro {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
  min-height: clamp(520px, 62vh, 720px);
}

.alyssa-project-header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.alyssa-project-header h1 {
  max-width: 10ch;
  font-size: clamp(2.8rem, 7vw, 7.2rem);
  line-height: 0.9;
  color: var(--text-primary);
}

.project-title-sub {
  display: block;
  font-size: clamp(1.1rem, 2.2vw, 2.2rem);
  line-height: 1.2;
  margin-top: 0.35em;
  letter-spacing: 0.04em;
}

.alyssa-project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0;
  margin: 0;
  list-style: none;
}

.alyssa-project-tags li {
  border: 1px solid currentColor;
  border-radius: 999px;
  padding: 0.42rem 0.7rem;
  font-family: var(--font-family-display);
  font-size: 0.78rem;
  line-height: 1;
  text-transform: uppercase;
  color: var(--text-primary);
}

.alyssa-challenge,
.alyssa-responsibilities,
.alyssa-built-card,
.alyssa-url-card {
  border-radius: var(--project-summary-radius);
  background: var(--surface-muted);
  padding: clamp(1rem, 2vw, 1.35rem);
  font-family: var(--font-family-body);
  font-weight: 300;
}

.alyssa-challenge h2,
.alyssa-responsibilities h2,
.alyssa-built h2,
.alyssa-built-card h3,
.alyssa-url-card h3 {
  margin: 0;
  color: var(--text-primary);
  font-family: var(--font-family-display);
  font-weight: 400;
  letter-spacing: 0;
  text-transform: uppercase;
}

.alyssa-challenge h2,
.alyssa-responsibilities h2 {
  margin-bottom: 0.75rem;
  font-size: clamp(1.25rem, 1.6vw, 1.7rem);
}

.alyssa-built h2 {
  margin-bottom: 0.5rem;
  font-size: clamp(2rem, 4vw, 4rem);
  line-height: 0.95;
}

.alyssa-challenge p,
.alyssa-responsibilities p,
.alyssa-built-card p {
  margin: 0;
  max-width: 68ch;
  line-height: 1.6;
}

.alyssa-responsibilities p {
  max-width: 54ch;
}

.alyssa-built {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.alyssa-built-card {
  border-radius: var(--project-card-radius);
}

.alyssa-built-card h3 {
  margin-bottom: 0.85rem;
  font-size: clamp(1.2rem, 1.8vw, 1.8rem);
  line-height: 1.05;
}

.alyssa-url-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.alyssa-url-card h3 {
  font-size: clamp(1.25rem, 1.6vw, 1.7rem);
}

.alyssa-project-url {
  color: var(--text-secondary);
  font-family: var(--font-family-display);
  text-transform: uppercase;
  text-decoration: none;
}

.alyssa-project-url:hover,
.alyssa-project-url:focus-visible {
  color: var(--text-primary);
}

.preview-shell {
  position: relative;
  min-height: calc(100vh - 9rem);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(1rem, 2vw, 1.5rem) 0 2rem;
}

.preview-stage {
  position: relative;
  width: min(100%, 1120px);
}

.preview-stage::after {
  content: none;
}

.preview-video {
  position: relative;
  display: block;
  width: 100%;
  min-height: min(78vh, 880px);
  max-height: 82vh;
  object-fit: cover;
  border-radius: var(--project-card-radius);
  border: 1px solid var(--surface-muted);
  background: #d8c2b1;
}

.preview-sticker {
  position: absolute;
  z-index: 2;
  top: clamp(1.75rem, 5vw, 4rem);
  right: clamp(-4.75rem, -3vw, -2rem);
  transform: rotate(18deg);
  padding: 0.95rem 5.75rem;
  border: 1px solid var(--surface-accent);
  border-radius: var(--project-card-radius);
  background: var(--surface-accent);
  animation: preview-sticker-float 4.8s ease-in-out infinite;
  box-shadow:
    0 18px 35px rgb(37 80 123 / 0.2),
    inset 0 1px 0 rgb(255 255 255 / 0.18);
  pointer-events: none;
}

.preview-sticker span {
  display: block;
  color: var(--surface-base, #fff);
  font-family: 'Synt Mono Regular', monospace;
  font-size: clamp(1.1rem, 1.8vw, 1.65rem);
  line-height: 1.1;
  font-weight: 400;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  white-space: nowrap;
}

@keyframes preview-sticker-float {
  0%,
  100% {
    transform: rotate(18deg) translate3d(0, 0, 0);
  }

  50% {
    transform: rotate(18deg) translate3d(0, -10px, 0);
  }
}

.section-heading-card {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  border-radius: var(--project-summary-radius);
  background: var(--surface-muted);
  padding: clamp(1rem, 2vw, 1.35rem);
  color: var(--text-secondary);
}

.section-heading-card h2 {
  margin: 0;
  color: var(--text-primary);
  font-family: var(--font-family-display);
  font-size: clamp(2rem, 4vw, 4rem);
  font-weight: 400;
  line-height: 0.95;
  letter-spacing: 0;
  text-transform: uppercase;
}

.section-heading-card p {
  max-width: 44ch;
  margin: 0;
  font-family: var(--font-family-body);
  font-weight: 300;
  line-height: 1.5;
}

.curated-gallery {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  opacity: 0;
  transition: opacity 0.24s ease;
}

.curated-gallery.is-ready {
  opacity: 1;
}

.curated-gallery-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 1rem;
}

.curated-gallery-item {
  min-width: 0;
  overflow: hidden;
  border: 1px solid var(--surface-muted);
  border-radius: var(--project-card-radius);
  background: #f5efe8;
}

.curated-gallery-item picture {
  display: block;
}

.justified-media {
  width: 100%;
  display: block;
  object-fit: contain;
}

video.justified-media {
  aspect-ratio: 16 / 9;
  background: #f5efe8;
}

.masonry-reveal {
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity 0.6s ease,
    transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: var(--reveal-delay, 0ms);
}

.masonry-reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 960px) {
  .alyssa-case-study {
    grid-template-columns: 1fr;
  }

  .alyssa-case-study__intro,
  .alyssa-built {
    padding: 0;
  }

  .alyssa-case-study__intro {
    min-height: auto;
    gap: 1rem;
  }

  .alyssa-project-header h1 {
    max-width: none;
    font-size: clamp(2.7rem, 15vw, 4.6rem);
  }

  .project-title-sub {
    font-size: clamp(0.95rem, 4vw, 1.5rem);
  }

  .preview-video {
    min-height: 62vh;
  }

  .section-heading-card {
    align-items: flex-start;
    flex-direction: column;
  }

  .curated-gallery,
  .curated-gallery-grid {
    gap: 0.75rem;
  }
}

@media (max-width: 640px) {
  .preview-shell {
    min-height: auto;
    padding-bottom: 1rem;
  }

  .preview-video {
    min-height: auto;
    max-height: none;
    aspect-ratio: 9 / 16;
    border-radius: var(--project-card-radius);
  }

  .preview-sticker {
    top: 1.5rem;
    right: -5.9rem;
    padding: 0.7rem 4.5rem;
  }

  .preview-sticker span {
    font-size: 1.15rem;
  }

  .curated-gallery,
  .curated-gallery-grid {
    gap: 0.625rem;
  }

  .masonry-reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .preview-sticker {
    animation: none;
  }
}

/* ─── Before / After moodboards ─── */

.before-after-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.before-after-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.before-after-board {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.board-intro {
  border-radius: var(--project-summary-radius);
  background: var(--surface-muted);
  padding: clamp(1rem, 2vw, 1.35rem);
  color: var(--text-secondary);
}

.ba-label {
  display: inline-flex;
  width: fit-content;
  margin-bottom: 1rem;
  border-radius: 999px;
  background: var(--interactive-primary);
  color: var(--text-inverse);
  padding: 0.35rem 0.8rem;
  font-family: var(--font-family-display);
  font-size: clamp(0.75rem, 1.2vw, 1rem);
  line-height: 1;
  text-transform: uppercase;
}

.board-intro h3 {
  margin: 0 0 0.75rem;
  color: var(--text-primary);
  font-family: var(--font-family-display);
  font-size: clamp(1.3rem, 2vw, 2rem);
  font-weight: 400;
  line-height: 1;
  letter-spacing: 0;
  text-transform: uppercase;
}

.board-intro p {
  max-width: 54ch;
  margin: 0;
  font-family: var(--font-family-body);
  font-weight: 300;
  line-height: 1.55;
}

.ba-image-stack {
  display: grid;
  gap: 1rem;
}

.ba-image-stack figure {
  margin: 0;
  overflow: hidden;
  border: 1px solid var(--surface-muted);
  border-radius: var(--project-card-radius);
  background: #f5efe8;
}

.ba-img {
  width: 100%;
  display: block;
}

@media (max-width: 960px) {
  .before-after-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .before-after-wrapper,
  .before-after-grid,
  .before-after-board,
  .ba-image-stack {
    gap: 0.625rem;
  }

  .ba-label {
    font-size: 0.65rem;
    padding: 0.28rem 0.55rem;
    margin-bottom: 0.75rem;
  }
}
</style>
