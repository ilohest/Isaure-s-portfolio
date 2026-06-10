<template>
  <section
    class="editorial-timeline"
    data-hscroll
    data-hscroll-end="center-last"
    aria-labelledby="editorial-timeline-title"
  >
    <div class="timeline-stage" data-hscroll-stage>
      <div class="timeline-container">
        <h2 id="editorial-timeline-title" class="timeline-kicker">Process</h2>

        <div class="timeline-viewport" aria-label="Project process steps">
          <div class="timeline-track" data-hscroll-track>
            <article v-for="item in timelineItems" :key="item.step" class="timeline-item">
              <p class="timeline-step">{{ item.step }}</p>
              <h3 class="timeline-title">{{ item.title }}</h3>
              <p class="timeline-description">{{ item.description }}</p>
            </article>
          </div>
        </div>
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
  margin-top: clamp(18px, 2.5vw, 32px);
  background: #ffffff;
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
  width: min(100%, 1680px);
  margin: 0 auto;
  padding: 0 clamp(18px, 4.5vw, 86px);
}

.timeline-stage {
  position: sticky;
  display: flex;
  align-items: center;
  min-height: min(760px, calc(100svh - 32px));
  padding: clamp(84px, 10vw, 112px) 0;
  overflow: hidden;
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

.timeline-viewport {
  margin-top: clamp(52px, 7vw, 76px);
  overflow-x: hidden;
  overflow-y: hidden;
}

.timeline-track {
  display: flex;
  width: max-content;
  min-width: 100%;
  gap: clamp(18px, 2vw, 34px);
  padding: 0;
  will-change: transform;
}

.timeline-item {
  position: relative;
  flex: 0 0 clamp(280px, 32vw, 520px);
  min-height: clamp(300px, 34vw, 440px);
  padding: clamp(22px, 2.6vw, 38px);
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
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
  font-size: clamp(3.3rem, 5vw, 6rem);
  font-family: var(--font-family-display);
  font-weight: 300;
  line-height: 0.82;
  letter-spacing: 0;
  color: var(--interactive-primary);
}

.timeline-title {
  margin: auto 0 0;
  font-family: var(--font-family-display);
  font-weight: 500;
  font-size: clamp(2.1rem, 3.4vw, 4rem);
  line-height: 1.08;
  text-align: left;
  letter-spacing: 0;
}

.timeline-description {
  margin: clamp(22px, 3vw, 34px) 0 0;
  max-width: 29ch;
  text-transform: uppercase;
  font-size: clamp(0.76rem, 1.25vw, 0.86rem);
  font-weight: 400;
  letter-spacing: 0.14em;
  line-height: 1.5;
  color: color-mix(in srgb, var(--text-primary) 68%, transparent);
  text-align: left;
}

@media (max-width: 640px) {
  .editorial-timeline {
    margin-top: clamp(12px, 5vw, 28px);
  }

  .timeline-container {
    padding: 0 18px;
  }

  .timeline-stage {
    min-height: min(620px, calc(100svh - 24px));
    padding: clamp(64px, 16vw, 88px) 0;
  }

  .timeline-item {
    flex-basis: min(82vw, 340px);
    min-height: 330px;
  }
}
</style>
