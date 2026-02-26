<template>
  <section class="mt-[clamp(56px,7vw,86px)] pb-[clamp(72px,9vw,96px)]">
    <div class="mx-auto w-full max-w-[1160px] px-6 text-center max-sm:px-[18px]">
      <router-link
        class="reachout-cta-link mx-auto inline-flex w-full max-w-[560px] items-center justify-center gap-[0.8rem] rounded-[2px] border px-[1.1rem] py-4 text-[clamp(2rem,5vw,3.6rem)] uppercase tracking-[0.1em] no-underline [font-family:var(--font-family-display)] leading-none transition duration-200 ease-[ease] hover:-translate-y-[1px]"
        to="/contact"
        aria-label="Reach out"
      >
        <span class="whitespace-nowrap">Reach Out!</span>
        <img
          class="block h-[clamp(68px,8.8vw,112px)] w-[clamp(68px,8.8vw,112px)] rounded-[2px] object-cover"
          :src="'/assets/media/pages/services/daniel-neuhaus-IzXi4kyX1D0-unsplash-960.png'"
          alt=""
          loading="lazy"
          decoding="async"
          aria-hidden="true"
        />
      </router-link>
    </div>
  </section>
</template>

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
