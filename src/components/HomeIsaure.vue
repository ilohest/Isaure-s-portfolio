<!-- src/components/HomeIsaure.vue -->
<template>
  <h1 class="sr-only">Isaure Lohest Portfolio - Web Design, Web Development, and Branding</h1>
  <HomeHeroSection />
  <HomeIntroSection
    :words="words"
    :current-word="currentWord"
    :letter-class-for="getLetterClass"
    :show-all-words="!enableWordAnimation"
  />

  <section class="achievements-section container mx-auto flex flex-col gap-4">
    <!-- Work grid -->
    <div class="work-grid text-[var(--text-primary)]">
      <div
        ref="workScatter"
        class="work-scatter"
        :style="{ '--scatter-height': `${scatterHeight}px` }"
      >
        <div
          class="work-copy work-copy-creating font-display reveal-on-scroll text-[var(--text-primary)] uppercase"
        >
          Creating, to me, is not about adding,
          <br />
          it is about revealing.
        </div>

        <div class="work-copy work-copy-achievements reveal-on-scroll">
          <p class="font-display text-[var(--text-primary)] uppercase">
            In every project, I strive to ensure that each space narrates its own unique story
            through thoughtful and innovative design.
          </p>
        </div>

        <div class="work-copy work-copy-idea reveal-on-scroll">
          <p
            class="idea font-display mb-2 text-2xl text-[var(--text-primary)] uppercase md:text-3xl"
          >
            Everything begins with
            <br />
            an
            <span class="font-script inline-block text-[var(--interactive-primary)]">IDEA</span>
            ...
          </p>
        </div>

        <div
          class="work-copy work-copy-story font-display reveal-on-scroll text-[var(--text-primary)] uppercase"
        >
          Perhaps you want to launch a business. Maybe you aim to transform a hobby into something
          more. Whatever your case, the way you tell your story online can make all the difference.
        </div>

        <div
          class="work-copy work-copy-conviction font-display reveal-on-scroll text-[var(--text-primary)] uppercase"
        >
          Giving form to an idea means translating intuition into substance. Making visible what, at
          first, exists only as conviction.
        </div>

        <div
          v-for="(video, index) in orderedVideos"
          class="work-scatter-item"
          :key="video.id"
          :style="[getScatterStyle(index, video.id), getCardOpacityStyle(video.id)]"
          :data-video-id="video.id"
          :ref="'mediaCard_' + video.id"
          :class="[
            getMediaShapeClass(video.id),
            isTitledVideo(video) ? 'project-card group cursor-pointer' : 'animation-card',
          ]"
        >
          <div
            class="work-card reveal-on-scroll relative w-full overflow-hidden"
            :style="{ '--reveal-delay': `${Math.min(index * 55, 420)}ms` }"
          >
            <router-link :to="video.projectLink" class="item-link">
              <!-- Placeholder -->
              <img
                v-show="!isVideoVisible(video)"
                :src="getPlaceholderSrc(video)"
                :alt="`Placeholder Image ${video.title} project`"
                class="media"
                loading="lazy"
                decoding="async"
                @load="registerImageShape(video.id, $event)"
              />
              <!-- Vidéo -->
              <video
                v-if="enableVideoPreviews && video.src"
                v-show="isVideoVisible(video)"
                playsinline
                :autoplay="enableVideoPreviews"
                :loop="!hasVideoSequence(video) && !video.introPlaceholder"
                muted
                :preload="videoPreload"
                @mouseover="pauseVideo(video.id)"
                @mouseout="playVideo(video.id)"
                @ended="onVideoEnded(video.id)"
                @loadeddata="markVideoAsLoaded(video.id)"
                @loadedmetadata="registerVideoShape(video.id, $event)"
                :src="getVideoSrc(video)"
                :ref="'video_' + video.id"
                class="video-projet media"
              ></video>

              <div class="project-info text-center uppercase">
                <span>{{ video.title }}</span>
                <span>{{ video.year }}</span>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>

  <HomePartnersSection :partner-display-slots="partnerDisplaySlots" :is-dark="isDark" />

  <section
    class="relative h-[570vh] border-t border-[var(--main-black)] bg-[var(--surface-accent)]"
    id="slides"
    data-reveal-ignore
  >
    <div
      class="process-title-section sticky top-0 z-0 flex min-h-[100svh] items-center justify-center bg-[var(--surface-accent)] text-white"
    >
      <div class="process-mesh" aria-hidden="true">
        <span
          v-for="(blob, index) in processMeshBlobs"
          :key="`process-blob-${index}`"
          class="process-blob"
          :class="blob.tone"
          :style="blob.style"
        ></span>
      </div>
      <div class="process-title font-script text-[var(--text-inverse)]">
        <span class="hero-logo-main">THE&nbsp;</span>
        <span class="hero-logo-alt">P</span>
        <span class="hero-logo-main">ROCESS</span>
      </div>
    </div>

    <!-- #think -->
    <div
      class="think-container slides-overlay custom-align-items relative mx-auto my-6 flex w-[calc(100%-1.5rem)] max-w-5xl justify-center text-[var(--text-primary)]"
    >
      <div class="slide-content mx-auto flex max-w-5xl flex-col items-center px-2 md:px-6">
        <figure
          class="think-image-shell mt-4 w-full max-w-[400px] md:w-[58%] md:-translate-x-8 md:self-start"
        >
          <div class="process-svg-frame overflow-hidden md:h-[30vh] md:h-[460px]">
            <img
              src="/assets/media/pages/home/slide-think.svg"
              alt="Illustration for the think stage"
              loading="lazy"
              decoding="async"
            />
          </div>
        </figure>

        <div
          class="think-copy-block process-card-surface flex w-full max-w-[560px] flex-col gap-2 rounded-[2px] border border-[var(--text-primary)] bg-[var(--surface-panel)] p-4 md:w-[44%] md:-translate-x-12 md:gap-4 md:self-start md:p-10 md:text-left"
        >
          <h2 class="font-display text-4xl md:text-6xl">
            <span class="hero-logo-alt">#</span>think.
          </h2>

          <p class="think-lead">
            I listen, understand and translate your ideas into a clear digital vision.
          </p>

          <p class="think-body">
            From independent artists and yoga studios to restaurants, law firms, coaches, wedding
            planners & small business owners, many entrepreneurs need tools that simply don’t exist
            in ready-made platforms.
          </p>

          <p class="think-body">
            These entrepreneurs often need custom tools: booking systems, client portals, case
            dashboards, workflows, content management, automations. Every project starts with a
            conversation to understand what their business really needs.
          </p>
        </div>
      </div>
    </div>

    <!-- #build -->
    <div
      class="slides-overlay build-container mx-auto my-6 flex w-[calc(100%-1.5rem)] max-w-5xl justify-center text-[var(--text-primary)]"
    >
      <div class="slide-content relative mx-auto flex max-w-5xl flex-col items-center px-2 md:px-6">
        <div
          class="build-copy-block process-card-surface order-2 flex w-full max-w-[560px] flex-col gap-2 rounded-[2px] border border-[var(--text-primary)] bg-[var(--surface-panel)] p-4 md:w-[44%] md:gap-4 md:p-10 md:text-left"
        >
          <h2 class="font-display text-4xl md:text-6xl">
            <span class="hero-logo-alt">#</span>build.
          </h2>

          <p class="build-lead">
            Custom platforms. Online stores. Beautiful websites. Digital identities.
          </p>

          <ul class="build-body list-none space-y-2">
            <li>• Bespoke platforms that match your job & workflow</li>
            <li>• E-commerce stores for makers and shops</li>
            <li>• Restaurant & wellness websites</li>
            <li>• Digital wedding invitations + back-office tools</li>
            <li>• Logo design &amp; social media templates</li>
          </ul>

          <p class="build-body">Every detail reflects your story and supports your business.</p>
        </div>

        <figure
          class="build-image-shell relative mt-4 flex w-full max-w-[560px] flex-col gap-4 md:w-[58%] md:-translate-x-8 md:flex-row md:self-start"
        >
          <div class="process-svg-frame overflow-hidden md:h-[30vh] md:h-[460px]">
            <img
              src="/assets/media/pages/home/slide-build.svg"
              alt="Illustration for the build stage"
              loading="lazy"
              decoding="async"
              class="min-w-[350px]"
            />
          </div>
        </figure>
      </div>
    </div>

    <!-- custom platforms -->
    <div
      class="slides-overlay custom-platforms-container mx-auto my-6 flex w-[calc(100%-1.5rem)] max-w-5xl justify-center text-[var(--text-primary)]"
    >
      <div
        class="custom-platforms-block process-card-surface flex w-full max-w-[560px] flex-col gap-2 rounded-[2px] border border-[var(--text-primary)] bg-[var(--surface-panel)] p-4 text-[var(--text-primary)] md:gap-4 md:p-10"
      >
        <div class="custom-platforms-postcard">
          <div class="custom-platforms-postcard-copy">
            <p class="custom-platforms-kicker font-script text-2xl font-semibold uppercase">
              ⤷ Custom platforms
            </p>

            <p class="custom-platforms-note">
              Not every business fits inside a template. Some workflows are too specific, too
              complex, too layered to be handled by off-the-shelf tools.
            </p>

            <p class="custom-platforms-summary">
              That’s where I step in. I design and build digital platforms shaped around real
              operations — so what used to feel fragmented becomes structured, fluid and reliable.
            </p>
          </div>

          <div class="custom-platforms-postcard-list">
            <p class="custom-platforms-list-label">Examples</p>

            <ul class="list-none space-y-2">
              <li>
                • A full platform for lawyers — cases, documents, agenda, video calls, payments &
                signatures
              </li>
              <li>• Booking and management systems for studios, wellness spaces or restaurants</li>
              <li>• A custom mini-SaaS for independent creators — reservations, CRM, invoicing</li>
              <li>• Back-office dashboards beyond what any CMS or template can offer</li>
              <li>
                • Internal tools to structure workflows — requests, approvals, document handling
              </li>
            </ul>

            <p class="custom-platforms-outro">The goal isn’t to add more tools.</p>

            <p class="custom-platforms-outro">
              It’s to make everything work together — clearly, efficiently, and without friction.
            </p>
          </div>
        </div>

        <div class="custom-platforms-stamp custom-platforms-stamp-desktop">
          <span>Made-to-measure</span>
        </div>
      </div>

      <div class="custom-platforms-stamp custom-platforms-stamp-mobile">
        <span>Made-to-measure</span>
      </div>
    </div>

    <!-- #deploy -->
    <div
      class="slides-overlay deploy-container mx-auto my-6 flex w-[calc(100%-1.5rem)] max-w-5xl justify-center text-[var(--text-primary)]"
    >
      <div
        class="slide-content align-items-center relative mx-auto flex max-w-5xl flex-col px-2 md:px-6"
      >
        <figure
          class="deploy-image-shell mt-4 w-full max-w-[400px] md:w-[58%] md:-translate-x-8 md:self-start"
        >
          <div class="process-svg-frame flex justify-center overflow-hidden">
            <img
              src="/assets/media/pages/home/slide-deploy.svg"
              alt="Illustration for the deploy stage"
              loading="lazy"
              decoding="async"
              class="w-[40vw] min-w-[350px]"
            />
          </div>
        </figure>

        <div
          class="deploy-copy-block process-card-surface flex w-full max-w-[560px] flex-col gap-2 rounded-[2px] border border-[var(--text-primary)] bg-[var(--surface-panel)] p-4 md:w-[44%] md:gap-4 md:p-10 md:text-left"
        >
          <h2 class="font-display text-center text-4xl md:text-5xl">
            <span class="hero-logo-alt">#</span>deploy.
          </h2>

          <p class="deploy-lead">Pixel-perfect, fast, and future-proof.</p>

          <p class="deploy-body">
            I deliver responsive, performant and scalable products. Hosting setup, optimisation,
            content integration, testing: everything is crafted to create a smooth and solid launch.
          </p>
        </div>
      </div>
    </div>

    <!-- #celebrate -->
    <div
      class="slides-overlay celebrate-container mx-auto my-6 flex w-[calc(100%-1.5rem)] max-w-5xl justify-center text-[var(--text-primary)]"
    >
      <div class="slide-content mx-auto flex max-w-5xl flex-col px-2 md:px-6">
        <div
          class="celebrate-copy-block process-card-surface order-2 flex w-full max-w-[560px] flex-col gap-2 rounded-[2px] border border-[var(--text-primary)] bg-[var(--surface-panel)] p-4 md:w-[44%] md:gap-4 md:p-10 md:text-left"
        >
          <h2 class="font-display text-4xl md:text-6xl">
            <span class="hero-logo-alt">#</span>celebrate.
          </h2>

          <p class="celebrate-lead">Your new digital space is live. And people notice.</p>

          <p class="celebrate-body">
            Your clients find you more easily. Your brand finally looks like what it deserves. You
            shine. And we celebrate the beginning of your next chapter.
          </p>
        </div>

        <figure
          class="celebrate-image-shell order-1 mt-4 w-full max-w-[560px] md:w-[58%] md:-translate-x-8 md:self-start"
        >
          <div class="process-svg-frame flex justify-center overflow-hidden">
            <img
              src="/assets/media/pages/home/slide-celebrate.svg"
              alt="Illustration for the celebrate stage"
              loading="lazy"
              decoding="async"
            />
          </div>
        </figure>
      </div>
    </div>
  </section>

  <div class="about-section-frame border-y border-[var(--main-black)] bg-[var(--surface-muted)]">
    <section class="container mx-auto mt-0 px-4 py-6 md:px-6 md:py-8">
      <div class="about-stage">
        <div class="about-copy-card about-copy-card-top font-light">
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
        </div>

        <div class="about-visual-wrap">
          <div class="about-title anton-regular uppercase">About me</div>

          <div class="about-img-wrapper border-round-xl flex items-center justify-center">
            <picture class="block w-full">
              <source
                type="image/webp"
                srcset="/assets/media/pages/home/photo_2024-03-21_10-25-00-640.webp 640w"
                sizes="(min-width: 970px) 600px, 80vw"
              />
              <img
                src="/assets/media/pages/home/photo_2024-03-21_10-25-00-960.png"
                alt="About me"
                class="about-image block h-auto max-w-full object-contain"
                loading="lazy"
                decoding="async"
              />
            </picture>
          </div>
        </div>

        <div class="about-copy-card about-copy-card-bottom font-light">
          <p>
            As a designer and web developer, I bring a unique perspective by blending the analytical
            thinking from my scientific background with my artistic skills. Whether creating
            engaging websites or capturing the world through my lens as a photographer, I aim to
            tell stories that resonate and connect. I am excited to bring my diverse skills to your
            project, crafting beautiful, functional, and user-friendly digital experiences.
          </p>
        </div>
      </div>
    </section>
  </div>

  <section class="portfolio-kinetic-signature" aria-label="Portfolio signature">
    <div class="portfolio-kinetic-bands">
      <article
        v-for="(band, index) in signatureBands"
        :key="band.id"
        class="portfolio-kinetic-band group"
        :style="{ backgroundColor: band.background, '--band-text': band.textColor, '--band-delay': `${index * 80}ms` }"
      >
        <div class="portfolio-kinetic-band-inner">
          <div class="portfolio-kinetic-band-main">
            <span class="portfolio-kinetic-band-index">{{ band.index }}</span>
            <span class="portfolio-kinetic-band-title">{{ band.title }}</span>
          </div>

          <div class="portfolio-kinetic-band-meta">
            <span v-for="item in band.meta" :key="item">{{ item }}</span>
            <span class="portfolio-kinetic-band-note">{{ band.note }}</span>
          </div>
        </div>

        <div class="portfolio-kinetic-band-line"></div>
      </article>
    </div>
  </section>

  <section class="portfolio-final-cta container mx-auto flex flex-col gap-6 px-4 md:px-6">
    <div class="flex flex-col items-center">
      <p class="amazing anton-regular m-6 text-center text-3xl uppercase md:m-8">
        Let’s create something
        <span class="font-script inline-block text-[var(--interactive-primary)]">amazing</span>
        together!
      </p>

      <router-link to="/contact" class="portfolio-final-cta-link">
        Get in touch
      </router-link>
    </div>
  </section>
</template>

<script>
import projects from '@/home-projects';
import HomeHeroSection from '@/components/home/HomeHeroSection.vue';
import HomeIntroSection from '@/components/home/HomeIntroSection.vue';
import HomePartnersSection from '@/components/home/HomePartnersSection.vue';
import {
  boxesOverlap as boxesOverlapUtil,
  getCenterProtectedRect,
  getParallaxScrollTop as getParallaxScrollTopUtil,
  hashString as hashStringUtil,
  roundCssPx,
  seededRandom as seededRandomUtil,
} from '@/utils/scatter-utils';

const partnerLogoDefinitions = [
  { filename: 'Lyreco_Logotype.png', whiteFilename: 'Lyreco_Logotype-white.png' },
  { filename: 'TLB.webp', whiteFilename: 'TLB-white.png' },
  { filename: 'alyssa-coleman.png', whiteFilename: 'alyssa-coleman-white.png' },
  { filename: 'farweb.png', whiteFilename: 'farweb-white.png' },
  { filename: 'lainvitaciondeliana.png', whiteFilename: 'lainvitaciondeliana-white.png' },
  { filename: 'lara-gonzalez.png', whiteFilename: 'lara-gonzalez-white.svg' },
  { filename: 'le-campus.png', whiteFilename: 'le-campus-white.webp' },
  { filename: 'milieu.png', whiteFilename: 'milieu-white.png' },
  { filename: 'soade-studio.webp', whiteFilename: 'soade-studio-white.png' },
];

const partnerLogoBasePath = '/assets/media/common/logos/';

const partnerLogoPool = partnerLogoDefinitions.map(({ filename, whiteFilename }) => {
  const cleanName = filename.replace(/\.[^/.]+$/, '');
  const readableName = cleanName
    .replace(/[-_]+/g, ' ')
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
  return {
    id: cleanName.toLowerCase(),
    src: `${partnerLogoBasePath}${filename}`,
    whiteSrc: whiteFilename ? `${partnerLogoBasePath}${whiteFilename}` : null,
    alt: `${readableName} logo`,
  };
});

export default {
  name: 'HomeIsaure',
  components: {
    HomeHeroSection,
    HomeIntroSection,
    HomePartnersSection,
  },
  data() {
    return {
      videos: projects,
      videoLoaded: {},
      mediaShape: {},
      words: [
        { text: '#think.' },
        { text: '#build.' },
        { text: '#deploy.' },
        { text: '#celebrate.' },
      ],
      currentWord: 0,
      wordArray: [],
      wordIntervalId: null,
      enableVideoPreviews: true,
      enableWordAnimation: true,
      enableScrollEffects: true,
      mediaObserver: null,
      revealObserver: null,
      deferredVideoLoaded: {},
      videoIntroReady: {},
      videoIntroTimers: {},
      parallaxRaf: null,
      parallaxScrollTarget: null,
      lastParallaxScrollTop: null,
      parallaxOffsetsById: {},
      overlapRecomputeTimer: null,
      overlappingCardOpacity: {},
      scatterLoadSeed: 0,
      viewportWidth: 1280,
      scatterClientReady: false,
      partnerLogos: partnerLogoPool,
      partnerSlots: [],
      partnerSlotVersions: [],
      partnerCycleTimer: null,
      partnerRotationMs: 3300,
      videoSequenceIndex: {},
      processMeshBlobs: [],
      signatureBands: [
        {
          id: 'signature-band-1',
          index: '01',
          title: 'Elegance',
          meta: [],
          note: 'Refined through constraint.',
          background: '#4C5EF7',
          textColor: '#F8F8F6',
        },
        {
          id: 'signature-band-2',
          index: '02',
          title: 'Systems',
          meta: [],
          note: 'Built for real operations.',
          background: '#ECE7E1',
          textColor: '#302B29',
        },
        {
          id: 'signature-band-3',
          index: '03',
          title: 'Integration',
          meta: [],
          note: 'Everything works as one.',
          background: '#F8F8F6',
          textColor: '#302B29',
        },
        {
          id: 'signature-band-4',
          index: '04',
          title: 'Motion',
          meta: [],
          note: 'Movement creates meaning.',
          background: '#605B56',
          textColor: '#F8F8F6',
        },
        {
          id: 'signature-band-5',
          index: '05',
          title: 'Presence',
          meta: [],
          note: 'Made to stay.',
          background: '#302B29',
          textColor: '#ECE7E1',
        },
      ],
    };
  },

  props: {
    isDark: { type: Boolean, default: false },
  },

  computed: {
    videoPreload() {
      return this.enableVideoPreviews ? 'metadata' : 'none';
    },

    orderedVideos() {
      const getOrder = (video) =>
        typeof video?.order === 'number' && Number.isFinite(video.order) ? video.order : video.id;

      return [...this.videos]
        .filter((video) => typeof video.projectLink === 'string' && video.projectLink.trim() !== '')
        .sort((a, b) => getOrder(b) - getOrder(a));
    },

    scatterHeight() {
      return this.scatterLayout.totalHeight;
    },

    scatterLayout() {
      return this.buildScatterLayout(this.isDesktopScatter() ? 'desktop' : 'mobile');
    },

    isTitledVideo() {
      return (video) => video.title && video.title.trim() !== '';
    },

    partnerDisplaySlots() {
      return this.partnerSlots
        .map((logoIndex, slotIndex) => {
          const logo = this.partnerLogos[logoIndex];
          if (!logo) return null;
          return {
            slotIndex,
            logo,
            renderKey: `${slotIndex}-${logo.id}-${this.partnerSlotVersions[slotIndex] || 0}`,
          };
        })
        .filter(Boolean);
    },
  },

  mounted() {
    if (typeof window !== 'undefined') {
      this.viewportWidth = window.innerWidth;
      this.randomizeProcessMesh();
      window.addEventListener('resize', this.handleViewportResize, { passive: true });
    }

    this.$nextTick(() => {
      this.applyPerformanceMode();

      if (this.enableWordAnimation) {
        this.splitLetters();
        this.wordIntervalId = window.setInterval(this.changeWord, 3000);
      }

      if (this.enableVideoPreviews) {
        this.initMediaObserver();
      }

      if (this.enableScrollEffects) {
        this.initScatterParallax();
      }
      this.initRevealAnimations();
      this.initPartnerShowcase();

      window.requestAnimationFrame(() => {
        this.scatterClientReady = true;
        this.scheduleOverlapRecompute();
      });
    });
  },

  beforeUnmount() {
    if (this.wordIntervalId) {
      clearInterval(this.wordIntervalId);
      this.wordIntervalId = null;
    }
    if (this.mediaObserver) {
      this.mediaObserver.disconnect();
    }
    if (this.revealObserver) {
      this.revealObserver.disconnect();
    }
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.handleViewportResize);
      const target = this.parallaxScrollTarget || window;
      target.removeEventListener('scroll', this.queueParallaxUpdate);
      window.removeEventListener('resize', this.queueParallaxUpdate);
    }
    if (this.parallaxRaf) {
      window.cancelAnimationFrame(this.parallaxRaf);
      this.parallaxRaf = null;
    }
    if (this.overlapRecomputeTimer) {
      clearTimeout(this.overlapRecomputeTimer);
      this.overlapRecomputeTimer = null;
    }
    Object.values(this.videoIntroTimers).forEach((timerId) => {
      clearTimeout(timerId);
    });
    this.videoIntroTimers = {};
    if (this.partnerCycleTimer) {
      clearTimeout(this.partnerCycleTimer);
      this.partnerCycleTimer = null;
    }
  },

  methods: {
    handleViewportResize() {
      if (typeof window === 'undefined') return;
      this.viewportWidth = window.innerWidth;
      this.scheduleOverlapRecompute();
    },

    randomizeProcessMesh() {
      const randomBetween = (min, max) => min + Math.random() * (max - min);
      const blobBlueprints = [
        {
          tone: 'process-blob-blue',
          top: [-10, 12],
          left: [-14, 6],
          width: [34, 46],
          height: [36, 50],
          opacity: [0.82, 0.98],
          duration: [16, 22],
          delay: [-16, -2],
        },
        {
          tone: 'process-blob-sky',
          top: [-18, 8],
          left: [8, 30],
          width: [24, 36],
          height: [22, 32],
          opacity: [0.54, 0.76],
          duration: [14, 20],
          delay: [-12, -1],
        },
        {
          tone: 'process-blob-ink',
          top: [56, 80],
          left: [-10, 14],
          width: [16, 24],
          height: [16, 24],
          opacity: [0.18, 0.3],
          duration: [16, 22],
          delay: [-18, -4],
        },
        {
          tone: 'process-blob-blue',
          top: [2, 26],
          left: [66, 90],
          width: [32, 44],
          height: [34, 50],
          opacity: [0.72, 0.9],
          duration: [16, 24],
          delay: [-14, -3],
        },
        {
          tone: 'process-blob-soft',
          top: [20, 42],
          left: [16, 36],
          width: [34, 48],
          height: [28, 40],
          opacity: [0.42, 0.62],
          duration: [18, 24],
          delay: [-16, -5],
        },
        {
          tone: 'process-blob-stone',
          top: [8, 34],
          left: [44, 72],
          width: [22, 32],
          height: [18, 26],
          opacity: [0.38, 0.58],
          duration: [16, 22],
          delay: [-14, -2],
        },
        {
          tone: 'process-blob-mist',
          top: [44, 72],
          left: [52, 84],
          width: [22, 34],
          height: [20, 30],
          opacity: [0.38, 0.6],
          duration: [18, 24],
          delay: [-20, -6],
        },
        {
          tone: 'process-blob-steel',
          top: [32, 60],
          left: [0, 22],
          width: [20, 30],
          height: [18, 26],
          opacity: [0.3, 0.5],
          duration: [14, 20],
          delay: [-16, -3],
        },
        {
          tone: 'process-blob-warm',
          top: [-12, 14],
          left: [32, 58],
          width: [24, 34],
          height: [20, 28],
          opacity: [0.34, 0.5],
          duration: [14, 20],
          delay: [-10, -2],
        },
        {
          tone: 'process-blob-sky',
          top: [56, 84],
          left: [22, 46],
          width: [18, 28],
          height: [18, 24],
          opacity: [0.34, 0.54],
          duration: [16, 22],
          delay: [-15, -4],
        },
        {
          tone: 'process-blob-blue',
          top: [28, 52],
          left: [70, 94],
          width: [22, 34],
          height: [26, 38],
          opacity: [0.42, 0.62],
          duration: [14, 20],
          delay: [-18, -5],
        },
        {
          tone: 'process-blob-soft',
          top: [60, 84],
          left: [40, 64],
          width: [26, 38],
          height: [20, 30],
          opacity: [0.28, 0.46],
          duration: [16, 22],
          delay: [-12, -3],
        },
      ];

      this.processMeshBlobs = blobBlueprints.map((blob) => ({
        tone: blob.tone,
        style: {
          top: `${randomBetween(blob.top[0], blob.top[1]).toFixed(2)}%`,
          left: `${randomBetween(blob.left[0], blob.left[1]).toFixed(2)}%`,
          width: `${randomBetween(blob.width[0], blob.width[1]).toFixed(2)}rem`,
          height: `${randomBetween(blob.height[0], blob.height[1]).toFixed(2)}rem`,
          opacity: randomBetween(blob.opacity[0], blob.opacity[1]).toFixed(2),
          animationDuration: `${randomBetween(blob.duration[0], blob.duration[1]).toFixed(2)}s`,
          animationDelay: `${randomBetween(blob.delay[0], blob.delay[1]).toFixed(2)}s`,
          '--process-shift-x': `${randomBetween(3.8, 7.2).toFixed(2)}rem`,
          '--process-shift-y': `${randomBetween(2.8, 6.4).toFixed(2)}rem`,
          '--process-shift-x-alt': `${randomBetween(-6.6, -3.2).toFixed(2)}rem`,
          '--process-shift-y-alt': `${randomBetween(2.2, 5.8).toFixed(2)}rem`,
          '--process-scale-max': randomBetween(1.08, 1.18).toFixed(3),
          '--process-scale-min': randomBetween(0.9, 0.98).toFixed(3),
        },
      }));
    },

    isLowPowerContext() {
      if (typeof window === 'undefined') return false;

      const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
      const coarsePointer =
        window.matchMedia?.('(pointer: coarse)')?.matches ||
        window.matchMedia?.('(hover: none)')?.matches;

      const connection = navigator?.connection;
      const saveData = Boolean(connection && typeof connection === 'object' && connection.saveData);

      return Boolean(prefersReducedMotion || coarsePointer || saveData);
    },

    applyPerformanceMode() {
      if (typeof window === 'undefined') return;
      const lowPower = this.isLowPowerContext();

      // Mobile / low-power: keep layout, drop heavy media + timers.
      this.enableVideoPreviews = !lowPower;
      this.enableWordAnimation = !lowPower;
      this.enableScrollEffects = !lowPower;
    },

    pickInitialPartnerSlots(slotCount) {
      const available = this.partnerLogos.map((_, index) => index);
      const picked = [];

      while (picked.length < slotCount && available.length > 0) {
        const nextIndex = Math.floor(Math.random() * available.length);
        const [pickedValue] = available.splice(nextIndex, 1);
        picked.push(pickedValue);
      }

      return picked;
    },

    rotatePartnerSlot(slotIndex) {
      if (!this.partnerSlots.length || this.partnerLogos.length <= 4) return;
      const currentLogoIndex = this.partnerSlots[slotIndex];
      const usedByOtherSlots = new Set(this.partnerSlots.filter((_, index) => index !== slotIndex));
      const candidates = this.partnerLogos
        .map((_, index) => index)
        .filter((index) => !usedByOtherSlots.has(index) && index !== currentLogoIndex);

      if (!candidates.length) return;

      const nextLogoIndex = candidates[Math.floor(Math.random() * candidates.length)];
      this.partnerSlots.splice(slotIndex, 1, nextLogoIndex);
      this.partnerSlotVersions.splice(slotIndex, 1, (this.partnerSlotVersions[slotIndex] || 0) + 1);
    },

    initPartnerShowcase() {
      const slotCount = Math.min(4, this.partnerLogos.length);
      if (!slotCount) return;

      this.partnerSlots = this.pickInitialPartnerSlots(slotCount);
      this.partnerSlotVersions = Array(slotCount).fill(0);

      if (typeof window === 'undefined') return;

      const rotateRandomSlot = () => {
        if (!this.partnerSlots.length) return;
        const slotIndex = Math.floor(Math.random() * this.partnerSlots.length);
        this.rotatePartnerSlot(slotIndex);
        const jitter = Math.floor(Math.random() * 700);
        this.partnerCycleTimer = window.setTimeout(
          rotateRandomSlot,
          this.partnerRotationMs + jitter,
        );
      };

      const initialDelay = 1600 + Math.floor(Math.random() * 900);
      this.partnerCycleTimer = window.setTimeout(rotateRandomSlot, initialDelay);
    },

    getVideoSrc(video) {
      if (!this.enableVideoPreviews) return undefined;
      if (!video?.src) return undefined;
      if (!this.deferredVideoLoaded[video.id]) return undefined;
      if (video.srcAlt) {
        const idx = this.videoSequenceIndex[video.id] ?? 0;
        return idx % 2 === 0 ? video.src : video.srcAlt;
      }
      return video.src;
    },

    getPlaceholderSrc(video) {
      if (video?.introPlaceholder && !this.videoIntroReady[video.id]) {
        return video.introPlaceholder;
      }
      return video?.placeholder;
    },

    isVideoVisible(video) {
      if (!video?.src) return false;
      const introReady = video?.introPlaceholder ? this.videoIntroReady[video.id] : true;
      return Boolean(this.videoLoaded[video.id] && introReady);
    },

    hasVideoSequence(video) {
      return Boolean(video?.src && video?.srcAlt);
    },

    onVideoEnded(videoId) {
      const video = this.videos.find((v) => v.id === videoId);
      if (video?.introPlaceholder && !video?.srcAlt) {
        this.videoIntroReady[videoId] = false;

        this.$nextTick(() => {
          const videos = this.$refs[`video_${videoId}`];
          const videoElement = Array.isArray(videos) ? videos[0] : videos;
          if (videoElement) {
            videoElement.pause();
            videoElement.currentTime = 0;
          }
        });

        this.loadVideo(videoId);
        return;
      }

      if (!video?.srcAlt) return;

      this.videoSequenceIndex[videoId] = (this.videoSequenceIndex[videoId] ?? 0) === 0 ? 1 : 0;

      this.$nextTick(() => {
        const videos = this.$refs[`video_${videoId}`];
        const videoElement = Array.isArray(videos) ? videos[0] : videos;
        if (!videoElement) return;
        videoElement.load();
        void videoElement.play();
      });
    },

    loadVideo(videoId) {
      this.deferredVideoLoaded[videoId] = true;
      const video = this.videos.find((entry) => entry.id === videoId);
      if (!video) return;
      if (!video.introPlaceholder) {
        this.videoIntroReady[videoId] = true;
        return;
      }
      if (this.videoIntroTimers[videoId]) {
        clearTimeout(this.videoIntroTimers[videoId]);
        delete this.videoIntroTimers[videoId];
      }
      if (this.videoIntroReady[videoId]) return;

      const delay = video.introDurationMs ?? 3000;
      this.videoIntroTimers[videoId] = window.setTimeout(() => {
        this.videoIntroReady[videoId] = true;
        delete this.videoIntroTimers[videoId];

        this.$nextTick(() => {
          const videos = this.$refs[`video_${videoId}`];
          const videoElement = Array.isArray(videos) ? videos[0] : videos;
          if (videoElement && this.videoLoaded[videoId]) {
            videoElement.currentTime = 0;
            void videoElement.play();
          }
        });
      }, delay);
    },

    getMediaCardElement(videoId) {
      const card = this.$refs[`mediaCard_${videoId}`];
      return Array.isArray(card) ? card[0] : card;
    },

    initMediaObserver() {
      if (!this.enableVideoPreviews) return;
      const hasObserverSupport =
        typeof window !== 'undefined' && typeof window.IntersectionObserver === 'function';

      this.orderedVideos.forEach((video) => {
        this.videoIntroReady[video.id] = !video.introPlaceholder;
        if (!video.src) {
          this.deferredVideoLoaded[video.id] = true;
        } else {
          this.deferredVideoLoaded[video.id] = false;
        }
        if (video.srcAlt && this.videoSequenceIndex[video.id] == null) {
          this.videoSequenceIndex[video.id] = 0;
        }
      });

      if (!hasObserverSupport) {
        this.orderedVideos.forEach((video) => this.loadVideo(video.id));
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const videoId = Number(entry.target.getAttribute('data-video-id'));
            if (!Number.isNaN(videoId)) {
              this.loadVideo(videoId);
              observer.unobserve(entry.target);
            }
          });
        },
        {
          rootMargin: '300px 0px',
          threshold: 0.01,
        },
      );

      this.orderedVideos.forEach((video) => {
        if (!video.src) return;
        const card = this.getMediaCardElement(video.id);
        if (card) observer.observe(card);
      });

      this.mediaObserver = observer;
    },

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
      this.scheduleOverlapRecompute();
    },

    setMediaShape(videoId, width, height) {
      if (!width || !height) return;
      const ratio = width / height;
      this.mediaShape = {
        ...this.mediaShape,
        [videoId]: {
          orientation: ratio >= 1 ? 'landscape' : 'portrait',
          ratio,
        },
      };
    },

    registerImageShape(videoId, event) {
      const image = event?.target;
      if (!(image instanceof HTMLImageElement)) return;
      this.setMediaShape(videoId, image.naturalWidth, image.naturalHeight);
    },

    registerVideoShape(videoId, event) {
      const video = event?.target;
      if (!(video instanceof HTMLVideoElement)) return;
      this.setMediaShape(videoId, video.videoWidth, video.videoHeight);
    },

    getMediaShapeClass(videoId) {
      const orientation = this.mediaShape?.[videoId]?.orientation ?? 'landscape';
      return `is-${orientation}`;
    },

    seededRandom(seed) {
      return seededRandomUtil(seed);
    },

    getScatterSeededConfig(index) {
      const idSeed =
        this.hashString(String(this.orderedVideos[index]?.id || index)) + this.scatterLoadSeed;
      const baseWidth = 225 + this.seededRandom((index + 1) * 17 + idSeed) * 90;
      const width = index === 0 ? baseWidth + 28 : baseWidth;
      const ratioOptions = ['4 / 5', '3 / 4', '5 / 4', '1 / 1', '4 / 3', '16 / 10'];
      const ratioIndex = Math.floor(
        this.seededRandom((index + 1) * 13 + idSeed) * ratioOptions.length,
      );
      const ratio = ratioOptions[ratioIndex];
      const [ratioW, ratioH] = ratio.split('/').map((part) => Number(part.trim()) || 1);
      const height = width * (ratioH / ratioW);
      const left = 12 + this.seededRandom((index + 1) * 41 + idSeed) * 76;
      const layerZIndex = this.seededRandom((index + 1) * 53 + idSeed) > 0.45 ? 145 : 70;
      const gap = 8 + this.seededRandom((index + 1) * 61 + idSeed) * 28;
      const overlapAllowance = this.seededRandom((index + 1) * 73 + idSeed) * 24;

      return { left, width, ratio, height, layerZIndex, gap, overlapAllowance };
    },

    hashString(value) {
      return hashStringUtil(String(value));
    },

    buildScatterLayout(mode = 'desktop') {
      const isDesktop = mode === 'desktop';
      const viewportWidth = this.viewportWidth || 1280;
      const containerWidth = Math.max(
        280,
        Math.min(isDesktop ? 1080 : viewportWidth - 20, viewportWidth - 20),
      );
      const minWidth = isDesktop ? 225 : Math.max(150, containerWidth * 0.42);
      const maxWidth = isDesktop
        ? 325
        : Math.max(minWidth + 42, Math.min(containerWidth * 0.68, containerWidth - 52));
      const topPadding = isDesktop ? 90 : 84;
      const bottomPadding = isDesktop ? 130 : 168;
      let yCursor = topPadding;
      let previousLeft = 50;
      const positions = {};

      this.orderedVideos.forEach((video, index) => {
        const { ratio, layerZIndex } = this.getScatterSeededConfig(index);
        const idSeed =
          this.hashString(String(this.orderedVideos[index]?.id || index)) + this.scatterLoadSeed;
        const baseWidth =
          minWidth + this.seededRandom((index + 1) * 17 + idSeed) * (maxWidth - minWidth);
        const sizedWidth = index === 0 ? baseWidth + (isDesktop ? 28 : 12) : baseWidth;
        const [ratioW, ratioH] = ratio.split('/').map((part) => Number(part.trim()) || 1);
        const fallbackRatio = ratioW / ratioH;
        const shape = this.mediaShape?.[video.id];
        const actualRatio = shape?.ratio ?? fallbackRatio;
        const isPortrait = (shape?.orientation ?? 'landscape') === 'portrait';
        const width = isPortrait ? sizedWidth * actualRatio : sizedWidth;
        const height = isPortrait ? sizedWidth : sizedWidth / actualRatio;
        const leftMin = isDesktop ? 10 : 18;
        const leftMax = isDesktop ? 90 : 82;
        const left = leftMin + this.seededRandom((index + 1) * 41 + idSeed) * (leftMax - leftMin);
        const safeLeft = Math.abs(left - previousLeft) < (isDesktop ? 11 : 9) ? left + 12 : left;
        const clampedLeft = Math.max(leftMin, Math.min(leftMax, safeLeft));
        const baseGap = isDesktop ? 8 : 28;
        const gapSpread = isDesktop ? 28 : 34;
        const overlapSpread = isDesktop ? 24 : 8;
        const gap = baseGap + this.seededRandom((index + 1) * 61 + idSeed) * gapSpread;
        const overlapAllowance = this.seededRandom((index + 1) * 73 + idSeed) * overlapSpread;

        positions[video.id] = {
          top: yCursor + height / 2,
          left: clampedLeft,
          width,
          height,
          ratio: `${width} / ${height}`,
          z: layerZIndex,
        };

        previousLeft = clampedLeft;
        yCursor +=
          height +
          Math.max(isDesktop ? -14 : 28, Math.min(isDesktop ? 28 : 58, gap - overlapAllowance));
      });

      const totalHeight = roundCssPx(Math.max(isDesktop ? 760 : 1680, yCursor + bottomPadding));
      return { positions, totalHeight };
    },

    getCardOpacityStyle(videoId) {
      if (!this.scatterClientReady) {
        return { '--overlap-opacity': '1' };
      }
      return { '--overlap-opacity': `${this.overlappingCardOpacity[videoId] ?? 1}` };
    },

    getScatterStyle(_index, videoId) {
      const pos = this.scatterLayout.positions[videoId];
      if (!pos) {
        return {};
      }

      return {
        '--scatter-left': `${pos.left.toFixed(3)}%`,
        '--scatter-top': `${pos.top.toFixed(0)}px`,
        '--scatter-width': `${pos.width.toFixed(0)}px`,
        '--scatter-height': `${pos.height.toFixed(0)}px`,
        '--scatter-ratio': `${pos.width.toFixed(3)} / ${pos.height.toFixed(3)}`,
        '--scatter-z': `${pos.z}`,
      };
    },

    boxesOverlap(a, b) {
      return boxesOverlapUtil(a, b);
    },

    recomputeOverlapOpacity() {
      const cardEntries = this.orderedVideos
        .map((video, index) => {
          const el = this.getMediaCardElement(video.id);
          if (!el) return null;
          const rect = el.getBoundingClientRect();
          const z = Number(window.getComputedStyle(el).zIndex) || 0;
          return {
            id: video.id,
            index,
            z,
            rect: { left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom },
          };
        })
        .filter(Boolean);

      const scatter = this.$refs.workScatter;
      const root = Array.isArray(scatter) ? scatter[0] : scatter;
      const quoteRects = root
        ? Array.from(root.querySelectorAll('.work-copy')).map((el) => {
            const rect = el.getBoundingClientRect();
            return getCenterProtectedRect(
              { left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom },
              this.isDesktopScatter()
                ? {
                    horizontalInsetRatio: 0.24,
                    minHorizontalInset: 28,
                    maxHorizontalInset: 132,
                    verticalInsetRatio: 0.04,
                    maxVerticalInset: 10,
                  }
                : {
                    horizontalInsetRatio: 0.18,
                    minHorizontalInset: 18,
                    maxHorizontalInset: 72,
                    verticalInsetRatio: 0.03,
                    maxVerticalInset: 8,
                  },
            );
          })
        : [];

      const nextOpacity = {};

      cardEntries.forEach((cardA) => {
        let overlapsAsTop = false;

        for (let i = 0; i < cardEntries.length; i += 1) {
          const cardB = cardEntries[i];
          if (cardA.id === cardB.id) continue;
          if (!this.boxesOverlap(cardA.rect, cardB.rect)) continue;

          const isOnTop = cardA.z > cardB.z || (cardA.z === cardB.z && cardA.index > cardB.index);
          if (isOnTop) {
            overlapsAsTop = true;
            break;
          }
        }

        if (!overlapsAsTop) {
          for (let i = 0; i < quoteRects.length; i += 1) {
            if (this.boxesOverlap(cardA.rect, quoteRects[i])) {
              overlapsAsTop = true;
              break;
            }
          }
        }

        nextOpacity[cardA.id] = overlapsAsTop ? 0.72 : 1;
      });

      this.overlappingCardOpacity = nextOpacity;
    },

    getParallaxScrollTop() {
      return getParallaxScrollTopUtil(this.parallaxScrollTarget);
    },

    isDesktopScatter() {
      return this.viewportWidth >= 971;
    },

    initScatterParallax() {
      if (typeof window === 'undefined') return;
      if (!this.isDesktopScatter()) return;
      const scroller = document.querySelector('main[data-scroll-container]');
      this.parallaxScrollTarget = scroller || window;
      this.lastParallaxScrollTop = this.getParallaxScrollTop();
      this.parallaxScrollTarget.addEventListener('scroll', this.queueParallaxUpdate, {
        passive: true,
      });
      window.addEventListener('resize', this.queueParallaxUpdate);
      this.queueParallaxUpdate();
    },

    queueParallaxUpdate() {
      if (typeof window === 'undefined') return;
      if (!this.isDesktopScatter()) return;
      if (this.parallaxRaf) return;
      this.parallaxRaf = window.requestAnimationFrame(() => {
        this.parallaxRaf = null;
        this.updateScatterParallax();
      });
    },

    scheduleOverlapRecompute() {
      if (this.overlapRecomputeTimer) {
        clearTimeout(this.overlapRecomputeTimer);
      }
      this.overlapRecomputeTimer = setTimeout(() => {
        this.overlapRecomputeTimer = null;
        this.recomputeOverlapOpacity();
      }, 120);
    },

    updateScatterParallax() {
      if (!this.isDesktopScatter()) {
        this.lastParallaxScrollTop = this.getParallaxScrollTop();
        this.orderedVideos.forEach((video) => {
          const card = this.getMediaCardElement(video.id);
          if (card) {
            this.parallaxOffsetsById[video.id] = 0;
            card.style.setProperty('--scatter-parallax', '0px');
          }
        });
        return;
      }

      const scatter = this.$refs.workScatter;
      const scatterElement = Array.isArray(scatter) ? scatter[0] : scatter;
      if (!scatterElement) return;

      const currentScrollTop = this.getParallaxScrollTop();
      const previousScrollTop =
        typeof this.lastParallaxScrollTop === 'number'
          ? this.lastParallaxScrollTop
          : currentScrollTop;
      const delta = currentScrollTop - previousScrollTop;
      this.lastParallaxScrollTop = currentScrollTop;

      this.orderedVideos.forEach((video, index) => {
        const card = this.getMediaCardElement(video.id);
        if (!card) return;
        const layerSpeed =
          0.08 + this.seededRandom((index + 1) * 23 + this.hashString(String(video.id))) * 0.2;
        const previousOffset = this.parallaxOffsetsById[video.id] || 0;
        const nextOffset = Math.max(-180, Math.min(180, previousOffset + delta * layerSpeed));
        this.parallaxOffsetsById[video.id] = nextOffset;
        card.style.setProperty('--scatter-parallax', `${nextOffset.toFixed(2)}px`);
      });
    },

    initRevealAnimations() {
      if (typeof window === 'undefined') return;
      const scatter = this.$refs.workScatter;
      const root = Array.isArray(scatter) ? scatter[0] : scatter;
      if (!root || typeof root.querySelectorAll !== 'function') return;
      const revealTargets = root.querySelectorAll('.reveal-on-scroll');
      if (!revealTargets.length) return;

      const hasObserverSupport = typeof window.IntersectionObserver === 'function';
      if (!hasObserverSupport) {
        revealTargets.forEach((el) => el.classList.add('is-visible'));
        return;
      }

      this.revealObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          });
        },
        {
          threshold: 0.12,
          rootMargin: '0px 0px -8% 0px',
        },
      );

      revealTargets.forEach((el) => {
        this.revealObserver.observe(el);
      });
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

  watch: {
    orderedVideos: {
      handler(videos) {
        const visibleIds = new Set(videos.map((video) => String(video.id)));
        Object.keys(this.parallaxOffsetsById).forEach((id) => {
          if (!visibleIds.has(id)) {
            delete this.parallaxOffsetsById[id];
          }
        });
        this.$nextTick(() => {
          this.queueParallaxUpdate();
          this.recomputeOverlapOpacity();
        });
      },
      immediate: true,
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
  display: none;
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
  color: var(--surface-accent);
  text-transform: uppercase;
  text-align: center;
}

/* IMPORTANT: la carte porte le ::before, donc elle doit être positionnée */
.project-card {
  position: relative; /* <-- ajout */
  cursor: pointer;
  transition: background-color 0.5s ease;
}

.project-card::before,
.project-card:hover::before {
  content: none !important;
}

/* Mobile: même logique que Achievements.vue */
@media screen and (max-width: 970px) {
  .project-info {
    display: none;
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

.project-card .work-card {
  border: 1px solid var(--text-primary);
}
.animation-card {
  pointer-events: none;
}
.animation-card::before {
  content: none;
}

.anton-regular {
  font-family: var(--font-family-display);
  line-height: 1.9167rem;
  font-weight: 400;
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
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.achievements-section {
  margin-top: 0 !important;
}

.partners-section {
  margin-top: 0.35rem;
}

.partners-intro {
  margin: 0 0 3rem;
  font-size: clamp(1.05rem, 1.8vw, 1.35rem);
  line-height: 1.2;
  letter-spacing: 0.015em;
  color: var(--text-primary);
  text-align: center;
}

.partners-rail {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.6rem;
  align-items: stretch;
}

.partner-slot {
  min-height: 86px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 0.35rem;
}

.partner-logo {
  display: block;
  max-width: 100%;
  max-height: 52px;
  width: auto;
  height: auto;
  object-fit: contain;
}

.partner-fade-enter-active,
.partner-fade-leave-active {
  transition:
    opacity 0.55s ease,
    transform 0.55s cubic-bezier(0.22, 0.61, 0.36, 1);
}

.partner-fade-enter-from,
.partner-fade-leave-to {
  opacity: 0;
  transform: translateY(8px) scale(0.98);
}

.work-scatter {
  position: relative;
  min-height: var(--scatter-height);
  width: 100%;
  margin-top: 0.5rem;
}

.work-copy {
  position: absolute;
  z-index: 120;
  /* Let clicks pass through to project cards underneath. */
  pointer-events: none;
  will-change: transform, opacity, filter;
}

.work-copy.reveal-on-scroll.is-visible {
  opacity: 0.97;
  transition:
    opacity 0.36s ease,
    filter 0.36s ease;
}

@media (hover: hover) and (pointer: fine) {
  .work-copy:hover {
    z-index: 300 !important;
    opacity: 1;
    filter: drop-shadow(0 2px 8px rgba(48, 43, 41, 0.08));
  }
}

.work-copy-achievements {
  top: 14%;
  left: 2%;
  max-width: 42ch;
}

.work-copy-achievements p {
  line-height: 1.2;
}

.work-copy-creating {
  top: 2%;
  left: 2%;
  max-width: 44ch;
}

.work-copy-idea {
  top: 29%;
  left: 50%;
  max-width: 36ch;
  transform: translateX(-50%);
  text-align: left;
}

.work-copy-story {
  top: 47%;
  left: 50%;
  max-width: 60ch;
  transform: translateX(-50%);
  text-align: left;
}

.work-copy-conviction {
  top: 67%;
  left: 8%;
  max-width: 46ch;
  text-align: left;
}

.work-copy-creating,
.work-copy-achievements,
.work-copy-story,
.work-copy-conviction {
  font-size: clamp(1.25rem, 1.9vw, 1.6rem);
  line-height: 1.15;
}

.reveal-on-scroll {
  opacity: 0;
  transform: translate3d(0, 24px, 0);
  transition:
    opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94),
    transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transition-delay: var(--reveal-delay, 0ms);
}

.reveal-on-scroll.is-visible {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}

.work-scatter-item {
  position: absolute;
  top: var(--scatter-top);
  left: var(--scatter-left);
  width: var(--scatter-width);
  z-index: var(--scatter-z, 70);
  opacity: var(--overlap-opacity, 1);
  transform: translate(-50%, calc(-50% + var(--scatter-parallax, 0px)));
  transition:
    transform 0.08s linear,
    opacity 0.36s ease,
    z-index 0.28s ease;
  will-change: transform;
}

.work-scatter-item:hover {
  opacity: 1;
  transform: translate(-50%, calc(-50% + var(--scatter-parallax, 0px))) scale(1.04);
  z-index: var(--scatter-z, 70) !important;
}

.work-item {
  position: relative;
}

.work-card {
  height: auto;
  aspect-ratio: auto;
}

.item-link {
  text-decoration: none;
  color: inherit;
  display: block;
  position: relative;
  height: auto;
}

.work-scatter-item.is-portrait .work-card {
  height: var(--scatter-height);
  width: var(--scatter-width);
}

@media (min-width: 768px) {
  .work-grid {
    gap: 0.5rem;
  }
}

@media (max-width: 970px) {
  .partners-section {
    margin-top: 0.2rem;
  }

  .partners-intro {
    margin-bottom: 0.75rem;
    font-size: clamp(0.92rem, 3.6vw, 1.05rem);
  }

  .partners-rail {
    gap: 0.45rem;
  }

  .partner-slot {
    min-height: 64px;
    padding: 0.35rem;
  }

  .partner-logo {
    max-height: 34px;
  }

  .work-scatter {
    position: relative;
    min-height: var(--scatter-height);
    margin-top: 0.75rem;
  }

  .work-copy {
    position: absolute;
    margin: 0;
    max-width: min(82vw, 28ch);
    /* Let taps pass through to project cards underneath. */
    pointer-events: none;
    z-index: 140;
  }

  .work-copy-creating {
    top: 2%;
    left: 4%;
    max-width: min(82vw, 24ch);
  }

  .work-copy-achievements {
    top: 14%;
    left: 4%;
    max-width: min(82vw, 24ch);
  }

  .work-copy-idea {
    top: 33%;
    left: 52%;
    max-width: min(72vw, 20ch);
    transform: none;
    text-align: left;
  }

  .work-copy-story {
    top: 52%;
    left: 6%;
    max-width: min(90vw, 34ch);
    text-align: left;
    transform: none;
  }

  .work-copy-conviction {
    top: 74%;
    left: 6%;
    max-width: min(84vw, 26ch);
    text-align: left;
  }

  .work-scatter-item {
    position: absolute;
    top: var(--scatter-top);
    left: var(--scatter-left);
    width: var(--scatter-width);
    transform: translate(-50%, calc(-50% + var(--scatter-parallax, 0px)));
    z-index: var(--scatter-z, 70);
  }

  .work-card {
    aspect-ratio: auto;
    height: auto;
  }

  .work-scatter-item.is-portrait .work-card {
    height: var(--scatter-height);
    width: var(--scatter-width);
  }
}

@media (prefers-reduced-motion: reduce) {
  .reveal-on-scroll {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
}

.media {
  display: block;
  width: 100%;
  height: auto;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.work-scatter-item.is-portrait .media {
  width: 100%;
  height: 100%;
}
.group:hover .media {
  transform: scale(1.05);
}

.about-stage {
  position: relative;
  display: grid;
  gap: 1.25rem;
}

.about-visual-wrap {
  position: relative;
  display: block;
  min-height: 24rem;
  padding: 2rem 0;
}

.about-title {
  position: absolute;
  z-index: 3;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: clamp(3.4rem, 16vw, 8.5rem);
  line-height: 0.9;
  letter-spacing: -0.03em;
  color: #fff;
  margin: 0;
  white-space: nowrap;
  text-shadow:
    0 1px 0 rgba(0, 0, 0, 0.18),
    0 10px 30px rgba(0, 0, 0, 0.18);
}

.about-img-wrapper {
  border-radius: 2px !important;
  width: min(82vw, 28rem);
  margin: 0 0 0 auto;
}

.about-image {
  border-radius: 2px;
  width: 100%;
  max-height: none;
}

.about-section-frame > .container {
  margin-top: 0 !important;
}

.about-copy-card {
  position: relative;
  z-index: 2;
  max-width: 34rem;
  padding: 1.25rem;
  font-size: 0.96rem;
  line-height: 1.6;
  will-change: transform;
  animation-duration: 7.2s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
}

.about-copy-card-top {
  animation-name: aboutCardFloatTop;
}

.about-copy-card-bottom {
  animation-name: aboutCardFloatBottom;
  animation-duration: 8.4s;
  animation-delay: -2.1s;
}

@keyframes aboutCardFloatTop {
  0%,
  100% {
    transform: translate3d(0, 0, 0) rotate(-0.35deg);
  }

  50% {
    transform: translate3d(0, -10px, 0) rotate(0.35deg);
  }
}

@keyframes aboutCardFloatBottom {
  0%,
  100% {
    transform: translate3d(0, 0, 0) rotate(0.3deg);
  }

  50% {
    transform: translate3d(0, 12px, 0) rotate(-0.3deg);
  }
}

@media (min-width: 900px) {
  .about-stage {
    min-height: 52rem;
    padding: 1.5rem 0 1rem;
  }

  .about-visual-wrap {
    display: flex;
    min-height: 52rem;
    padding: 0 6rem;
    justify-content: center;
    align-items: center;
  }

  .about-title {
    top: 50%;
    left: max(3rem, 9%);
    transform: translateY(-50%);
    font-size: clamp(3.2rem, 12vw, 8.5rem);
  }

  .about-img-wrapper {
    width: min(52vw, 44rem);
    margin: 0 auto;
  }

  .about-image {
    max-height: 40rem;
  }

  .about-copy-card {
    position: absolute;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.22);
    box-shadow:
      0 18px 45px rgba(0, 0, 0, 0.12),
      inset 0 1px 0 rgba(255, 255, 255, 0.16);
    backdrop-filter: blur(16px) saturate(145%);
    -webkit-backdrop-filter: blur(16px) saturate(145%);
  }

  .about-copy-card-top {
    top: -4rem;
    right: 11px;
    max-width: min(26rem, 38vw);
  }

  .about-copy-card-bottom {
    left: -7px;
    bottom: -2rem;
    max-width: min(24rem, 34vw);
  }
}

@supports not (background: color-mix(in srgb, white 50%, black 50%)) {
  .about-copy-card {
    background: rgba(255, 255, 255, 0.16);
  }
}

@media (prefers-reduced-motion: reduce) {
  .about-copy-card {
    animation: none;
  }

  .process-blob {
    animation: none;
  }
}

.hero-logo-main {
  font-family: var(--font-family-display);
  line-height: 1.9167rem;
  font-weight: 400;
  font-size: clamp(25px, 9vw, 60px);
  line-height: 0.9;
}

.hero-logo-alt {
  font-family: var(--font-family-script);
  font-size: clamp(50px, 11vw, 80px);
  line-height: 0.8;
  margin: 0 0.02em;
}

.process-title-section {
  position: relative;
  height: 100vh;
  overflow: hidden;
  isolation: isolate;
  background: linear-gradient(
    180deg,
    color-mix(in srgb, var(--surface-accent) 96%, white 4%) 0%,
    color-mix(in srgb, var(--surface-accent) 88%, white 12%) 52%,
    color-mix(in srgb, var(--surface-accent) 78%, white 22%) 100%
  );
}

.process-mesh {
  position: absolute;
  inset: -22%;
  z-index: 0;
  pointer-events: none;
  filter: blur(42px) saturate(168%) contrast(112%);
  transform: translateZ(0);
}

.process-blob {
  position: absolute;
  border-radius: 999px;
  opacity: 0.96;
  mix-blend-mode: multiply;
  filter: saturate(118%);
  box-shadow: 0 0 120px rgba(76, 94, 247, 0.14);
  will-change: transform;
  animation: processBlobFloat 18s ease-in-out infinite;
}

.process-blob-blue {
  background: rgba(76, 94, 247, 0.88);
}

.process-blob-warm {
  background: rgba(236, 231, 225, 0.54);
}

.process-blob-ink {
  background: rgba(48, 43, 41, 0.22);
}

.process-blob-soft {
  background: rgba(255, 252, 252, 0.44);
}

.process-blob-sky {
  background: rgba(153, 206, 255, 0.72);
}

.process-blob-stone {
  background: rgba(164, 151, 134, 0.54);
}

.process-blob-mist {
  background: rgba(147, 167, 181, 0.58);
}

.process-blob-steel {
  background: rgba(125, 125, 143, 0.46);
}

.process-title-section::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background: radial-gradient(circle at 22% 20%, rgba(255, 252, 252, 0.14), transparent 18%);
  opacity: 0.42;
  mix-blend-mode: screen;
}

.process-title-section::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background: linear-gradient(180deg, rgba(255, 252, 252, 0.06), rgba(76, 94, 247, 0.08));
  opacity: 0.18;
  mix-blend-mode: soft-light;
}

@keyframes processBlobFloat {
  0%,
  100% {
    transform: translate3d(0, 0, 0) scale(1);
  }

  33% {
    transform: translate3d(var(--process-shift-x, 5rem), calc(var(--process-shift-y, 4rem) * -1), 0)
      scale(var(--process-scale-max, 1.12));
  }

  66% {
    transform: translate3d(
        var(--process-shift-x-alt, -4.8rem),
        var(--process-shift-y-alt, 3.4rem),
        0
      )
      scale(var(--process-scale-min, 0.94));
  }
}

.slides-overlay {
  z-index: 10;
}

.process-title {
  position: relative;
  z-index: 1;
  text-align: center;
  line-height: 1;
}

.process-title .hero-logo-main {
  font-size: clamp(48px, 12vw, 133px);
  line-height: 0.9;
}

.process-title .hero-logo-alt {
  font-size: clamp(72px, 14vw, 168px);
  line-height: 0.85;
}

#slides .border-round-xl {
  border-radius: 0 !important;
  border-top-left-radius: 1.5rem !important;
  border-top-right-radius: 1.5rem !important;
}

/* #build */
#engrenage_1,
#engrenage_2,
#engrenage_3 {
  transform-box: fill-box;
  transform-origin: center;
}

#engrenage_1 {
  animation: spin-gear 8s linear infinite;
}

#engrenage_2 {
  animation: spin-gear 5s linear infinite reverse;
}

#engrenage_3 {
  animation: spin-gear 10s linear infinite;
}

#ampoule_1,
#ampoule_2 {
  animation: bulb-glow 2s ease-in-out infinite alternate;
}

#abeille {
  transform-box: fill-box;
  transform-origin: center;
  will-change: transform;
  animation: bee-wiggle 2.6s cubic-bezier(0.42, 0, 0.2, 1) infinite;
}

@keyframes spin-gear {
  to {
    transform: rotate(360deg);
  }
}

@keyframes bulb-glow {
  0% {
    filter: brightness(1) saturate(1) hue-rotate(0deg);
  }
  50% {
    filter: brightness(1.25) saturate(1.3) hue-rotate(10deg);
  }
  100% {
    filter: brightness(0.9) saturate(1) hue-rotate(-5deg);
  }
}

@keyframes bee-wiggle {
  0%,
  100% {
    transform: translate3d(0, 0, 0) rotate(0deg);
  }
  18% {
    transform: translate3d(2px, -4px, 0) rotate(-2.2deg);
  }
  38% {
    transform: translate3d(5px, -7px, 0) rotate(-4deg);
  }
  58% {
    transform: translate3d(1px, -3px, 0) rotate(1deg);
  }
  78% {
    transform: translate3d(-4px, 2px, 0) rotate(3.2deg);
  }
  90% {
    transform: translate3d(-1px, 1px, 0) rotate(0.8deg);
  }
}

/* #think */
.think-container,
.think-image-shell,
.build-container,
.build-image-shell,
.deploy-container,
.deploy-image-shell,
.celebrate-container,
.celebrate-image-shell {
  background: transparent;
}

.think-lead {
  font-family: var(--font-family-display);
  font-size: var(--fs-18);
  font-weight: 400;
  line-height: 1.4;
  text-transform: uppercase;
}

.think-body {
  font-size: var(--fs-18);
  line-height: 1.5;
}

.build-lead,
.deploy-lead,
.celebrate-lead {
  font-family: var(--font-family-display);
  font-size: var(--fs-18);
  font-weight: 400;
  line-height: 1.4;
  text-transform: uppercase;
}

.build-body,
.deploy-body,
.celebrate-body {
  font-size: var(--fs-18);
  line-height: 1.5;
}

.custom-align-items {
  align-items: center;
}

/* Slide layering + alternating layout */
.think-container,
.build-container,
.custom-platforms-container,
.deploy-container,
.celebrate-container {
  position: relative;
  z-index: 20;
  width: 100%;
  max-width: none;
  padding-inline: clamp(0.75rem, 3vw, 2.5rem);
  margin-block: clamp(1.5rem, 7vh, 6rem);
}

.think-container,
.custom-platforms-container,
.celebrate-container {
  justify-content: flex-start;
}

.build-container,
.deploy-container {
  justify-content: flex-end;
}

.think-container > .slide-content,
.custom-platforms-container > .custom-platforms-block,
.celebrate-container > .slide-content {
  margin-left: clamp(0.5rem, 4vw, 4.5rem);
  margin-right: auto;
  width: min(100%, 760px);
  max-width: 760px;
  transform: translateX(clamp(-1.5rem, -4.8vw, -5.5rem));
}

.build-container > .slide-content,
.deploy-container > .slide-content {
  margin-left: auto;
  margin-right: clamp(0.5rem, 4vw, 4.5rem);
  width: min(100%, 760px);
  max-width: 760px;
  transform: translateX(clamp(1.5rem, 4.8vw, 5.5rem));
}

.celebrate-container {
  margin-bottom: clamp(1.5rem, 4vh, 3rem);
}

/* Keep each image centered relative to its text block */
.think-container .slide-content,
.build-container .slide-content,
.deploy-container .slide-content,
.celebrate-container .slide-content {
  align-items: center;
}

.think-image-shell,
.build-image-shell,
.deploy-image-shell,
.celebrate-image-shell,
.custom-platforms-block {
  align-self: center !important;
  margin-left: auto !important;
  margin-right: auto !important;
  transform: none !important;
}

.think-copy-block,
.build-copy-block,
.deploy-copy-block,
.celebrate-copy-block,
.custom-platforms-block {
  background: var(--surface-base) !important;
}

.process-card-surface {
  position: relative;
  overflow: hidden;
  isolation: isolate;
}

.process-card-surface::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 0;
  background-image: repeating-linear-gradient(
    0deg,
    var(--text-primary) 0px,
    var(--text-primary) 1px,
    transparent 1px,
    transparent 40px
  );
  opacity: 0.04;
  pointer-events: none;
}

.process-card-surface::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  opacity: 0.06;
  pointer-events: none;
  mix-blend-mode: multiply;
}

.process-card-surface > * {
  position: relative;
  z-index: 1;
}

.custom-platforms-block {
  position: relative;
  transform: rotate(-1.4deg) !important;
  transform-origin: center top;
  overflow: visible;
}

.custom-platforms-postcard {
  display: grid;
  gap: 1.5rem;
}

.custom-platforms-postcard-copy,
.custom-platforms-postcard-list {
  position: relative;
}

.custom-platforms-kicker {
  margin-bottom: 0.75rem;
}

.custom-platforms-note {
  max-width: 18ch;
  margin-bottom: 1rem;
  font-family: var(--font-family-display);
  font-size: clamp(0.9rem, 2.2vw, 1.25rem);
  line-height: 1;
  text-transform: uppercase;
  text-wrap: balance;
}

.custom-platforms-summary,
.custom-platforms-outro,
.custom-platforms-postcard-list li {
  font-size: 0.98rem;
  line-height: 1.45;
}

.custom-platforms-stamp {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 5.5rem;
  min-width: 5.5rem;
  position: absolute;
  top: -1.6rem;
  right: -2rem;
  margin-top: 0;
  border: 1px solid color-mix(in srgb, var(--text-primary) 72%, transparent);
  border-radius: 999px;
  color: color-mix(in srgb, var(--text-primary) 84%, var(--surface-accent));
  background:
    radial-gradient(circle at 30% 30%, rgba(255, 252, 252, 0.35), transparent 55%),
    color-mix(in srgb, var(--surface-base) 82%, var(--surface-accent) 18%);
  box-shadow: inset 0 0 0 1px rgba(255, 252, 252, 0.2);
  transform: rotate(-8deg);
  z-index: 3;
  animation: customPlatformsStampSpin 18s linear infinite;
  --stamp-notch: 9px;
  -webkit-mask:
    radial-gradient(
        circle at top left,
        transparent calc(var(--stamp-notch) - 1px),
        #000 var(--stamp-notch)
      )
      top left,
    radial-gradient(
        circle at top right,
        transparent calc(var(--stamp-notch) - 1px),
        #000 var(--stamp-notch)
      )
      top right,
    radial-gradient(
        circle at bottom left,
        transparent calc(var(--stamp-notch) - 1px),
        #000 var(--stamp-notch)
      )
      bottom left,
    radial-gradient(
        circle at bottom right,
        transparent calc(var(--stamp-notch) - 1px),
        #000 var(--stamp-notch)
      )
      bottom right,
    linear-gradient(#000 0 0);
  -webkit-mask-size:
    51% 51%,
    51% 51%,
    51% 51%,
    51% 51%,
    100% 100%;
  -webkit-mask-repeat: no-repeat;
  mask:
    radial-gradient(
        circle at top left,
        transparent calc(var(--stamp-notch) - 1px),
        #000 var(--stamp-notch)
      )
      top left,
    radial-gradient(
        circle at top right,
        transparent calc(var(--stamp-notch) - 1px),
        #000 var(--stamp-notch)
      )
      top right,
    radial-gradient(
        circle at bottom left,
        transparent calc(var(--stamp-notch) - 1px),
        #000 var(--stamp-notch)
      )
      bottom left,
    radial-gradient(
        circle at bottom right,
        transparent calc(var(--stamp-notch) - 1px),
        #000 var(--stamp-notch)
      )
      bottom right,
    linear-gradient(#000 0 0);
  mask-size:
    51% 51%,
    51% 51%,
    51% 51%,
    51% 51%,
    100% 100%;
  mask-repeat: no-repeat;
}

.custom-platforms-stamp-mobile {
  display: none;
}

.custom-platforms-stamp span {
  display: inline-block;
  max-width: 4.2rem;
  font-family: var(--font-family-display);
  font-size: 0.78rem;
  line-height: 1.05;
  text-align: center;
  text-transform: uppercase;
}

.custom-platforms-list-label {
  margin-bottom: 0.9rem;
  font-size: 0.74rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  opacity: 0.7;
}

.custom-platforms-postcard-list ul {
  margin-bottom: 1rem;
}

@keyframes customPlatformsStampSpin {
  from {
    transform: rotate(-8deg);
  }

  to {
    transform: rotate(352deg);
  }
}

@media (min-width: 769px) {
  .custom-platforms-postcard {
    grid-template-columns: minmax(0, 0.82fr) minmax(0, 1.18fr);
    gap: 2rem;
    align-items: stretch;
  }

  .custom-platforms-postcard-copy {
    padding-right: 1.5rem;
  }

  .custom-platforms-postcard-list {
    padding-left: 1.5rem;
  }

  .custom-platforms-postcard-list::before {
    content: '';
    position: absolute;
    left: 0;
    top: -1.25rem;
    bottom: -1.25rem;
    width: 1px;
    background: linear-gradient(
      180deg,
      transparent 0%,
      color-mix(in srgb, var(--text-primary) 48%, transparent) 12%,
      color-mix(in srgb, var(--text-primary) 48%, transparent) 88%,
      transparent 100%
    );
    opacity: 0.8;
  }
}

@media (max-width: 768px) {
  .custom-platforms-container {
    overflow: visible;
    margin-top: 4rem;
    padding-inline: 1rem;
    position: relative;
    z-index: 16;
  }

  .custom-platforms-block {
    padding-top: 4.75rem !important;
    width: 100%;
    max-width: none;
    transform: none !important;
    position: relative;
    z-index: 2;
  }

  .custom-platforms-stamp-desktop {
    display: none;
  }

  .custom-platforms-stamp-mobile {
    display: inline-flex;
    top: -1.2rem;
    right: max(1rem, calc(env(safe-area-inset-right, 0px) + 0.4rem));
    min-width: 5rem;
    min-height: 5rem;
    transform: rotate(-8deg) translateX(-12%);
    z-index: 20;
  }

  .custom-platforms-note {
    max-width: none;
  }
}

@media (max-width: 480px) {
  .custom-platforms-container {
    margin-top: 4.35rem;
  }

  .custom-platforms-stamp-mobile {
    top: -1rem;
    right: max(0.85rem, calc(env(safe-area-inset-right, 0px) + 0.3rem));
    min-width: 4.6rem;
    min-height: 4.6rem;
    transform: rotate(-8deg) translateX(-10%);
  }

  .custom-platforms-stamp span {
    max-width: 4.2rem;
    font-size: 0.78rem;
  }
}

@media (min-width: 769px) {
  .think-container > .slide-content,
  .custom-platforms-container > .custom-platforms-block,
  .celebrate-container > .slide-content {
    transform: translateX(clamp(-3rem, -8vw, -7.5rem));
  }

  .build-container > .slide-content,
  .deploy-container > .slide-content {
    transform: translateX(clamp(3rem, 8vw, 7.5rem));
  }

  .think-copy-block,
  .custom-platforms-block,
  .deploy-copy-block {
    align-self: flex-start !important;
    margin-left: 0 !important;
    margin-right: auto !important;
  }

  .custom-platforms-block {
    transform: translateX(clamp(-0.5rem, -1.2vw, -1.2rem)) rotate(-2.4deg) !important;
  }

  .build-copy-block,
  .celebrate-copy-block {
    align-self: flex-end !important;
    margin-left: auto !important;
    margin-right: 0 !important;
  }

  .deploy-copy-block {
    transform: translateX(clamp(-2.5rem, -5vw, -4.5rem));
  }

  .celebrate-copy-block {
    transform: translateX(clamp(2.5rem, 5vw, 4.5rem));
  }
}

.deploy-image-shell {
  display: flex;
  justify-content: center;
  width: 100%;
}

.portfolio-kinetic-signature {
  width: 100%;
  border-top: 1px solid var(--main-black);
}

.portfolio-final-cta {
  padding-top: 2.5rem;
  padding-bottom: 4.5rem;
}

.portfolio-final-cta-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 3rem;
  padding: 0.8rem 1.4rem;
  border: 1px solid var(--text-primary);
  background: var(--surface-base);
  color: var(--text-primary);
  font-family: var(--font-family-display);
  font-size: 0.82rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  text-decoration: none;
  transition:
    transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
    letter-spacing 0.35s cubic-bezier(0.22, 1, 0.36, 1),
    background-color 0.35s cubic-bezier(0.22, 1, 0.36, 1),
    color 0.35s cubic-bezier(0.22, 1, 0.36, 1),
    border-color 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}

.portfolio-final-cta-link:hover,
.portfolio-final-cta-link:focus-visible {
  transform: translateY(-2px);
  border-color: #4c5ef7;
  background: #4c5ef7;
  color: #f8f8f6;
  letter-spacing: 0.16em;
}

.portfolio-kinetic-bands {
  display: flex;
  flex-direction: column;
}

.portfolio-kinetic-band {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  color: var(--band-text);
  transition:
    transform 0.5s cubic-bezier(0.22, 1, 0.36, 1),
    filter 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}

.portfolio-kinetic-band-inner {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  width: min(100%, 1440px);
  margin: 0 auto;
  padding: 2.25rem 2.5rem;
}

.portfolio-kinetic-band-main {
  display: flex;
  align-items: baseline;
  gap: 2rem;
  min-width: 0;
}

.portfolio-kinetic-band-index,
.portfolio-kinetic-band-meta {
  font-family:
    'Synt Mono Regular',
    ui-monospace,
    SFMono-Regular,
    Menlo,
    Monaco,
    Consolas,
    'Liberation Mono',
    'Courier New',
    monospace;
  text-transform: uppercase;
}

.portfolio-kinetic-band-index {
  flex: 0 0 auto;
  font-size: 0.72rem;
  letter-spacing: 0.3em;
  opacity: 0.42;
}

.portfolio-kinetic-band-title {
  min-width: 0;
  font-family:
    'Synt Mono Regular',
    ui-monospace,
    SFMono-Regular,
    Menlo,
    Monaco,
    Consolas,
    'Liberation Mono',
    'Courier New',
    monospace;
  font-size: clamp(2.9rem, 7vw, 7rem);
  line-height: 0.9;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  transition:
    letter-spacing 0.5s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}

.portfolio-kinetic-band-meta {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: clamp(1rem, 2.2vw, 3rem);
  font-size: 0.68rem;
  letter-spacing: 0.15em;
  opacity: 0.56;
  transition:
    transform 0.5s cubic-bezier(0.22, 1, 0.36, 1),
    opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}

.portfolio-kinetic-band-note {
  display: inline-block;
}

.portfolio-kinetic-band-line {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 0;
  height: 2px;
  background: var(--band-text);
  transition: width 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.08s;
}

.portfolio-kinetic-band:hover,
.portfolio-kinetic-band:focus-within {
  filter: saturate(1.03);
}

.portfolio-kinetic-band:hover .portfolio-kinetic-band-title,
.portfolio-kinetic-band:focus-within .portfolio-kinetic-band-title {
  letter-spacing: 0.05em;
  transform: translateY(-2px);
}

.portfolio-kinetic-band:hover .portfolio-kinetic-band-meta,
.portfolio-kinetic-band:focus-within .portfolio-kinetic-band-meta {
  transform: translateY(-1px);
  opacity: 0.78;
}

.portfolio-kinetic-band:hover .portfolio-kinetic-band-line,
.portfolio-kinetic-band:focus-within .portfolio-kinetic-band-line {
  width: 100%;
}

@media (max-width: 980px) {
  .portfolio-kinetic-band-inner {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.7rem;
    padding: 1.9rem 1.35rem;
  }

  .portfolio-kinetic-band-main {
    gap: 1rem;
    align-items: flex-start;
    flex-direction: column;
  }

  .portfolio-kinetic-band-meta {
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 0.45rem 1rem;
  }
}

@media (max-width: 640px) {
  .portfolio-final-cta {
    padding-top: 2rem;
    padding-bottom: 3.5rem;
  }

  .portfolio-kinetic-band-title {
    font-size: clamp(2rem, 12vw, 3.4rem);
    line-height: 1;
  }

  .portfolio-kinetic-band-meta {
    font-size: 0.62rem;
    letter-spacing: 0.11em;
  }
}

@media (prefers-reduced-motion: reduce) {
  .portfolio-kinetic-band,
  .portfolio-kinetic-band-title,
  .portfolio-kinetic-band-meta,
  .portfolio-kinetic-band-line,
  .portfolio-final-cta-link {
    transition: none;
  }

  .portfolio-kinetic-band:hover .portfolio-kinetic-band-title,
  .portfolio-kinetic-band:focus-within .portfolio-kinetic-band-title,
  .portfolio-kinetic-band:hover .portfolio-kinetic-band-meta,
  .portfolio-kinetic-band:focus-within .portfolio-kinetic-band-meta {
    transform: none;
  }
}

@media screen and (max-width: 768px) {
  .custom-align-items {
    align-items: start;
  }

  /*
    Mobile perf: the "The process" section uses multiple large inline SVGs with
    many infinite animations (some using `filter:`). On mobile this can cause
    noticeable jank when the section enters the viewport. We keep the visuals
    but pause SVG animations and let the browser skip offscreen rendering.
  */
  .slides-overlay {
    content-visibility: auto;
    contain-intrinsic-size: 900px;
  }

  .custom-platforms-container.slides-overlay {
    content-visibility: visible;
    contain-intrinsic-size: auto;
  }

  #slides svg [id] {
    animation: none !important;
  }

  .process-svg-frame {
    overflow: visible !important;
  }

  .process-svg-frame svg,
  .process-svg-frame img {
    display: block;
    width: 100% !important;
    max-width: 100%;
    height: auto !important;
    min-width: 0 !important;
  }

  .think-container,
  .build-container,
  .custom-platforms-container,
  .deploy-container,
  .celebrate-container {
    justify-content: center;
    padding-inline: 0.75rem;
  }

  .think-container > .slide-content,
  .build-container > .slide-content,
  .deploy-container > .slide-content,
  .celebrate-container > .slide-content,
  .custom-platforms-container > .custom-platforms-block {
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    max-width: 560px;
    transform: none;
  }
}
</style>
