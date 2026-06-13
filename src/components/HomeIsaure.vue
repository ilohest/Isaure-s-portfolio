<!-- src/components/HomeIsaure.vue -->
<template>
  <div class="home-page" :class="`home-page--${activePaletteVariant}`">
    <HomeHeroSection />
    <HomeIntroSection />

    <section class="work-section container mx-auto flex flex-col gap-4">
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

          <div class="work-copy work-copy-work reveal-on-scroll">
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
            more. Whatever your case, the way you tell your story online can make all the
            difference.
          </div>

          <div
            class="work-copy work-copy-conviction font-display reveal-on-scroll text-[var(--text-primary)] uppercase"
          >
            Giving form to an idea means translating intuition into substance. Making visible what,
            at first, exists only as conviction.
          </div>

          <div
            v-for="(video, index) in orderedVideos"
            class="work-scatter-item"
            :key="video.id"
            :style="[getScatterStyle(index, video.id), getCardOpacityStyle(video.id)]"
            :data-video-id="video.id"
            :ref="setMediaCardRef(video.id)"
            :class="[
              getMediaShapeClass(video.id),
              isTitledVideo(video) ? 'project-card group cursor-pointer' : 'animation-card',
            ]"
          >
            <div
              class="work-card reveal-on-scroll relative w-full overflow-hidden"
              :style="{ '--reveal-delay': `${Math.min(index * 55, 420)}ms` }"
            >
              <a :href="video.projectLink" class="item-link">
                <!-- Placeholder -->
                <img
                  v-show="!isVideoVisible(video)"
                  :src="getPlaceholderSrc(video)"
                  :alt="`Image of ${video.title}`"
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
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="projects-contact-cta" aria-label="Start a project">
      <a href="/contact" class="portfolio-pill-link projects-contact-link"> Get in touch </a>
    </section>

    <section
      class="relative h-auto border-t border-[var(--main-black)] bg-[var(--surface-base)]"
      id="slides"
      data-reveal-ignore
    >
      <div class="process-background" aria-hidden="true">
        <ProcessOrbBackground />
      </div>

      <div
        class="process-title-section sticky top-0 flex min-h-[100svh] items-center justify-center text-[var(--text-primary)]"
      >
        <div class="process-title-wrap">
          <div class="process-title font-script">
            <span class="hero-logo-main">THE</span>
            <span class="process-title-line">
              <span class="hero-logo-alt">P</span>
              <span class="hero-logo-main">ROCESS</span>
            </span>
          </div>
          <a href="/contact" class="portfolio-pill-link process-title-cta"> Start a project </a>
        </div>
      </div>

      <!-- #think -->
      <div class="think-container slides-overlay process-step">
        <article class="process-step-layout">
          <h2 class="process-step-title"><span class="hero-logo-alt">#</span>think</h2>
          <div class="process-step-rule" aria-hidden="true"></div>
          <div class="process-step-copy">
            <p>
              Before anything gets designed or built, it gets understood. I take time to learn your
              business, your users and what's not working — so the solution addresses the real
              problem, not just the visible one.
            </p>
            <p class="process-step-note">
              Every project starts with a conversation to understand what their business really
              needs.
            </p>
          </div>
        </article>
      </div>

      <!-- #build -->
      <div class="slides-overlay build-container process-step">
        <article class="process-step-layout">
          <h2 class="process-step-title"><span class="hero-logo-alt">#</span>build</h2>
          <div class="process-step-rule" aria-hidden="true"></div>
          <div class="process-step-copy">
            <p>
              Design and development in close collaboration. Custom websites, platforms, e-commerce
              or digital tools — built with precision, tested thoroughly, and shaped around how your
              business actually operates.
            </p>
            <p class="process-step-note">
              Every detail reflects your story and supports your business.
            </p>
          </div>
        </article>
      </div>

      <!-- #deploy -->
      <div class="slides-overlay deploy-container process-step">
        <article class="process-step-layout">
          <h2 class="process-step-title"><span class="hero-logo-alt">#</span>deploy</h2>
          <div class="process-step-rule" aria-hidden="true"></div>
          <div class="process-step-copy">
            <p>
              Everything is ready before it goes live. Performance, responsiveness, content, hosting
              — nothing is left to chance. A launch should feel like a release, not a risk.
            </p>
            <p class="process-step-note">
              Everything is crafted to create a smooth and solid launch.
            </p>
          </div>
        </article>
      </div>

      <!-- #celebrate -->
      <div class="slides-overlay celebrate-container process-step">
        <article class="process-step-layout">
          <h2 class="process-step-title"><span class="hero-logo-alt">#</span>celebrate</h2>
          <div class="process-step-rule" aria-hidden="true"></div>
          <div class="process-step-copy">
            <p>
              Your project is live and working. People notice. That's the point — and it's also
              where the next chapter begins.
            </p>
            <p class="process-step-note">You shine. And we celebrate it.</p>
          </div>
        </article>
      </div>

      <a href="/contact" class="portfolio-pill-link process-title-cta process-bottom-cta">
        Start a project
      </a>
    </section>

    <div class="about-section-frame bg-[var(--surface-base)]">
      <section class="about-section-shell">
        <div class="about-stage">
          <h2 class="about-title font-display">(About me.)</h2>

          <div class="about-copy about-copy-bio font-light">
            <p>
              I trained as a bioengineer, with a Master's in Phytopathology — and have been painting
              and doing photography since I was very young. The two never felt like contradictions.
              Before moving into design, I worked on the production and improvement of a malaria
              vaccine — which meant learning to isolate what actually matters before touching
              anything else. That instinct became the way I think.
            </p>
          </div>

          <figure class="about-photo about-photo-portrait">
            <picture class="block w-full">
              <source
                v-if="aboutPortraitAvifSrcset"
                type="image/avif"
                :srcset="aboutPortraitAvifSrcset"
                sizes="(min-width: 970px) 330px, 76vw"
              />
              <source
                type="image/webp"
                srcset="/assets/media/pages/home/photo_2024-03-21_10-25-00-640.webp 640w"
                sizes="(min-width: 970px) 330px, 76vw"
              />
              <img
                src="/assets/media/pages/home/photo_2024-03-21_10-25-00-960.webp"
                alt="Isaure presenting printed design work"
                loading="lazy"
                decoding="async"
              />
            </picture>
          </figure>

          <p class="about-statement font-display">
            science taught me to look for what's underneath. design gave me a way to make it
            visible.
          </p>

          <div class="about-copy about-copy-creative font-light">
            <p>
              I moved into web design and development because it sits at the exact intersection I
              was already drawn to: the analytical and the editorial, working together. I design and
              build custom digital experiences for brands and projects that deserve more than a
              template — with structure, intention, and nothing superfluous.
            </p>
          </div>

          <div class="about-copy about-copy-designer font-light">
            <p>
              I work with clients who need more than execution — a perspective, a clear process, and
              work that holds over time. I aim to tell stories that resonate and connect. Based
              between Brussels and Barcelona, available worldwide.
            </p>
          </div>

          <figure class="about-photo about-photo-building">
            <picture>
              <source
                v-if="aboutBuildingAvifSrcset"
                type="image/avif"
                :srcset="aboutBuildingAvifSrcset"
                sizes="(min-width: 970px) 200px, 50vw"
              />
              <img
                src="/assets/media/pages/home/about-building.webp"
                alt="Sunny building facade photographed from below"
                loading="lazy"
                decoding="async"
              />
            </picture>
          </figure>

          <figure class="about-photo about-photo-spoons">
            <picture>
              <source
                v-if="aboutSpoonsAvifSrcset"
                type="image/avif"
                :srcset="aboutSpoonsAvifSrcset"
                sizes="(min-width: 970px) 400px, 90vw"
              />
              <img
                src="/assets/media/pages/home/about-spoons.webp"
                alt="A collection of vintage spoons on a white surface"
                loading="lazy"
                decoding="async"
              />
            </picture>
          </figure>

          <a href="/2026-inspo" class="about-manifesto-link font-display uppercase">
            My 2026 design manifesto
          </a>
        </div>
      </section>
    </div>

    <HomePartnersSection :partner-display-slots="partnerDisplaySlots" :is-dark="isDark" />

    <section class="portfolio-kinetic-signature" aria-label="Portfolio signature">
      <div class="portfolio-kinetic-bands">
        <article
          v-for="(band, index) in signatureBands"
          :key="band.id"
          class="portfolio-kinetic-band group"
          :style="{
            backgroundColor: band.background,
            '--band-text': band.textColor,
            '--band-delay': `${index * 80}ms`,
          }"
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
  </div>
</template>

<script>
import projects from '@/home-projects';
import HomeHeroSection from '@/components/home/HomeHeroSection.vue';
import HomeIntroSection from '@/components/home/HomeIntroSection.vue';
import HomePartnersSection from '@/components/home/HomePartnersSection.vue';
import ProcessOrbBackground from '@/components/home/ProcessOrbBackground.vue';
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
    ProcessOrbBackground,
  },
  data() {
    return {
      videos: projects,
      videoLoaded: {},
      mediaShape: {},
      enableVideoPreviews: true,
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
      parallaxLayers: [],
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
      activePaletteVariant: 'default',
      videoSequenceIndex: {},
      floatingInspo: {
        x: null,
        y: null,
        dragStartX: 0,
        dragStartY: 0,
        pointerId: null,
        dragging: false,
        dragMoved: false,
        suppressClick: false,
        offsetX: 0,
        offsetY: 0,
      },
      signatureBands: [
        {
          id: 'signature-band-1',
          index: '01',
          title: 'Elegance',
          meta: [],
          note: 'Refined through constraint.',
          background: 'var(--home-band-primary)',
          textColor: 'var(--home-band-primary-text)',
        },
        {
          id: 'signature-band-2',
          index: '02',
          title: 'Systems',
          meta: [],
          note: 'Built for real operations.',
          background: 'var(--home-band-secondary)',
          textColor: 'var(--home-band-secondary-text)',
        },
        {
          id: 'signature-band-3',
          index: '03',
          title: 'Integration',
          meta: [],
          note: 'Everything works as one.',
          background: 'var(--home-band-primary)',
          textColor: 'var(--home-band-primary-text)',
        },
        {
          id: 'signature-band-4',
          index: '04',
          title: 'Motion',
          meta: [],
          note: 'Movement creates meaning.',
          background: 'var(--home-band-secondary)',
          textColor: 'var(--home-band-secondary-text)',
        },
        {
          id: 'signature-band-5',
          index: '05',
          title: 'Presence',
          meta: [],
          note: 'Made to stay.',
          background: 'var(--home-band-primary)',
          textColor: 'var(--home-band-primary-text)',
        },
      ],
    };
  },

  props: {
    isDark: { type: Boolean, default: false },
    paletteVariant: { type: String, default: 'default' },
    aboutPortraitAvifSrcset: { type: String, default: '' },
    aboutBuildingAvifSrcset: { type: String, default: '' },
    aboutSpoonsAvifSrcset: { type: String, default: '' },
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

    floatingInspoStyle() {
      const x = this.floatingInspo.x ?? 0;
      const y = this.floatingInspo.y ?? 0;

      return {
        transform: `translate3d(${x}px, ${y}px, 0) rotate(-7deg)`,
      };
    },
  },

  created() {
    // Map non réactive id -> élément carte (function refs), comme Work.vue.
    // Les refs string dynamiques dans un v-for sont peu fiables en Vue 3.
    this.mediaCardEls = new Map();
  },

  mounted() {
    if (typeof window !== 'undefined') {
      this.activePaletteVariant = document.documentElement.classList.contains('home-palette-sun')
        ? 'sun'
        : this.paletteVariant;
      this.viewportWidth = window.innerWidth;
      window.addEventListener('resize', this.handleViewportResize, { passive: true });
      window.addEventListener('pointermove', this.handleFloatingInspoPointerMove, {
        passive: false,
      });
      window.addEventListener('pointerup', this.stopFloatingInspoDrag, { passive: true });
      window.addEventListener('pointercancel', this.stopFloatingInspoDrag, { passive: true });
    }

    if (this.enableScrollEffects) {
      this.initScatterParallax();
    }

    this.$nextTick(() => {
      this.applyPerformanceMode();
      this.setInitialFloatingInspoPosition();

      if (this.enableVideoPreviews) {
        this.initMediaObserver();
      }

      this.initRevealAnimations();
      this.initPartnerShowcase();
      this.initProcessFocus();

      window.requestAnimationFrame(() => {
        this.syncRenderedMediaShapes();
        this.scatterClientReady = true;
        this.scheduleOverlapRecompute();
      });
    });
  },

  beforeUnmount() {
    if (this.mediaObserver) {
      this.mediaObserver.disconnect();
    }
    if (this.revealObserver) {
      this.revealObserver.disconnect();
    }
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.handleViewportResize);
      window.removeEventListener('pointermove', this.handleFloatingInspoPointerMove);
      window.removeEventListener('pointerup', this.stopFloatingInspoDrag);
      window.removeEventListener('pointercancel', this.stopFloatingInspoDrag);
      const target = this.parallaxScrollTarget || window;
      target.removeEventListener('scroll', this.queueParallaxUpdate);
      window.removeEventListener('resize', this.handleParallaxResize);
    }
    if (this.processFocusRaf) {
      window.cancelAnimationFrame(this.processFocusRaf);
      this.processFocusRaf = null;
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
      this.clampFloatingInspoPosition();
      this.scheduleOverlapRecompute();
    },

    setInitialFloatingInspoPosition() {
      if (typeof window === 'undefined') return;
      if (this.floatingInspo.x != null && this.floatingInspo.y != null) {
        this.clampFloatingInspoPosition();
        return;
      }

      const isMobile = window.innerWidth <= 768;
      const margin = isMobile ? 16 : 22;
      const buttonWidth = isMobile ? 148 : 172;
      const buttonHeight = isMobile ? 62 : 74;

      if (isMobile) {
        this.floatingInspo.x = margin;
        this.floatingInspo.y = window.innerHeight - buttonHeight - 116;
      } else {
        this.floatingInspo.x = window.innerWidth - buttonWidth - margin;
        this.floatingInspo.y = window.innerHeight - buttonHeight - 30;
      }
      this.clampFloatingInspoPosition();
    },

    clampFloatingInspoPosition() {
      if (typeof window === 'undefined') return;
      if (this.floatingInspo.x == null || this.floatingInspo.y == null) return;

      const isMobile = window.innerWidth <= 768;
      const margin = isMobile ? 14 : 16;
      const buttonWidth = isMobile ? 148 : 172;
      const buttonHeight = isMobile ? 62 : 74;
      const minTop = isMobile ? 84 : margin + 60;
      const maxBottomOffset = isMobile ? 108 : margin;

      this.floatingInspo.x = Math.min(
        Math.max(this.floatingInspo.x, margin),
        window.innerWidth - buttonWidth - margin,
      );
      this.floatingInspo.y = Math.min(
        Math.max(this.floatingInspo.y, minTop),
        window.innerHeight - buttonHeight - maxBottomOffset,
      );
    },

    startFloatingInspoDrag(event) {
      if (typeof window === 'undefined') return;
      const isCoarse =
        window.matchMedia?.('(pointer: coarse)')?.matches ||
        window.matchMedia?.('(hover: none)')?.matches;

      if (isCoarse) return;

      const currentTarget = event.currentTarget;
      if (!(currentTarget instanceof HTMLElement)) return;

      event.preventDefault();

      const rect = currentTarget.getBoundingClientRect();
      this.floatingInspo.pointerId = event.pointerId;
      this.floatingInspo.dragging = true;
      this.floatingInspo.dragMoved = false;
      this.floatingInspo.dragStartX = event.clientX;
      this.floatingInspo.dragStartY = event.clientY;
      this.floatingInspo.offsetX = event.clientX - rect.left;
      this.floatingInspo.offsetY = event.clientY - rect.top;
      currentTarget.setPointerCapture?.(event.pointerId);
    },

    handleFloatingInspoPointerMove(event) {
      if (!this.floatingInspo.dragging) return;
      if (this.floatingInspo.pointerId !== event.pointerId) return;

      event.preventDefault();

      if (
        Math.abs(event.clientX - this.floatingInspo.dragStartX) > 6 ||
        Math.abs(event.clientY - this.floatingInspo.dragStartY) > 6
      ) {
        this.floatingInspo.dragMoved = true;
      }

      this.floatingInspo.x = event.clientX - this.floatingInspo.offsetX;
      this.floatingInspo.y = event.clientY - this.floatingInspo.offsetY;
      this.clampFloatingInspoPosition();
    },

    stopFloatingInspoDrag(event) {
      if (!this.floatingInspo.dragging) return;
      if (event?.pointerId != null && this.floatingInspo.pointerId !== event.pointerId) return;

      const didDrag = this.floatingInspo.dragMoved;
      this.floatingInspo.dragging = false;
      this.floatingInspo.pointerId = null;
      this.floatingInspo.suppressClick = didDrag;

      window.setTimeout(() => {
        this.floatingInspo.dragMoved = false;
      }, 0);
    },

    handleFloatingInspoClick(event) {
      if (this.floatingInspo.dragMoved || this.floatingInspo.suppressClick) {
        event.preventDefault();
        event.stopPropagation();
        this.floatingInspo.suppressClick = false;
        return;
      }

      this.openFloatingInspo();
    },

    openFloatingInspo() {
      if (this.floatingInspo.dragging || this.floatingInspo.suppressClick) {
        this.floatingInspo.suppressClick = false;
        return;
      }

      window.location.href = '/2026-inspo';
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

    setMediaCardRef(id) {
      const key = String(id);
      return (el) => {
        if (el instanceof HTMLElement) {
          this.mediaCardEls.set(key, el);
          return;
        }
        this.mediaCardEls.delete(key);
      };
    },

    getMediaCardElement(videoId) {
      return this.mediaCardEls.get(String(videoId)) || null;
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
      this.scheduleOverlapRecompute();
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

    syncRenderedMediaShapes() {
      this.orderedVideos.forEach((video) => {
        const card = this.getMediaCardElement(video.id);
        if (!card) return;

        const image = card.querySelector('img');
        if (image instanceof HTMLImageElement && image.naturalWidth && image.naturalHeight) {
          this.setMediaShape(video.id, image.naturalWidth, image.naturalHeight);
          return;
        }

        const media = card.querySelector('video');
        if (media instanceof HTMLVideoElement && media.videoWidth && media.videoHeight) {
          this.setMediaShape(video.id, media.videoWidth, media.videoHeight);
        }
      });
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
      // Garde toujours les médias sous les textes (.work-copy a un z-index de 120).
      const layerZIndex = this.seededRandom((index + 1) * 53 + idSeed) > 0.45 ? 110 : 70;
      const gap = 8 + this.seededRandom((index + 1) * 61 + idSeed) * 28;
      const overlapAllowance = this.seededRandom((index + 1) * 73 + idSeed) * 24;

      return { left, width, ratio, height, layerZIndex, gap, overlapAllowance };
    },

    hashString(value) {
      return hashStringUtil(String(value));
    },

    getBalancedHomeMediaSize(video, mode, ratio) {
      const isDesktop = mode === 'desktop';
      const safeRatio = Math.min(2.6, Math.max(0.52, ratio || 1));
      const isBranding = String(video?.projectLink || '').includes('/branding/');
      let width;
      let height;

      if (safeRatio < 0.85) {
        height = isDesktop ? 270 : 226;
        width = height * safeRatio;
      } else if (safeRatio < 1.16) {
        width = isDesktop ? 250 : 214;
        height = width / safeRatio;
      } else {
        width = isDesktop ? 360 : 292;
        height = width / safeRatio;
      }

      const projectScale = [10, 11].includes(video.id)
        ? isDesktop
          ? 1.12
          : 1.08
        : [9, 12].includes(video.id) || isBranding
          ? isDesktop
            ? 0.94
            : 0.96
          : 1;

      return {
        width: roundCssPx(width * projectScale),
        height: roundCssPx(height * projectScale),
      };
    },

    buildScatterLayout(mode = 'desktop') {
      const isDesktop = mode === 'desktop';
      const viewportWidth = this.viewportWidth || 1280;
      const containerWidth = Math.max(
        280,
        Math.min(isDesktop ? 1080 : viewportWidth - 20, viewportWidth - 20),
      );
      const topPadding = isDesktop ? 90 : 84;
      const bottomPadding = isDesktop ? 130 : 168;
      let yCursor = topPadding;
      let previousLeft = 50;
      const positions = {};

      this.orderedVideos.forEach((video, index) => {
        const { ratio, layerZIndex } = this.getScatterSeededConfig(index);
        const idSeed =
          this.hashString(String(this.orderedVideos[index]?.id || index)) + this.scatterLoadSeed;
        const isBranding = String(video?.projectLink || '').includes('/branding/');
        const fallbackRatio = video.src || !isBranding ? 16 / 9 : 1;
        const shape = this.mediaShape?.[video.id];
        const actualRatio = shape?.ratio ?? fallbackRatio;
        const { width, height } = this.getBalancedHomeMediaSize(video, mode, actualRatio);
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
      const index = this.orderedVideos.findIndex((video) => video.id === videoId);
      const pos = this.scatterLayout.positions[videoId];
      if (!pos) {
        return {};
      }

      return {
        order: index >= 0 ? index * 10 + 10 : 10,
        '--scatter-left-num': pos.left.toFixed(3),
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

    initProcessFocus() {
      if (typeof window === 'undefined') return;
      const steps = Array.from(document.querySelectorAll('.process-step'));
      if (!steps.length) return;

      this.processSteps = steps;

      const loop = () => {
        this.updateProcessFocus();
        this.updateProcessTitlePin();
        this.processFocusRaf = window.requestAnimationFrame(loop);
      };
      this.processFocusRaf = window.requestAnimationFrame(loop);
    },

    updateProcessFocus() {
      if (!this.processSteps?.length) return;

      const viewportCenter = window.innerHeight * 0.5;
      let currentIndex = 0;
      let bestDistance = Number.POSITIVE_INFINITY;

      this.processSteps.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        const stepCenter = rect.top + rect.height * 0.5;
        const distance = Math.abs(stepCenter - viewportCenter);
        if (distance < bestDistance) {
          bestDistance = distance;
          currentIndex = index;
        }
      });

      this.processSteps.forEach((el, index) => {
        el.classList.toggle('is-current', index === currentIndex);
        el.classList.toggle('is-near', Math.abs(index - currentIndex) === 1);
        el.classList.toggle('is-dim', Math.abs(index - currentIndex) > 1);
      });
    },

    updateProcessTitlePin() {
      const wrap = document.querySelector('.process-title-wrap');
      const section = document.querySelector('.process-title-section');
      if (!wrap || !section) return;

      if (window.innerWidth <= 768) {
        wrap.classList.remove('is-pinned');
        wrap.style.removeProperty('--pin-shift');
        return;
      }

      const rect = section.getBoundingClientRect();
      const shouldPin = rect.bottom < rect.height;
      if (shouldPin) {
        const shift = Math.min(0, rect.bottom);
        wrap.style.setProperty('--pin-shift', `${shift}px`);
        wrap.classList.add('is-pinned');
      } else {
        wrap.classList.remove('is-pinned');
        wrap.style.removeProperty('--pin-shift');
      }
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
      window.addEventListener('resize', this.handleParallaxResize);
      this.queueParallaxUpdate();
    },

    handleParallaxResize() {
      if (typeof window === 'undefined') return;
      this.viewportWidth = window.innerWidth;
      this.lastParallaxScrollTop = this.getParallaxScrollTop();
      this.queueParallaxUpdate();
      this.scheduleOverlapRecompute();
    },

    queueParallaxUpdate() {
      if (typeof window === 'undefined') return;
      if (!this.isDesktopScatter()) return;
      if (this.parallaxRaf) return;
      this.parallaxRaf = window.requestAnimationFrame(() => {
        this.parallaxRaf = null;
        this.updateScatterParallax();
        this.scheduleOverlapRecompute();
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
        const scrollTop = this.getParallaxScrollTop();
        this.lastParallaxScrollTop = scrollTop;
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

      this.parallaxLayers.forEach(({ id, speed }) => {
        const card = this.getMediaCardElement(id);
        if (!card) return;
        const previousOffset = this.parallaxOffsetsById[id] || 0;
        const nextOffset = Math.max(-96, Math.min(96, previousOffset + delta * speed));
        this.parallaxOffsetsById[id] = nextOffset;
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
  },

  watch: {
    orderedVideos: {
      handler(videos) {
        this.parallaxLayers = videos.map((video, index) => ({
          id: video.id,
          speed: 0.08 + this.seededRandom((index + 1) * 23 + this.hashString(String(video.id))) * 0.2,
        }));

        const visibleIds = new Set(videos.map((video) => String(video.id)));
        Object.keys(this.parallaxOffsetsById).forEach((id) => {
          if (!visibleIds.has(id)) {
            delete this.parallaxOffsetsById[id];
          }
        });
        this.$nextTick(() => {
          this.syncRenderedMediaShapes();
          this.lastParallaxScrollTop = this.getParallaxScrollTop();
          this.queueParallaxUpdate();
          this.recomputeOverlapOpacity();
        });
      },
      immediate: true,
    },
    paletteVariant: {
      handler(value) {
        this.activePaletteVariant = value === 'sun' ? 'sun' : 'default';
      },
      immediate: true,
    },
  },
};
</script>

<style scoped>
.home-page {
  --home-ink: #302b28;
  --home-orange: #4c5ef7;
  --home-yellow: #4c5ef7;
  --home-white: #ffffff;
  --home-cream: #f8f8f6;
  --home-band-primary: #4c5ef7;
  --home-band-primary-text: #ffffff;
  --home-band-secondary: #ffffff;
  --home-band-secondary-text: #4c5ef7;
  --home-hero-blob-fill: #ece7e1;
  --home-separator-fill: #4c5ef7;
  --home-separator-dark-fill: #302b28;
  --surface-base: #f8f8f6;
  --surface-muted: #ece7e1;
  --surface-panel: #ece7e1;
  --surface-accent: #4c5ef7;
  --surface-inverse: #302b28;
  --text-primary: #302b28;
  --text-secondary: #302b28;
  --text-inverse: #ffffff;
  --interactive-primary: #4c5ef7;
  background: var(--surface-base);
  color: var(--text-primary);
}

.home-page--sun,
:global(html.home-palette-sun .home-page) {
  --home-ink: #343232;
  --home-orange: #ff572a;
  --home-yellow: #fff47a;
  --home-white: #ffffff;
  --home-cream: #fffcf0;
  --home-band-primary: #fff47a;
  --home-band-primary-text: #343232;
  --home-band-secondary: #fffcf0;
  --home-band-secondary-text: #343232;
  --home-hero-blob-fill: #fffcf0;
  --home-separator-fill: #fff47a;
  --home-separator-dark-fill: #343232;
  --surface-base: #fffcf0;
  --surface-muted: #fffcf0;
  --surface-panel: #fffcf0;
  --surface-accent: #fff47a;
  --surface-inverse: #343232;
  --text-primary: #343232;
  --text-secondary: #343232;
  --text-inverse: #ffffff;
  --interactive-primary: #ff572a;
  --mobile-hero-bg: #fff47a;
}

.home-page--sun :deep(.tangle-hero),
:global(html.home-palette-sun .home-page .tangle-hero) {
  background: #fff47a;
}

.home-page--sun :deep(.hero-logo),
:global(html.home-palette-sun .home-page .hero-logo) {
  color: #343232;
}

.home-page--sun :deep(.hero-cta),
:global(html.home-palette-sun .home-page .hero-cta) {
  color: #343232;
}

.home-page--sun :deep(.hero-localtime),
:global(html.home-palette-sun .home-page .hero-localtime) {
  color: #343232;
}

.home-page--sun :deep(.hero-cta:hover),
.home-page--sun :deep(.hero-cta:focus-visible),
:global(html.home-palette-sun .home-page .hero-cta:hover),
:global(html.home-palette-sun .home-page .hero-cta:focus-visible) {
  background: #343232;
  color: #fffcf0;
}

.home-page--sun :deep(.loop-right-text),
.home-page--sun :deep(.loop-left-text),
:global(html.home-palette-sun .home-page .loop-right-text),
:global(html.home-palette-sun .home-page .loop-left-text) {
  fill: #ff572a;
}

.home-page--sun :deep(.blob-main-text),
.home-page--sun :deep(.blob-main-text-center),
:global(html.home-palette-sun .home-page .blob-main-text),
:global(html.home-palette-sun .home-page .blob-main-text-center) {
  fill: #343232;
}

.home-page--sun :deep(.tangle-hero-separator-wrap),
:global(html.home-palette-sun .home-page .tangle-hero-separator-wrap) {
  background: #fffcf0;
}

.home-page--sun :deep(.separator-marquee),
:global(html.home-palette-sun .home-page .separator-marquee) {
  fill: #343232;
}

.home-page--sun .projects-contact-link,
.home-page--sun .portfolio-final-cta-link,
:global(html.home-palette-sun .home-page .projects-contact-link),
:global(html.home-palette-sun .home-page .portfolio-final-cta-link) {
  background: #ff572a;
  border-color: #ff572a;
  color: #ffffff;
}

.home-page--sun .projects-contact-link:hover,
.home-page--sun .projects-contact-link:focus-visible,
.home-page--sun .portfolio-final-cta-link:hover,
.home-page--sun .portfolio-final-cta-link:focus-visible,
:global(html.home-palette-sun .home-page .projects-contact-link:hover),
:global(html.home-palette-sun .home-page .projects-contact-link:focus-visible),
:global(html.home-palette-sun .home-page .portfolio-final-cta-link:hover),
:global(html.home-palette-sun .home-page .portfolio-final-cta-link:focus-visible) {
  background: #343232;
  border-color: #343232;
  color: #fffcf0;
}

.home-page--sun .process-title,
:global(html.home-palette-sun .home-page .process-title) {
  -webkit-text-stroke-color: #ff572a;
}

.home-page--sun .process-title-cta,
:global(html.home-palette-sun .home-page .process-title-cta) {
  color: #ffffff;
  background: #ff572a;
  border-color: #ff572a;
}

.home-page--sun .process-title-cta:hover,
.home-page--sun .process-title-cta:focus-visible,
:global(html.home-palette-sun .home-page .process-title-cta:hover),
:global(html.home-palette-sun .home-page .process-title-cta:focus-visible) {
  background: #343232;
  border-color: #343232;
  color: #fffcf0;
}

.home-page--sun .about-manifesto-link,
:global(html.home-palette-sun .home-page .about-manifesto-link) {
  color: #ff572a;
}

.home-page--sun :deep(.home-partners-section),
:global(html.home-palette-sun .home-page .home-partners-section) {
  background: #ffffff;
}

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
  top: 50%; /* aligné comme Work */
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

/* Mobile: même logique que Work.vue */
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

.work-section {
  margin-top: 0 !important;
  width: min(100%, 1680px);
  max-width: min(100%, 1680px);
  margin-inline: auto;
}

.projects-contact-cta {
  display: flex;
  justify-content: center;
  padding: clamp(1rem, 3vw, 2rem) 1rem clamp(3rem, 7vw, 5.5rem);
  background: var(--surface-base);
}

.projects-contact-link {
  background: var(--text-primary);
  border-color: var(--text-primary);
  color: var(--text-inverse);
}

.projects-contact-link:hover,
.projects-contact-link:focus-visible {
  border-color: var(--surface-accent);
  background: var(--surface-accent);
  color: var(--text-inverse);
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
  display: flex;
  min-height: 0;
  width: 100%;
  margin-top: 0.5rem;
  padding: clamp(3rem, 7vw, 6rem) clamp(0.75rem, 3vw, 2rem) clamp(3.5rem, 8vw, 6.5rem);
  flex-direction: column;
  align-items: flex-start;
  gap: clamp(2.75rem, 6vw, 5.75rem);
}

.work-copy {
  position: relative;
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

.work-copy-work {
  order: 15;
  align-self: flex-end;
  max-width: 42ch;
}

.work-copy-work p {
  line-height: 1.2;
}

.work-copy-creating {
  order: -5;
  align-self: flex-start;
  max-width: 44ch;
}

.work-copy-idea {
  order: 35;
  align-self: flex-start;
  max-width: 36ch;
  text-align: left;
}

.work-copy-story {
  order: 55;
  align-self: flex-end;
  max-width: 60ch;
  text-align: left;
}

.work-copy-conviction {
  order: 75;
  align-self: center;
  max-width: 46ch;
  text-align: left;
}

.work-copy-creating,
.work-copy-work,
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
  position: relative;
  width: var(--scatter-width);
  max-width: min(var(--scatter-width), 100%);
  z-index: var(--scatter-z, 70);
  opacity: 1;
  margin-left: clamp(
    0px,
    calc(var(--scatter-left-num) * 1% - var(--scatter-width) / 2),
    calc(100% - var(--scatter-width))
  );
  transform: translate3d(0, var(--scatter-parallax, 0px), 0);
  transition:
    transform 0.24s ease,
    opacity 0.36s ease,
    z-index 0.28s ease;
  will-change: transform;
}

.work-scatter-item:hover {
  opacity: 1;
  transform: translate3d(0, calc(var(--scatter-parallax, 0px) - 6px), 0);
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
    min-height: 0;
    margin-top: 0.75rem;
    padding: 2.5rem 0.75rem 4rem;
    gap: clamp(2.4rem, 10vw, 4rem);
  }

  .work-copy {
    position: relative;
    margin: 0;
    max-width: min(82vw, 28ch);
    /* Let taps pass through to project cards underneath. */
    pointer-events: none;
    z-index: 140;
  }

  .work-copy-creating {
    align-self: flex-start;
    max-width: min(82vw, 24ch);
  }

  .work-copy-work {
    align-self: flex-start;
    max-width: min(82vw, 24ch);
  }

  .work-copy-idea {
    align-self: flex-end;
    max-width: min(72vw, 20ch);
    transform: none;
    text-align: left;
  }

  .work-copy-story {
    align-self: flex-start;
    max-width: min(90vw, 34ch);
    text-align: left;
    transform: none;
  }

  .work-copy-conviction {
    align-self: flex-start;
    max-width: min(84vw, 26ch);
    text-align: left;
  }

  .work-scatter-item {
    position: relative;
    width: var(--scatter-width);
    max-width: min(var(--scatter-width), calc(100vw - 2.5rem));
    transform: none;
    z-index: var(--scatter-z, 70);
  }

  .work-card {
    aspect-ratio: auto;
    height: auto;
  }

  .work-scatter-item.is-portrait .work-card {
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
  aspect-ratio: var(--scatter-ratio);
  object-fit: contain;
  transition: transform 0.3s ease;
}

.work-scatter-item.is-portrait .media {
  width: 100%;
  height: auto;
}
.group:hover .media {
  transform: scale(1.05);
}

.about-section-frame {
  position: relative;
  z-index: 1;
  border-top: 1px solid var(--main-black);
}

.about-section-shell {
  width: min(100%, 1680px);
  margin: 0 auto;
  padding: clamp(3.5rem, 8vw, 6rem) clamp(1rem, 2.5vw, 2.5rem) clamp(4rem, 9vw, 7rem);
}

.about-stage {
  position: relative;
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 0;
  color: var(--text-primary);
}

.about-title {
  grid-column: 1 / 5;
  grid-row: 1;
  align-self: start;
  font-size: clamp(1.15rem, 1.55vw, 2rem);
  line-height: 0.95;
  text-transform: uppercase;
}

.about-copy {
  font-size: clamp(0.9rem, 1.15vw, 1.05rem);
  line-height: 1.34;
}

.about-copy-bio {
  grid-column: 5 / 8;
  grid-row: 1;
  padding-right: 1rem;
}

.about-photo img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.about-photo-portrait {
  grid-column: 1 / 4;
  grid-row: 2 / 5;
  aspect-ratio: 0.73;
}

.about-statement {
  grid-column: 5 / 13;
  grid-row: 2;
  align-self: center;
  margin: clamp(2.5rem, 7vw, 5rem) 0 clamp(2.5rem, 7vw, 5rem);
  width: 100%;
  justify-self: stretch;
  font-size: clamp(1rem, 1.45vw, 1.55rem);
  line-height: 1.08;
  text-align: left;
  text-indent: clamp(8rem, 27vw, 26rem);
  text-transform: lowercase;
}

.about-copy-creative {
  grid-column: 10 / 13;
  grid-row: 3;
  align-self: end;
  margin-bottom: clamp(1.5rem, 3vw, 3rem);
}

.about-copy-designer {
  grid-column: 1 / 9;
  grid-row: 6;
  align-self: end;
  margin-top: clamp(8rem, 16vw, 15rem);
}

.about-photo-building {
  grid-column: 10 / 13;
  grid-row: 6;
  align-self: end;
  aspect-ratio: 1262 / 1854;
}

.about-photo-building img {
  object-fit: contain;
}

.about-photo-spoons {
  grid-column: 1 / 5;
  grid-row: 7;
  margin-top: clamp(1.5rem, 3vw, 3rem);
  aspect-ratio: 1.6;
}

.about-manifesto-link {
  grid-column: 5 / 10;
  grid-row: 7;
  align-self: end;
  justify-self: start;
  margin-left: clamp(1.5rem, 4vw, 4rem);
  padding-bottom: 0.18em;
  border-bottom: 1px solid transparent;
  color: var(--text-primary);
  font-size: clamp(1.15rem, 1.7vw, 1.8rem);
  line-height: 1;
  text-decoration: none;
}

.about-manifesto-link::after {
  content: '→';
  margin-left: 1rem;
}

.about-manifesto-link:hover,
.about-manifesto-link:focus-visible {
  border-bottom-color: currentColor;
}

@media (max-width: 900px) {
  .about-stage {
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
  }

  .about-title,
  .about-copy,
  .about-statement,
  .about-manifesto-link {
    max-width: none;
    margin: 0;
    padding-left: 0;
    text-align: left;
    text-indent: 0;
  }

  .about-statement {
    font-size: clamp(1.2rem, 4.5vw, 1.8rem);
  }

  .about-photo-portrait,
  .about-photo-building,
  .about-photo-spoons {
    width: min(100%, 28rem);
    margin: 0;
  }

  .about-photo-building {
    align-self: flex-end;
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

/* Fond animé de la section "The process" : reste fixe à l'écran pendant
   tout le défilement, derrière le titre et les 4 étapes (desktop + mobile). */
.process-background {
  position: sticky;
  top: 0;
  z-index: 0;
  height: 100svh;
  margin-bottom: -100svh;
  overflow: hidden;
  isolation: isolate;
  pointer-events: none;
  background: var(--surface-base);
}

.process-background::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 0;
  background:
    radial-gradient(
      circle at 18% 20%,
      color-mix(in srgb, var(--surface-base) 72%, transparent),
      transparent 24rem
    ),
    radial-gradient(
      circle at 78% 82%,
      color-mix(in srgb, var(--surface-base) 82%, transparent),
      transparent 28rem
    );
  opacity: 0.64;
}

.process-background::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 0;
  background: linear-gradient(
    180deg,
    var(--surface-base) 0%,
    transparent 22%,
    transparent 76%,
    var(--surface-base) 100%
  );
  opacity: 0.5;
}

.slides-overlay {
  z-index: 10;
}

.process-title {
  color: #ffffff;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: var(--interactive-primary);
  position: relative;
  z-index: 1;
  text-align: left;
  line-height: 1;
}

.process-title-wrap {
  position: relative;
  z-index: 1;
  width: min(34vw, 27rem);
  margin-right: auto;
  margin-left: clamp(1rem, 3vw, 3.5rem);
}

/* Maintient le titre + CTA centrés à l'écran pendant le relâchement du
   sticky natif, puis les fait défiler avec le background une fois que
   #celebrate quitte l'écran (--pin-shift suit le décalage du relâchement). */
@media (min-width: 769px) {
  .process-title-wrap.is-pinned {
    position: fixed;
    top: 50%;
    left: clamp(1rem, 3vw, 3.5rem);
    transform: translateY(calc(-50% + var(--pin-shift, 0px)));
    width: min(34vw, 27rem);
    margin: 0;
  }
}

.process-title-line {
  display: block;
  white-space: nowrap;
}

.process-title .hero-logo-main {
  display: block;
  font-size: clamp(44px, 8.2vw, 118px);
  line-height: 0.9;
}

.process-title .hero-logo-alt {
  display: inline-block;
  font-size: clamp(66px, 9.6vw, 148px);
  line-height: 0.85;
}

.process-title-line .hero-logo-main {
  display: inline-block;
}

.process-title-cta {
  margin-top: 1.1rem;
  color: var(--surface-base);
  background: var(--text-primary);
  border-color: var(--text-primary);
}

.process-title-cta:hover,
.process-title-cta:focus-visible {
  background: var(--interactive-primary);
  border-color: var(--interactive-primary);
  color: #ffffff;
}

.process-bottom-cta {
  display: none;
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
.build-container,
.deploy-container,
.celebrate-container {
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

/* Slide layering + alternating layout */
.think-container,
.build-container,
.custom-platforms-container,
.deploy-container,
.celebrate-container {
  --process-card-gap: clamp(5rem, 12vh, 9rem);
  position: relative;
  z-index: 20;
  width: 100%;
  max-width: none;
  padding-right: clamp(0.75rem, 3vw, 2.5rem);
  padding-left: clamp(40vw, 43vw, 46vw);
  margin-top: var(--process-card-gap) !important;
  margin-bottom: var(--process-card-gap) !important;
}

.custom-platforms-container {
  margin-top: clamp(7rem, 16vh, 12rem) !important;
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

.think-container .slide-content,
.build-container .slide-content,
.deploy-container .slide-content,
.celebrate-container .slide-content {
  align-items: center;
}

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
  #slides {
    height: auto !important;
  }

  .process-title-section {
    position: relative !important;
    min-height: auto !important;
    align-items: flex-start !important;
    justify-content: center !important;
    padding-top: 2.5rem;
    padding-bottom: 2.5rem;
  }

  .process-title-wrap {
    width: min(88vw, 24rem);
    text-align: center;
  }

  .process-title {
    text-align: center;
  }

  .process-title-wrap .process-title-cta {
    display: none;
  }

  .process-bottom-cta {
    position: relative;
    z-index: 20;
    display: flex;
    width: fit-content;
    margin-inline: auto;
    margin-top: clamp(2rem, 8vh, 4rem);
    margin-bottom: clamp(3rem, 8vh, 5rem);
  }

  .think-container.process-step {
    margin-top: 0 !important;
  }

  .think-container,
  .build-container,
  .deploy-container,
  .celebrate-container {
    padding-inline: 1rem;
  }

  .custom-platforms-container {
    overflow: visible;
    margin-top: clamp(5rem, 12vh, 7rem) !important;
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
    margin-top: clamp(5rem, 13vh, 6.5rem) !important;
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
    transform: none;
  }

  .build-container > .slide-content,
  .deploy-container > .slide-content {
    transform: none;
  }

  .think-copy-block,
  .custom-platforms-block,
  .deploy-copy-block {
    align-self: flex-start !important;
    margin-left: 0 !important;
    margin-right: auto !important;
  }

  .custom-platforms-block {
    transform: rotate(-2.4deg) !important;
  }

  .build-copy-block,
  .celebrate-copy-block {
    align-self: flex-end !important;
    margin-left: auto !important;
    margin-right: 0 !important;
  }

  .build-image-shell {
    align-self: flex-end !important;
    width: min(100%, 560px) !important;
    max-width: 560px !important;
    margin-left: auto !important;
    margin-right: 0 !important;
    translate: none !important;
    transform: none !important;
  }

  .celebrate-image-shell {
    align-self: flex-end !important;
    width: min(100%, 560px) !important;
    max-width: 560px !important;
    margin-left: auto !important;
    margin-right: 0 !important;
    translate: none !important;
    transform: translateX(clamp(2.5rem, 5vw, 4.5rem)) !important;
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
  background: var(--text-primary);
  border-color: var(--text-primary);
  color: var(--text-inverse);
}

.portfolio-final-cta-link:hover,
.portfolio-final-cta-link:focus-visible {
  border-color: var(--surface-accent);
  background: var(--surface-accent);
  color: var(--text-inverse);
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
    'Synt Mono Regular', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',
    'Courier New', monospace;
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
    'Synt Mono Regular', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',
    'Courier New', monospace;
  font-size: clamp(2.9rem, 7vw, 7rem);
  line-height: 0.9;
  letter-spacing: 0;
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
  font-size: 0.82rem;
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
  background: #000;
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
    font-size: 0.72rem;
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
  .slides-overlay {
    content-visibility: auto;
    contain-intrinsic-size: 900px;
  }

  .custom-platforms-container.slides-overlay {
    content-visibility: visible;
    contain-intrinsic-size: auto;
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

/* Process editorial steps */
.process-step {
  --process-step-gap: clamp(5.5rem, 13vh, 10rem);
  --process-edge: clamp(1rem, 3vw, 3.5rem);
  position: relative;
  z-index: 20;
  width: auto;
  max-width: none;
  margin: var(--process-step-gap) var(--process-edge) var(--process-step-gap) var(--process-edge) !important;
  padding: 0 !important;
  color: var(--text-primary);
  background: transparent;
  opacity: 1;
  filter: none;
  transition:
    opacity 0.34s ease,
    filter 0.34s ease;
}

@media (min-width: 901px) {
  .celebrate-container {
    margin-bottom: 100vh !important;
  }
}

.process-step.is-near {
  opacity: 0.5;
  filter: blur(1.6px) saturate(0.82);
}

.process-step.is-dim {
  opacity: 0.18;
  filter: blur(3px) saturate(0.6);
}

.process-step-layout {
  display: grid;
  grid-template-columns: minmax(13rem, 0.72fr) minmax(12rem, 1fr);
  column-gap: clamp(2rem, 7vw, 8rem);
  align-items: start;
}

.process-step-title {
  margin: 0;
  font-family: var(--font-family-display);
  font-size: clamp(3.2rem, 7vw, 6.8rem);
  font-weight: 400;
  line-height: 0.9;
  letter-spacing: 0;
  text-transform: lowercase;
}

.process-step-title .hero-logo-alt {
  font-size: 1.05em;
  line-height: 0.7;
}

.process-step-rule {
  grid-column: 1 / -1;
  width: 100%;
  height: 1px;
  margin: clamp(1.2rem, 2.4vw, 2rem) 0 clamp(1.8rem, 4vw, 3.4rem);
  background: color-mix(in srgb, var(--text-primary) 70%, transparent);
}

.process-step-copy {
  grid-column: 2;
  max-width: 36rem;
  margin-left: auto;
  font-size: clamp(1.2rem, 1.85vw, 1.65rem);
  line-height: 1.18;
  letter-spacing: 0;
}

.process-step-copy p {
  margin: 0;
}

.process-step-note {
  max-width: 31rem;
  margin-top: clamp(1.35rem, 2.8vw, 2.25rem) !important;
  font-size: clamp(1rem, 1.3vw, 1.18rem);
  line-height: 1.35;
  color: color-mix(in srgb, var(--text-primary) 78%, transparent);
}

@media (max-width: 900px) {
  .process-step {
    margin: clamp(4.5rem, 11vh, 7rem) var(--process-edge) !important;
  }

  .process-step-layout {
    display: block;
  }

  .process-step-title {
    font-size: clamp(3rem, 15vw, 5.8rem);
    overflow-wrap: break-word;
  }

  .process-step-rule {
    margin: 1rem 0 1.6rem;
  }

  .process-step-copy {
    max-width: none;
    margin-left: 0;
    font-size: clamp(1.12rem, 5.4vw, 1.6rem);
    line-height: 1.18;
  }
}
</style>
