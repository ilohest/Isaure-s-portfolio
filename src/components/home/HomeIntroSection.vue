<template>
  <section class="home-intro">
    <p class="home-intro-title">
      Design and development for projects that
      <span class="home-intro-emphasis">mean something</span>.
    </p>

    <div
      class="home-intro-support"
      :class="{ 'is-revealed': isRevealed }"
      aria-live="polite"
      ref="introSupport"
    >
      <p>
        <span class="home-intro-lead" aria-hidden="true"
          >{{ typedLead }}<span class="home-intro-cursor">|</span></span
        >
        <span class="sr-only">{{ typewriterPhrase }}</span>
      </p>
    </div>

    <div class="home-intro-contact">
      <span>Write me:</span>
      <a :href="`mailto:${email}`" class="home-intro-email">{{ email }}</a>
      <button class="home-intro-copy" type="button" :aria-label="copyLabel" @click="copyEmail">
        <span class="home-intro-copy-icon" aria-hidden="true"></span>
        <span class="home-intro-copy-status" aria-live="polite">{{
          copied ? 'Copied' : 'Copy'
        }}</span>
      </button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HomeIntroSection',
  data() {
    return {
      email: 'isaurelohest@gmail.com',
      copied: false,
      copyTimer: null,
      isRevealed: false,
      revealObserver: null,
      typedLead: '',
      typewriterPhrase: 'Bringing ideas to life: #think → #build → #deploy → #celebrate',
      typewriterTimer: null,
    };
  },
  mounted() {
    const el = this.$refs.introSupport;
    if (!el) return;

    if (typeof window === 'undefined' || typeof window.IntersectionObserver !== 'function') {
      this.isRevealed = true;
    } else {
      this.revealObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            this.isRevealed = true;
            observer.disconnect();
          });
        },
        { threshold: 0.35 },
      );
      this.revealObserver.observe(el);
    }

    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;

    if (reducedMotion) {
      this.typedLead = this.typewriterPhrase;
    } else {
      this.startTypewriter();
    }
  },
  beforeUnmount() {
    if (this.copyTimer) {
      window.clearTimeout(this.copyTimer);
    }
    if (this.revealObserver) {
      this.revealObserver.disconnect();
    }
    if (this.typewriterTimer) {
      window.clearTimeout(this.typewriterTimer);
    }
  },
  computed: {
    copyLabel() {
      return this.copied ? 'Email copied to clipboard' : 'Copy email to clipboard';
    },
  },
  methods: {
    startTypewriter() {
      const phrase = this.typewriterPhrase;
      const HOLD_AFTER_TYPE = 1700;
      const HOLD_AFTER_DELETE = 500;
      let index = 0;
      let isDeleting = false;

      const tick = () => {
        if (!isDeleting) {
          index += 1;
          this.typedLead = phrase.slice(0, index);

          if (index >= phrase.length) {
            isDeleting = true;
            this.typewriterTimer = window.setTimeout(tick, HOLD_AFTER_TYPE);
            return;
          }

          const nextChar = phrase[index];
          let delay = 55 + Math.random() * 90;
          if (nextChar === ' ' || Math.random() < 0.08) {
            delay += 120 + Math.random() * 220;
          }
          this.typewriterTimer = window.setTimeout(tick, delay);
        } else {
          index -= 1;
          this.typedLead = phrase.slice(0, index);

          if (index <= 0) {
            isDeleting = false;
            this.typewriterTimer = window.setTimeout(tick, HOLD_AFTER_DELETE);
            return;
          }

          const delay = 28 + Math.random() * 35;
          this.typewriterTimer = window.setTimeout(tick, delay);
        }
      };

      this.typewriterTimer = window.setTimeout(tick, 400);
    },
    async copyEmail() {
      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(this.email);
        } else {
          const textarea = document.createElement('textarea');
          textarea.value = this.email;
          textarea.setAttribute('readonly', '');
          textarea.style.position = 'fixed';
          textarea.style.opacity = '0';
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
        }

        this.copied = true;
        if (this.copyTimer) window.clearTimeout(this.copyTimer);
        this.copyTimer = window.setTimeout(() => {
          this.copied = false;
        }, 1600);
      } catch (_error) {
        window.location.href = `mailto:${this.email}`;
      }
    },
  },
};
</script>

<style scoped>
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

.home-intro {
  box-sizing: border-box;
  width: 100%;
  padding: clamp(2.5rem, 7vw, 6rem) clamp(18px, 1.45vw, 28px);
  background: var(--surface-base);
  color: var(--text-primary);
  text-align: left;
}

.home-intro-title {
  width: min(85vw, 1580px);
  margin: 0 auto;
  text-indent: clamp(4.8rem, 26vw, 31rem);
  font-family: 'Red Hat Display', var(--font-family-body);
  font-size: clamp(2.9rem, 4.8vw, 7rem);
  font-weight: 400;
  line-height: 1.04;
  letter-spacing: 0;
}

.home-intro-emphasis {
  color: var(--interactive-primary);
}

.home-intro-support {
  width: min(85vw, 1580px);
  margin: clamp(1.6rem, 3.2vw, 3.4rem) auto 0;
  text-align: left;
}

.home-intro-support p {
  margin: 0;
  display: block;
  text-align: left;
}

.home-intro-lead {
  display: block;
  overflow: visible;
  width: 100%;
  font-family: 'Red Hat Display', var(--font-family-body);
  font-size: clamp(2.9rem, 4.8vw, 7rem);
  font-weight: 400;
  line-height: 1.04;
  white-space: normal;
  text-align: left;
}

.home-intro-cursor {
  display: inline-block;
  margin-left: 0.06em;
  color: var(--interactive-primary);
  animation: home-intro-cursor-blink 0.9s steps(1) infinite;
}

@keyframes home-intro-cursor-blink {
  0%,
  49% {
    opacity: 1;
  }
  50%,
  100% {
    opacity: 0;
  }
}

.home-intro-contact {
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  max-width: min(86vw, 1220px);
  margin: clamp(2rem, 4vw, 4rem) auto 0;
  padding: 0.72rem 0.98rem 0.72rem 1.18rem;
  border: 1px solid color-mix(in srgb, var(--interactive-primary) 38%, var(--text-primary) 18%);
  border-radius: 999px;
  background:
    linear-gradient(
      135deg,
      color-mix(in srgb, var(--interactive-primary) 8%, transparent),
      transparent 62%
    ),
    color-mix(in srgb, var(--surface-panel) 78%, var(--surface-base) 22%);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--surface-base) 38%, transparent);
  font-size: clamp(1rem, 1.28vw, 1.35rem);
  font-weight: 400;
  line-height: 1;
  text-align: center;
  color: var(--text-primary);
  gap: 0.35rem;
}

.home-intro-email {
  color: inherit;
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 0.13em;
}

.home-intro-copy {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.45rem;
  height: 2rem;
  margin-left: 0.2rem;
  border: 0;
  color: var(--interactive-primary);
  background: transparent;
  cursor: pointer;
}

.home-intro-copy-icon,
.home-intro-copy-icon::after {
  display: block;
  width: 0.86rem;
  height: 0.86rem;
  border: 1.5px solid currentColor;
  border-radius: 1px;
}

.home-intro-copy-icon {
  position: relative;
  transform: translate(0.08rem, 0.04rem);
}

.home-intro-copy-icon::after {
  content: '';
  position: absolute;
  top: -0.28rem;
  left: -0.28rem;
  background: color-mix(in srgb, var(--surface-panel) 78%, var(--surface-base) 22%);
}

.home-intro-copy-status {
  position: absolute;
  top: calc(100% + 0.32rem);
  left: 50%;
  padding: 0.2rem 0.4rem;
  border: 1px solid color-mix(in srgb, var(--text-primary) 24%, transparent);
  border-radius: 999px;
  background: var(--surface-base);
  color: var(--text-primary);
  font-size: 0.68rem;
  line-height: 1;
  opacity: 0;
  pointer-events: none;
  transform: translate(-50%, -0.2rem);
  transition:
    opacity 0.18s ease,
    transform 0.18s ease;
}

.home-intro-copy:hover .home-intro-copy-status,
.home-intro-copy:focus-visible .home-intro-copy-status {
  opacity: 1;
  transform: translate(-50%, 0);
}

@media (max-width: 900px) {
  .home-intro-title {
    width: 92vw;
    text-indent: clamp(3rem, 18vw, 8rem);
    font-size: clamp(2.45rem, 8.8vw, 4.8rem);
  }

  .home-intro-contact {
    max-width: 86vw;
  }

  .home-intro-support {
    width: 92vw;
    margin-top: 1.8rem;
  }

  .home-intro-lead {
    font-size: clamp(2.45rem, 8.8vw, 4.8rem);
  }
}

@media (max-width: 640px) {
  .home-intro {
    padding-inline: 18px;
  }

  .home-intro-title {
    width: 100%;
    text-indent: 16vw;
    font-size: clamp(2rem, 9vw, 3.4rem);
  }

  .home-intro-support,
  .home-intro-contact {
    max-width: 100%;
  }

  .home-intro-support {
    width: 100%;
  }

  .home-intro-lead {
    font-size: clamp(2rem, 9vw, 3.4rem);
  }

  .home-intro-contact {
    width: 100%;
    padding: 0.78rem 0.82rem;
    font-size: clamp(0.88rem, 4vw, 1rem);
    gap: 0.25rem;
  }

  .home-intro-copy {
    flex: 0 0 auto;
    width: 2rem;
  }
}
</style>
