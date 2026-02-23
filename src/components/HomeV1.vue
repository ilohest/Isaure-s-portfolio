<template>
  <section class="home-v1" :style="sectionStyles" id="home-v1-slides">
    <div class="home-v1-sticky" :style="stickyStyles">
      <div class="home-v1-layout">
        <div class="home-v1-visual-stage">
          <article
            v-for="(slide, index) in slides"
            :key="`visual-${slide.id}`"
            class="home-v1-visual-layer"
            :class="visualLayerClass(index)"
            :style="{ background: slide.visualBg }"
          >
            <div class="home-v1-visual-inner" :style="{ background: slide.innerBg }">
              <span class="home-v1-icon">{{ slide.icon }}</span>
            </div>
          </article>
        </div>

        <div class="home-v1-copy-stage">
          <article
            v-for="(slide, index) in slides"
            :key="`copy-${slide.id}`"
            class="home-v1-copy-layer"
            :class="copyLayerClass(index)"
          >
            <h2>{{ slide.title }}</h2>
            <p>{{ slide.description }}</p>
          </article>
        </div>
      </div>

      <div class="home-v1-dots" aria-hidden="true">
        <span
          v-for="(slide, index) in slides"
          :key="`${slide.id}-dot`"
          class="home-v1-dot"
          :class="{ 'is-active': index === activeSlide }"
        />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HomeV1',
  data() {
    return {
      activeSlide: 0,
      previousSlide: 0,
      headerOffsetPx: 0,
      isTransitioning: false,
      transitionDirection: 1,
      transitionTimer: null,
      scrollContainer: null,
      slides: [
        {
          id: 'think',
          title: '#think.',
          description: 'I listen first, frame your needs, and map the right digital direction.',
          icon: '🚀',
          visualBg: '#dbeed8',
          innerBg: 'linear-gradient(135deg, #7ee081 0%, #3cc8ff 55%, #4a7cf4 100%)',
        },
        {
          id: 'build',
          title: '#build.',
          description: 'I design and build clear, useful interfaces that match your workflow.',
          icon: '🛠️',
          visualBg: '#fee9cb',
          innerBg: 'linear-gradient(135deg, #ffe06a 0%, #ff9f44 60%, #ff62c2 100%)',
        },
        {
          id: 'deploy',
          title: '#deploy.',
          description: 'Fast, responsive, stable delivery with the right setup for production.',
          icon: '⚡',
          visualBg: '#dbecf8',
          innerBg: 'linear-gradient(135deg, #ffe96f 0%, #9fe46d 50%, #5ec0f8 100%)',
        },
        {
          id: 'celebrate',
          title: '#celebrate.',
          description: 'Your product is live, clear, and ready to support real business growth.',
          icon: '🎉',
          visualBg: '#f6e2ed',
          innerBg: 'linear-gradient(135deg, #f8a869 0%, #f46ed8 55%, #7fe5f1 100%)',
        },
      ],
    };
  },
  computed: {
    panelHeightPx() {
      const viewportHeight = this.scrollContainer?.clientHeight || window.innerHeight || 0;
      return Math.max(viewportHeight - this.headerOffsetPx, 360);
    },
    sectionStyles() {
      const totalHeight = this.panelHeightPx * this.slides.length + this.headerOffsetPx;
      return { height: `${totalHeight}px` };
    },
    stickyStyles() {
      return {
        top: `${this.headerOffsetPx}px`,
        height: `${this.panelHeightPx}px`,
      };
    },
  },
  mounted() {
    this.scrollContainer = document.querySelector('main[data-scroll-container]');
    const scrollTarget = this.scrollContainer || window;

    scrollTarget.addEventListener('scroll', this.updateActiveSlide, { passive: true });
    window.addEventListener('resize', this.handleResize, { passive: true });
    this.measureLayout();
    this.updateActiveSlide();
  },
  beforeUnmount() {
    const scrollTarget = this.scrollContainer || window;
    scrollTarget.removeEventListener('scroll', this.updateActiveSlide);
    window.removeEventListener('resize', this.handleResize);
    if (this.transitionTimer) clearTimeout(this.transitionTimer);
  },
  methods: {
    setActiveSlide(index) {
      if (index === this.activeSlide) return;

      this.transitionDirection = index > this.activeSlide ? 1 : -1;
      this.previousSlide = this.activeSlide;
      this.activeSlide = index;
      this.isTransitioning = true;

      if (this.transitionTimer) clearTimeout(this.transitionTimer);
      this.transitionTimer = setTimeout(() => {
        this.isTransitioning = false;
        this.previousSlide = this.activeSlide;
      }, 520);
    },

    visualLayerClass(index) {
      const classes = [];
      const isActive = index === this.activeSlide;
      const isLeaving =
        this.isTransitioning && index === this.previousSlide && index !== this.activeSlide;

      if (isActive) {
        classes.push('is-active');
        if (this.isTransitioning) {
          classes.push(
            this.transitionDirection > 0 ? 'is-entering-from-bottom' : 'is-entering-from-top',
          );
        }
      }

      if (isLeaving) {
        classes.push('is-leaving');
        classes.push(this.transitionDirection > 0 ? 'is-leaving-up' : 'is-leaving-down');
      }

      return classes;
    },

    copyLayerClass(index) {
      const classes = [];
      const isActive = index === this.activeSlide;
      const isLeaving =
        this.isTransitioning && index === this.previousSlide && index !== this.activeSlide;

      if (isActive) {
        classes.push('is-active');
        if (this.isTransitioning) {
          classes.push(
            this.transitionDirection > 0 ? 'is-entering-from-bottom' : 'is-entering-from-top',
          );
        }
      }

      if (isLeaving) {
        classes.push('is-leaving');
        classes.push(this.transitionDirection > 0 ? 'is-leaving-up' : 'is-leaving-down');
      }

      return classes;
    },

    measureLayout() {
      const header = document.querySelector('header');
      const headerHeight = header?.getBoundingClientRect().height || 0;
      this.headerOffsetPx = Math.max(Math.round(headerHeight), 0);
    },

    handleResize() {
      this.measureLayout();
      this.updateActiveSlide();
    },

    getOffsetTopWithinScroller(element, scroller) {
      let top = 0;
      let node = element;

      while (node && node !== scroller) {
        top += node.offsetTop || 0;
        node = node.offsetParent;
      }

      return top;
    },

    updateActiveSlide() {
      const section = document.getElementById('home-v1-slides');
      if (!section) return;

      const scroller = this.scrollContainer;

      let progress = 0;

      if (scroller) {
        const viewportHeight = scroller.clientHeight;
        const sectionTop = this.getOffsetTopWithinScroller(section, scroller);
        const maxTravel = Math.max(section.offsetHeight - viewportHeight, 1);
        const traveled = Math.min(Math.max(scroller.scrollTop - sectionTop, 0), maxTravel);
        progress = traveled / maxTravel;
      } else {
        const rect = section.getBoundingClientRect();
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
        const maxTravel = Math.max(rect.height - viewportHeight, 1);
        const traveled = Math.min(Math.max(-rect.top, 0), maxTravel);
        progress = traveled / maxTravel;
      }

      const index = Math.min(
        this.slides.length - 1,
        Math.max(0, Math.round(progress * (this.slides.length - 1))),
      );

      this.setActiveSlide(index);
    },
  },
};
</script>

<style scoped>
.home-v1 {
  position: relative;
  background: #ececec;
}

.home-v1-sticky {
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: hidden;
}

.home-v1-layout {
  position: relative;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.home-v1-visual-stage {
  position: relative;
  margin: 20px;
  border: 1px solid #222;
  overflow: hidden;
}

.home-v1-visual-layer {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  visibility: hidden;
  transform: translateY(0) scale(1);
  pointer-events: none;
}

.home-v1-visual-layer.is-active,
.home-v1-visual-layer.is-leaving {
  visibility: visible;
  opacity: 1;
}

.home-v1-visual-layer.is-active {
  z-index: 3;
}

.home-v1-visual-layer.is-leaving {
  z-index: 2;
}

.home-v1-copy-stage {
  position: relative;
  background: #ececec;
  overflow: hidden;
}

.home-v1-copy-layer {
  position: absolute;
  inset: 0;
  padding: clamp(32px, 5vw, 72px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  opacity: 0;
  visibility: hidden;
  transform: translateY(0);
}

.home-v1-copy-layer.is-active,
.home-v1-copy-layer.is-leaving {
  opacity: 1;
  visibility: visible;
}

.home-v1-copy-layer.is-active {
  z-index: 3;
}

.home-v1-copy-layer.is-leaving {
  z-index: 2;
}

.home-v1-visual-layer.is-active.is-entering-from-bottom {
  animation: visual-enter-from-bottom 0.52s cubic-bezier(0.2, 0.86, 0.25, 1) both;
}

.home-v1-visual-layer.is-active.is-entering-from-top {
  animation: visual-enter-from-top 0.52s cubic-bezier(0.2, 0.86, 0.25, 1) both;
}

.home-v1-visual-layer.is-leaving.is-leaving-up {
  animation: visual-leave-up 0.5s cubic-bezier(0.4, 0, 0.2, 1) both;
}

.home-v1-visual-layer.is-leaving.is-leaving-down {
  animation: visual-leave-down 0.5s cubic-bezier(0.4, 0, 0.2, 1) both;
}

.home-v1-copy-layer.is-active.is-entering-from-bottom {
  animation: copy-enter-from-bottom 0.44s cubic-bezier(0.2, 0.86, 0.25, 1) 0.08s both;
}

.home-v1-copy-layer.is-active.is-entering-from-top {
  animation: copy-enter-from-top 0.44s cubic-bezier(0.2, 0.86, 0.25, 1) 0.08s both;
}

.home-v1-copy-layer.is-leaving.is-leaving-up {
  animation: copy-leave-up 0.36s ease both;
}

.home-v1-copy-layer.is-leaving.is-leaving-down {
  animation: copy-leave-down 0.36s ease both;
}

.home-v1-visual-inner {
  width: 72%;
  aspect-ratio: 1 / 1;
  border-radius: 999px;
  border: 2px solid #111;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 12px 24px rgb(0 0 0 / 18%);
}

.home-v1-icon {
  font-size: clamp(64px, 12vw, 180px);
  line-height: 1;
}

.home-v1-copy-layer h2 {
  margin: 0 0 18px;
  max-width: 12ch;
  font-family: 'Anton', sans-serif;
  font-size: clamp(38px, 5.6vw, 86px);
  line-height: 0.95;
  text-transform: uppercase;
  letter-spacing: 0.01em;
  color: #121317;
}

.home-v1-copy-layer p {
  margin: 0;
  max-width: 52ch;
  font-size: clamp(16px, 1.45vw, 27px);
  line-height: 1.45;
  color: #23252b;
}

.home-v1-dots {
  position: absolute;
  top: 50%;
  right: 16px;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 4;
}

.home-v1-dot {
  width: 9px;
  height: 9px;
  border: 1px solid #1c1e23;
  border-radius: 999px;
  background: transparent;
}

.home-v1-dot.is-active {
  background: #1c1e23;
}

@keyframes visual-enter-from-bottom {
  from {
    transform: translateY(34%) scale(1.04);
    opacity: 1;
  }

  to {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
}

@keyframes visual-enter-from-top {
  from {
    transform: translateY(-34%) scale(1.04);
    opacity: 1;
  }

  to {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
}

@keyframes visual-leave-up {
  from {
    transform: translateY(0) scale(1);
    opacity: 1;
  }

  to {
    transform: translateY(-8%) scale(0.84);
    opacity: 0.5;
  }
}

@keyframes visual-leave-down {
  from {
    transform: translateY(0) scale(1);
    opacity: 1;
  }

  to {
    transform: translateY(8%) scale(0.84);
    opacity: 0.5;
  }
}

@keyframes copy-enter-from-bottom {
  from {
    transform: translateY(24%);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes copy-enter-from-top {
  from {
    transform: translateY(-24%);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes copy-leave-up {
  from {
    transform: translateY(0);
    opacity: 1;
  }

  to {
    transform: translateY(-18%);
    opacity: 0;
  }
}

@keyframes copy-leave-down {
  from {
    transform: translateY(0);
    opacity: 1;
  }

  to {
    transform: translateY(18%);
    opacity: 0;
  }
}

@media (max-width: 900px) {
  .home-v1-layout {
    grid-template-columns: 1fr;
    grid-template-rows: 46vh 54vh;
  }

  .home-v1-visual-stage {
    margin: 14px 14px 0;
  }

  .home-v1-copy-layer {
    padding: 24px;
    justify-content: flex-start;
  }
}

@media (prefers-reduced-motion: reduce) {
  .home-v1-visual-layer,
  .home-v1-copy-layer {
    opacity: 1;
    visibility: visible;
    transform: none;
    transition: none;
    animation: none !important;
  }
}
</style>
