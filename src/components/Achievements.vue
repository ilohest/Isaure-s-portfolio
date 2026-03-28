<!-- src/components/Achievements.vue -->
<template>
  <section
    class="achievements-page container mx-auto flex flex-col gap-4 px-4 pb-4 md:px-6 md:pb-8"
  >
    <h1 class="sr-only">Selected Work and Case Studies</h1>
    <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div class="filter-buttons">
        <button
          v-for="option in filterOptions"
          :key="option.value"
          type="button"
          class="filter-button"
          :class="{ 'is-active': cat === option.value }"
          @click="cat = option.value"
        >
          {{ option.label }}
        </button>
      </div>
    </div>

    <div
      ref="workScatter"
      class="work-scatter"
      :style="{ '--scatter-height': `${scatterHeight}px` }"
    >
      <div
        v-for="(quote, index) in backgroundQuotes"
        :key="`quote-${index}`"
        class="achievements-quote"
        :ref="setQuoteRef(index)"
        :style="getQuoteStyle(index)"
      >
        {{ quote }}
      </div>

      <div
        v-for="(p, index) in filtered"
        :key="p.id"
        class="work-scatter-item gallery-item"
        :class="getMediaShapeClass(p.id)"
        :style="[getScatterStyle(index, p.id), getCardOpacityStyle(p.id)]"
        :ref="setMediaCardRef(p.id)"
      >
        <router-link :to="p.to" class="item-link project-card group">
          <div class="work-card-shell">
            <div class="work-card relative overflow-hidden">
              <img
                v-show="!isVideoVisible(p)"
                :src="getPlaceholderSrc(p)"
                :alt="`Image of ${p.title}`"
                class="media"
                loading="lazy"
                decoding="async"
                @load="registerImageShape(p.id, $event)"
              />
              <video
                v-if="p.src"
                v-show="isVideoVisible(p)"
                :src="getVideoSrc(p)"
                :ref="setVideoRef(p.id)"
                playsinline
                autoplay
                :loop="!hasVideoSequence(p) && !p.introPlaceholder"
                muted
                preload="auto"
                class="media"
                @loadeddata="markVideoAsLoaded(p.id)"
                @loadedmetadata="registerVideoShape(p.id, $event)"
                @ended="onVideoEnded(p.id)"
                @mouseover="pauseVideo(p.id)"
                @mouseout="playVideo(p.id)"
              ></video>

              <div class="project-info">
                <span>{{ p.title }}</span>
                <span>{{ p.year }}</span>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>

    <ReachOutCTA
      :to="contactCtaTo"
      label="Call Me Maybe?"
      aria-label="Reach out from achievements"
      image-src="/assets/media/pages/achievements/andrej-lisakov-S13Sj0d-r60-unsplash-960.webp"
    />

    <router-view />
  </section>
</template>

<script setup lang="ts">
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
  type ComponentPublicInstance,
} from 'vue';
import ReachOutCTA from '@/components/services/ReachOutCTA.vue';
import {
  boxesOverlap,
  getCenterProtectedRect,
  getParallaxScrollTop as getParallaxScrollTopUtil,
  hashString,
  roundCssPx,
  seededRandom,
} from '@/utils/scatter-utils';

import webdev from '@/web-dev-projects';
import branding from '@/branding-projects';

type CategoryFilter = 'all' | 'web' | 'branding';
type SortMode = 'year-desc' | 'year-asc' | 'title-asc' | 'title-desc';

type GalleryItem = {
  id: string;
  title: string;
  year: string;
  order: number;
  placeholder: string;
  introPlaceholder?: string;
  introDurationMs?: number;
  src?: string;
  srcAlt?: string;
  to: string;
  category: Exclude<CategoryFilter, 'all'>;
};

const webItems: GalleryItem[] = webdev.map((x) => ({
  id: `web-${x.id}`,
  title: x.title,
  year: x.year,
  order: Number(x.order ?? `${x.year}00`),
  placeholder: x.placeholder,
  introPlaceholder: x.introPlaceholder,
  introDurationMs: x.introDurationMs,
  src: x.src,
  srcAlt: x.srcAlt,
  to: x.projectLink,
  category: 'web',
}));

const brandItems: GalleryItem[] = branding.map((x) => ({
  id: `brand-${x.id}`,
  title: x.title,
  year: x.year,
  order: Number(x.order ?? `${x.year}00`),
  placeholder: x.placeholder,
  to: x.projectLink,
  category: 'branding',
}));

const hiddenAchievementTitles = new Set(['creyda yoga', 'didacmania']);

const normalizeTitle = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();

const all = [...webItems, ...brandItems].filter(
  (item) => !hiddenAchievementTitles.has(normalizeTitle(item.title)),
);

const cat = ref<CategoryFilter>('all');
const q = ref('');
const sort = ref<SortMode>('year-desc');

const filterOptions: Array<{ label: string; value: CategoryFilter }> = [
  { label: 'All', value: 'all' },
  { label: 'Web', value: 'web' },
  { label: 'Branding', value: 'branding' },
];

const backgroundQuotes = [
  'I believe projects have a soul before they have a shape. My role is to give them structure, rhythm, and presence.',
  'Every profession carries its own language, codes, and nuances. Discovering them is an endless source of inspiration for me.',
  'I work with attention. Listening is not a step in the process - it is the starting point.',
  'I am attentive to detail and balance. These are what transform a functional project into a meaningful experience.',
];

const contactCtaTo = {
  path: '/contact',
  query: {
    subject: "I saw your work — let's make internet magic",
    message:
      "Hi Isaure,\\n\\nI just scrolled through your achievements page and now I can't unsee how good it is :). I'd love to chat about a project that needs design, dev, and a tiny bit of sparkle.\\n\\nQuick context:\\n- What I'm building:\\n- Deadline (or vibe):\\n- Budget range:\\n- Links / references:\\n\\nTalk soon!",
  },
};

const filtered = computed(() => {
  let arr = all;

  if (cat.value !== 'all') {
    arr = arr.filter((p) => p.category === cat.value);
  }

  if (q.value.trim()) {
    const s = q.value.trim().toLowerCase();
    arr = arr.filter((p) => p.title.toLowerCase().includes(s) || String(p.year).includes(s));
  }

  switch (sort.value) {
    case 'year-asc':
      return [...arr].sort((a, b) => a.order - b.order);
    case 'title-asc':
      return [...arr].sort((a, b) => a.title.localeCompare(b.title));
    case 'title-desc':
      return [...arr].sort((a, b) => b.title.localeCompare(a.title));
    default:
      return [...arr].sort((a, b) => b.order - a.order);
  }
});

const workScatter = ref<HTMLElement | null>(null);
const videoLoaded = ref<Record<string, boolean>>({});
const videoIntroReady = ref<Record<string, boolean>>({});
const mediaShape = ref<Record<string, { orientation: 'landscape' | 'portrait'; ratio: number }>>(
  {},
);
const videoEls = new Map<string, HTMLVideoElement>();
const mediaCardEls = new Map<string, HTMLElement>();
const quoteEls = new Map<number, HTMLElement>();
const videoIntroTimers = new Map<string, ReturnType<typeof setTimeout>>();
const overlappingCardOpacity = ref<Record<string, number>>({});
const viewportWidth = ref(1280);
const scatterClientReady = ref(false);

let parallaxRaf: number | null = null;
let parallaxScrollTarget: Window | HTMLElement = window;
let lastObservedScrollTop: number | null = null;
let overlapRecomputeTimer: ReturnType<typeof setTimeout> | null = null;
const parallaxOffsetsById: Record<string, number> = {};
let parallaxLayers: Array<{ id: string; speed: number }> = [];

type TemplateRefTarget = Element | ComponentPublicInstance | null;

const setVideoRef = (id: string) => (el: TemplateRefTarget) => {
  if (el instanceof HTMLVideoElement) {
    videoEls.set(id, el);
    return;
  }
  videoEls.delete(id);
};

const setMediaCardRef = (id: string) => (el: TemplateRefTarget) => {
  if (el instanceof HTMLElement) {
    mediaCardEls.set(id, el);
    return;
  }
  mediaCardEls.delete(id);
};

const setQuoteRef = (index: number) => (el: TemplateRefTarget) => {
  if (el instanceof HTMLElement) {
    quoteEls.set(index, el);
    return;
  }
  quoteEls.delete(index);
};

const markVideoAsLoaded = (id: string) => {
  videoLoaded.value[id] = true;
};

const pauseVideo = (id: string) => {
  videoEls.get(id)?.pause();
};

const playVideo = (id: string) => {
  const item = filtered.value.find((entry) => entry.id === id);
  if (item?.introPlaceholder && !videoIntroReady.value[id]) return;
  const el = videoEls.get(id);
  if (!el) return;
  void el.play();
};

const startVideoIntro = (item: GalleryItem) => {
  if (!item?.src) return;
  if (!item.introPlaceholder) {
    videoIntroReady.value[item.id] = true;
    return;
  }
  const existingTimer = videoIntroTimers.get(item.id);
  if (existingTimer) {
    clearTimeout(existingTimer);
    videoIntroTimers.delete(item.id);
  }
  if (videoIntroReady.value[item.id]) return;

  const delay = item.introDurationMs ?? 3000;
  const timerId = setTimeout(() => {
    videoIntroReady.value[item.id] = true;
    videoIntroTimers.delete(item.id);

    const el = videoEls.get(item.id);
    if (el && videoLoaded.value[item.id]) {
      el.currentTime = 0;
      void el.play();
    }
  }, delay);

  videoIntroTimers.set(item.id, timerId);
};

const videoSequenceIndex = ref<Record<string, number>>({});

const hasVideoSequence = (item: GalleryItem) => Boolean(item?.src && item?.srcAlt);

const getPlaceholderSrc = (item: GalleryItem) => {
  if (item?.introPlaceholder && !videoIntroReady.value[item.id]) {
    return item.introPlaceholder;
  }
  return item.placeholder;
};

const isVideoVisible = (item: GalleryItem) => {
  if (!item?.src) return false;
  const introReady = item.introPlaceholder ? videoIntroReady.value[item.id] : true;
  return Boolean(videoLoaded.value[item.id] && introReady);
};

const getVideoSrc = (item: GalleryItem) => {
  if (!item?.src) return undefined;
  if (!item?.srcAlt) return item.src;
  const idx = videoSequenceIndex.value[item.id] ?? 0;
  return idx % 2 === 0 ? item.src : item.srcAlt;
};

const onVideoEnded = async (id: string) => {
  const item = filtered.value.find((x) => x.id === id);
  if (item?.introPlaceholder && !item?.srcAlt) {
    videoIntroReady.value[id] = false;

    const el = videoEls.get(id);
    if (el) {
      el.pause();
      el.currentTime = 0;
    }

    startVideoIntro(item);
    return;
  }

  if (!item?.srcAlt) return;

  videoSequenceIndex.value[id] = (videoSequenceIndex.value[id] ?? 0) === 0 ? 1 : 0;

  await nextTick();
  const el = videoEls.get(id);
  if (!el) return;
  el.load();
  void el.play();
};

const scatterLoadSeed = 0;

const getScatterSeededConfig = (index: number, id: string) => {
  const idSeed = hashString(id) + scatterLoadSeed;
  const baseWidth = 210 + seededRandom((index + 1) * 17 + idSeed) * 85;
  const width = index === 0 ? baseWidth + 28 : baseWidth;
  const ratioOptions = ['4 / 5', '3 / 4', '5 / 4', '1 / 1', '4 / 3', '16 / 10'];
  const ratioIndex = Math.floor(seededRandom((index + 1) * 13 + idSeed) * ratioOptions.length);
  const ratio = ratioOptions[ratioIndex];
  const [ratioW, ratioH] = ratio.split('/').map((part) => Number(part.trim()) || 1);
  const height = width * (ratioH / ratioW);
  const left = 12 + seededRandom((index + 1) * 41 + idSeed) * 76;
  const layerZIndex = seededRandom((index + 1) * 53 + idSeed) > 0.45 ? 145 : 70;
  const gap = 8 + seededRandom((index + 1) * 61 + idSeed) * 28;
  const overlapAllowance = seededRandom((index + 1) * 73 + idSeed) * 24;

  return { width, ratio, height, left, layerZIndex, gap, overlapAllowance };
};

const setMediaShape = (id: string, width: number, height: number) => {
  if (!width || !height) return;
  const ratio = width / height;
  mediaShape.value = {
    ...mediaShape.value,
    [id]: {
      orientation: ratio >= 1 ? 'landscape' : 'portrait',
      ratio,
    },
  };
};

const registerImageShape = (id: string, event: Event) => {
  const img = event.target;
  if (!(img instanceof HTMLImageElement)) return;
  setMediaShape(id, img.naturalWidth, img.naturalHeight);
};

const registerVideoShape = (id: string, event: Event) => {
  const video = event.target;
  if (!(video instanceof HTMLVideoElement)) return;
  setMediaShape(id, video.videoWidth, video.videoHeight);
};

const buildScatterLayout = (mode: 'desktop' | 'mobile' = 'desktop') => {
  const isDesktop = mode === 'desktop';
  const containerWidth = Math.max(
    280,
    Math.min(isDesktop ? 1080 : viewportWidth.value - 20, viewportWidth.value - 20),
  );
  const minWidth = isDesktop ? 225 : Math.max(150, containerWidth * 0.42);
  const maxWidth = isDesktop
    ? 325
    : Math.max(minWidth + 42, Math.min(containerWidth * 0.68, containerWidth - 52));
  const topPadding = isDesktop ? 170 : 136;
  const bottomPadding = isDesktop ? 130 : 176;
  let yCursor = topPadding;
  const positions: Record<
    string,
    { top: number; left: number; width: number; height: number; ratio: string; z: number }
  > = {};
  let previousLeft = 50;

  filtered.value.forEach((item, index) => {
    const { ratio, layerZIndex } = getScatterSeededConfig(index, item.id);
    const idSeed = hashString(item.id) + scatterLoadSeed;
    const baseWidth = minWidth + seededRandom((index + 1) * 17 + idSeed) * (maxWidth - minWidth);
    const sizedWidth = index === 0 ? baseWidth + (isDesktop ? 28 : 12) : baseWidth;
    const [ratioW, ratioH] = ratio.split('/').map((part) => Number(part.trim()) || 1);
    const fallbackRatio = ratioW / ratioH;
    const shape = mediaShape.value[item.id];
    const actualRatio = shape?.ratio ?? fallbackRatio;
    const isPortrait = (shape?.orientation ?? 'landscape') === 'portrait';
    const width = isPortrait ? sizedWidth * actualRatio : sizedWidth;
    const height = isPortrait ? sizedWidth : sizedWidth / actualRatio;
    const leftMin = isDesktop ? 10 : 18;
    const leftMax = isDesktop ? 90 : 82;
    const left = leftMin + seededRandom((index + 1) * 41 + idSeed) * (leftMax - leftMin);
    const safeLeft = Math.abs(left - previousLeft) < (isDesktop ? 11 : 9) ? left + 12 : left;
    const clampedLeft = Math.max(leftMin, Math.min(leftMax, safeLeft));
    const baseGap = isDesktop ? 10 : 30;
    const gapSpread = isDesktop ? 28 : 34;
    const overlapSpread = isDesktop ? 14 : 8;
    const gap = baseGap + seededRandom((index + 1) * 61 + idSeed) * gapSpread;
    const overlapAllowance = seededRandom((index + 1) * 73 + idSeed) * overlapSpread;

    positions[item.id] = {
      top: yCursor + height / 2,
      left: clampedLeft,
      width,
      height,
      ratio: `${width} / ${height}`,
      z: layerZIndex,
    };

    previousLeft = clampedLeft;
    yCursor +=
      height + Math.max(isDesktop ? -6 : 30, Math.min(isDesktop ? 28 : 60, gap - overlapAllowance));
  });

  const totalHeight = roundCssPx(Math.max(isDesktop ? 760 : 1720, yCursor + bottomPadding));
  return { positions, totalHeight };
};

const scatterLayout = computed(() => buildScatterLayout(isDesktopScatter() ? 'desktop' : 'mobile'));
const scatterHeight = computed(() => scatterLayout.value.totalHeight);

const getCardOpacityStyle = (id: string) => {
  if (!scatterClientReady.value) {
    return { '--overlap-opacity': '1' };
  }
  return { '--overlap-opacity': `${overlappingCardOpacity.value[id] ?? 1}` };
};

const getScatterStyle = (_index: number, id: string) => {
  const pos = scatterLayout.value.positions[id];
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
};

const getMediaShapeClass = (id: string) => {
  const orientation = mediaShape.value[id]?.orientation ?? 'landscape';
  return `is-${orientation}`;
};

const getQuoteStyle = (index: number) => {
  const presetsDesktop = [
    { top: '8%', left: '6%', maxWidth: '34ch' },
    { top: '34%', left: '52%', maxWidth: '30ch' },
    { top: '58%', left: '10%', maxWidth: '32ch' },
    { top: '80%', left: '54%', maxWidth: '34ch' },
  ];
  const presetsMobile = [
    { top: '4%', left: '4%', maxWidth: 'min(82vw, 24ch)' },
    { top: '26%', left: '4%', maxWidth: 'min(82vw, 24ch)' },
    { top: '52%', left: '8%', maxWidth: 'min(88vw, 28ch)' },
    { top: '74%', left: '8%', maxWidth: 'min(88vw, 28ch)' },
  ];

  const presets = isDesktopScatter() ? presetsDesktop : presetsMobile;
  const preset = presets[index % presets.length];
  return {
    top: preset.top,
    left: preset.left,
    maxWidth: preset.maxWidth,
  };
};

const getParallaxScrollTop = () => getParallaxScrollTopUtil(parallaxScrollTarget);

const isDesktopScatter = () => viewportWidth.value >= 971;

const recomputeOverlapOpacity = () => {
  if (!workScatter.value) {
    overlappingCardOpacity.value = {};
    return;
  }

  const cardEntries = filtered.value
    .map((item, index) => {
      const el = mediaCardEls.get(item.id);
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      const z = Number(window.getComputedStyle(el).zIndex) || 0;
      return {
        id: item.id,
        index,
        z,
        rect: { left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom },
      };
    })
    .filter(Boolean) as Array<{
    id: string;
    index: number;
    z: number;
    rect: { left: number; right: number; top: number; bottom: number };
  }>;

  const quoteRects = Array.from(quoteEls.values()).map((el) => {
    const rect = el.getBoundingClientRect();
    return getCenterProtectedRect(
      { left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom },
      isDesktopScatter()
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
  });

  const nextOpacity: Record<string, number> = {};

  cardEntries.forEach((cardA) => {
    let overlapsAsTop = false;

    for (let i = 0; i < cardEntries.length; i += 1) {
      const cardB = cardEntries[i];
      if (cardA.id === cardB.id) continue;
      if (!boxesOverlap(cardA.rect, cardB.rect)) continue;

      const isOnTop = cardA.z > cardB.z || (cardA.z === cardB.z && cardA.index > cardB.index);

      if (isOnTop) {
        overlapsAsTop = true;
        break;
      }
    }

    if (!overlapsAsTop) {
      for (let i = 0; i < quoteRects.length; i += 1) {
        if (boxesOverlap(cardA.rect, quoteRects[i])) {
          overlapsAsTop = true;
          break;
        }
      }
    }

    nextOpacity[cardA.id] = overlapsAsTop ? 0.72 : 1;
  });

  overlappingCardOpacity.value = nextOpacity;
};

const updateScatterParallax = () => {
  if (!isDesktopScatter()) {
    const scrollTop = getParallaxScrollTop();
    lastObservedScrollTop = scrollTop;
    filtered.value.forEach((item) => {
      parallaxOffsetsById[item.id] = 0;
      mediaCardEls.get(item.id)?.style.setProperty('--scatter-parallax', '0px');
    });
    return;
  }

  if (!workScatter.value) return;

  const currentScrollTop = getParallaxScrollTop();
  const previousScrollTop =
    typeof lastObservedScrollTop === 'number' ? lastObservedScrollTop : currentScrollTop;
  const delta = currentScrollTop - previousScrollTop;
  lastObservedScrollTop = currentScrollTop;

  parallaxLayers.forEach(({ id, speed }) => {
    const card = mediaCardEls.get(id);
    if (!card) return;
    const previousOffset = parallaxOffsetsById[id] || 0;
    const nextOffset = Math.max(-180, Math.min(180, previousOffset + delta * speed));
    parallaxOffsetsById[id] = nextOffset;
    card.style.setProperty('--scatter-parallax', `${nextOffset.toFixed(2)}px`);
  });
};

const scheduleOverlapRecompute = () => {
  if (overlapRecomputeTimer) {
    clearTimeout(overlapRecomputeTimer);
  }
  overlapRecomputeTimer = setTimeout(() => {
    overlapRecomputeTimer = null;
    recomputeOverlapOpacity();
  }, 120);
};

const queueParallaxUpdate = () => {
  if (typeof window === 'undefined') return;
  if (!isDesktopScatter()) return;
  if (parallaxRaf) return;
  parallaxRaf = window.requestAnimationFrame(() => {
    parallaxRaf = null;
    updateScatterParallax();
    scheduleOverlapRecompute();
  });
};

const handleParallaxScroll = () => {
  queueParallaxUpdate();
};

const handleParallaxResize = () => {
  if (typeof window === 'undefined') return;
  viewportWidth.value = window.innerWidth;
  lastObservedScrollTop = getParallaxScrollTop();
  queueParallaxUpdate();
  scheduleOverlapRecompute();
};

const handleViewportResize = () => {
  if (typeof window === 'undefined') return;
  viewportWidth.value = window.innerWidth;
  scheduleOverlapRecompute();
};

const initScatterParallax = () => {
  if (typeof window === 'undefined') return;
  if (!isDesktopScatter()) return;
  const scroller = document.querySelector('main[data-scroll-container]');
  parallaxScrollTarget = (scroller as HTMLElement) || window;
  const initialScrollTop = getParallaxScrollTop();
  lastObservedScrollTop = initialScrollTop;

  parallaxScrollTarget.addEventListener('scroll', handleParallaxScroll, { passive: true });
  window.addEventListener('resize', handleParallaxResize);
  queueParallaxUpdate();
};

onMounted(() => {
  if (typeof window !== 'undefined') {
    viewportWidth.value = window.innerWidth;
    window.addEventListener('resize', handleViewportResize, { passive: true });
  }
  initScatterParallax();
  nextTick(() => {
    if (typeof window === 'undefined') return;
    window.requestAnimationFrame(() => {
      scatterClientReady.value = true;
      scheduleOverlapRecompute();
    });
  });
});

watch(
  filtered,
  async (items) => {
    parallaxLayers = items.map((item, index) => ({
      id: item.id,
      speed: 0.08 + seededRandom((index + 1) * 23 + hashString(item.id)) * 0.2,
    }));

    const visibleIds = new Set(items.map((item) => item.id));
    const nextSequenceIndex: Record<string, number> = {};
    const nextIntroReady: Record<string, boolean> = {};
    items.forEach((item) => {
      if (!item.srcAlt) return;
      nextSequenceIndex[item.id] = videoSequenceIndex.value[item.id] ?? 0;
    });
    items.forEach((item) => {
      nextIntroReady[item.id] = item.introPlaceholder
        ? (videoIntroReady.value[item.id] ?? false)
        : true;
    });
    videoSequenceIndex.value = nextSequenceIndex;
    videoIntroReady.value = nextIntroReady;

    Object.keys(parallaxOffsetsById).forEach((id) => {
      if (!visibleIds.has(id)) delete parallaxOffsetsById[id];
    });
    Array.from(videoIntroTimers.keys()).forEach((id) => {
      if (!visibleIds.has(id)) {
        const timerId = videoIntroTimers.get(id);
        if (timerId) clearTimeout(timerId);
        videoIntroTimers.delete(id);
      }
    });

    await nextTick();
    items.forEach((item) => startVideoIntro(item));
    lastObservedScrollTop = getParallaxScrollTop();
    queueParallaxUpdate();
    recomputeOverlapOpacity();
  },
  { immediate: true },
);

onBeforeUnmount(() => {
  const target = parallaxScrollTarget || window;
  target.removeEventListener('scroll', handleParallaxScroll);
  window.removeEventListener('resize', handleParallaxResize);
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', handleViewportResize);
  }

  if (parallaxRaf) {
    window.cancelAnimationFrame(parallaxRaf);
    parallaxRaf = null;
  }
  if (overlapRecomputeTimer) {
    clearTimeout(overlapRecomputeTimer);
    overlapRecomputeTimer = null;
  }
  videoIntroTimers.forEach((timerId) => {
    clearTimeout(timerId);
  });
  videoIntroTimers.clear();
});
</script>

<style scoped>
.achievements-page {
  padding-top: calc(48px + 0.9rem);
}

.work-scatter {
  position: relative;
  min-height: var(--scatter-height);
  width: 100%;
}

.achievements-quote {
  position: absolute;
  z-index: 120;
  /* Let clicks pass through to project cards underneath. */
  pointer-events: none;
  color: var(--text-primary);
  font-family: var(--font-family-display);
  font-size: clamp(1.25rem, 1.9vw, 1.6rem);
  line-height: 1.15;
  letter-spacing: -0.05em;
  text-transform: uppercase;
  opacity: 0.97;
  transition:
    opacity 0.36s ease,
    filter 0.36s ease;
}

@media (hover: hover) and (pointer: fine) {
  .achievements-quote:hover {
    z-index: 300 !important;
    opacity: 1;
    filter: drop-shadow(0 2px 8px rgba(48, 43, 41, 0.08));
  }

  .achievements-quote:hover ~ .work-scatter-item {
    opacity: 0.9;
  }
}

.filter-buttons {
  display: flex;
  gap: 0.55rem;
}

.filter-button {
  cursor: pointer;
  border: 1px solid var(--text-primary);
  border-radius: var(--project-card-radius);
  background: transparent;
  color: var(--text-primary);
  font-family: var(--font-family-display);
  font-size: 0.72rem;
  line-height: 1;
  letter-spacing: 0.01em;
  text-transform: uppercase;
  padding: 0.5rem 0.7rem;
}

.filter-button.is-active {
  background: var(--text-primary);
  color: var(--text-inverse);
}

:global(body.dark-mode) .filter-button.is-active {
  color: #000 !important;
}

:global(body.dark-mode) .filter-button.is-active:hover,
:global(body.dark-mode) .filter-button.is-active:focus-visible {
  color: #000 !important;
}

.filter-button:hover {
  background: var(--text-primary);
  color: var(--text-inverse);
  text-decoration: none;
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
    opacity 0.36s ease,
    z-index 0.3s ease;
  will-change: transform;
}

.work-scatter-item:hover {
  opacity: 1;
  z-index: 300 !important;
}

.gallery-item {
  overflow: hidden;
}

.work-scatter-item.is-portrait {
  width: auto;
}

.item-link {
  text-decoration: none;
  color: inherit;
  display: block;
  position: relative;
  height: auto;
}

.work-scatter-item.is-portrait .item-link {
  width: fit-content;
}

.work-card-shell {
  position: relative;
  border-radius: var(--project-card-radius);
}

.work-card-shell::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  box-shadow: inset 0 0 0 1px var(--text-primary);
  pointer-events: none;
  z-index: 4;
}

.work-card {
  height: auto;
  aspect-ratio: auto;
  border-radius: var(--project-card-radius);

  box-shadow: 0 10px 24px -18px rgba(46, 38, 31, 0.24);
  transition:
    transform 0.5s ease-out,
    box-shadow 0.5s ease-out,
    border-color 0.32s ease,
    background-color 0.32s ease;
  will-change: transform;
}

.work-scatter-item.is-portrait .work-card {
  height: var(--scatter-height);
  width: fit-content;
}

.project-card {
  cursor: pointer;
}

.media {
  display: block;
  width: 100%;
  height: auto;
  object-fit: contain;
  background: transparent;
  border-radius: var(--image-radius);
  transform: translateZ(0) scale(1);
  transform-origin: center center;
  backface-visibility: hidden;
  will-change: transform;
  transition: transform 0.7s ease-out;
}

.work-scatter-item.is-portrait .media {
  width: auto;
  height: 100%;
}

@media (hover: hover) and (pointer: fine) {
  .group:hover,
  .group:focus-visible {
    z-index: 300;
  }

  .group:hover .work-card,
  .group:focus-visible .work-card {
    transform: scale(1.14);
    box-shadow: 0 30px 60px -30px rgba(46, 38, 31, 0.55);
  }

  .group:hover .media,
  .group:focus-visible .media {
    transform: translateZ(0) scale(1.8);
  }
}

.project-info {
  display: none;
}

@media (max-width: 970px) {
  .achievements-page {
    padding-top: calc(62px + 0.8rem);
  }

  .work-scatter {
    position: relative;
    min-height: var(--scatter-height);
    margin-top: 0.75rem;
  }

  .work-scatter-item {
    position: absolute;
    top: var(--scatter-top);
    left: var(--scatter-left);
    width: var(--scatter-width);
    transform: translate(-50%, calc(-50% + var(--scatter-parallax, 0px)));
    z-index: var(--scatter-z, 70);
  }

  .work-scatter-item.is-portrait {
    width: auto;
  }

  .achievements-quote {
    position: absolute;
    max-width: none !important;
    margin: 0;
    opacity: 1;
    z-index: 140;
  }

  .work-card {
    aspect-ratio: auto;
  }

  .work-scatter-item.is-portrait .work-card {
    height: var(--scatter-height);
    width: fit-content;
  }
}

.filter-button:focus,
.filter-button:focus-visible {
  box-shadow: none;
  outline: none;
}
</style>
