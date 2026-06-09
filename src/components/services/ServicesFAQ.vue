<template>
  <section class="services-faq" aria-labelledby="services-faq-title">
    <div class="faq-container">
      <h2 id="services-faq-title" class="faq-title">FAQ</h2>

      <div class="faq-list">
        <article
          v-for="(item, index) in faqItems"
          :key="item.question"
          class="faq-item"
          :class="{ 'faq-item--open': activeIndex === index }"
        >
          <button
            class="faq-question"
            type="button"
            :id="`services-faq-question-${index}`"
            :aria-expanded="activeIndex === index"
            :aria-controls="`services-faq-answer-${index}`"
            @click="toggleItem(index)"
          >
            <span>{{ item.question }}</span>
            <span class="faq-icon" aria-hidden="true"></span>
          </button>

          <div
            class="faq-answer-wrap"
            :id="`services-faq-answer-${index}`"
            role="region"
            :aria-labelledby="`services-faq-question-${index}`"
          >
            <p class="faq-answer">{{ item.answer }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ServicesFAQ',
  data() {
    return {
      activeIndex: 0,
      faqItems: [
        {
          question: 'Do I need a fully defined brief before reaching out?',
          answer: `Not at all. You can come with a clear scope, a rough idea, or simply the feeling that something isn't working anymore. Part of what I do is help you figure out exactly what needs to change — and why.`,
        },
        {
          question: 'What kind of projects are the best fit?',
          answer: `The best fit is a project that means something — a brand, platform or digital experience that needs to go beyond functional and become genuinely distinctive. I work best when there’s a real vision to translate, complexity to untangle, or an identity that hasn’t found its form yet. If you’re looking for someone to execute a brief, I’m probably not the right fit. If you’re looking for someone to help you figure out what the brief should be — and then build it — we should talk.`,
        },
        {
          question: 'How much does a project cost?',
          answer: `Every project is scoped individually — there's no fixed package, because the work is always shaped around what actually needs to happen. Most projects sit somewhere from €2 000, depending on scope, complexity and timeline. The best way to get a clear picture is to have a short conversation first. From there, I put together a detailed proposal with a defined scope, timeline and investment.`,
        },
        {
          question: 'Can you improve an existing website instead of starting from scratch?',
          answer: `Yes — and sometimes that's the smarter move. Depending on what's already there, I can refine the design, sharpen the user experience, restructure content, or rebuild only what's holding the project back. A short audit usually makes the right path clear.`,
        },
        {
          question: 'Will my website be easy to manage after launch?',
          answer: `Yes. I build with the people who'll use it in mind — not just the launch. That means clean content structures, maintainable code, and where it makes sense, a CMS or back office that makes everyday updates straightforward without needing a developer.`,
        },
        {
          question: 'What values guide the way you work?',
          answer: `Depth over speed. I'm not interested in fast and forgettable. Every project gets my full attention — to the brief, the context, the details that most people overlook. I work closely with a small number of clients at a time, which means the work gets the focus it deserves. Expect directness, transparency, and no unnecessary back-and-forth.`,
        },
        {
          question: 'Do you offer support after launch?',
          answer: `Launching is the beginning, not the end. I offer post-launch support for adjustments, fixes, and ongoing improvements — so the project keeps working as it should, and evolves as your needs change.`,
        },
      ],
    };
  },
  methods: {
    toggleItem(index) {
      this.activeIndex = this.activeIndex === index ? -1 : index;
    },
  },
};
</script>

<style scoped>
.services-faq {
  padding: clamp(64px, 8vw, 104px) 0 clamp(28px, 4vw, 48px);
  background: var(--surface-base);
  color: var(--text-primary);
}

.faq-container {
  width: min(100%, 1160px);
  margin: 0 auto;
  padding: 0 24px;
}

.faq-title {
  margin: 0;
  text-align: center;
  font-family: var(--font-family-display);
  font-size: 0.78rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--text-primary);
}

.faq-list {
  margin-top: clamp(52px, 7vw, 76px);
  border-top: 1px solid var(--text-primary);
}

.faq-item {
  border-bottom: 1px solid var(--text-primary);
}

.faq-question {
  width: 100%;
  min-height: clamp(92px, 10vw, 132px);
  display: grid;
  grid-template-columns: minmax(0, 1fr) clamp(36px, 4vw, 48px);
  gap: clamp(20px, 4vw, 52px);
  align-items: center;
  padding: clamp(1.15rem, 2.5vw, 1.8rem) 0;
  border: 0;
  background: transparent;
  color: inherit;
  cursor: pointer;
  text-align: left;
}

.faq-question span:first-child {
  max-width: 920px;
  font-family: var(--font-family-display);
  font-size: clamp(1.35rem, 3.25vw, 3.25rem);
  line-height: 1.08;
  letter-spacing: 0;
  text-transform: uppercase;
}

.faq-icon {
  position: relative;
  width: clamp(30px, 3vw, 40px);
  height: clamp(30px, 3vw, 40px);
  justify-self: end;
}

.faq-icon::before,
.faq-icon::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 1px;
  background: currentColor;
  transform: translate(-50%, -50%);
  transition:
    transform 0.28s ease,
    opacity 0.28s ease;
}

.faq-icon::after {
  transform: translate(-50%, -50%) rotate(90deg) scaleX(1);
}

.faq-item--open .faq-icon::before {
  transform: translate(-50%, -50%) scaleX(0.65);
}

.faq-item--open .faq-icon::after {
  opacity: 0;
  transform: translate(-50%, -50%) rotate(90deg) scaleX(0);
}

.faq-answer-wrap {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.34s ease;
}

.faq-item--open .faq-answer-wrap {
  grid-template-rows: 1fr;
}

.faq-answer {
  max-width: 690px;
  min-height: 0;
  overflow: hidden;
  margin: 0;
  padding: 0 0 0;
  font-weight: 300;
  line-height: 1.68;
  color: color-mix(in srgb, var(--text-primary) 76%, transparent);
  transition: padding-bottom 0.34s ease;
}

.faq-item--open .faq-answer {
  padding-bottom: clamp(1.25rem, 2.3vw, 2rem);
}

.faq-question:hover .faq-icon,
.faq-question:focus-visible .faq-icon {
  color: var(--interactive-primary);
}

.faq-question:focus-visible {
  outline: 1px solid var(--interactive-primary);
  outline-offset: 6px;
}

@media (max-width: 640px) {
  .faq-container {
    padding: 0 18px;
  }

  .faq-question {
    min-height: 86px;
    grid-template-columns: minmax(0, 1fr) 32px;
    gap: 18px;
  }

  .faq-question span:first-child {
    font-size: clamp(1.18rem, 7vw, 2rem);
  }
}

@media (prefers-reduced-motion: reduce) {
  .faq-icon::before,
  .faq-icon::after,
  .faq-answer-wrap,
  .faq-answer {
    transition: none;
  }
}
</style>
