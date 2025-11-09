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
      <h2 class="project-title">Académie Clé Do Ré</h2>

      <div class="project-info">
        Designed a charming and minimalist website for a music academy based in Toulouse, managed by
        Bérangère. The site features a light color palette that complements the academy's logo,
        enhanced with playful yellow and black accents. Embodying a child-friendly and light-hearted
        aesthetic, the website integrates delightful animations and whimsical drawings of little
        characters engaged in musical activities. It offers a user-friendly interface where visitors
        can effortlessly view the academy’s offerings, pricing, and other services. This design
        ensures an engaging and visually appealing experience for visitors of all ages.
      </div>

      <div class="project-container">
        <div class="project-resp">
          <h2>Responsibilities</h2>
          <p>Web design personalization, Squarespace setup, Site development, Website launch.</p>
        </div>

        <div class="project-url">
          <h2>URL</h2>
          <a href="http://academiecledore.fr/" target="_blank"> academiecledore.fr </a>
        </div>
      </div>
    </div>

    <div class="cards-container">
      <div class="project-card project-card-video">
        <img
          v-show="!videoLoaded"
          src="../../assets/img/cledore-desktop1.png"
          class="video-placeholder"
          alt="Placeholder Académie Clé Do Ré project"
        />
        <video
          playsinline
          @loadeddata="markVideoAsLoaded"
          src="../../../public/media/videos/video-cledore.mp4"
          class="video-projet"
          autoplay
          loop
          muted
          preload="auto"
          v-show="videoLoaded"
        ></video>
      </div>

      <div class="project-card project-card-video">
        <img
          src="../../assets/img/cledore-desktop1.png"
          class="video-placeholder"
          alt="Académie Clé Do Ré project - desktop vue 1"
        />
      </div>
      <div class="project-card project-card-video">
        <img
          src="../../assets/img/cledore-desktop2.png"
          class="video-placeholder"
          alt="La petite serre urbaine project - desktop vue 2"
        />
      </div>
      <div class="project-card project-card-video">
        <img
          src="../../assets/img/cledore-desktop3.png"
          class="video-placeholder"
          alt="La petite serre urbaine project - desktop vue 3"
        />
      </div>
      <div class="project-card project-card-video">
        <img
          src="../../assets/img/cledore-desktop4.png"
          class="video-placeholder"
          alt="La petite serre urbaine project - desktop vue 4"
        />
      </div>

      <div class="project-card carte">
        <div class="line">
          <div class="image12">
            <div class="photo">
              <img
                src="../../assets/img/cledore-phone1.png"
                alt="Académie Clé Do Ré project - mobile vue 1"
              />
            </div>
            <div class="photo">
              <img
                src="../../assets/img/cledore-phone2.png"
                alt="Académie Clé Do Ré project - mobile vue 2"
              />
            </div>
          </div>

          <div class="image34">
            <div class="photo">
              <img
                src="../../assets/img/cledore-phone3.png"
                alt="Académie Clé Do Ré project - mobile vue 3"
              />
            </div>
            <div class="photo">
              <img
                src="../../assets/img/cledore-phone4.png"
                alt="Académie Clé Do Ré project - mobile vue 4"
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
  font-size: var(--fs-30);
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
  font-size: var(--fs-18);
}
.project-url {
  width: 40%;
  font-size: var(--fs-18);
  margin-left: 80px;
}
.project-url a {
  text-decoration: none;
  color: inherit;
  word-break: break-all;
}
.project-url a:hover {
  text-transform: uppercase;
}
.video-placeholder {
  width: 100%;
  height: 809px;
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
  height: 840px;
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
  height: 665px;
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
  .project-card-video {
    height: 754px;
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
