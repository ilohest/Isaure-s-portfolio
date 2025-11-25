<!-- src/components/HomeIsaure.vue -->
<template>
  <div class="flex flex-col gap-4 overflow-x-hidden md:gap-6">
    <!-- Intro -->
    <div
      class="flex flex-col justify-between gap-2 text-xl text-[var(--red)] uppercase md:mt-6 md:flex-row md:text-2xl"
    >
      <h1 class="anton-regular text-center md:text-left">
        Creative <br />
        Web developer
      </h1>
      <h2 class="anton-regular text-center md:text-right">Isaure Lohest</h2>
    </div>

    <!-- What I do -->
    <div class="text-justify text-base font-light text-[var(--red)] uppercase md:text-xl">
      <p>I use my passion and skills to create digital products and experiences.</p>

      <div class="mt-2">
        <p class="m-0 inline-block align-top">Bringing ideas to life:&nbsp;</p>
        <br />
        <p class="m-0 inline-block align-top text-[var(--fs-18)]">💭 🏗️ 🚀 🎉&nbsp;</p>

        <span
          v-for="(word, index) in words"
          :key="index"
          class="word absolute transition-opacity duration-300"
          v-show="index === currentWord"
        >
          <span
            v-for="(letter, i) in word.text"
            :key="i"
            class="letter inline-block will-change-transform"
            :class="getLetterClass(index, i)"
          >
            {{ letter }}
          </span>
        </span>
      </div>
    </div>

    <!-- Achievements -->
    <div
      class="justify-content-between align-items-center flex flex-col gap-4 text-[var(--red)] md:flex-row md:gap-2 md:gap-8"
    >
      <h1 class="font-['Chakra_Petch'] uppercase md:pr-8">Achievements</h1>

      <p class="font-light md:pl-8">
        In every project, I strive to ensure that each space narrates its own unique story through
        thoughtful and innovative design.
      </p>
    </div>

    <!-- Work grid -->
    <div
      class="work-grid border-round-xl gap-2 bg-[var(--blue-bg)] p-4 text-[var(--main-black)] md:p-6"
    >
      <!-- Intro colonne -->
      <div class="work-intro pb-4 md:pr-5">
        <p class="idea mb-2 font-['Chakra_Petch'] text-2xl md:text-3xl">
          Everything begins with an
          <span class="inline-block text-[var(--highlight)]">IDEA</span>
          . . .
        </p>
        <p class="font-light">
          Perhaps you want to launch a business. Maybe you aim to transform a hobby into something
          more. Whatever your case, the way you tell your story online can make all the difference.
        </p>
      </div>

      <!-- Cartes -->
      <div
        v-for="video in orderedVideos"
        class="relative"
        :key="video.id"
        :class="isTitledVideo(video) ? 'project-card group cursor-pointer' : 'animation-card'"
      >
        <div class="work-card border-round-xl relative w-full overflow-hidden">
          <router-link :to="video.projectLink">
            <!-- Placeholder -->
            <img
              v-show="!videoLoaded[video.id]"
              :src="video.placeholder"
              :alt="`Placeholder Image ${video.title} project`"
              class="media h-full w-full object-cover"
            />
            <!-- Vidéo -->
            <video
              v-show="videoLoaded[video.id]"
              playsinline
              autoplay
              loop
              muted
              preload="auto"
              @mouseover="pauseVideo(video.id)"
              @mouseout="playVideo(video.id)"
              @loadeddata="markVideoAsLoaded(video.id)"
              :src="video.src"
              :ref="'video_' + video.id"
              class="video-projet media h-full w-full object-cover"
            ></video>

            <div class="project-info text-center uppercase">
              <span>{{ video.title }}</span>
              <span>{{ video.year }}</span>
            </div>
          </router-link>
        </div>
      </div>
    </div>

    <div class="border-round-xl flex flex-col gap-4 bg-[var(--yellow-bg)] p-4 md:p-6">
      <div class="anton-regular text-3xl uppercase md:text-5xl">About me...</div>

      <div class="flex flex-col gap-4 md:flex-row">
        <div class="flex w-full flex-col justify-center gap-4 font-light md:w-1/2">
          <p>
            Graduated as a bioengineer with a Master's in Phytopathology, I've always had a
            deep-seated passion for all things creative. After earning my degree, I led a team in
            producing a vaccine against malaria, combining my scientific expertise with a drive to
            make a real-world impact. While science has always been a cornerstone of my career, I've
            harbored a lifelong passion for drawing, aesthetics, and photography. This love for the
            visual arts led me to explore another side of my creativity - design and web
            development. I've transitioned into the design and development field because I adore the
            creative process - from a blank canvas to a fully functional and visually appealing
            website.
          </p>
          <p>
            As a designer and web developer, I bring a unique perspective by blending the analytical
            thinking from my scientific background with my artistic skills. Whether creating
            engaging websites or capturing the world through my lens as a photographer, I aim to
            tell stories that resonate and connect. I am excited to bring my diverse skills to your
            project, crafting beautiful, functional, and user-friendly digital experiences.
          </p>
        </div>

        <div class="w-full md:w-1/2">
          <div class="about-img-wrapper border-round-xl overflow-hidden">
            <picture class="block h-full w-full">
              <source
                type="image/avif"
                srcset="/assets/img/Pages/photo_2024-03-21_10-25-00-640.avif 640w"
                sizes="(min-width: 970px) 600px, 100vw"
              />
              <source
                type="image/webp"
                srcset="/assets/img/Pages/photo_2024-03-21_10-25-00-640.webp 640w"
                sizes="(min-width: 970px) 600px, 100vw"
              />
              <img
                src="/assets/img/Pages/photo_2024-03-21_10-25-00-960.jpg"
                alt="About me"
                class="block h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </picture>
          </div>
        </div>
      </div>

      <p class="amazing anton-regular mt-10 text-center text-3xl uppercase">
        Let’s create something
        <span class="inline-block text-[var(--highlight)]">amazing</span>
        together!
      </p>
    </div>

    <!-- Contact CTA -->
    <div
      class="border-round-xl flex flex-col justify-between gap-4 bg-[var(--red-bg)] p-4 text-[var(--fs-30)] uppercase md:flex-row md:p-6"
    >
      <span class="anton-regular flex items-center text-3xl text-[var(--main-white)]"
        >Are you minding a project?</span
      >
      <span
        class="anton-regular font-['Chakra_Petch'] text-xl text-[var(--main-white)] normal-case md:mt-0 md:text-right md:text-2xl"
      >
        Contact me about a project, a collaboration, or just to say hello!
      </span>
    </div>

    <div class="flex flex-col gap-4 md:flex-row">
      <picture class="w-full md:w-1/2">
        <source
          type="image/avif"
          srcset="
            /assets/img/Pages/getty-images-2Oj9tGznf5k-unsplash-640.avif   640w,
            /assets/img/Pages/getty-images-2Oj9tGznf5k-unsplash-960.avif   960w,
            /assets/img/Pages/getty-images-2Oj9tGznf5k-unsplash-1280.avif 1280w,
            /assets/img/Pages/getty-images-2Oj9tGznf5k-unsplash-1920.avif 1920w
          "
          sizes="(min-width: 768px) 66vw, 100vw"
        />
        <source
          type="image/webp"
          srcset="
            /assets/img/Pages/getty-images-2Oj9tGznf5k-unsplash-640.webp   640w,
            /assets/img/Pages/getty-images-2Oj9tGznf5k-unsplash-960.webp   960w,
            /assets/img/Pages/getty-images-2Oj9tGznf5k-unsplash-1280.webp 1280w,
            /assets/img/Pages/getty-images-2Oj9tGznf5k-unsplash-1920.webp 1920w
          "
          sizes="(min-width: 768px) 66vw, 100vw"
        />
        <img
          src="/assets/img/Pages/getty-images-2Oj9tGznf5k-unsplash-960.png"
          alt=""
          class="border-round-xl h-[400px] w-full object-cover md:h-[none]"
          loading="lazy"
          decoding="async"
        />
      </picture>

      <div class="w-full md:w-1/2">
        <div class="flex h-full w-full items-center justify-center">
          <picture>
            <source
              type="image/avif"
              srcset="
                /assets/img/Pages/sticker-isaure-v2-noQR-640.avif   640w,
                /assets/img/Pages/sticker-isaure-v2-noQR-960.avif   960w,
                /assets/img/Pages/sticker-isaure-v2-noQR-1280.avif 1280w
              "
              sizes="(min-width: 1024px) 320px, 250px"
            />
            <source
              type="image/webp"
              srcset="
                /assets/img/Pages/sticker-isaure-v2-noQR-640.webp   640w,
                /assets/img/Pages/sticker-isaure-v2-noQR-960.webp   960w,
                /assets/img/Pages/sticker-isaure-v2-noQR-1280.webp 1280w
              "
              sizes="(min-width: 1024px) 320px, 250px"
            />
            <img
              src="/assets/img/Pages/sticker-isaure-v2-noQR-960.png"
              alt="Logo"
              class="hover-zoom max-w-[250px] lg:max-w-none"
              loading="lazy"
              decoding="async"
            />
          </picture>
        </div>
      </div>
    </div>

    <p class="pb-[47px] text-right text-xs text-[var(--red)] sm:block">
      The colored abstract shapes in this page are credited to Material Design by Google, sourced
      from
      <a
        class="text-inherit underline"
        href="https://m3.material.io/"
        target="_blank"
        rel="noopener"
        >Material Design's official website</a
      >.
    </p>
  </div>
</template>

<script>
import projects from '@/home-projects.js';

export default {
  name: 'HomeIsaure',

  data() {
    return {
      videos: projects,
      videoLoaded: {},
      parallaxInstance: null,
      words: [
        { text: '#think.' },
        { text: '#build.' },
        { text: '#deploy.' },
        { text: '#celebrate.' },
      ],
      currentWord: 0,
      wordArray: [],
    };
  },

  computed: {
    orderedVideos() {
      return [...this.videos].sort((a, b) => b.id - a.id);
    },

    isTitledVideo() {
      return (video) => video.title && video.title.trim() !== '';
    },
  },

  mounted() {
    window.addEventListener('resize', this.handleResize);

    this.$nextTick(() => {
      this.splitLetters();
      setInterval(this.changeWord, 3000);
    });
  },

  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
  },

  methods: {
    pauseVideo(videoId) {
      const video = this.videos.find((v) => v.id === videoId);
      if (this.isTitledVideo(video)) {
        const videos = this.$refs[`video_${videoId}`];
        const videoElement = videos ? videos[0] : null;
        if (videoElement) videoElement.pause();
      }
    },

    playVideo(videoId) {
      const videos = this.$refs[`video_${videoId}`];
      const videoElement = videos ? videos[0] : null;
      if (videoElement) videoElement.play();
    },

    markVideoAsLoaded(videoId) {
      this.videoLoaded[videoId] = true;
    },

    splitLetters() {
      this.wordArray = this.words.map((word) =>
        word.text.split('').map(() => ({ className: 'in' })),
      );
    },
    changeWord() {
      const cw = this.wordArray[this.currentWord];
      const nw =
        this.currentWord === this.words.length - 1
          ? this.wordArray[0]
          : this.wordArray[this.currentWord + 1];

      cw.forEach((letter, i) => this.animateLetterOut(letter, i));
      nw.forEach((letter, i) => {
        letter.className = 'behind';
        setTimeout(() => this.animateLetterIn(letter, i), 340);
      });

      this.currentWord = this.currentWord === this.words.length - 1 ? 0 : this.currentWord + 1;
    },

    animateLetterOut(letter, i) {
      setTimeout(() => (letter.className = 'out'), i * 80);
    },

    animateLetterIn(letter, i) {
      setTimeout(() => (letter.className = 'in'), i * 80);
    },

    getLetterClass(wordIndex, letterIndex) {
      return this.wordArray[wordIndex]?.[letterIndex]?.className || 'in';
    },
  },
};
</script>

<style scoped>
.video-placeholder {
  height: 100%;
  width: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  flex-grow: 1;
}

.video-projet {
  transition: transform 0.3s ease;
  flex-grow: 1;
}
.video-projet:hover,
.video-placeholder:hover {
  transform: scale(1.05);
}

/* Infos projet overlay */
/* Infos projet overlay */
.project-info {
  pointer-events: none;
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 50%; /* aligné comme Achievements */
  left: 50%;
  transform: translate(-50%, -50%);
  flex-direction: column;
  align-items: center;
  visibility: hidden;
  opacity: 0;
  transition:
    visibility 0s,
    opacity 0.5s linear;
  z-index: 2;
  color: var(--red-bg);
  text-transform: uppercase;
  text-align: center;
}

.project-card:hover .project-info {
  visibility: visible;
  opacity: 1;
}

/* IMPORTANT: la carte porte le ::before, donc elle doit être positionnée */
.project-card {
  position: relative; /* <-- ajout */
  cursor: pointer;
  transition: background-color 0.5s ease;
}

/* Overlay centré comme dans Achievements.vue */
@media (hover: hover) and (pointer: fine) {
  .project-card::before {
    content: '';
    position: absolute;
    top: 50%; /* centre vertical */
    left: 50%; /* centre horizontal */
    transform: translate(-50%, -50%);
    width: 100%;
    height: 36%;
    background-color: rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.3);
    transition:
      background-color 0.5s ease,
      opacity 0.5s ease;
    z-index: 1; /* sous le texte, au-dessus de la vidéo */
    pointer-events: none;
    opacity: 0;
  }
  .project-card:hover::before {
    opacity: 1;
  }
}

/* Pas d’overlay fantôme sur tactile */
@media (hover: none), (pointer: coarse) {
  .project-card::before,
  .project-card:hover::before {
    display: none !important;
    opacity: 0 !important;
  }
}

/* Mobile: même logique que Achievements.vue */
@media screen and (max-width: 970px) {
  .project-info {
    visibility: visible;
    opacity: 1;
    background: hsla(0, 0%, 100%, 0.2);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    border: 1px solid hsla(0, 0%, 100%, 0.3);
    padding: 10px;
    color: var(--red-bg);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 2;
    width: 68vw; /* comme Achievements */
    top: 85%; /* comme Achievements */
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
  }
  .animation-card .project-info {
    display: none;
  }
}

/* Cartes */
.project-card {
  cursor: pointer;
  transition: background-color 0.5s ease;
}
.animation-card {
  pointer-events: none;
}
.animation-card::before {
  content: none;
}

.anton-regular {
  font-family: 'Chakra Petch', sans-serif;
}

/* Parallax photo */
.isaure {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 110%;
  min-height: 110%;
  object-fit: cover;
}
.parallax-container {
  overflow: hidden;
  position: relative;
  height: 620px;
}
.parallax-layer,
.isaure {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.amazing {
  transition: transform 0.3s ease;
}
.amazing:hover {
  transform: scale(1.05);
}

.amazing span,
.idea span {
  transition: transform 0.3s ease;
}
.idea span:hover {
  transform: scale(1.3);
}
img.hover-zoom {
  transition: transform 0.5s ease;
}
img.hover-zoom:hover {
  transform: scale(1.08);
}

/* Effet lettres */
.text > p {
  display: inline-block;
  vertical-align: top;
  margin: 0;
}
.word {
  position: absolute;
  width: 220px;
  transition: opacity 0.3s ease;
}
.word:nth-child(1) {
  opacity: 1;
}
.letter {
  display: inline-block;
  position: relative;
  transform: translateZ(25px);
  transform-origin: 50% 50% 25px;
}
.letter.out {
  transform: rotateX(90deg);
  transition: transform 0.32s cubic-bezier(0.55, 0.055, 0.675, 0.19);
}
.letter.behind {
  transform: rotateX(-90deg);
}
.letter.in {
  transform: rotateX(0deg);
  transition: transform 0.38s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@media screen and (max-width: 970px) {
  .isaure {
    object-position: 50% 25%;
    transform: unset;
    min-width: unset;
    min-height: unset;
    max-width: 100%;
    max-height: 100%;
  }
  .parallax-container {
    width: unset;
    overflow: hidden;
  }
}
@media screen and (max-width: 628px) {
  .isaure {
    height: 100%;
  }
}

/* Grille */
.work-grid {
  display: grid;
  box-sizing: border-box;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.work-intro {
  grid-column: 1 / -1;
}

.work-item {
  position: relative;
}

.work-card {
  height: 55vw; /* mobile */
}

@media (min-width: 768px) {
  .work-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.5rem;
  }
  .work-intro {
    grid-column: auto;
  }
  .work-card {
    height: 400px;
  }
}

/* Media commun (img/video) */
.media {
  object-fit: cover;
  transition: transform 0.3s ease;
}
.group:hover .media {
  transform: scale(1.05);
}
</style>
