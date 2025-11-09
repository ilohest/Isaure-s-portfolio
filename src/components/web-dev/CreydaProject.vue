<template>
  <div id="app" class="main flex flex-col gap-4">
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

    <div class="project-summary">
      <h2 class="project-title">Creyda yoga</h2>

      <div class="project-info">
        A yoga website built in Wordpress for CREYDA Yoga, a yoga and welness center managed by
        passionate people based in Brussels. This project entailed the design and development of a
        minimalist website for CREYDA yoga center, aimed at those seeking both peace and personal
        growth. The objective was to create an online space that mirrors the simplicity of yoga
        itself, making it easy for visitors to explore and enroll in a variety of yoga training
        programs.
      </div>

      <div class="project-container">
        <div class="project-resp creyda">
          <h2>Responsibilities</h2>
          <p>
            Recovery of content from the former dysfunctional website, Web design, Wordpress Setup
            and Development, Domain Transfer, Launch
          </p>
        </div>

        <div class="project-url creyda">
          <h2>URL</h2>
          <a href="https://creyda-yoga.be/" target="_blank">creyda-yoga.be</a>
        </div>
      </div>
    </div>

    <div class="cards-container">
      <div class="project-card project-card-video">
        <img
          v-show="!videoLoaded"
          src="../../assets/img/creyda-temp.png"
          class="video-placeholder"
          alt="Placeholder Image Creyda project"
        />
        <video
          playsinline
          @loadeddata="markVideoAsLoaded"
          src="../../../public/media/videos/video-creyda-short.mp4"
          class="video-projet"
          autoplay
          loop
          muted
          preload="auto"
          v-show="videoLoaded"
        ></video>
      </div>

      <p class="responsive">
        The color scheme is inspired by natural tones, with soft hues that invoke a sense of calm
        and relaxation. Navigation is intuitive, ensuring that visitors can easily find the
        information they need, whether they are searching for beginner yoga classes, advanced
        training sessions, or wellness sebscriptions.
      </p>

      <div class="project-card project-card-desktop">
        <div class="image-container">
          <img
            src="../../assets/img/creyda-desktop1.png"
            alt="Isaure Lohest web developement project 3 - desktop vue"
          />
        </div>

        <div class="image-container">
          <img
            src="../../assets/img/creyda-desktop2.png"
            alt="Isaure Lohest web developement project 3 - desktop vue"
          />
        </div>
      </div>

      <p class="responsive">
        The website is fully responsive and looks really great on mobile too. Ensuring accessibility
        across all devices, the site's design is fully responsive, providing a seamless experience
        whether viewed on a desktop, tablet, or smartphone.
      </p>

      <div class="project-card carte">
        <div class="line">
          <div class="image12">
            <div class="photo">
              <img
                src="../../assets/img/creyda-phone1.png"
                alt="Isaure Lohest web developement project 3 - mobile vue"
              />
            </div>
            <div class="photo">
              <img
                src="../../assets/img/creyda-phone2.png"
                alt="Isaure Lohest web developement project 3 - mobile vue"
              />
            </div>
          </div>

          <div class="image34">
            <div class="photo">
              <img
                src="../../assets/img/creyda-phone3.png"
                alt="Isaure Lohest web developement project 3 - mobile vue"
              />
            </div>
            <div class="photo">
              <img
                src="../../assets/img/creyda-phone4.png"
                alt="Isaure Lohest web developement project 3 - mobile vue"
              />
            </div>
          </div>
        </div>

        <div class="line">
          <div class="image12">
            <div class="photo">
              <img
                src="../../assets/img/creyda-phone5.png"
                alt="Isaure Lohest web developement project 3 - mobile vue"
              />
            </div>
            <div class="photo">
              <img
                src="../../assets/img/creyda-phone6.png"
                alt="Isaure Lohest web developement project 3 - mobile vue"
              />
            </div>
          </div>

          <div class="image34">
            <div class="photo">
              <img
                src="../../assets/img/creyda-phone7.png"
                alt="Isaure Lohest web developement project 3 - mobile vue"
              />
            </div>
            <div class="photo">
              <img
                src="../../assets/img/creyda-phone8.png"
                alt="Isaure Lohest web developement project 3 - mobile vue"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom prev/next -->
    <div class="mt-6 mb-8 flex items-center justify-between">
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
import Button from 'primevue/button';
import projects from '@/web-dev-projects.js';

export default {
  name: 'BodaLisPavlosProject',
  components: { Button },
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
.project-navigation {
  justify-content: end !important;
}
.project-info {
  font-size: var(--fs-18);
  margin: 20px 0 30px 0;
}
.project-title {
  font-size: 34px;
}
.project-container {
  display: flex;
  justify-content: space-between;
}
.project-summary {
  border-radius: 10px;
  padding: 40px;
  background: var(--blue-bg);
  color: var(--light-content);
}
h2 {
  color: var(--light-content);
  text-transform: uppercase;
  font-size: var(--fs-18);
  letter-spacing: 0.05em;
  font-family: 'Chakra Petch', sans-serif;
  margin-bottom: 20px;
  font-weight: 400;
}
.project-resp {
  width: 60%;
}
.project-url {
  width: 40%;
  margin-left: 80px;
}
.project-url a {
  text-decoration: none;
  color: inherit;
}
.project-url a:hover {
  text-transform: uppercase;
}
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
  height: 1435px;
  padding: 15px;
  margin-bottom: 30px;
  pointer-events: none;
  gap: 15px;
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
  .project-card-dev {
    height: 484px;
  }
  .dark-light-button {
    height: 20px !important;
    bottom: 40px !important;
    left: 40px !important;
  }
  .project-card-desktop {
    min-height: 1018px;
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
    height: 1290px;
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
  .project-info {
    font-size: var(--fs-18);
  }
  .project-container {
    font-size: var(--fs-24);
  }
  h2 {
    font-size: var(--fs-24);
  }
  .project-resp {
    font-size: var(--fs-18);
  }
  .project-url {
    font-size: var(--fs-18);
  }
  h1 {
    font-size: var(--fs-30);
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
  .project-url {
    width: 100%;
    margin-left: 0;
  }
  .right-section {
    border-left: none;
    width: 100%;
    padding: 13px 0;
    border-top: var(--main-black) solid 3px;
  }
}
@media screen and (max-width: 628px) {
  main {
    max-width: 299px !important;
  }
  .header {
    flex-direction: column;
  }
  .left-section {
    padding: 13px 0;
  }
  .project-card-desktop {
    height: 995px;
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
    margin-bottom: 50px;
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
  .project-info {
    margin: 30px 0;
  }
  h1 {
    margin-top: 50px;
  }
  .button {
    margin-bottom: 50px;
  }
  .project-summary {
    margin-top: 0;
  }
}
</style>
