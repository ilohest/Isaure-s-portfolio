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

    <Card
      class="project-summary-card bg-[var(--surface-muted)] text-[var(--text-secondary)] shadow-none"
    >
      <template #content>
        <div class="flex flex-col gap-5 p-4 md:p-6">
          <h2 class="font-display m-0 text-4xl uppercase">Client-Lawyer Platform</h2>

          <div class="font-['Red_Hat_Text'] font-light">
            <p>
              This project is a custom-built platform designed to streamline the management of legal
              cases and client interactions for law professionals.
            </p>
            <p class="mt-4">
              The goal was to create a secure, intuitive environment that simplifies complex
              workflows while improving communication between clients and lawyers.
            </p>
          </div>

          <div>
            <h2 class="mb-3 text-xl tracking-wide uppercase">Key features</h2>
            <ul class="feature-list font-['Red_Hat_Text'] font-light">
              <li>
                A client portal to submit legal requests, describe cases, and schedule initial
                consultations
              </li>
              <li>
                A lawyer dashboard to manage cases, track progress, handle documents, and oversee
                payments
              </li>
              <li>Real-time status updates and structured case lifecycle management</li>
              <li>Secure document upload and storage for sensitive files</li>
              <li>
                An eligibility simulator for legal aid, with dynamic requirements and validation
              </li>
              <li>Appointment scheduling with intelligent availability management</li>
              <li>Integrated notifications to keep all parties informed</li>
            </ul>
          </div>

          <p class="font-['Red_Hat_Text'] font-light">
            The platform is built with a strong focus on data security, clarity of information, and
            efficiency, turning legal processes into a more accessible and structured experience for
            both clients and professionals.
          </p>
        </div>
      </template>
    </Card>

    <div class="project-screens mt-4">
      <img
        v-for="image in images"
        :key="image.src"
        :src="image.src"
        :alt="image.alt"
        class="project-screen"
        loading="lazy"
        decoding="async"
      />
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
import Card from 'primevue/card';
import Button from 'primevue/button';
import projects from '@/web-dev-projects';
import allProjects from '@/all-projects';

const imageBase = '/assets/media/projects/web-dev/client-lawyer-platform';
const imageOrder = [1, 11, 3, 4, 5, 6, 7, 10];

export default {
  name: 'ClientLawyerPlatformProject',
  components: { Card, Button },
  data() {
    return {
      projects,
      images: imageOrder.map((imageNumber) => {
        const number = String(imageNumber).padStart(2, '0');
        return {
          src: `${imageBase}/client-lawyer-platform-${number}-1920.webp`,
          alt: `Client-Lawyer Platform screen ${number}`,
        };
      }),
    };
  },
  computed: {
    currentIndex() {
      const path = this.$route?.path || '';
      const idx = this.projects.findIndex((p) => p.projectLink === path);
      return idx === -1 ? 0 : idx;
    },
    current() {
      return this.projects[this.currentIndex] || this.projects[0];
    },
    navProjects() {
      return [...allProjects].sort((a, b) => a.order - b.order);
    },
    navCurrentIndex() {
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
      return this.hasPrevProject ? this.navProjects[this.navCurrentIndex - 1] : this.current;
    },
    nextProject() {
      return this.hasNextProject ? this.navProjects[this.navCurrentIndex + 1] : this.current;
    },
  },
  mounted() {
    window.scrollTo(0, 0);
  },
  methods: {
    navigateTo(project) {
      if (project?.projectLink) this.$router.push(project.projectLink);
    },
  },
};
</script>

<style scoped>
.feature-list {
  display: grid;
  gap: 0.55rem;
  margin: 0;
  padding-left: 1.2rem;
}

.project-screens {
  display: grid;
  gap: 1.25rem;
}

.project-screen {
  display: block;
  width: 100%;
  height: auto;
  border: 1px solid var(--interactive-primary);
  border-radius: 0;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
}
</style>
