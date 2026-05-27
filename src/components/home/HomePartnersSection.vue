<template>
  <section
    v-if="partnerDisplaySlots.length"
    class="home-partners-section flex flex-col items-center gap-8 px-4 md:px-6"
  >
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
.home-partners-section {
  width: 100%;
  margin: 0;
  padding-top: clamp(5rem, 11vw, 9rem);
  padding-bottom: clamp(4rem, 8vw, 6.5rem);
  background: var(--palette-white);
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
