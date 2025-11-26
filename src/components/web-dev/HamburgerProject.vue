<template>
  <section
    class="relative container mx-auto flex flex-col gap-4 px-4 py-4 md:top-[40px] md:px-6 md:py-8"
  >
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
          <h2 class="m-0 font-['Xanh_Mono'] text-4xl uppercase">The perfect hamburger</h2>

          <div class="font-['Red_Hat_Text'] font-light">
            <p>
              Discover the ultimate burger experience with our website for “The perfect hamburger”.
              Each animation brings the flavors to life, making you almost taste the savory, juicy
              burgers through your screen. Enjoy exploring this site, where each click unveils a new
              layer of the gourmet burger world!
            </p>
          </div>

          <div class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div class="md:w-8/12">
              <h2 class="mb-3 text-xl tracking-wide uppercase">Responsibilities</h2>
              <p class="font-['Red_Hat_Text'] font-light">
                Web design personalization, Tilda setup, Site development, Website launch.
              </p>
            </div>

            <div class="md:w-4/12 md:pl-10">
              <h2 class="mb-3 text-xl tracking-wide uppercase">URL</h2>
              <a
                href="http://the-perfect-hamburger.tilda.ws/"
                target="_blank"
                rel="noopener"
                class="font-['Red_Hat_Text'] font-light text-inherit"
              >
                the-perfect-hamburger.tilda.ws
              </a>
            </div>
          </div>
        </div>
      </template>
    </Card>

    <div class="cards-container">
      <p class="responsive">
        Enjoy seamless navigation with subtle animations that guide you through the restaurant's
        story and menu. The parallax scrolling and dynamic effects create a delightful journey from
        start to finish. Feast your eyes on our high-definition, animated displays of "The perfect
        Hamburger's" signature burgers.
      </p>

      <div class="project-card project-card-video">
        <img
          v-show="!videoLoaded"
          src="../../assets/img/hamburger-desktop1.png"
          class="video-placeholder"
          alt="Placeholder  The perfect hamburger project"
        />
        <video
          playsinline
          @loadeddata="markVideoAsLoaded"
          src="../../../public/media/videos/video-the-perfect-burger.mp4"
          class="video-projet"
          autoplay
          loop
          muted
          preload="auto"
          v-show="videoLoaded"
        ></video>
      </div>

      <div class="project-card project-card-desktop">
        <div class="image-container">
          <img
            src="../../assets/img/hamburger-desktop2.png"
            alt="Isaure Lohest web developement project 4 - desktop vue"
          />
        </div>

        <div class="image-container">
          <img
            src="../../assets/img/hamburger-desktop3.png"
            alt="Isaure Lohest web developement project 4 - desktop vue"
          />
        </div>
      </div>

      <p class="responsive">
        Designed to provide an optimal viewing experience across all devices. Watch animations and
        transitions adapt smoothly to your screen, ensuring a beautiful and functional presentation
        whether you're on a phone, tablet, or desktop.
      </p>

      <div class="project-card carte">
        <div class="line">
          <div class="image12">
            <div class="photo">
              <img
                src="../../assets/img/hamburger-mobile1.png"
                alt="Isaure Lohest web developement project 3 - mobile vue"
              />
            </div>
            <div class="photo">
              <img
                src="../../assets/img/hamburger-mobile2.png"
                alt="Isaure Lohest web developement project 3 - mobile vue"
              />
            </div>
          </div>

          <div class="image34">
            <div class="photo">
              <img
                src="../../assets/img/hamburger-mobile3.png"
                alt="Isaure Lohest web developement project 3 - mobile vue"
              />
            </div>
            <div class="photo">
              <img
                src="../../assets/img/hamburger-mobile4.png"
                alt="Isaure Lohest web developement project 3 - mobile vue"
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
  </section>
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
  height: 620px;
  object-fit: cover;
  object-position: top;
  border-radius: 10px;
}
.project-card {
  background-color: var(--blue-bg);
  overflow: hidden;
  padding: 15px;
  border-radius: 10px;
}
.project-card-video {
  height: 650px;
  margin-bottom: 30px;
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
  height: 594px;
  padding: 15px;
  margin-bottom: 30px;
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

/* Responsive */
@media screen and (max-width: 970px) {
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
  .line:nth-of-type(2) {
    display: none;
  }
  .cards-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .right-section {
    border-left: none;
    width: 100%;
    padding: 13px 0;
    border-top: var(--main-black) solid 3px;
  }
}
@media screen and (max-width: 628px) {
  .left-section {
    padding: 13px 0;
  }
  .project-card-video {
    margin-bottom: 30px;
  }
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
  .video-projet {
    object-position: 45% top;
  }
  .project-card-video {
    height: 480px;
  }
  .image12,
  .image34 {
    height: 49%;
    width: 100%;
  }
}
</style>
