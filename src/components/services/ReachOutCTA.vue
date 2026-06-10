<template>
  <section class="reachout-cta-section">
    <div class="reachout-cta-inner">
      <figure class="reachout-cta-visual" aria-hidden="true">
        <picture>
          <source v-if="imageAvifSrcset" type="image/avif" :srcset="imageAvifSrcset" />
          <img
            class="reachout-cta-image"
            :src="imageSrc"
            alt=""
            loading="lazy"
            decoding="async"
            aria-hidden="true"
          />
        </picture>
      </figure>
      <a
        class="portfolio-pill-link reachout-cta-link"
        :href="typeof to === 'string' ? to : '/contact'"
        :aria-label="ariaLabel"
      >
        {{ label }}
      </a>
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
    imageAvifSrcset: {
      type: String,
      default: '',
    },
  },
});
</script>

<style scoped>
.reachout-cta-section {
  padding: clamp(4rem, 7vw, 6.25rem) 0 clamp(4.5rem, 8vw, 6.75rem);
}

.reachout-cta-inner {
  display: flex;
  width: min(100%, 1680px);
  align-items: flex-end;
  justify-content: space-between;
  gap: clamp(2rem, 8vw, 8rem);
  margin: 0 auto;
  padding: 0 clamp(18px, 4.5vw, 86px);
}

.reachout-cta-visual {
  position: relative;
  flex: 0 0 auto;
  width: clamp(15.5rem, 23vw, 25rem);
  margin: 0;
  isolation: isolate;
}

.reachout-cta-visual picture {
  display: block;
}

.reachout-cta-image {
  display: block;
  width: 100%;
  aspect-ratio: 1;
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
  .reachout-cta-inner {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
    padding-inline: 18px;
  }

  .reachout-cta-image {
    display: block;
    margin-inline: auto;
  }

  .reachout-cta-visual {
    align-self: center;
    width: min(100%, 24rem);
  }

  :global(.reachout-cta-link.portfolio-pill-link) {
    align-self: flex-end;
  }
}

</style>
