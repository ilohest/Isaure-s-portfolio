<template>
  <section class="final-cta" aria-labelledby="final-cta-title">
    <div class="mx-auto w-full max-w-[1160px] px-6 text-center max-sm:px-[18px]">
      <h2
        id="final-cta-title"
        class="m-0 [font-family:var(--font-family-display)] text-[clamp(1.5rem,2.8vw,2.05rem)] uppercase tracking-[0.05em] leading-[1.08]"
      >
        Let&apos;s build something intentional.
      </h2>
      <p class="final-cta-copy mx-auto mb-0 max-w-[60ch] font-light leading-[1.65]">
        Tell me where you are headed, and we will shape the right next step.
      </p>
      <a
        class="portfolio-pill-link final-cta-link mx-auto"
        href="/contact"
      >
        Start a conversation
      </a>
    </div>
  </section>
</template>

<style scoped>
.final-cta {
  margin-top: clamp(56px, 6vw, 84px);
  padding-top: clamp(18px, 2.5vw, 32px);
  padding-bottom: clamp(56px, 6vw, 84px);
}

.final-cta-copy {
  margin-top: 2.3rem;
}

.final-cta-link {
  margin-top: 3.15rem;
}

@media (max-width: 640px) {
  .final-cta {
    margin-top: clamp(44px, 13vw, 68px);
    padding-top: clamp(12px, 5vw, 28px);
    padding-bottom: clamp(44px, 13vw, 68px);
  }
}

:global(.final-cta-link) {
  background: var(--text-primary);
  border-color: var(--text-primary);
  color: var(--text-inverse);
}

/* Hover aligné sur le bouton « Get in touch » de la page d'accueil. */
:global(.final-cta-link:hover),
:global(.final-cta-link:focus-visible) {
  background: var(--interactive-primary);
  border-color: var(--interactive-primary);
  color: var(--text-inverse);
}
</style>
