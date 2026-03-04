<template>
  <section class="mt-[clamp(56px,7vw,86px)] pb-[clamp(72px,9vw,96px)]">
    <div class="mx-auto w-full max-w-[1160px] px-6 text-center max-sm:px-[18px]">
      <router-link
        class="reachout-cta-link mx-auto inline-flex w-fit max-w-full flex-col items-center justify-center gap-[0.8rem] rounded-[2px] border px-[1.1rem] py-4 text-center text-[clamp(1.8rem,6vw,3.6rem)] uppercase tracking-[0.1em] no-underline [font-family:var(--font-family-display)] leading-[0.95] transition duration-200 ease-[ease] hover:-translate-y-[1px] sm:flex-row"
        :to="to"
        :aria-label="ariaLabel"
      >
        <span class="sm:whitespace-nowrap">{{ label }}</span>
        <img
          class="block h-[clamp(68px,8.8vw,112px)] w-[clamp(68px,8.8vw,112px)] rounded-[2px] object-cover"
          :src="imageSrc"
          alt=""
          loading="lazy"
          decoding="async"
          aria-hidden="true"
        />
      </router-link>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import type { RouteLocationRaw } from 'vue-router';

export default defineComponent({
  name: 'ReachOutCTA',
  props: {
    to: {
      type: [String, Object] as PropType<RouteLocationRaw>,
      default: '/contact',
    },
    label: {
      type: String,
      default: 'Reach Out!',
    },
    ariaLabel: {
      type: String,
      default: 'Reach out',
    },
    imageSrc: {
      type: String,
      default: '/assets/media/pages/services/daniel-neuhaus-IzXi4kyX1D0-unsplash-960.png',
    },
  },
});
</script>

<style scoped>
:global(.reachout-cta-link) {
  background: var(--text-primary);
  border-color: var(--text-primary);
  color: var(--text-inverse);
}

:global(.reachout-cta-link:hover),
:global(.reachout-cta-link:focus-visible) {
  background: var(--text-inverse);
  border-color: var(--text-primary);
  color: var(--text-primary);
}

:global(body.dark-mode) .reachout-cta-link {
  background: #fff !important;
  border-color: #302b29 !important;
  color: #302b29 !important;
}

:global(body.dark-mode a.reachout-cta-link *),
:global(body.dark-mode .reachout-cta-link *) {
  color: #302b29 !important;
}

:global(body.dark-mode) .reachout-cta-link:hover,
:global(body.dark-mode) .reachout-cta-link:focus-visible {
  background: #fff !important;
  border-color: #302b29 !important;
  color: #302b29 !important;
}
</style>
