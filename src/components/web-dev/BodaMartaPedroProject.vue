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
          <h2 class="m-0 font-['Xanh_Mono'] text-4xl uppercase">Boda Marta & Pedro</h2>

          <div class="font-['Red_Hat_Text'] font-light">
            <p>
              In collaboration with HUECO Studio, renowned for their handcrafted illustrations, I
              developed a bespoke wedding invitation website for Marta and Pedro. The site showcases
              a clean, airy design with light color palettes and handwritten typefaces, reflecting
              the personal and intimate nature of their special day. HUECO Studio contributed
              exquisite manual illustrations that complement the site’s aesthetic, adding a unique,
              artistic touch. This digital invitation provides essential information about the
              wedding and features a contact form, allowing guests to conveniently RSVP and interact
              with the event details online. The result is a beautifully simple yet functional
              website that enhances the wedding experience for every guest.
            </p>
          </div>

          <div class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div class="md:w-8/12">
              <h2 class="mb-3 text-xl tracking-wide uppercase">Responsibilities</h2>
              <p class="font-['Red_Hat_Text'] font-light">
                Web design personalization, Squarespace setup, Site development, Website launch.
              </p>
            </div>

            <div class="md:w-4/12 md:pl-10">
              <h2 class="mb-3 text-xl tracking-wide uppercase">Credits</h2>
              <p class="font-['Red_Hat_Text'] font-light">Illustrations by HUECO Studio</p>
            </div>
          </div>
        </div>
      </template>
    </Card>

    <div class="mockup-container">
      <img
        src="../../assets/img/mockup1-bodamp.png"
        class="mockup1"
        alt="Boda Marta & Pedro - desktop vue 1"
      />
    </div>
    <div class="mockup-container">
      <img
        src="../../assets/img/mockup2-bodamp.png"
        class="mockup2"
        alt="Boda Marta & Pedro - desktop vue 1"
      />
    </div>
    <div class="mockup-container">
      <img
        src="../../assets/img/mockup3-bodamp.png"
        class="mockup3"
        alt="Boda Marta & Pedro - desktop vue 1"
      />
    </div>

    <div class="cards-container">
      <div class="project-card">
        <img
          src="../../assets/img/bodamp-desktop1.png"
          class="video-placeholder"
          alt="Boda Marta & Pedro - desktop vue 2"
        />
      </div>

      <div class="project-card">
        <img
          src="../../assets/img/bodamp-desktop2.png"
          class="video-placeholder"
          alt="Boda Marta & Pedro - desktop vue 2"
        />
      </div>

      <div class="project-card">
        <img
          src="../../assets/img/bodamp-desktop3.png"
          class="video-placeholder"
          alt="Boda Marta & Pedro - desktop vue 2"
        />
      </div>

      <div class="project-card">
        <img
          src="../../assets/img/bodamp-desktop4.png"
          class="video-placeholder"
          alt="La petite serre urbaine project - desktop vue 2"
        />
      </div>

      <div class="project-card carte">
        <div class="line">
          <div class="image12">
            <div class="photo">
              <img
                src="../../assets/img/bodamp-phone2.png"
                alt="Tranche de CaKe project - mobile vue 1"
              />
            </div>
            <div class="photo">
              <img
                src="../../assets/img/bodamp-phone1.png"
                alt="Tranche de CaKe project - mobile vue 2"
              />
            </div>
          </div>

          <div class="image34">
            <div class="photo">
              <img
                src="../../assets/img/bodamp-phone3.png"
                alt="Tranche de CaKe project - mobile vue 3"
              />
            </div>
            <div class="photo">
              <img
                src="../../assets/img/bodamp-phone4.png"
                alt="Tranche de CaKe project - mobile vue 4"
              />
            </div>
          </div>
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
.mockup3 {
  width: 100%;
  object-fit: cover;
  object-position: top;
  border-radius: 10px;
}
.mockup2 {
  width: 100%;
  object-fit: cover;
  object-position: top;
  border-radius: 10px;
}
.mockup1 {
  width: 100%;
  object-fit: cover;
  object-position: top;
  border-radius: 10px;
}
.project-card {
  background-color: var(--blue-bg);
  overflow: hidden;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 30px;
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
  color: var(--red);
}
.right p {
  width: 30%;
  color: var(--red);
  text-align: right;
}

.mockup-container {
  display: flex;
  justify-content: center;
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
  color: var(--red);
  margin: 20px;
}
.project-card.carte {
  display: flex;
  flex-direction: column;
  height: 624px;
  padding: 15px;
  pointer-events: none;
}

.line {
  display: flex;
  gap: 15px;
  height: 100%;
}
.image12,
.image34 {
  display: flex;
  flex-direction: row;
  gap: 15px;
  flex: 1;
  height: 100%;
}
.image12 .photo,
.image34 .photo {
  flex: 1;
  overflow: hidden;
  height: 100%;
}
.image12 .photo img,
.image34 .photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
}
.photo img {
  border-radius: 10px;
}

.text {
  color: var(--red);
  margin: 20px 0 50px 0;
}

/* Responsive */
@media screen and (max-width: 970px) {
  .project-card-dev {
    height: 484px;
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
  .line {
    flex-wrap: wrap;
    height: 100%;
  }
  .image12,
  .image34 {
    height: 100%;
    width: 50%;
    flex-direction: column;
  }
  .image12 .photo img,
  .image34 .photo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
  }
  .video-placeholder {
    height: 723px;
  }

  .line:nth-of-type(2) {
    display: none;
  }
  .cards-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
@media screen and (max-width: 628px) {
  .project-card-desktop {
    height: 985px;
    min-height: unset;
  }
  .image-container img {
    width: 187%;
    transform: translateX(-18%);
  }
  .image-container {
    border-radius: 10px;
    padding: 0;
  }
  .project-card.carte {
    height: 2400px;
    margin-bottom: 30px;
    width: 300px;
  }
  .video-placeholder {
    height: 451px;
  }
  .line {
    flex-direction: column;
  }
  .image2 img {
    object-position: -117px 0px;
  }

  .image12,
  .image34 {
    height: 49%;
    width: 100%;
  }

  .mockup-container {
    margin-bottom: 20px;
  }

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
