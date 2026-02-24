<!-- src/components/Achievements.vue -->
<template>
  <section
    class="relative top-[15px] container mx-auto flex flex-col gap-4 px-4 pb-4 md:top-[40px] md:px-6 md:pb-8"
  >
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
        :style="[getScatterStyle(index, p.id), getCardOpacityStyle(p.id)]"
        :ref="setMediaCardRef(p.id)"
      >
        <router-link :to="p.to" class="item-link project-card group">
          <div class="work-card relative overflow-hidden">
            <img
              v-show="!p.src || !videoLoaded[p.id]"
              :src="p.placeholder"
              :alt="`Image of ${p.title}`"
              class="media h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <video
              v-if="p.src"
              v-show="videoLoaded[p.id]"
              :src="p.src"
              :ref="setVideoRef(p.id)"
              playsinline
              autoplay
              loop
              muted
              preload="auto"
              class="media h-full w-full object-cover"
              @loadeddata="markVideoAsLoaded(p.id)"
              @mouseover="pauseVideo(p.id)"
              @mouseout="playVideo(p.id)"
            ></video>

            <div class="project-info">
              <span>{{ p.title }}</span>
              <span>{{ p.year }}</span>
            </div>
          </div>
        </router-link>
      </div>
    </div>

    <router-view />
  </section>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import {
  boxesOverlap,
  getParallaxScrollTop as getParallaxScrollTopUtil,
  hashString,
  isDesktopScatter as isDesktopScatterUtil,
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
  src?: string;
  to: string;
  category: Exclude<CategoryFilter, 'all'>;
};

const webItems: GalleryItem[] = webdev.map((x) => ({
  id: `web-${x.id}`,
  title: x.title,
  year: x.year,
  order: Number(x.order ?? `${x.year}00`),
  placeholder: x.placeholder,
  src: x.src,
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

const hiddenAchievementTitles = new Set([
  'creyda yoga',
  'didacmania',
  'the perfect hamburger',
]);

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
  'I am attentive to detail, balance, and breathing space. These are what transform a functional project into a meaningful experience.',
  'I work with attention. Listening is not a step in the process - it is the starting point.',
  'I believe projects have a soul before they have a shape. My role is to give them structure, rhythm, and presence.',
  'Every profession carries its own language, codes, and nuances. Discovering them is an endless source of inspiration for me.',
];

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
const videoEls = new Map<string, HTMLVideoElement>();
const mediaCardEls = new Map<string, HTMLElement>();
const quoteEls = new Map<number, HTMLElement>();
const overlappingCardOpacity = ref<Record<string, number>>({});

let parallaxRaf: number | null = null;
let parallaxScrollTarget: Window | HTMLElement = window;
let lastParallaxScrollTop: number | null = null;
let overlapRecomputeTimer: ReturnType<typeof setTimeout> | null = null;
const parallaxOffsetsById: Record<string, number> = {};

const setVideoRef = (id: string) => (el: Element | null) => {
  if (el instanceof HTMLVideoElement) {
    videoEls.set(id, el);
    return;
  }
  videoEls.delete(id);
};

const setMediaCardRef = (id: string) => (el: Element | null) => {
  if (el instanceof HTMLElement) {
    mediaCardEls.set(id, el);
    return;
  }
  mediaCardEls.delete(id);
};

const setQuoteRef = (index: number) => (el: Element | null) => {
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
  const el = videoEls.get(id);
  if (!el) return;
  void el.play();
};

// New random layout seed on each page load while keeping order-based flow.
const scatterLoadSeed = Math.floor(Math.random() * 1000000);

const getScatterSeededConfig = (index: number, id: string) => {
  const idSeed = hashString(id) + scatterLoadSeed;
  const width = 210 + seededRandom((index + 1) * 17 + idSeed) * 85;
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

const buildDesktopLayout = () => {
  const topPadding = 90;
  const bottomPadding = 130;
  let yCursor = topPadding;
  const positions: Record<string, { top: number; left: number; width: number; ratio: string; z: number }> = {};
  let previousLeft = 50;

  filtered.value.forEach((item, index) => {
    const { width, ratio, height, left, layerZIndex, gap, overlapAllowance } = getScatterSeededConfig(index, item.id);
    const safeLeft = Math.abs(left - previousLeft) < 11 ? left + 12 : left;
    const clampedLeft = Math.max(10, Math.min(90, safeLeft));

    positions[item.id] = {
      top: yCursor + height / 2,
      left: clampedLeft,
      width,
      ratio,
      z: layerZIndex,
    };

    previousLeft = clampedLeft;
    // Allow slight overlap while keeping it bounded for readability.
    yCursor += height + Math.max(-14, Math.min(28, gap - overlapAllowance));
  });

  const totalHeight = Math.max(760, yCursor + bottomPadding);
  return { positions, totalHeight };
};

const desktopLayout = computed(() => buildDesktopLayout());
const scatterHeight = computed(() => desktopLayout.value.totalHeight);

const getCardOpacityStyle = (id: string) => {
  return { '--overlap-opacity': `${overlappingCardOpacity.value[id] ?? 1}` };
};

const getScatterStyle = (_index: number, id: string) => {
  const pos = desktopLayout.value.positions[id];
  if (!pos) {
    return {};
  }

  return {
    '--scatter-left': `${pos.left}%`,
    '--scatter-top': `${pos.top.toFixed(0)}px`,
    '--scatter-parallax': '0px',
    '--scatter-width': `${pos.width.toFixed(0)}px`,
    '--scatter-ratio': pos.ratio,
    '--scatter-z': `${pos.z}`,
  };
};

const getQuoteStyle = (index: number) => {
  const presets = [
    { top: '8%', left: '6%', maxWidth: '34ch' },
    { top: '34%', left: '52%', maxWidth: '30ch' },
    { top: '58%', left: '10%', maxWidth: '32ch' },
    { top: '80%', left: '54%', maxWidth: '34ch' },
  ];

  const preset = presets[index % presets.length];
  return {
    top: preset.top,
    left: preset.left,
    maxWidth: preset.maxWidth,
  };
};

const getParallaxScrollTop = () => getParallaxScrollTopUtil(parallaxScrollTarget);

const isDesktopScatter = () => isDesktopScatterUtil(971);

const recomputeOverlapOpacity = () => {
  if (!isDesktopScatter() || !workScatter.value) {
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
    return { left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom };
  });

  const nextOpacity: Record<string, number> = {};

  cardEntries.forEach((cardA) => {
    let overlapsAsTop = false;

    for (let i = 0; i < cardEntries.length; i += 1) {
      const cardB = cardEntries[i];
      if (cardA.id === cardB.id) continue;
      if (!boxesOverlap(cardA.rect, cardB.rect)) continue;

      const isOnTop =
        cardA.z > cardB.z || (cardA.z === cardB.z && cardA.index > cardB.index);

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
    lastParallaxScrollTop = getParallaxScrollTop();
    filtered.value.forEach((item) => {
      parallaxOffsetsById[item.id] = 0;
      mediaCardEls.get(item.id)?.style.setProperty('--scatter-parallax', '0px');
    });
    return;
  }

  if (!workScatter.value) return;

  const currentScrollTop = getParallaxScrollTop();
  const previousScrollTop =
    typeof lastParallaxScrollTop === 'number' ? lastParallaxScrollTop : currentScrollTop;
  const delta = currentScrollTop - previousScrollTop;
  lastParallaxScrollTop = currentScrollTop;

  filtered.value.forEach((item, index) => {
    const card = mediaCardEls.get(item.id);
    if (!card) return;
    const layerSpeed = 0.08 + seededRandom((index + 1) * 23 + hashString(item.id)) * 0.2;
    const previousOffset = parallaxOffsetsById[item.id] || 0;
    const nextOffset = Math.max(-180, Math.min(180, previousOffset + delta * layerSpeed));
    parallaxOffsetsById[item.id] = nextOffset;
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
  if (parallaxRaf) return;
  parallaxRaf = window.requestAnimationFrame(() => {
    parallaxRaf = null;
    updateScatterParallax();
    scheduleOverlapRecompute();
  });
};

const initScatterParallax = () => {
  const scroller = document.querySelector('main[data-scroll-container]');
  parallaxScrollTarget = (scroller as HTMLElement) || window;
  lastParallaxScrollTop = getParallaxScrollTop();

  parallaxScrollTarget.addEventListener('scroll', queueParallaxUpdate, { passive: true });
  window.addEventListener('resize', queueParallaxUpdate);
  queueParallaxUpdate();
};

onMounted(() => {
  initScatterParallax();
});

watch(
  filtered,
  async (items) => {
    const visibleIds = new Set(items.map((item) => item.id));

    Object.keys(parallaxOffsetsById).forEach((id) => {
      if (!visibleIds.has(id)) delete parallaxOffsetsById[id];
    });

    await nextTick();
    queueParallaxUpdate();
    recomputeOverlapOpacity();
  },
  { immediate: true },
);

onBeforeUnmount(() => {
  const target = parallaxScrollTarget || window;
  target.removeEventListener('scroll', queueParallaxUpdate);
  window.removeEventListener('resize', queueParallaxUpdate);

  if (parallaxRaf) {
    window.cancelAnimationFrame(parallaxRaf);
    parallaxRaf = null;
  }
  if (overlapRecomputeTimer) {
    clearTimeout(overlapRecomputeTimer);
    overlapRecomputeTimer = null;
  }
});
</script>

<style scoped>
.work-scatter {
  position: relative;
  min-height: var(--scatter-height);
  width: 100%;
  margin-top: 0.75rem;
}

.achievements-quote {
  position: absolute;
  z-index: 20;
  pointer-events: auto;
  color: var(--main-black);
  font-family: var(--font-family-display);
  line-height: 1.9167rem;
  font-size: 2rem;
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
  border: 1px solid var(--main-black);
  border-radius: 2px;
  background: transparent;
  color: var(--main-black);
  font-family: var(--font-family-display);
  font-size: 0.72rem;
  line-height: 1;
  letter-spacing: 0.01em;
  text-transform: uppercase;
  padding: 0.5rem 0.7rem;
}

.filter-button.is-active {
  background: var(--main-black);
  color: var(--main-white);
}

.filter-button:hover {
  background: var(--main-black);
  color: var(--main-white);
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

.gallery-item {
  overflow: hidden;
}

.item-link {
  text-decoration: none;
  color: inherit;
  display: block;
  position: relative;
  height: 100%;
}

.work-card {
  height: auto;
  aspect-ratio: var(--scatter-ratio, 4 / 5);
  border: 1px solid var(--main-black);
}

.project-card {
  cursor: pointer;
}

.media {
  object-fit: cover;
  transition: transform 0.3s ease;
}

.group:hover .media {
  transform: scale(1.05);
}

.project-info {
  display: none;
}

@media (max-width: 970px) {
  .work-scatter {
    position: static;
    min-height: 0;
    margin-top: 0.75rem;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.75rem;
  }

  .work-scatter-item {
    position: relative;
    inset: auto;
    width: 100%;
    transform: none !important;
    z-index: 1 !important;
  }

  .achievements-quote {
    position: static;
    max-width: none !important;
    margin-bottom: 0.75rem;
    opacity: 1;
    font-size: 1.5rem;
    z-index: 260;
  }

  .work-card {
    aspect-ratio: 3 / 4;
  }
}

@media (max-width: 628px) {
  .work-scatter {
    grid-template-columns: 1fr;
    margin-bottom: 80px;
  }

  .work-card {
    aspect-ratio: 1 / 1;
  }
}

.filter-button:focus,
.filter-button:focus-visible {
  box-shadow: none;
  outline: none;
}
</style>
