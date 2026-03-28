<template>
  <div class="tangle-hero-separator-wrap" aria-hidden="true">
    <!-- SVG Separator Light -->
    <svg
      viewBox="0 0 25030 4621"
      xmlns="http://www.w3.org/2000/svg"
      class="tangle-hero-separator tangle-hero-separator--light"
      preserveAspectRatio="none"
      style="overflow: visible"
    >
      <path
        id="separator-fill"
        d="M0 4620.83
       C15.369 4598.71 220.19 4454.71 639.817 4279.12
       C786.801 4217.61 800.299 4269.54 2583.45 3844.07
       C3424.92 3643.29 3491.8 3453.45 3916.85 3329.34
       C4514.39 3154.85 4521.64 3189.63 5141.71 3141.66
       C6854.26 3009.16 7370.81 2787.5 7783.58 2718.2
       C9691.45 2397.86 10854.8 2330.48 11561.7 2077
       C12130.8 1872.91 12630.2 1674.01 13815.4 1402.27
       C14436.8 1259.78 14439.1 1267.39 15076.8 1253.04
       C16200.2 1227.75 16200.4 1245.4 16951.3 1195.81
       C17097.1 1186.18 18823.7 1036.7 19185.5 1012.14
       C20151.4 946.556 21293.9 964.572 21532.8 946.438
       C21612.7 940.376 21883.4 921.101 22206.2 783.613
       C22626.8 604.521 22999.5 468.092 23145.9 417.071
       C23331.7 352.351 24155.5 303.159 24232.2 287.685
       C24388.6 256.171 24574.2 149.341 24585.3 143.865
       C24678.7 100.355 24819.7 51.296 24936.2 15.318
       C24959.6 9.07 24975.9 12.495 25029.2 0
       L0 0 
       Z"
        fill="#4C5EF7"
      />

      <path
        id="separator-path-light"
        d="M0 4620.83
       C15.369 4598.71 220.19 4454.71 639.817 4279.12
       C786.801 4217.61 800.299 4269.54 2583.45 3844.07
       C3424.92 3643.29 3491.8 3453.45 3916.85 3329.34
       C4514.39 3154.85 4521.64 3189.63 5141.71 3141.66
       C6854.26 3009.16 7370.81 2787.5 7783.58 2718.2
       C9691.45 2397.86 10854.8 2330.48 11561.7 2077
       C12130.8 1872.91 12630.2 1674.01 13815.4 1402.27
       C14436.8 1259.78 14439.1 1267.39 15076.8 1253.04
       C16200.2 1227.75 16200.4 1245.4 16951.3 1195.81
       C17097.1 1186.18 18823.7 1036.7 19185.5 1012.14
       C20151.4 946.556 21293.9 964.572 21532.8 946.438
       C21612.7 940.376 21883.4 921.101 22206.2 783.613
       C22626.8 604.521 22999.5 468.092 23145.9 417.071
       C23331.7 352.351 24155.5 303.159 24232.2 287.685
       C24388.6 256.171 24574.2 149.341 24585.3 143.865
       C24678.7 100.355 24819.7 51.296 24936.2 15.318
       C24959.6 9.07 24975.9 12.495 25029.2 0"
        fill="none"
        transform="translate(0, 660)"
      />

      <text class="separator-marquee">
        <textPath href="#separator-path-light" :startOffset="lightMarqueeOffset" dy="260">
          ✺ scroll to discover the process ✺ scroll to discover the process ✺ scroll to discover
          the process ✺ scroll to discover the process ✺ scroll to discover the process ✺ scroll to
          discover the process ✺ scroll to discover the process ✺ scroll to discover the process ✺
          <animate
            v-if="enableSeparatorMotion"
            attributeName="startOffset"
            from="0%"
            to="-100%"
            dur="42s"
            repeatCount="indefinite"
          />
        </textPath>
      </text>
    </svg>

    <!-- SVG Separator Dark -->
    <svg
      viewBox="0 0 25030 4621"
      xmlns="http://www.w3.org/2000/svg"
      class="tangle-hero-separator tangle-hero-separator--dark"
      preserveAspectRatio="none"
      style="overflow: visible"
    >
      <path
        id="separator-fill"
        d="M0 4620.83C15.369 4598.71 220.19 4454.71 639.817 4279.12C786.801 4217.61 800.299 4269.54 2583.45 3844.07C3424.92 3643.29 3491.8 3453.45 3916.85 3329.34C4514.39 3154.85 4521.64 3189.63 5141.71 3141.66C6854.26 3009.16 7370.81 2787.5 7783.58 2718.2C9691.45 2397.86 10854.8 2330.48 11561.7 2077C12130.8 1872.91 12630.2 1674.01 13815.4 1402.27C14436.8 1259.78 14439.1 1267.39 15076.8 1253.04C16200.2 1227.75 16200.4 1245.4 16951.3 1195.81C17097.1 1186.18 18823.7 1036.7 19185.5 1012.14C20151.4 946.556 21293.9 964.572 21532.8 946.438C21612.7 940.376 21883.4 921.101 22206.2 783.613C22626.8 604.521 22999.5 468.092 23145.9 417.071C23331.7 352.351 24155.5 303.159 24232.2 287.685C24388.6 256.171 24574.2 149.341 24585.3 143.865C24678.7 100.355 24819.7 51.296 24936.2 15.318C24959.6 9.07 24975.9 12.495 25029.2 0L29.608 13.487L0.001 4620.83H0Z"
        fill="#302B29"
      />
      <path
        id="separator-path-dark"
        d="M0 4620.83
       C15.369 4598.71 220.19 4454.71 639.817 4279.12
       C786.801 4217.61 800.299 4269.54 2583.45 3844.07
       C3424.92 3643.29 3491.8 3453.45 3916.85 3329.34
       C4514.39 3154.85 4521.64 3189.63 5141.71 3141.66
       C6854.26 3009.16 7370.81 2787.5 7783.58 2718.2
       C9691.45 2397.86 10854.8 2330.48 11561.7 2077
       C12130.8 1872.91 12630.2 1674.01 13815.4 1402.27
       C14436.8 1259.78 14439.1 1267.39 15076.8 1253.04
       C16200.2 1227.75 16200.4 1245.4 16951.3 1195.81
       C17097.1 1186.18 18823.7 1036.7 19185.5 1012.14
       C20151.4 946.556 21293.9 964.572 21532.8 946.438
       C21612.7 940.376 21883.4 921.101 22206.2 783.613
       C22626.8 604.521 22999.5 468.092 23145.9 417.071
       C23331.7 352.351 24155.5 303.159 24232.2 287.685
       C24388.6 256.171 24574.2 149.341 24585.3 143.865
       C24678.7 100.355 24819.7 51.296 24936.2 15.318
       C24959.6 9.07 24975.9 12.495 25029.2 0"
        fill="none"
        transform="translate(0, 660)"
      />

      <text class="separator-marquee">
        <textPath href="#separator-path-dark" :startOffset="darkMarqueeOffset" dy="260">
          ✺ scroll to see my newest work ✺ scroll to see my newest work ✺ scroll to see my newest
          work ✺ scroll to see my newest work ✺ scroll to see my newest work ✺ scroll to see my
          newest work ✺ scroll to see my newest work ✺ scroll to see my newest work ✺
          <animate
            v-if="enableSeparatorMotion"
            attributeName="startOffset"
            from="-100%"
            to="0%"
            dur="42s"
            repeatCount="indefinite"
          />
        </textPath>
      </text>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

const MOBILE_BREAKPOINT_PX = 628;
const MOBILE_START_OFFSET_PAD_PERCENT = 14;

const isMobile = ref(false);
const enableSeparatorMotion = ref(true);

const lightMarqueeOffset = computed(() =>
  isMobile.value || !enableSeparatorMotion.value ? `${MOBILE_START_OFFSET_PAD_PERCENT}%` : '0%',
);

const darkMarqueeOffset = computed(() =>
  isMobile.value || !enableSeparatorMotion.value ? `${MOBILE_START_OFFSET_PAD_PERCENT}%` : '-100%',
);

let mediaQueryList: MediaQueryList | null = null;
let handleMediaChange: ((event: MediaQueryListEvent) => void) | null = null;

onMounted(() => {
  const query = `(max-width: ${MOBILE_BREAKPOINT_PX}px)`;
  mediaQueryList = window.matchMedia(query);

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveData = Boolean(navigator.connection?.saveData);
  const lowCpuCount =
    typeof navigator.hardwareConcurrency === 'number' && navigator.hardwareConcurrency <= 4;

  isMobile.value = mediaQueryList.matches;
  // Keep the marquee moving on mobile when the device can likely handle it.
  enableSeparatorMotion.value = !(reducedMotion || saveData || lowCpuCount);

  handleMediaChange = (event) => {
    isMobile.value = event.matches;
  };

  mediaQueryList.addEventListener?.('change', handleMediaChange);
});

onBeforeUnmount(() => {
  if (mediaQueryList && handleMediaChange) {
    mediaQueryList.removeEventListener?.('change', handleMediaChange);
  }
});
</script>

<style scoped>
.tangle-hero-separator-wrap {
  background: var(--surface-base);
}

.tangle-hero-separator {
  width: 100%;
  height: 160px;
  display: block;
  overflow: visible;
  transform: translateY(-1px);
}

@media screen and (max-width: 628px) {
  .tangle-hero-separator {
    height: 60px;
  }
}

.separator-marquee {
  font-family: var(--font-family-script);
  text-transform: uppercase;
  letter-spacing: 0.3em;
  fill: var(--text-primary);
  font-size: 700px;
}

@media screen and (max-width: 628px) {
  .separator-marquee {
    font-size: 760px;
  }
}

.tangle-hero-separator--dark {
  display: none;
}

.dark-mode .tangle-hero-separator--light {
  display: none;
}

.dark-mode .tangle-hero-separator--dark {
  display: block;
}
</style>
