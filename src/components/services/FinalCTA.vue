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
        class="final-cta-link mx-auto mt-[1.6rem] inline-flex w-full max-w-[360px] justify-center rounded-[2px] border px-4 py-[0.82rem] text-[0.86rem] uppercase tracking-[0.09em] no-underline [font-family:var(--font-family-display)] transition duration-200 ease-[ease]"
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
  background: var(--text-inverse);
  border-color: var(--text-primary);
  color: var(--text-primary);
  transform: translateY(-2px);
  box-shadow: 0 10px 24px rgba(48, 43, 41, 0.2);
}

:global(body.dark-mode) .final-cta-link {
  background: #fff !important;
  border-color: #302b29 !important;
  color: #302b29 !important;
}

:global(.dark-mode a.final-cta-link),
:global(.dark-mode .final-cta-link) {
  background: #fff !important;
  border-color: #302b29 !important;
  color: #302b29 !important;
}

:global(body.dark-mode a.final-cta-link *),
:global(body.dark-mode .final-cta-link *) {
  color: #302b29 !important;
}

:global(body.dark-mode a.final-cta-link:hover *),
:global(body.dark-mode a.final-cta-link:focus-visible *),
:global(body.dark-mode .final-cta-link:hover *),
:global(body.dark-mode .final-cta-link:focus-visible *) {
  color: #302b29 !important;
}

:global(body.dark-mode) .final-cta-link:hover,
:global(body.dark-mode) .final-cta-link:focus-visible {
  background: #fff !important;
  border-color: #302b29 !important;
  color: #302b29 !important;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.28);
}
</style>
