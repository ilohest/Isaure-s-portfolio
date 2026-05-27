<template>
  <section class="reachout-cta-section">
    <div class="reachout-cta-inner">
      <img
        class="reachout-cta-image"
        :src="imageSrc"
        alt=""
        loading="lazy"
        decoding="async"
        aria-hidden="true"
      />
      <NuxtLink
        class="portfolio-pill-link reachout-cta-link"
        :to="to"
        :aria-label="ariaLabel"
      >
        {{ label }}
      </NuxtLink>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';

type LinkTarget = string | Record<string, unknown>;

export default defineComponent({
  name: 'ReachOutCTA',
  props: {
    to: {
      type: [String, Object] as PropType<LinkTarget>,
      default: '/contact',
    },
    label: {
      type: String,
      default: 'Reach Out !',
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
.reachout-cta-section {
  padding: clamp(4rem, 7vw, 6.25rem) clamp(1.25rem, 3.5vw, 4rem)
    clamp(4.5rem, 8vw, 6.75rem);
}

.reachout-cta-inner {
  display: flex;
  width: 100%;
  align-items: flex-end;
  justify-content: space-between;
  gap: clamp(2rem, 8vw, 8rem);
}

.reachout-cta-image {
  width: clamp(15.5rem, 23vw, 25rem);
  aspect-ratio: 1;
  flex: 0 0 auto;
  border-radius: var(--image-radius, 2px);
  object-fit: cover;
}

:global(.reachout-cta-link.portfolio-pill-link) {
  min-height: clamp(4rem, 5.4vw, 5.25rem);
  gap: clamp(0.95rem, 1.35vw, 1.35rem);
  padding: clamp(1rem, 1.35vw, 1.35rem) clamp(1.9rem, 3vw, 2.85rem);
  background: var(--interactive-primary);
  border-color: var(--interactive-primary);
  color: var(--text-inverse);
  font-size: clamp(1.45rem, 2.05vw, 2.35rem);
}

:global(.reachout-cta-link.portfolio-pill-link:hover),
:global(.reachout-cta-link.portfolio-pill-link:focus-visible) {
  background: var(--interactive-primary-hover);
  border-color: var(--interactive-primary-hover);
  color: var(--text-inverse);
}

@media (max-width: 760px) {
  .reachout-cta-section {
    padding-inline: 1.125rem;
  }

  .reachout-cta-inner {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
  }

  .reachout-cta-image {
    width: min(100%, 24rem);
  }

  :global(.reachout-cta-link.portfolio-pill-link) {
    align-self: flex-end;
  }
}
</style>
