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

    <Card class="border-round-xl bg-[var(--blue-bg)] text-[var(--light-content)] shadow-none">
      <template #content>
        <div class="flex flex-col gap-4 p-4 md:p-6">
          <h2 class="m-0 font-['Chakra_Petch'] text-4xl uppercase">Creyda yoga</h2>

          <div class="font-['Red_Hat_Text'] font-light">
            <p>
              A yoga website built in WordPress for CREYDA Yoga, a yoga and wellness center based in
              Brussels. This project entailed the design and development of a minimalist website for
              CREYDA, aimed at those seeking both peace and personal growth. The objective was to
              create an online space that mirrors the simplicity of yoga itself, making it easy for
              visitors to explore and enroll in a variety of yoga training programs.
            </p>
          </div>

          <div class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div class="md:w-8/12">
              <h2 class="mb-3 text-xl tracking-wide uppercase">Responsibilities</h2>
              <p class="font-['Red_Hat_Text'] font-light">
                Recovery of content from the former dysfunctional website, Web design, WordPress
                setup and development, Domain transfer, Launch.
              </p>
            </div>

            <div class="md:w-4/12 md:pl-10">
              <h2 class="mb-3 text-xl tracking-wide uppercase">URL</h2>
              <a
                href="https://creyda-yoga.be/"
                target="_blank"
                class="font-['Red_Hat_Text'] font-light text-inherit"
              >
                creyda-yoga.be
              </a>
            </div>
          </div>
        </div>
      </template>
    </Card>

    <div class="align-items-center flex flex-col gap-4 text-[var(--red)]">
      <div class="project-card project-card-video">
        <img
          v-show="!videoLoaded"
          src="../../assets/img/creyda-temp.png"
          class="border-round-xl max-w-full"
          alt="Placeholder Image Creyda project"
        />
        <!-- <video
          playsinline
          @loadeddata="markVideoAsLoaded"
          src="../../../public/media/videos/video-creyda-short.mov"
          class="video-projet"
          autoplay
          loop
          muted
          preload="auto"
          v-show="videoLoaded"
        ></video> -->
      </div>

      <p>
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

      <p>
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

.project-card.carte {
  display: flex;
  flex-direction: column;
  height: 1435px;
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
.project-card img,
.video-projet {
  border: 2px var(--blue-bg) solid;
}

/* Responsive */
@media screen and (max-width: 970px) {
  .project-card-dev {
    height: 484px;
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
}
@media screen and (max-width: 628px) {
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
    width: 300px;
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

  .image12,
  .image34 {
    height: 49%;
    width: 100%;
  }
}
</style>
