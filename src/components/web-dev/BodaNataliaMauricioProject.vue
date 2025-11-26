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
          <h2 class="m-0 font-['Xanh_Mono'] text-4xl uppercase">Boda Natalia & Mauricio</h2>

          <div class="font-['Red_Hat_Text'] font-light">
            <p>
              For this project, I developed an elegant wedding website that beautifully integrates
              the handcrafted illustrations created by La Invitación de Liana. The website reflects
              the unique style of the couple and offers a seamless experience for their guests. It
              includes a refined home page featuring charming animations, hand-drawn illustrations,
              and all essential event details such as the date, location, schedule, dress code, and
              a countdown timer. To protect personal data, the wedding website is secured with a
              shared password.
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
                href="https://www.natalia-y-mauricio.com/"
                target="_blank"
                class="font-['Red_Hat_Text'] font-light text-inherit"
              >
                natalia-y-mauricio.com
              </a>

              <p class="font-['Red_Hat_Text'] font-light">
                Magic password: <span class="font-medium">bodaN&amp;M2025</span>
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

    <div class="mockup-container mt-6">
      <img
        src="../../assets/img/bodanm-desktop6.png"
        class="mockup1"
        alt="Boda Natalia & Mauricio - mockup 1"
      />
    </div>
    <div class="mockup-container">
      <img
        src="../../assets/img/bodanm-desktop1.png"
        class="mockup2"
        alt="Boda Natalia & Mauricio - mockup 2"
      />
    </div>
    <div class="mockup-container">
      <img
        src="../../assets/img/bodanm-mockup1.png"
        class="mockup3"
        alt="Boda Natalia & Mauricio - phone mockup"
      />
    </div>

    <div class="cards-container">
      <div class="video-intro">
        <div class="project-card project-card-video">
          <img
            v-show="!videoLoaded"
            src="../../assets/img/tdc-desktop1.png"
            class="video-placeholder"
            alt="Placeholder Boda Natalia & Mauricio"
          />
          <video
            playsinline
            @loadeddata="markVideoAsLoaded"
            src="../../../public/media/videos/video-boda-N&M.mp4"
            class="video-projet"
            autoplay
            loop
            muted
            preload="auto"
            v-show="videoLoaded"
          ></video>
        </div>
        <p>
          Share all your wedding details effortlessly <br />
          with a personalized digital touch
        </p>
      </div>

      <div class="right">
        <p>
          An exclusive blog section allows the couple to share photos and messages with their
          guests, creating a special connection before and after the wedding.
        </p>

        <div class="project-card">
          <img
            src="../../assets/img/bodanm-desktop3.png"
            class="video-placeholder"
            alt="Boda Natalia & Mauricio - blog"
          />
        </div>
      </div>

      <div class="left">
        <div class="project-card">
          <img
            src="../../assets/img/bodanm-desktop2.png"
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
        <p>Connection to the private administration page for the couple.</p>

        <div class="project-card">
          <img
            src="../../assets/img/bodanm-desktop4.png"
            class="video-placeholder"
            alt="Boda Natalia & Mauricio - Control panel connection"
          />
        </div>
      </div>

      <div class="left">
        <div class="project-card">
          <img
            src="../../assets/img/bodanm-desktop5.png"
            class="video-placeholder"
            alt="Boda Natalia & Mauricio - Control panel"
          />
        </div>

        <p>
          A private administration page for the couple includes tools to manage guest responses,
          export RSVP data to Excel format, track attendance, and post updates on the blog, with
          notifications sent directly to guests.
        </p>
      </div>

      <p class="text">
        The site also provides a dedicated page with a curated list of recommended accommodations
        near the event venue, complete with direct booking links. Technically, the site is fully
        responsive, optimized for any device, and comes with a custom domain and couple’s names.
        Hosting is included, and a post-launch technical support ensures a smooth experience. This
        project combines artistic and functional design to deliver a memorable and personalized
        digital solution for the couple’s special day.
      </p>
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
    <div class="h-24"></div>
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
.project-card {
  overflow: hidden;
  padding: 15px;
  border-radius: 10px;
  width: 80%;
}
.project-card img,
.video-projet {
  border: 2px var(--blue-bg) solid;
}
.project-description {
  overflow: hidden;
  width: 80%;
  margin: 30px auto;
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
  margin-bottom: 50px;
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
  font-family: 'Xanh Mono', monospace;
  font-size: var(--fs-24);
  color: var(--red);
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

  .video-placeholder {
    height: 723px;
  }
  .project-card-video {
    height: 754px;
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
  .header {
    flex-direction: column;
  }
  .left-section {
    padding: 13px 0;
  }
  .project-card-video {
    margin-bottom: 30px;
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
    margin-bottom: 30px;
    width: 300px;
  }
  .video-placeholder {
    height: 451px;
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
