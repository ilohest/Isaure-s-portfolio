<template>
  <section class="creative-collaborations" aria-labelledby="collaborations-title">
    <div class="services-container">
      <div class="collab-note">
        <div class="collab-heading">
          <div class="collab-poster">
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
          </div>
          <h2 id="collaborations-title" class="sr-only">Select Creative Collaborations</h2>
        </div>

        <div class="collab-copy">
          <p>
            For projects that call for a wider creative direction, I bring in trusted partners
            across design, storytelling and visual production.
          </p>
          <p>
            The result is a broader studio-like process, while keeping one clear point of contact
            and a consistent level of care.
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
  /* --collab-space est l'espace vertical visé au-dessus et en dessous de cette section.
     padding-top compense le padding-bottom de ServicesGrid, padding-bottom compense
     le padding-top de FinalCTA, pour obtenir le même espace des deux côtés. */
  --collab-space: clamp(72px, 9vw, 126px);
  padding-top: calc(var(--collab-space) - clamp(36px, 5vw, 68px));
  padding-bottom: calc(var(--collab-space) - clamp(48px, 6vw, 84px));
}

.services-container {
  max-width: 1680px;
  margin: 0 auto;
  padding: 0 clamp(18px, 4.5vw, 86px);
}

.collab-note {
  --collab-width: clamp(19rem, 29vw, 27rem);
  --collab-stack-gap: clamp(1.6rem, 2vw, 2.1rem);
  background: transparent;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, var(--collab-width));
  column-gap: clamp(2rem, 8vw, 10rem);
  row-gap: 0;
  align-items: start;
}

.collab-heading {
  display: flex;
  flex-direction: column;
  min-width: 0;
  grid-column: 2;
}

.collab-poster {
  position: relative;
  width: 100%;
  aspect-ratio: 1.58 / 1;
  overflow: hidden;
  background: #0b2d42;
}

.mini-vignette {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.collab-copy {
  grid-column: 2;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: var(--collab-stack-gap);
}

.collab-copy p {
  margin: 0;
  font-weight: 300;
  font-size: clamp(1rem, 1.08vw, 1.12rem);
  line-height: 1.28;
}

.collab-copy p + p {
  margin-top: var(--collab-stack-gap);
}

@media (max-width: 768px) {
  .collab-note {
    grid-template-columns: 1fr;
    gap: 0;
  }

  .collab-heading,
  .collab-copy {
    grid-column: 1;
    justify-self: end;
    width: min(100%, 25rem);
  }
}

@media (max-width: 640px) {
  .creative-collaborations {
    padding-top: calc(
      (clamp(52px, 14vw, 76px) + clamp(64px, 17vw, 96px)) * 1.5 - clamp(36px, 5vw, 68px)
    );
    padding-bottom: calc(clamp(64px, 17vw, 96px) * 0.5);
  }

  .services-container {
    padding: 0 18px;
  }

  .collab-heading,
  .collab-copy {
    justify-self: stretch;
    width: 100%;
  }
}
</style>
