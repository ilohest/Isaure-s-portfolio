<template>
  <section class="mt-[clamp(72px,9vw,96px)]" aria-labelledby="final-cta-title">
    <div class="mx-auto w-full max-w-[1160px] px-6 text-center max-sm:px-[18px]">
      <h2
        id="final-cta-title"
        class="m-0 [font-family:var(--font-family-display)] text-[clamp(1.5rem,2.8vw,2.05rem)] uppercase tracking-[0.05em] leading-[1.08]"
      >
        Let&apos;s build something intentional.
      </h2>
      <p class="mx-auto mt-[0.95rem] mb-0 max-w-[60ch] font-light leading-[1.65]">
        Let&apos;s define the right structure for your next stage of growth.
      </p>
      <router-link
        class="portfolio-pill-link final-cta-link mx-auto mt-[1.6rem]"
        to="/contact"
      >
        Start a conversation
      </router-link>
    </div>
  </section>
</template>

<style scoped>
:global(.final-cta-link) {
  background: var(--text-primary);
  border-color: var(--text-primary);
  color: var(--text-inverse);
}

:global(.final-cta-link:hover),
:global(.final-cta-link:focus-visible) {
  background: var(--palette-yellow);
  border-color: var(--palette-yellow);
  color: var(--palette-ink);
}
</style>
