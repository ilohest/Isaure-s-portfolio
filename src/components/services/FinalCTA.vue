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
        class="final-cta-link mx-auto mt-[1.6rem] inline-flex w-full max-w-[360px] justify-center rounded-full border px-4 py-[0.82rem] text-[0.86rem] uppercase tracking-[0.09em] no-underline [font-family:var(--font-family-display)] transition duration-200 ease-[ease]"
        to="/contact"
      >
        <span>Start a conversation</span>
      </router-link>
    </div>
  </section>
</template>

<style scoped>
:global(.final-cta-link) {
  background: var(--text-primary);
  border-color: var(--text-primary);
  color: var(--text-inverse);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background-color 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease;
}

:global(.final-cta-link:hover),
:global(.final-cta-link:focus-visible) {
  background: var(--surface-accent);
  border-color: var(--surface-accent);
  color: var(--text-inverse);
  transform: translateY(-2px);
}
</style>
