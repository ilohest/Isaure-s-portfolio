<template>
  <section class="editorial-timeline" aria-labelledby="editorial-timeline-title">
    <div class="timeline-container">
      <h2 id="editorial-timeline-title" class="timeline-kicker">Process</h2>

      <div class="timeline-grid">
        <article v-for="item in timelineItems" :key="item.step" class="timeline-item">
          <p class="timeline-step">{{ item.step }}</p>
          <h3 class="timeline-title">{{ item.title }}</h3>
          <p class="timeline-description">{{ item.description }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'EditorialTimeline',
  data() {
    return {
      timelineItems: [
        {
          step: '01',
          title: 'Initial consultation',
          description: 'Getting to know you & your brand',
        },
        {
          step: '02',
          title: 'Proposal & agreement',
          description: 'Project scope, timeline & quote',
        },
        {
          step: '03',
          title: 'Planning & strategy',
          description: 'Use cases & site structure',
        },
        {
          step: '04',
          title: 'Design phase',
          description: 'Visual identity & UI',
        },
        {
          step: '05',
          title: 'Development',
          description: 'From design to live code',
        },
        {
          step: '06',
          title: 'Testing & quality assurance',
          description: 'Bugs, performance & polish',
        },
        {
          step: '07',
          title: 'Launch & training',
          description: 'Going live',
        },
        {
          step: '08',
          title: 'Post-launch support',
          description: 'Keeping things running smoothly',
        },
      ],
    };
  },
};
</script>

<style scoped>
.editorial-timeline {
  margin-top: clamp(76px, 9vw, 110px);
  padding: clamp(84px, 10vw, 112px) 0;
  background: color-mix(in srgb, var(--surface-muted) 42%, #ffffff);
  border-top: 1px solid var(--text-primary);
  border-bottom: 1px solid var(--text-primary);
}

:global(body.dark-mode) .editorial-timeline {
  background: #302b29 !important;
}

:global(.dark-mode .editorial-timeline) {
  background: #302b29 !important;
}

.timeline-container {
  width: min(100%, 1260px);
  margin: 0 auto;
  padding: 0 24px;
}

.timeline-kicker {
  margin: 0;
  text-align: center;
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-family: var(--font-family-display);
  color: var(--text-primary);
}

.timeline-grid {
  margin-top: clamp(52px, 7vw, 76px);
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  column-gap: clamp(20px, 2.5vw, 36px);
  row-gap: clamp(88px, 10vw, 116px);
}

.timeline-item {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}

.timeline-item:hover {
  transform: translateY(-3px);
  opacity: 0.95;
}

.timeline-step {
  margin: 0;
  font-size: 0.78rem;
  font-weight: 300;
  letter-spacing: 0.13em;
  color: color-mix(in srgb, var(--text-primary) 50%, transparent);
}

.timeline-title {
  margin: 12px 0 0;
  font-family: var(--font-family-display);
  font-weight: 500;
  font-size: clamp(1.75rem, 2.8vw, 2.28rem);
  line-height: 1.08;
  text-align: center;
  letter-spacing: 0.01em;
}

.timeline-description {
  margin: 20px 0 0;
  max-width: 220px;
  text-transform: uppercase;
  font-size: clamp(0.76rem, 1.25vw, 0.86rem);
  font-weight: 400;
  letter-spacing: 0.14em;
  line-height: 1.5;
  color: color-mix(in srgb, var(--text-primary) 68%, transparent);
  text-align: center;
}

@media (max-width: 1024px) {
  .timeline-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    row-gap: clamp(72px, 9vw, 96px);
  }
}

@media (max-width: 640px) {
  .timeline-container {
    padding: 0 18px;
  }

  .timeline-grid {
    grid-template-columns: 1fr;
    row-gap: clamp(54px, 10vw, 74px);
  }
}
</style>
