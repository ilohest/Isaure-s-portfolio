<template>
  <section
    v-if="partnerDisplaySlots.length"
    class="container mx-auto mt-2 mb-4 px-4 md:mt-4 md:mb-8 md:px-6"
  >
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
            :src="slot.logo.src"
            :alt="slot.logo.alt"
            class="partner-logo"
            loading="lazy"
            decoding="async"
          />
        </Transition>
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
  },
};
</script>

<style scoped>
.partners-intro {
  margin: 0 0 3rem;
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
  .partners-intro {
    margin-bottom: 1.6rem;
  }

  .partners-rail {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    row-gap: 0.95rem;
  }
}
</style>
