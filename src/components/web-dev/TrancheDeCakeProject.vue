<template>
  <section
    class="relative container mx-auto flex flex-col gap-4 px-4 py-4 md:top-[40px] md:px-6 md:py-8"
  >
    <!-- Back to list -->
    <div class="flex items-center justify-between">
      <Button
        label="Back to projects"
        icon="pi pi-arrow-left"
        text
        class="btn-link"
        @click="$router.push('/achievements')"
      />
    </div>

    <Card class="border-round-xl bg-[var(--blue-bg)] text-[var(--light-content)] shadow-none">
      <template #content>
        <div class="flex flex-col gap-4 p-4 md:p-6">
          <h2 class="m-0 font-['Xanh_Mono'] text-4xl uppercase">Tranche de CaKe</h2>

          <div class="font-['Red_Hat_Text'] font-light">
            <p>
              For this e-commerce project, I collaborated with Belgian founders, Arnaud and
              Virginie, to create an online platform that offers a diverse range of handcrafted
              snacks delivered directly to customers' doors. The site features a minimalist design
              aesthetic with an earthy color palette of terracotta, orange, and chocolate brown that
              enhances the artisanal feel of the products. I focused on a simple, intuitive
              interface that reflects the homemade nature of the offer. Through this platform,
              Tranche de CaKe delivers convenience, variety, and the richness of authentic, homemade
              snacks to a broad audience.
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
                href="https://tranchedecake.be/"
                target="_blank"
                class="font-['Red_Hat_Text'] font-light text-inherit"
              >
                tranchedecake.be
              </a>
            </div>
          </div>
        </div>
      </template>
    </Card>

    <div class="mockup-container">
      <img
        src="../../assets/img/mockup-tdc-desktop1.png"
        class="mockup1"
        alt="Tranche de CaKe project - desktop vue 1"
      />
    </div>
    <div class="mockup-container">
      <img
        src="../../assets/img/mockup-tdc-desktop5.png"
        class="mockup2"
        alt="Tranche de CaKe project - desktop vue 1"
      />
    </div>
    <div class="mockup-container">
      <img
        src="../../assets/img/mockup-tdc-phone1.png"
        class="mockup3"
        alt="Tranche de CaKe project - desktop vue 1"
      />
    </div>

    <div class="cards-container">
      <div class="video-intro">
        <div class="project-card project-card-video">
          <img
            v-show="!videoLoaded"
            src="../../assets/img/tdc-desktop1.png"
            class="video-placeholder"
            alt="Placeholder Tranche de CaKe project"
          />
          <video
            playsinline
            @loadeddata="markVideoAsLoaded"
            src="../../../public/media/videos/video-tdc-accueil.mp4"
            class="video-projet"
            autoplay
            loop
            muted
            preload="auto"
            v-show="videoLoaded"
          ></video>
        </div>
        <p>
          Tranche de CaKe, <br />
          la révolution de la collation
        </p>
      </div>

      <div class="project-card">
        <img
          src="../../assets/img/tdc-desktop5.png"
          class="video-placeholder"
          alt="La petite serre urbaine project - desktop vue 2"
        />
      </div>

      <div class="project-card">
        <img
          src="../../assets/img/tdc-desktop2.png"
          class="video-placeholder"
          alt="La petite serre urbaine project - desktop vue 2"
        />
      </div>

      <div class="left">
        <div class="project-card">
          <img
            src="../../assets/img/tdc-desktop3.png"
            class="video-placeholder"
            alt="La petite serre urbaine project - desktop vue 3"
          />
        </div>
        <p>
          The website features an intuitive and user-friendly interface for customizing weekly snack
          boxes, allowing customers to select from a curated range of artisanal snacks to fill their
          box. To ensure a full and satisfying experience, each box must contain exactly 10 snacks
          before the purchase option becomes available.
        </p>
      </div>

      <div class="right">
        <p>
          This design choice not only enhances user engagement by encouraging exploration of
          different snacks but also minimizes order errors, ensuring that every box ordered meets
          the startup's quality standards. This personalized approach to ordering allows users to
          tailor their weekly deliveries to their specific tastes, making each delivery a unique
          culinary adventure.
        </p>

        <div class="project-card">
          <img
            src="../../assets/img/tdc-desktop4.png"
            class="video-placeholder"
            alt="La petite serre urbaine project - desktop vue 4"
          />
        </div>
      </div>

      <p class="text-[var(--red)]">
        The Tranche de Cake ecommerce website includes a fully integrated backoffice system designed
        to streamline operations and enhance management efficiency for our client. This backoffice
        suite provides robust tools for order processing, inventory management, and customer
        relations. It allows for real-time tracking of sales trends and inventory levels, ensuring
        that our client can make informed decisions quickly. Additionally, the system supports
        promotional and marketing activities, enabling personalized customer engagements and
        targeted campaigns. This comprehensive backoffice solution empowers our client to maintain a
        high level of service quality while optimizing operational workflows.
      </p>

      <div class="project-card carte">
        <div class="line">
          <div class="image12">
            <div class="photo">
              <img
                src="../../assets/img/tdc-phone2.png"
                alt="Tranche de CaKe project - mobile vue 1"
              />
            </div>
            <div class="photo">
              <img
                src="../../assets/img/tdc-phone5.png"
                alt="Tranche de CaKe project - mobile vue 2"
              />
            </div>
          </div>

          <div class="image34">
            <div class="photo">
              <img
                src="../../assets/img/tdc-phone4.png"
                alt="Tranche de CaKe project - mobile vue 3"
              />
            </div>
            <div class="photo">
              <img
                src="../../assets/img/tdc-phone6.png"
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
  object-fit: cover;
  object-position: top;
  border-radius: 10px;
}
.mockup3 {
  width: 65%;
  object-fit: cover;
  object-position: top;
  border-radius: 10px;
}
.mockup2 {
  width: 45%;
  object-fit: cover;
  object-position: top;
  border-radius: 10px;
}
.mockup1 {
  width: 55%;
  object-fit: cover;
  object-position: top;
  border-radius: 10px;
}

.project-card img,
.video-projet {
  border: 2px var(--blue-bg) solid;
}
.project-card {
  overflow: hidden;
  padding: 15px;
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
  color: var(--red);
}
.right p {
  width: 30%;
  color: var(--red);
  text-align: right;
}
.project-card-video {
  width: 63%;
}
.mockup-container {
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
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
  height: 624px;
  padding: 15px;
  pointer-events: none;
}
.video-intro {
  display: flex;
  align-items: center;
  gap: 20px;
}
.video-intro p {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 37%;
  text-transform: uppercase;
  font-family: 'Xanh Mono', monospace;
  font-size: 23px;
  color: var(--red);
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
    width: 100%;
    order: 2;
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

  .mockup1 {
    width: 85%;
  }
  .mockup2 {
    width: 80%;
  }
  .mockup3 {
    width: 100%;
  }
  .video-intro {
    flex-direction: column;
    width: 100%;
  }
  .left,
  .right {
    flex-direction: column;
  }
  .left > .project-card,
  .right > .project-card,
  .left p,
  .right p,
  .video-intro p {
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
