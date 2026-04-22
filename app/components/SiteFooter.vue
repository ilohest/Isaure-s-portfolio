<template>
  <footer
    class="site-footer"
    :class="{ 'site-footer--home': isHome }"
    data-reveal-ignore
  >
    <div class="site-footer__shell container mx-auto px-4 md:px-6">
      <div class="site-footer__inner">
        <div class="site-footer__band-wrap">
          <div class="site-footer__band">
            <p class="site-footer__cta-title font-display">Let’s make it happen.</p>
            <NuxtLink class="site-footer__cta" to="/contact">Start a project</NuxtLink>
          </div>
        </div>

        <div class="site-footer__body">
          <div class="site-footer__body-main">
            <div class="site-footer__column site-footer__column--info">
              <div class="site-footer__eyebrow font-script">Independent studio practice</div>
              <p class="site-footer__statement">
                Visual identities, editorial websites and refined digital experiences.
              </p>
              <p class="site-footer__label">Based in Brussels &amp; Barcelona, available remotely</p>
              <a class="site-footer__email" href="mailto:isaure-lohest@gmail.com">
                isaure-lohest@gmail.com
              </a>
            </div>

            <div class="site-footer__column site-footer__column--brand">
              <p class="site-footer__brand-name font-display">
                <span>Isaure</span>
                <span>Lohest</span>
              </p>
              <img :src="logoSrc" alt="Isaure Lohest" class="site-footer__logo" />
              <p class="site-footer__copyright">&copy; {{ currentYear }} Isaure Lohest</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
defineProps<{
  isHome?: boolean;
  logoSrc: string;
}>();

const currentYear = new Date().getFullYear();
</script>

<style scoped>
.site-footer {
  position: relative;
  z-index: 2;
  isolation: isolate;
  margin-top: clamp(2rem, 5vw, 4rem);
  padding: 0 clamp(1.25rem, 4vw, 2.5rem)
    calc(clamp(3rem, 4vw, 3.75rem) + env(safe-area-inset-bottom));
  background: var(--surface-muted);
  color: var(--text-primary);
}

.site-footer--home {
  margin-top: 0;
  padding-top: 0;
}

.site-footer__inner {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0;
  max-width: 1320px;
  margin: 0 auto;
}

.site-footer__band-wrap {
  position: relative;
}

.site-footer__band-wrap::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  width: 100vw;
  height: 100%;
  background: var(--surface-base);
  transform: translateX(-50%);
  z-index: 0;
}

.site-footer__band,
.site-footer__body {
  border: 1px solid var(--text-primary);
}

.site-footer__band {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: clamp(1rem, 2vw, 2rem);
  align-items: center;
  padding: clamp(1.5rem, 3.2vw, 2.35rem) clamp(1.5rem, 4vw, 3rem);
  border-top: 1px solid var(--text-primary);
  border-bottom: none;
  background: var(--surface-muted);
  z-index: 1;
}

.site-footer__band::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: -1px;
  width: 100vw;
  height: 1px;
  background: var(--text-primary);
  transform: translateX(-50%);
  pointer-events: none;
}

.site-footer__body {
  display: flex;
  flex-direction: column;
  gap: clamp(1.5rem, 3vw, 2.2rem);
  padding: clamp(1.5rem, 3vw, 2.4rem) clamp(1.5rem, 4vw, 3rem)
    calc(clamp(2.4rem, 4vw, 3rem) + env(safe-area-inset-bottom));
  border-top: none;
  background: var(--surface-base);
}

.site-footer__body-main {
  display: grid;
  grid-template-columns: minmax(240px, 0.78fr) minmax(0, 1.22fr);
  gap: clamp(2rem, 5vw, 5rem);
  align-items: start;
}

.site-footer__column {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.site-footer__column--info {
  justify-content: flex-start;
  min-height: 100%;
}

.site-footer__column--brand {
  align-items: flex-end;
  justify-content: flex-start;
  min-height: 100%;
}

.site-footer__brand-name {
  margin: 0;
  display: flex;
  justify-content: space-between;
  gap: 0.6rem;
  width: 100%;
  max-width: 100%;
  font-size: clamp(2.55rem, 6.15vw, 5.95rem);
  line-height: 0.82;
  text-transform: uppercase;
  transform: translateY(-0.18rem);
}

.site-footer__logo {
  width: min(100%, 120px);
  height: auto;
  object-fit: contain;
  align-self: flex-end;
}

.site-footer__cta-title {
  margin: 0;
  font-size: clamp(2rem, 4vw, 3.2rem);
  line-height: 0.94;
  text-transform: uppercase;
}

.site-footer__cta {
  width: fit-content;
  padding: 0.5rem 0.7rem;
  border: 1px solid var(--text-primary);
  border-radius: 2px;
  background: transparent;
  color: var(--text-primary);
  font-family: var(--font-family-display);
  font-size: 0.84rem;
  text-transform: uppercase;
  letter-spacing: 0.09em;
  text-decoration: none;
  transition:
    background-color 0.24s ease,
    color 0.24s ease,
    transform 0.24s ease;
}

.site-footer__cta:hover,
.site-footer__cta:focus-visible {
  background: var(--text-primary);
  color: var(--surface-base);
  transform: translateY(-1px);
}

.site-footer__cta:focus-visible {
  outline: none;
}

.site-footer__eyebrow {
  font-size: clamp(1.05rem, 2vw, 1.35rem);
  color: var(--interactive-primary);
}

.site-footer__statement {
  max-width: 22rem;
  font-size: clamp(1.15rem, 2vw, 1.8rem);
  line-height: 1.25;
}

.site-footer__label,
.site-footer__copyright {
  margin: 0;
  font-size: clamp(0.95rem, 1.2vw, 1.05rem);
  line-height: 1.6;
}

.site-footer__email {
  width: fit-content;
  color: var(--text-primary);
  font-size: clamp(0.95rem, 1.2vw, 1.05rem);
  line-height: 1.6;
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition:
    border-color 0.24s ease,
    opacity 0.24s ease;
}

.site-footer__email:hover,
.site-footer__email:focus-visible {
  opacity: 0.72;
  border-color: currentColor;
}

.site-footer__email:focus-visible {
  outline: none;
}

.site-footer__copyright {
  align-self: flex-end;
  margin-top: auto;
  text-align: right;
  color: color-mix(in srgb, var(--text-primary) 78%, transparent);
}

@media (max-width: 628px) {
  .site-footer {
    padding-bottom: calc(clamp(4.5rem, 12vw, 5.5rem) + env(safe-area-inset-bottom));
  }

  .site-footer__band {
    grid-template-columns: 1fr;
    align-items: start;
  }

  .site-footer__body-main {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .site-footer__brand-name {
    flex-direction: column;
    gap: 0;
  }

  .site-footer__column--brand {
    align-items: flex-start;
  }

  .site-footer__logo,
  .site-footer__copyright {
    align-self: flex-start;
    text-align: left;
  }
}
</style>
