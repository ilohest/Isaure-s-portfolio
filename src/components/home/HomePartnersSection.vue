<template>
  <section
    v-if="partnerDisplaySlots.length"
    class="container mx-auto mt-2 mb-8 flex flex-col items-center gap-8 px-4 md:my-8 md:px-6"
  >
    <router-link
      to="/achievements"
      class="see-all-work-link inline-flex items-center justify-center rounded-[2px] border px-4 py-[0.72rem] [font-family:var(--font-family-display)] text-[0.84rem] tracking-[0.09em] uppercase no-underline transition duration-200 ease-[ease]"
    >
      <span>See all my work</span>
    </router-link>

    <div class="flex flex-col items-center gap-3">
      <p class="partners-intro font-display uppercase">
        Some partners I had the chance to collaborate with
      </p>

      <div class="partners-rail" aria-label="Partners carousel">
        <div
          v-for="slot in partnerDisplaySlots"
          :key="`partner-slot-${slot.slotIndex}`"
          class="partner-slot"
        >
          <Transition name="partner-fade" mode="out-in">
            <img
              :key="slot.renderKey"
              :src="getLogoSrc(slot.logo)"
              :alt="slot.logo.alt"
              class="partner-logo"
              loading="lazy"
              decoding="async"
            />
          </Transition>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HomePartnersSection',
  props: {
    partnerDisplaySlots: {
      type: Array,
      required: true,
    },
    isDark: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    getLogoSrc(logo) {
      if (!logo) return '';
      if (this.isDark && logo.whiteSrc) return logo.whiteSrc;
      return logo.src || '';
    },
  },
};
</script>

<style scoped>
:global(.see-all-work-link) {
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

:global(.see-all-work-link:hover),
:global(.see-all-work-link:focus-visible) {
  background: var(--text-inverse);
  border-color: var(--text-primary);
  color: var(--text-primary);
  transform: translateY(-2px);
  box-shadow: 0 10px 24px rgba(48, 43, 41, 0.18);
}

:global(body.dark-mode) .see-all-work-link {
  background: #fff !important;
  border-color: #302b29 !important;
  color: #302b29 !important;
}

:global(body.dark-mode) .see-all-work-link:hover,
:global(body.dark-mode) .see-all-work-link:focus-visible {
  background: #fff !important;
  border-color: #302b29 !important;
  color: #302b29 !important;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.22);
}

.partners-intro {
  font-size: clamp(1.05rem, 1.8vw, 1.35rem);
  line-height: 1.2;
  letter-spacing: 0.015em;
  color: var(--text-primary);
  text-align: center;
}

.partners-rail {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.6rem;
  align-items: stretch;
}

.partner-slot {
  min-height: 86px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 0.35rem;
}

.partner-logo {
  display: block;
  max-width: 100%;
  max-height: 52px;
  width: auto;
  height: auto;
  object-fit: contain;
}

.partner-fade-enter-active,
.partner-fade-leave-active {
  transition:
    opacity 0.55s ease,
    transform 0.55s cubic-bezier(0.22, 0.61, 0.36, 1);
}

.partner-fade-enter-from,
.partner-fade-leave-to {
  opacity: 0;
  transform: translateY(8px) scale(0.98);
}

@media (max-width: 970px) {
  .partners-cta {
    margin-bottom: 1rem;
  }

  .partners-rail {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    row-gap: 0.95rem;
  }
}
</style>
