<template>
  <div id="app" class="main flex flex-col gap-4 pt-4">
    <!-- Back to list -->
    <div class="flex items-center justify-between">
      <Button
        label="Back to web projects"
        icon="pi pi-arrow-left"
        text
        class="btn-link"
        @click="$router.push('/achievements/web-developement')"
      />
    </div>

    <Card class="border-round-xl bg-[var(--blue-bg)] text-[var(--light-content)] shadow-none">
      <template #content>
        <div class="flex flex-col gap-4 p-4 md:p-6">
          <h2 class="m-0 font-['Chakra_Petch'] text-4xl uppercase">Boda Lis & Pavlos</h2>

          <div class="font-['Red_Hat_Text'] font-light">
            <p>
              For this collaboration with La Invitación de Liana, I created a wedding website that
              celebrates both craftsmanship and digital elegance. Designed around the couple’s
              vision, the site features a rich blend of soft animations and personalized
              illustrations, adding charm and personality to every section. Guests can explore the
              wedding details in an aesthetically balanced layout. A secure password-protected
              access ensures the privacy of all information, making the experience both intimate and
              exclusive.
            </p>
          </div>

          <div class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div class="md:w-8/12">
              <h2 class="mb-3 text-xl tracking-wide uppercase">Responsibilities</h2>
              <p class="font-['Red_Hat_Text'] font-light">
                HTML, CSS, JavaScript development, server-side setup, custom illustration
                integration, hosting and domain configuration, website launch, post-launch support.
              </p>
            </div>

            <div class="md:w-4/12 md:pl-10">
              <h2 class="mb-3 text-xl tracking-wide uppercase">URL</h2>
              <a
                href="https://pavlosandlis.com/"
                target="_blank"
                class="font-['Red_Hat_Text'] font-light text-inherit"
              >
                pavlosandlis.com
              </a>

              <p class="font-['Red_Hat_Text'] font-light">
                Magic password: <span class="font-medium">lispavlos</span>
              </p>
            </div>

            <div class="md:w-4/12 md:pl-10">
              <h2 class="mb-3 text-xl tracking-wide uppercase">Credits</h2>
              <p class="font-['Red_Hat_Text'] font-light">
                Illustrations by La Invitación de Liana
              </p>
            </div>
          </div>
        </div>
      </template>
    </Card>

    <div class="flex justify-center">
      <img
        src="../../assets/img/bodalp-desktop1.png"
        alt="Boda Natalia & Mauricio - mockup 1"
        class="border-round-xl block h-auto w-full max-w-full object-cover"
      />
    </div>

    <div class="flex flex-col gap-4 text-[var(--red)]">
      <p>
        Fully bilingual, the website allows both local and international guests to navigate
        seamlessly in their preferred language. The site provides a dedicated page with a curated
        list of recommended accommodations near the event venue, complete with direct booking links.
        The site is fully responsive, optimized for all devices, and includes a custom domain
        featuring the couple’s names. Hosting is included, and post-launch technical support ensures
        everything runs smoothly..
      </p>

      <div class="align-items-center flex flex-col gap-4 lg:flex-row">
        <div class="md:w-8/12">
          <img
            v-show="!videoLoaded"
            src="../../assets/img/bodalp-desktop2.png"
            class="border-round-xl w-full object-contain"
            alt="Boda Lis & Pavlos"
          />
        </div>
        <p class="text-center lg:w-4/12 lg:text-2xl">
          Share all your wedding details effortlessly with a personalized digital touch
        </p>
      </div>

      <div class="grid-row row1">
        <div class="grid-item landscape">
          <img src="../../assets/img/bodalp-desktop3.png" alt="Boda Lis & Pavlos" />
        </div>
        <div class="grid-item landscape">
          <img src="../../assets/img/bodalp-desktop4.png" alt="Boda Lis & Pavlos" />
        </div>
      </div>

      <div class="grid-row row2">
        <div class="grid-item landscape">
          <img src="../../assets/img/bodalp-desktop7.png" alt="Boda Lis & Pavlos" />
        </div>
        <div class="grid-item landscape">
          <img src="../../assets/img/bodalp-desktop8.png" alt="Boda Lis & Pavlos" />
        </div>
      </div>

      <div class="left">
        <div class="project-card">
          <img
            src="../../assets/img/bodalp-desktop5.png"
            class="video-placeholder"
            alt="Boda Natalia & Mauricio - RSVP form"
          />
        </div>

        <p>
          Guests can easily confirm their attendance through a personalized RSVP page that allows
          them to submit dietary preferences and song requests, with automated email confirmations
          for convenience.
        </p>
      </div>

      <div class="right">
        <p>
          A private administration page for the couple includes tools to manage guest responses,
          export RSVP data to Excel format, and track total attendance.
        </p>

        <div class="project-card">
          <img
            src="../../assets/img/bodalp-desktop6.png"
            class="video-placeholder"
            alt="Boda Natalia & Mauricio - Control panel connection"
          />
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
  </div>
</template>

<script>
import Card from 'primevue/card';
import Button from 'primevue/button';
import projects from '@/web-dev-projects.js';

export default {
  name: 'BodaLisPavlosProject',
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
.video-placeholder {
  width: 100%;
  object-fit: cover;
  object-position: top;
  border-radius: 10px;
}

.left {
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 20px;
}
.right {
  display: flex;
  justify-content: right;
  align-items: center;
  gap: 20px;
}
.left > .project-card,
.right > .project-card {
  width: 70%;
}
.left p {
  width: 30%;
}
.right p {
  width: 30%;
  text-align: right;
}

.video-projet {
  overflow: hidden;
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
  object-position: top;
  border-radius: 10px;
}
.project-card-desktop {
  height: 444px;
  display: flex;
  pointer-events: none;
  margin-bottom: 30px;
}
.image-container {
  width: 50%;
  overflow: hidden;
}
.image-container:nth-child(1) {
  padding-right: 15px;
}
.image-container img {
  width: 100%;
  display: block;
  border-radius: 10px;
  height: 414px;
  object-position: top;
}
.responsive {
  margin: 20px;
}
.project-card.carte {
  display: flex;
  flex-direction: column;
  height: 624px;
  padding: 15px;
  margin-bottom: 50px;
  pointer-events: none;
}

.photo img {
  border-radius: 10px;
}

.grid-row {
  display: grid;
  gap: 20px;
  height: 100%;
}

.row1 {
  grid-template-columns: 1fr 1fr;
}
.row2 {
  grid-template-columns: 1fr 1fr;
}
.grid-item img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  border-radius: 10px;
}

/* Responsive */
@media screen and (max-width: 970px) {
  .project-card-dev {
    height: 484px;
  }
  .row1,
  .row2 {
    grid-template-columns: 1fr;
  }

  .project-card {
    margin: 0;
  }
  .dark-light-button {
    height: 20px !important;
    bottom: 40px !important;
    left: 40px !important;
  }
  .project-card-desktop {
    min-height: 1000px;
    flex-direction: column;
    gap: 15px;
  }
  .image-container {
    width: 100%;
    overflow: hidden;
    padding: 0 !important;
  }
  .image-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .project-card.carte {
    flex-direction: column;
    height: 1248px;
    width: 600px;
  }

  .project-container {
    font-size: var(--fs-24);
  }

  .cards-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .project-container {
    flex-direction: column;
  }
  .project-resp {
    width: 100%;
    text-align: left;
    margin-bottom: 30px;
  }
}
@media screen and (max-width: 628px) {
  .left,
  .right {
    flex-direction: column;
  }
  .left > .project-card,
  .right > .project-card,
  .left p,
  .right p {
    width: unset;
  }
  .left > .project-card {
    order: 2;
  }
  .right p {
    text-align: left;
  }
}
</style>
