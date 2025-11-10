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
      class="flex flex-col items-center justify-between gap-2 text-[var(--red)] md:flex-row md:gap-8"
    >
      <div class="anton-regular text-3xl uppercase md:text-5xl">Achievements</div>
      <p class="font-light">
        In every project, I strive to ensure that each space narrates its own unique story through
        thoughtful and innovative design.
      </p>
    </div>

    <!-- Work grid -->
    <div
      class="work-grid gap-2 rounded-[10px] bg-[var(--blue-bg)] p-4 text-[var(--main-black)] md:p-6"
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
        <div class="work-card relative w-full overflow-hidden rounded-[10px]">
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

    <div class="flex flex-col gap-4 rounded-[10px] bg-[var(--yellow-bg)] p-4 md:p-6">
      <div class="anton-regular text-3xl uppercase md:text-5xl">About me...</div>

      <div class="flex flex-col gap-4 md:flex-row">
        <div class="col-12 flex flex-col justify-center gap-4 font-light md:col-7 md:text-xl">
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

        <div
          ref="parallaxContainer"
          class="parallax-container col-12 overflow-hidden rounded-[10px] md:col-5 md:p-8"
        >
          <img
            src="../assets/img/photo_2024-03-21_10-25-00.jpg"
            alt="Isaure"
            class="parallax-layer isaure"
            data-depth="0.5"
          />
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
      class="flex flex-col justify-between gap-4 rounded-[10px] bg-[var(--red-bg)] p-4 text-[var(--fs-30)] uppercase md:flex-row md:p-6"
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

    <div class="flex flex-col justify-center gap-4 md:flex-row">
      <div class="col-12 md:col-8">
        <img
          src="/media/images/getty-images-2Oj9tGznf5k-unsplash.png"
          alt=""
          class="h-[400px] w-full rounded-[10px] object-cover md:h-[none]"
        />
      </div>

      <div class="col-12 flex items-center justify-center md:col-4">
        <img
          src="../assets/img/sticker-isaure-v2-noQR.png"
          alt="Logo"
          class="hover-zoom max-w-[250px] lg:max-w-none"
        />
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
import Parallax from 'parallax-js';
import projects from '@/HomeProjects.js';

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
      // Retourne les vidéos triées par ID décroissant
      return [...this.videos].sort((a, b) => b.id - a.id);
    },

    isTitledVideo() {
      // Différencie les cartes projet (project-card) des cartes avec les animations google (animation-card)
      return (video) => video.title && video.title.trim() !== '';
    },
  },

  mounted() {
    this.initializeParallax();

    // Ajouter un écouteur pour surveiller la taille de l'écran
    window.addEventListener('resize', this.handleResize);

    // Effet lettres
    this.$nextTick(() => {
      this.splitLetters();
      setInterval(this.changeWord, 3000);
    });
  },

  beforeUnmount() {
    // Supprimer l'écouteur de redimensionnement lorsque le composant est détruit
    window.removeEventListener('resize', this.handleResize);
  },

  methods: {
    pauseVideo(videoId) {
      const video = this.videos.find((v) => v.id === videoId);

      if (this.isTitledVideo(video)) {
        const videos = this.$refs[`video_${videoId}`];
        const videoElement = videos ? videos[0] : null;

        if (videoElement) {
          videoElement.pause();
        } else {
          console.error('Video element not found:', `video_${videoId}`);
        }
      }
    },

    playVideo(videoId) {
      const videos = this.$refs[`video_${videoId}`];
      const videoElement = videos ? videos[0] : null;

      if (videoElement) {
        videoElement.play();
      } else {
        console.error('Video element not found:', `video_${videoId}`);
      }
    },

    markVideoAsLoaded(videoId) {
      this.videoLoaded[videoId] = true;
    },

    initializeParallax() {
      // Vérifie la taille de l'écran et applique l'effet parallax uniquement si l'écran est > 970px
      if (window.innerWidth > 970) {
        this.parallaxInstance = new Parallax(this.$refs.parallaxContainer);
      }
    },

    handleResize() {
      // Si l'écran est inférieur à 970px, désactive parallax
      if (window.innerWidth < 970 && this.parallaxInstance) {
        this.parallaxInstance.destroy(); // Désactive l'effet parallax
        this.parallaxInstance = null;
      } else if (window.innerWidth >= 970 && !this.parallaxInstance) {
        // Réinitialiser parallax si l'écran est à nouveau supérieur à 970px
        this.initializeParallax();
      }
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

      cw.forEach((letter, i) => {
        this.animateLetterOut(letter, i);
      });

      nw.forEach((letter, i) => {
        letter.className = 'behind';
        setTimeout(() => {
          this.animateLetterIn(letter, i);
        }, 340);
      });

      this.currentWord = this.currentWord === this.words.length - 1 ? 0 : this.currentWord + 1;
    },

    animateLetterOut(letter, i) {
      setTimeout(() => {
        letter.className = 'out';
      }, i * 80);
    },

    animateLetterIn(letter, i) {
      setTimeout(() => {
        letter.className = 'in';
      }, i * 80);
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

.project-info {
  pointer-events: none;
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 81%;
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
}

.project-card:hover .project-info {
  visibility: visible;
  opacity: 1;
}

@media screen and (max-width: 970px) {
  .project-info {
    visibility: visible;
    opacity: 1;
    background: hsla(0, 0%, 100%, 0.2);
    backdrop-filter: blur(10px);
    border: 1px solid hsla(0, 0%, 100%, 0.3);
    padding: 10px;
    color: var(--red-bg);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 2;
    width: 100%;
  }
  .animation-card .project-info {
    display: none;
  }
}

.project-card {
  cursor: pointer;
  transition: background-color 0.5s ease;
}
.project-card::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 20%;
  background-color: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition:
    background-color 0.5s ease,
    opacity 0.5s ease;
  z-index: 1;
  pointer-events: none;
  opacity: 0;
}
.project-card:hover::before {
  opacity: 1;
}
.animation-card {
  pointer-events: none;
}
.animation-card::before {
  content: none;
}
.project-card:hover .project-info {
  visibility: visible;
  opacity: 1;
}

.anton-regular {
  font-family: 'Chakra Petch', sans-serif;
}

.isaure {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 110%;
  min-height: 110%;
  border-radius: 10px;
  object-fit: cover;
}
.parallax-container {
  overflow: hidden; /* Empêche le débordement visuel des enfants */
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
  }
  .parallax-container {
    width: unset;
  }
}
@media screen and (max-width: 628px) {
  .isaure {
    height: 100%;
  }
}

.work-grid {
  display: grid;
  box-sizing: border-box;
  grid-template-columns: repeat(2, minmax(0, 1fr)); /* mobile: 2 colonnes */
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
    grid-template-columns: repeat(3, minmax(0, 1fr)); /* tablette+ : 3 colonnes */
    gap: 0.5rem;
  }
  .work-intro {
    grid-column: auto; /* intro redevient une colonne standard */
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
