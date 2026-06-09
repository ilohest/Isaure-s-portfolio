<template>
  <section class="creative-collaborations" aria-labelledby="collaborations-title">
    <div class="services-container">
      <div class="collab-note">
        <div class="collab-heading">
          <div class="mini-vignette-wrap">
            <picture>
              <source v-if="collabAvifSrcset" type="image/avif" :srcset="collabAvifSrcset" />
              <img
                class="mini-vignette"
                src="/assets/media/pages/services/giulia-squillace-SVFyJiVP_v0-unsplash-960.png"
                alt="Creative collaborations visual"
                loading="lazy"
                decoding="async"
              />
            </picture>
            <h2 id="collaborations-title" class="collab-overlay-title">
              <span class="word-select">Select</span>
              <span class="word-creative">Creative</span>
              <span class="word-collaborations">Collaborations</span>
            </h2>
          </div>
        </div>

        <div class="collab-copy">
          <p>
            For projects that call for a wider creative direction, I bring in trusted partners across
            design, storytelling and visual production.
          </p>
          <p>
            The result is a broader studio-like process, while keeping one clear point of contact and a
            consistent level of care.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'CreativeCollaborations',
  props: {
    collabAvifSrcset: {
      type: String,
      default: '',
    },
  },
};
</script>

<style scoped>
.creative-collaborations {
  margin-top: clamp(24px, 2.4vw, 32px);
}

.services-container {
  max-width: 1160px;
  margin: 0 auto;
  padding: 0 24px;
}

.collab-note {
  --collab-pad: clamp(24px, 3vw, 32px);
  border: 1px solid var(--text-primary);
  background: transparent;
  border-radius: 2px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.5fr);
  gap: 0;
  overflow: hidden;
}

.collab-heading {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.mini-vignette-wrap {
  position: relative;
  height: 100%;
}

.mini-vignette {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: contain;
}

.collab-overlay-title {
  position: absolute;
  inset: 0;
  margin: 0;
  font-family: var(--font-family-display);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  line-height: 1.08;
  font-size: clamp(1.1rem, 2.1vw, 1.6rem);
  color: #fff;
  text-shadow: 0 1px 8px rgba(0, 0, 0, 0.45);
  pointer-events: none;
}

.word-select,
.word-creative,
.word-collaborations {
  position: absolute;
}

.word-select {
  top: 10px;
  left: 10px;
}

.word-creative {
  top: 10px;
  right: 10px;
}

.word-collaborations {
  bottom: 10px;
  left: 10px;
}

.collab-copy {
  min-width: 0;
  padding: var(--collab-pad);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.collab-copy p {
  margin: 0;
  font-weight: 300;
  line-height: 1.65;
}

.collab-copy p + p {
  margin-top: 0.72rem;
}

@media (max-width: 768px) {
  .collab-note {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .services-container {
    padding: 0 18px;
  }
}
</style>
