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
      <h2 class="project-title">Didacmanía</h2>

      <div class="project-info">
        The Didacmanía project involved developing a sleek and interactive online store for a
        Barcelona-based toy brand. Leveraging WordPress for its user-friendly and intuitive
        management, this website provides an optimized online shopping experience, showcasing the
        brand's wide range of high-quality toys.
      </div>

      <div class="project-container">
        <div class="project-resp">
          <h2>Responsibilities</h2>
          <p>
            Web design personalization, WordPress installation and database setup, Site development,
            E-Commerce integration, Secure payment gateway, SEO optimization for improved
            visibility, Website Launch, Client training on back-office management, Client
            collaboration: continuous communication and feedback integration throughout the project
            lifecycle.
          </p>
        </div>
      </div>
    </div>

    <div class="cards-container">
      <p class="responsive">
        The online store of the Didacmanía project is meticulously designed to enhance user shopping
        experience, seamlessly integrating the capability to explore nearly 4,000 products through a
        variety of criteria or utilizing a convenient sliding sidebar cart feature on the right side
        of the screen, allowing users to effortlessly review and adjust their selections at any
        point in their shopping journey.
      </p>

      <div class="project-card project-card-video">
        <img
          v-show="!videoLoaded"
          src="../../assets/img/didacmania-placeholder.png"
          class="video-placeholder"
          alt="Placeholder Didacmania project"
        />
        <video
          playsinline
          @loadeddata="markVideoAsLoaded"
          src="../../../public/media/videos/video-didacmania.mp4"
          class="video-projet"
          autoplay
          loop
          muted
          preload="auto"
          v-show="videoLoaded"
        ></video>
      </div>

      <p class="responsive">
        Users can navigate the extensive toy catalog by filtering options such as categories, age
        groups, brands, and price ranges, ensuring they find exactly what they're looking for with
        ease. Highlighting new arrivals and special deals, the shop utilizes cute icons to draw
        client's attention. This comprehensive approach to online retail ensures a user-friendly,
        efficient, and enjoyable shopping journey for all visitors.
      </p>

      <div class="project-card project-card-desktop">
        <div class="image-container">
          <img
            src="../../assets/img/didacmania-desktop4.png"
            alt="Isaure Lohest web developement project 4 - desktop vue of the shop"
          />
        </div>

        <div class="image-container">
          <img
            src="../../assets/img/didacmania-desktop3.png"
            alt="Isaure Lohest web developement project 4 - desktop vue of the shop"
          />
        </div>
      </div>

      <p class="responsive">
        Home page on desktop view. The aesthetic of the Didacmanía online store features a playful,
        child-friendly design, adorned with charming and cute illustrations creating a whimsical and
        inviting atmosphere for shoppers.
      </p>

      <div class="project-card project-card-desktop">
        <div class="image-container">
          <img
            src="../../assets/img/didacmania-desktop2.png"
            alt="Isaure Lohest web developement project 4 - desktop vue of the shop"
          />
        </div>

        <div class="image-container image2">
          <img
            src="../../assets/img/didacmania-desktop1.png"
            alt="Isaure Lohest web developement project 4 - desktop vue of the shop"
          />
        </div>
      </div>

      <p class="responsive">
        Designed with a responsive layout, the Didacmanía online store ensures an optimal viewing
        experience across all devices, allowing users to seamlessly browse and purchase their
        favorite toys whether they are on a desktop, tablet, or smartphone.
      </p>

      <div class="project-card carte">
        <div class="line">
          <div class="image12">
            <div class="photo">
              <img
                src="../../assets/img/didacmania-mobile1.png"
                alt="Isaure Lohest web developement project 3 - mobile vue"
              />
            </div>
            <div class="photo">
              <img
                src="../../assets/img/didacmania-mobile2.png"
                alt="Isaure Lohest web developement project 3 - mobile vue"
              />
            </div>
          </div>

          <div class="image34">
            <div class="photo">
              <img
                src="../../assets/img/didacmania-mobile3.png"
                alt="Isaure Lohest web developement project 3 - mobile vue"
              />
            </div>
            <div class="photo">
              <img
                src="../../assets/img/didacmania-mobile4.png"
                alt="Isaure Lohest web developement project 3 - mobile vue"
              />
            </div>
          </div>
        </div>

        <div class="line">
          <div class="image12">
            <div class="photo">
              <img
                src="../../assets/img/didacmania-mobile5.png"
                alt="Isaure Lohest web developement project 3 - mobile vue"
              />
            </div>
            <div class="photo">
              <img
                src="../../assets/img/didacmania-mobile6.png"
                alt="Isaure Lohest web developement project 3 - mobile vue"
              />
            </div>
          </div>

          <div class="image34">
            <div class="photo">
              <img
                src="../../assets/img/didacmania-mobile7.png"
                alt="Isaure Lohest web developement project 3 - mobile vue"
              />
            </div>
            <div class="photo">
              <img
                src="../../assets/img/didacmania-mobile8.png"
                alt="Isaure Lohest web developement project 3 - mobile vue"
              />
            </div>
          </div>
        </div>
      </div>

      <p class="responsive">
        The back-office functionality of WordPress offers unparalleled flexibility in managing the
        online store, enabling straightforward updates to products inventory, pricing, promotions,
        and customization of coupons, all through a user-friendly interface that simplifies the
        complexities of digital retail management.
      </p>

      <div class="project-card project-card-dev">
        <div class="image-container-dev">
          <img src="../../assets/img/didacmania-back-office.png" alt="wordPress backoffice" />
        </div>
      </div>
    </div>

    <!-- Bottom prev/next -->
    <div class="mt-6 mb-8 flex items-center justify-between gap-2">
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
.project-summary {
  border-radius: 10px;
  padding: 40px;
  background: var(--blue-bg);
  color: var(--light-content);
}
.project-resp {
  width: 70%;
}
.project-url {
  width: 30%;
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
  gap: 15px;
}
.image-container {
  width: 50%;
  overflow: hidden;
}
.image-container img {
  width: 100%;
  display: block;
  border-radius: 10px;
  height: 414px;
  object-position: top;
  object-fit: cover;
}
.responsive {
  color: var(--red);
  margin: 20px;
}
.project-card.carte {
  display: flex;
  flex-direction: column;
  height: 1150px;
  padding: 15px;
  pointer-events: none;
  gap: 15px;
}
.line {
  display: flex;
  gap: 15px;
  height: 49%;
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
.check {
  display: flex;
  justify-content: center;
}
.button {
  text-align: center;
  min-width: 130px;
  text-transform: uppercase;
  padding: 15px 20px;
  text-decoration: none;
  color: inherit;
  margin-bottom: 70px;
  background-color: var(--light-element);
  border-radius: 10px;
}
.button:hover {
  background: var(--hover);
}
.image-container-dev img {
  width: 100%;
  border-radius: 10px;
}
.project-card-dev {
  margin-bottom: 30px;
}
.anton-regular {
  font-family: 'Anton', sans-serif;
  font-weight: 400;
  font-style: normal;
  letter-spacing: 0.03em;
}
.button {
  text-align: center;
  text-decoration: none;
  margin-bottom: 80px !important;
  display: block;
  margin: 0px auto;
  background-color: var(--brat);
  color: var(--red);
  padding: 8px 20px;
  border: 2px solid;
  border-radius: 10px;
  cursor: pointer;
  text-transform: uppercase;
  font-size: var(--fs-18);
  letter-spacing: 0.05em;
  font-family: 'Chakra Petch', sans-serif;
}
.button:hover {
  background: var(--brat-hover);
}

/* Responsive */
@media screen and (max-width: 1200px) {
  .project-card.carte {
    height: 1060px;
  }
  .project-card-desktop {
    height: 445px;
  }
}
@media screen and (max-width: 970px) {
  .image-container-dev img {
    width: 140%;
  }
  .image-container-dev {
    overflow: hidden;
    border-radius: 10px;
    height: 100%;
  }
  .project-card-dev {
    height: 484px;
  }
  .dark-light-button {
    height: 20px !important;
    bottom: 40px !important;
    left: 40px !important;
  }
  .project-card-desktop {
    height: 970px;
    flex-direction: column;
  }
  .image-container {
    width: 100%;
    overflow: hidden;
  }
  .image-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
  }
  .project-card.carte {
    flex-direction: column;
    height: 1610px;
    width: 600px;
  }
  .cards-container {
    display: flex;
    flex-direction: column;
    align-items: center;
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
  .project-card-video {
    height: 410px;
  }
  .video-placeholder {
    height: 377px;
  }
}
@media screen and (max-width: 628px) {
  .project-card-desktop {
    height: 970px;
    min-height: unset;
  }
  .image-container img {
    width: 160%;
  }
  .image-container {
    border-radius: 10px;
  }
  .cards-container {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .project-card.carte {
    height: 2670px;
    width: 330px;
  }
  .line {
    flex-direction: column;
  }
  .image2 img {
    object-position: -117px 0px;
  }
  .video-projet {
    object-position: 89% top;
  }
  .image12,
  .image34 {
    height: 49%;
    width: 100%;
  }
  .image-container-dev img {
    height: 100% !important;
    object-fit: cover;
    object-position: -106px 0px;
  }
  .image-container-dev {
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
  .project-info {
    margin: 20px 0 30px 0;
  }
  h1 {
    margin-top: 50px;
  }
  .button {
    margin-bottom: 50px;
  }
  .project-summary {
    margin-top: 0px;
  }
}
</style>
