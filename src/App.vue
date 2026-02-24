<!-- src/App.vue -->
<template>
  <Header :onHero="isOnHero" />

  <main ref="mainScroller" data-scroll-container>
    <div ref="mainContent" data-scroll-content>
      <!-- <div v-if="!isHomePage" class="container mx-auto mt-8">
        <Breadcrumbs v-if="showBreadcrumbs" />
      </div> -->

      <router-view v-slot="{ Component }">
        <div :class="{ 'mt-8': route.name !== 'home-isaure' }">
          <component :is="Component" :key="$route.fullPath" v-bind="routeViewProps" />
        </div>
      </router-view>

      <div ref="birdContainer" class="bird-container gauche-droite">
        <div ref="bird" class="bird bird-light"></div>
      </div>
    </div>
  </main>

  <footer>
    <img
      ref="darkButton"
      :src="darkButtonSrc"
      alt="dark / light background button"
      class="dark-light-button"
      @click="toggleDarkMode"
    />

    <a :href="whatsappLink" class="whatsapp-button" target="_blank" rel="noopener noreferrer">
      <img :src="whatsappIcon" alt="WhatsApp" class="whatsapp-icon" />
    </a>
  </footer>
</template>

<script setup lang="ts">
// import Breadcrumbs from '@/components/Breadcrumbs.vue';
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import Header from '@/components/Header.vue';
import Lenis from 'lenis';

const route = useRoute();
const routesUsingDarkProp = new Set(['home-isaure', 'contact']);

const darkBackground = ref(false);
const compteur = ref(0);
const darkButtonSrc = ref(require('@/assets/img/dark.png'));
const phoneNumber = ref('+34600049801');
const message = ref('Hello, I would like to know more about your services!');
const isOnHero = ref(false);
const birdTimeoutId = ref<ReturnType<typeof setTimeout> | null>(null);
const birdIntervalId = ref<ReturnType<typeof setInterval> | null>(null);
const revealObserver = ref<IntersectionObserver | null>(null);
const lenis = ref<Lenis | null>(null);
const lenisRafId = ref<number | null>(null);

const mainScroller = ref<HTMLElement | null>(null);
const mainContent = ref<HTMLElement | null>(null);
const birdContainer = ref<HTMLDivElement | null>(null);
const bird = ref<HTMLDivElement | null>(null);

const whatsappLink = computed(() => {
  const encodedMessage = encodeURIComponent(message.value);
  return `https://wa.me/${phoneNumber.value}?text=${encodedMessage}`;
});

const whatsappIcon = computed(() => require('@/assets/img/whatsapp.png'));
const routeViewProps = computed(() => {
  return routesUsingDarkProp.has(String(route.name))
    ? { isDark: darkBackground.value }
    : {};
});

function updateHeaderBackground() {
  const scroller = mainScroller.value;
  if (!scroller) {
    isOnHero.value = false;
    return;
  }

  const hero = scroller.querySelector('.tangle-hero');
  const header = document.querySelector('header');

  if (!hero || !header) {
    isOnHero.value = false;
    return;
  }

  const heroRect = hero.getBoundingClientRect();
  const headerRect = header.getBoundingClientRect();
  const overlaps = heroRect.top < headerRect.bottom && heroRect.bottom > headerRect.top;

  isOnHero.value = overlaps;
}

function setupHeroObserver() {
  const scroller = mainScroller.value;
  if (!scroller) return;

  if (!lenis.value) {
    scroller.addEventListener('scroll', updateHeaderBackground, { passive: true });
  } else {
    lenis.value.on('scroll', updateHeaderBackground);
  }
  window.addEventListener('resize', updateHeaderBackground);
  updateHeaderBackground();
}

function setupSmoothScroll() {
  const scroller = mainScroller.value;
  const content = mainContent.value;
  if (!scroller || !content) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const lenisInstance = new Lenis({
    wrapper: scroller,
    content,
    duration: 1.08,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 0.9,
    touchMultiplier: 1,
    syncTouch: false,
    infinite: false,
  });

  lenis.value = lenisInstance;

  const raf = (time: number) => {
    lenisInstance.raf(time);
    lenisRafId.value = window.requestAnimationFrame(raf);
  };
  lenisRafId.value = window.requestAnimationFrame(raf);
}

function toggleDarkMode() {
  if (!bird.value) return;

  if (!darkBackground.value) {
    document.body.classList.add('dark-mode');
    darkButtonSrc.value = require('@/assets/img/light.png');
    bird.value.classList.add('bird-dark');
    bird.value.classList.remove('bird-light');
    darkBackground.value = true;
  } else {
    document.body.classList.remove('dark-mode');
    darkButtonSrc.value = require('@/assets/img/dark.png');
    bird.value.classList.add('bird-light');
    bird.value.classList.remove('bird-dark');
    darkBackground.value = false;
  }
}

function voler() {
  if (!bird.value || !birdContainer.value) return;

  if (compteur.value % 2 === 0) {
    bird.value.classList.add('birdDG');
    birdContainer.value.classList.add('droite-gauche');
    birdContainer.value.classList.remove('gauche-droite');
  } else {
    bird.value.classList.remove('birdDG');
    birdContainer.value.classList.remove('droite-gauche');
    birdContainer.value.classList.add('gauche-droite');
  }

  compteur.value += 1;
}

function startBirdAnimation() {
  birdTimeoutId.value = setTimeout(() => {
    voler();
    birdIntervalId.value = setInterval(voler, 80000);
  }, 80000);
}

function cleanupGlobalRevealObserver() {
  if (revealObserver.value) {
    revealObserver.value.disconnect();
    revealObserver.value = null;
  }
}

function initGlobalRevealAnimations() {
  const scroller = mainScroller.value;
  if (!scroller) return;

  cleanupGlobalRevealObserver();

  const revealTargets = Array.from(
    scroller.querySelectorAll(
      'section, article, .border-round-xl, .project-navigation, .work-copy, .work-scatter-item',
    ),
  ).filter((el) => {
    const node = el as HTMLElement;
    return (
      !node.classList.contains('reveal-on-scroll') &&
      !node.classList.contains('global-fade-up') &&
      !node.classList.contains('mobile-menu-content') &&
      !node.hasAttribute('data-reveal-ignore')
    );
  }) as HTMLElement[];

  if (!revealTargets.length) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasObserverSupport = typeof window.IntersectionObserver === 'function';

  if (reducedMotion || !hasObserverSupport) {
    revealTargets.forEach((el) => el.classList.add('global-fade-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const target = entry.target as HTMLElement;
        target.classList.add('global-fade-visible');
        obs.unobserve(target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -8% 0px',
      root: scroller,
    },
  );

  revealTargets.forEach((el, index) => {
    el.classList.add('global-fade-up');
    el.style.setProperty('--global-reveal-delay', `${Math.min((index % 7) * 70, 420)}ms`);
    observer.observe(el);
  });

  revealObserver.value = observer;
}

watch(
  () => route.fullPath,
  () => {
    nextTick(() => {
      const scroller = document.querySelector('main');
      if (lenis.value) {
        lenis.value.scrollTo(0, { immediate: true, force: true });
      } else if (scroller) {
        scroller.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      }
      updateHeaderBackground();
      initGlobalRevealAnimations();
    });
  }
);

onMounted(() => {
  nextTick(() => {
    setupSmoothScroll();
    startBirdAnimation();
    setupHeroObserver();
    initGlobalRevealAnimations();
  });

  window.scrollTo(0, 0);
});

onBeforeUnmount(() => {
  const scroller = mainScroller.value;
  if (scroller && !lenis.value) {
    scroller.removeEventListener('scroll', updateHeaderBackground);
  }
  if (lenis.value) {
    lenis.value.off('scroll', updateHeaderBackground);
  }
  window.removeEventListener('resize', updateHeaderBackground);

  if (birdTimeoutId.value) {
    clearTimeout(birdTimeoutId.value);
    birdTimeoutId.value = null;
  }
  if (birdIntervalId.value) {
    clearInterval(birdIntervalId.value);
    birdIntervalId.value = null;
  }
  cleanupGlobalRevealObserver();
  if (lenisRafId.value !== null) {
    window.cancelAnimationFrame(lenisRafId.value);
    lenisRafId.value = null;
  }
  if (lenis.value) {
    lenis.value.destroy();
    lenis.value = null;
  }
});
</script>

<style>
/* Design system */
:root {
  /* Font-size */
  --fs-14: 0.6rem;
  --fs-16: 0.8rem;
  --fs-18: 1rem;
  --fs-20: 1.25rem;
  --fs-24: 1.5rem;
  --fs-30: 1.875rem;

  /* Palette */

  /* Light */
  --light-hover: #dadad8;
  --light-bg: #f8f8f6;
  --light-startColorstr: #93a7b5;
  --light-endColorstr: #ece7e1;
  --main-black: #302b29;
  --light-element: #ece7e1;
  --light-element1: #ece7e1;
  --light-button: #a49786;
  --light-button-hover: #b5a795;
  --light-content: #394255;
  --red: #4c5ef7;
  --red-hover: #3d48a5;
  --red-bg: #4c5ef7;
  --yellow-bg: #ece7e1;
  --blue-bg: #ece7e1;
  --brat: #a6ff00;
  --brat-hover: #d0ff78;
  --highlight: #99ceff;
  --secondary-black: #3e3e3e;
  --main-white1: #fffcfc;
  --main-black1: #302b29;

  /* Dark */
  --dark-hover: #656575;
  --dark-bg: #3e3e3e;
  --dark-startColorstr: #303030;
  --dark-endColorstr: #1f1f2e;
  --main-white: #fffcfc;
  --white-hover: rgba(255, 255, 255, 0.836);
  --dark-element: #7d7d8f;
  --dark-button: #252534;
  --dark-button-hover: #48485f;
  --darker-bg: #302b29;
  --dark-brat: #689f00;
  --dark-brat-hover: #90ca26;
}
.dark-mode {
  --light-hover: var(--dark-hover);
  --light-bg: var(--dark-bg);
  --light-startColorstr: var(--dark-startColorstr);
  --light-endColorstr: var(--dark-endColorstr);
  --main-black: var(--main-white);
  --main-white1: var(--main-black1);
  --light-element: var(--dark-element);
  --light-element1: var(--dark-bg);
  --light-button: var(--dark-button);
  --light-button-hover: var(--dark-button-hover);
  --light-content: var(--main-white);
  --red: var(--main-white);
  --red-bg: var(--darker-bg);
  --yellow-bg: var(--darker-bg);
  --blue-bg: var(--darker-bg);
  --brat: var(--dark-brat);
  --brat-hover: var(--dark-brat-hover);
  --secondary-black: var(--darker-bg);
  --red-hover: var(--white-hover);
}
*,
::before,
::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
html {
  scroll-behavior: auto;
}
#app {
  min-height: 100vh;
  overflow: hidden;
}

.container {
  padding: 0 20px;
  margin-top: 77px;
  max-width: 1300px;
  padding: 0 20px;
}
main {
  background-attachment: fixed;
  font-family: var(--font-family-body);
  font-size: var(--fs-18);
  background: var(--light-bg);
  color: var(--main-black);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
  border: 2px solid var(--red);
  transition:
    background-color 0.5s ease,
    color 0.5s ease;
}
h1 {
  font-size: var(--fs-30);
  letter-spacing: 0.4em;
  font-weight: 400;
}
h2 {
  font-size: var(--fs-24);
  letter-spacing: 0.4em;
  font-weight: 400;
}
h3 {
  font-size: var(--fs-20);
  letter-spacing: 0.4em;
  font-weight: 400;
}
header {
  z-index: 100;
  position: relative;
  font-family: var(--font-family-body);
}
.sections {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  border-bottom: 1px solid var(--main-white);
}
.left-section {
  padding: 5px 20px;
}
.right-section {
  text-align: center;
  padding: 5px 20px;
  border-left: var(--main-white) solid 1px;
}
.right-section a {
  text-decoration: none;
  color: inherit;
}
nav {
  font-size: var(--fs-14);
  padding: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 25px;
}
.logo-container {
  margin-left: 15px;
  display: flex;
}
nav a {
  text-decoration: none;
  font-family: var(--font-family-display);
  line-height: 1.9167rem;
  font-weight: 400;
  letter-spacing: -0.05em;
  font-size: 20px;
  text-transform: lowercase;
  position: relative;
  display: inline-block;
  color: inherit;
}

nav li {
  text-decoration: none;
  color: var(--main-white);
  font-family: var(--font-family-display);
  line-height: 1.9167rem;
  font-weight: 400;
  letter-spacing: -0.05em;
  font-size: 20px;
}

nav a:not(.desktop-logo)::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 2px;
  width: 100%;
  height: 1px;
  background-color: currentColor;
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 0.25s ease;
}

nav a:not(.desktop-logo):hover::after {
  transform: scaleX(1);
}

nav a.router-link-active:not(.desktop-logo)::after,
.mobile-menu .menu-item.active a::after {
  transform: scaleX(1);
}

.header-nav--default a {
  color: var(--main-white);
}

.header-nav--hero a,
.header-nav--hero li {
  color: var(--main-black);
}

.mobile-menu .menu-item.active {
  color: inherit;
  font-weight: 400;
}

/* Footer */
.dark-light-button {
  height: 25px;
  position: fixed;
  bottom: 57px;
  left: 57px;
  border: none;
  cursor: pointer;
}
.whatsapp-button {
  position: fixed;
  bottom: 57px;
  right: 57px;
  z-index: 1000;
}
.whatsapp-icon {
  width: 40px;
  height: 40px;
}

.coop-info p {
  background: var(--red-bg);
  border-radius: 10px;
  padding: 40px;
  color: var(--main-white);
}
.coop-info {
  padding-bottom: 125px;
}
.coop-info a {
  color: inherit;
}

/* Desktop Menu */
.desktop-menu {
  display: flex;
  justify-content: space-around;
  padding: 10px 20px;
}
.desktop-menu ul {
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
}
.desktop-menu li {
  margin: 0 15px;
  position: relative;
  cursor: pointer;
  text-transform: lowercase;
}

/* Mobile Menu */
.mobile-menu {
  display: none;
}
.mobile-menu a,
.mobile-menu div {
  color: inherit;
  text-decoration: none;
  font-size: var(--fs-24);
}
.mobile-menu-content ul {
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: center;
}

.menu-item.active {
  color: inherit;
  font-weight: 400;
}
.arrow {
  display: inline-block;
  margin-left: 10px;
  transition: transform 0.3s;
}
.arrow-active {
  transform: rotate(180deg);
}
.back-button {
  position: absolute;
  top: 20px;
  left: 20px;
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  font-family: inherit;
}
.submenu-title {
  font-size: var(--fs-30);
  color: white;
  margin-bottom: 20px;
  text-align: center;
}
.hamburger {
  position: relative;
  width: 30px;
  height: 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 100;
}
.hamburger span {
  display: block;
  height: 2px;
  width: 100%;
  background-color: #fff;
  border-radius: 2px;
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}
.hamburger.open span:nth-child(1) {
  transform: translateY(11px) rotate(45deg);
}
.hamburger.open span:nth-child(2) {
  opacity: 0;
}
.hamburger.open span:nth-child(3) {
  transform: translateY(-11px) rotate(-45deg);
}
/* Arrivée décalée des éléments li du menu mobile */
@keyframes slideInFromLeft {
  from {
    transform: translateX(-200%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
.menu-item {
  opacity: 0;
  transform: translateX(-100%);
  animation: slideInFromLeft 0.5s ease-out forwards;
}
.menu-item.show {
  animation-delay: var(--stagger-delay);
}
/* Arrivée de mobile-menu-content d'en haut à droite */
@keyframes expandFromTopRight {
  0% {
    width: 20px; /* Taille initiale, correspondant au bouton hamburger */
    height: 20px; /* Taille initiale */
    top: 10px; /* Position initiale, ajustez selon la position du bouton */
    right: 10px; /* Position initiale */
    border-radius: 10px;
    transform: scale(0); /* Réduction initiale */
  }
  100% {
    width: 100%; /* Prend toute la largeur */
    height: 100%; /* Prend toute la hauteur */
    top: 0; /* Remplit l'écran */
    right: 0; /* Remplit l'écran */
    border-radius: 0; /* Forme rectangle */
    transform: scale(1); /* Forme normale */
  }
}
.mobile-menu-content {
  background-color: var(--red-bg);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 50;
  overflow-y: auto;
  position: fixed;
  width: 20px; /* Taille initiale */
  height: 20px; /* Taille initiale */
  top: 10px; /* Position initiale */
  right: 10px; /* Position initiale */
  border-radius: 10px;
  transform: scale(0);
  animation: expandFromTopRight 0.5s ease-out forwards; /* Transition pour les propriétés */
}
.mobile-menu-content.opened {
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  border-radius: 0;
  transform: scale(1);
}

/* Style général de la scrollbar */
::-webkit-scrollbar {
  width: 12px; /* Largeur de la barre de défilement */
  background-color: #f4f4f4; /* Couleur de fond */
  border-radius: 10px; /* Coins arrondis */
}
::-webkit-scrollbar-track {
  /* Style du "track" de la scrollbar */
  background-color: #e0e0e0; /* Couleur de fond de la piste */
  border-radius: 10px; /* Coins arrondis */
}
::-webkit-scrollbar-thumb {
  /* Style de la "thumb" (poignée) */
  background-color: var(--red-bg); /* Couleur de la poignée */
  border-radius: 10px; /* Coins arrondis */
  border: 3px solid #f4f4f4; /* Espacement entre la poignée et la piste */
}
::-webkit-scrollbar-thumb:hover {
  background-color: #eb5027; /* Couleur de la poignée au survol */
}
::-webkit-scrollbar-thumb:active {
  background-color: #a6ff00; /* Couleur de la poignée lors d'un clic */
}

@media screen and (max-width: 970px) {
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    padding: 5px 10px;
    flex-direction: unset;
  }
  .mobile-menu {
    display: block;
    height: 20px;
    width: 18%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .mobile-logo-container {
    width: 18%;
    display: flex;
    justify-content: center;
  }
  .left-section {
    text-align: center;
  }
  .desktop-menu {
    display: none;
  }
  .right-section {
    border-left: none;
    width: 100%;
    padding: 5px 0;
  }
  .sections {
    width: 74%;
    border-bottom: 0;
    display: unset;
  }
  /* Firefox + anciens Edge */
  html,
  body,
  main,
  .mobile-menu-content {
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE/Edge legacy */
    -webkit-overflow-scrolling: touch; /* inertie iOS */
  }

  /* WebKit (iOS Safari, Chrome Android) */
  html::-webkit-scrollbar,
  body::-webkit-scrollbar,
  main::-webkit-scrollbar,
  .mobile-menu-content::-webkit-scrollbar {
    display: none;
    width: 0;
    height: 0;
    background: transparent;
  }
}

@media (min-width: 971px) {
  nav ul {
    flex-direction: row;
    justify-content: flex-end;
  }
  .mobile-logo-container {
    display: none;
  }
}
@media (max-width: 628px) {
  nav ul {
    padding-top: 15px;
    align-items: center;
  }
  nav.menu-active {
    display: block;
    position: absolute;
    width: 100%;
    height: 100vh;
    top: 74px;
    left: 0;
    background-color: var(--red-bg);
  }
}

/* Flying bird animation */
.bird {
  width: 100px;
  height: 100px;
  background-size: auto 100%;
  will-change: background-position;
  animation-duration: 1s;
  animation-name: ailes;
  animation-timing-function: steps(6);
  animation-iteration-count: infinite;
}
.bird-light {
  background-image: url('assets/img/bird-animation.svg');
}
.bird-dark {
  background-image: url('assets/img/bird-animation-dark.svg');
}
.birdDG {
  transform: scaleX(-1);
}
@keyframes ailes {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: -600px 0;
  }
}
.bird-container {
  animation-duration: 30s;
  animation-delay: 2s;
  top: 20%;
  position: fixed;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}
.gauche-droite {
  animation-name: avancementGD;
  left: -10%;
  transform: scale(0) translateX(-10vh);
}
@keyframes avancementGD {
  0% {
    transform: scale(0.8) translateX(-10vh);
  }
  5% {
    transform: translateY(2vh) translateX(10vw) scale(0.8);
  }
  10% {
    transform: translateY(0) translateX(30vw) scale(0.9);
  }
  15% {
    transform: translateY(1vh) translateX(50vw) scale(1);
  }
  20% {
    transform: translateY(2vh) translateX(70vw) scale(1);
  }
  25% {
    transform: translateY(0) translateX(90vw) scale(1);
  }
  30% {
    transform: translateY(0) translateX(110vw) scale(1);
  }
  50% {
    transform: translateY(0) translateX(110vw) scale(1);
  }
  100% {
    transform: translateY(0) translateX(110vw) scale(1);
  }
}
.droite-gauche {
  animation-name: avancementDG;
  right: 90%;
  transform: scale(0) translateX(130vw);
}
@keyframes avancementDG {
  0% {
    transform: scale(0.8) translateX(130vw);
  }
  5% {
    transform: translateY(2vh) translateX(90vw) scale(0.8);
  }
  10% {
    transform: translateY(0) translateX(70vw) scale(0.9);
  }
  15% {
    transform: translateY(1vh) translateX(50vw) scale(1);
  }
  20% {
    transform: translateY(2vh) translateX(30vw) scale(1);
  }
  25% {
    transform: translateY(0) translateX(10vw) scale(1);
  }
  30% {
    transform: translateY(0) translateX(-10vw) scale(1);
  }
  50% {
    transform: translateY(0) translateX(-10vw) scale(1);
  }
  100% {
    transform: translateY(0) translateX(-10vw) scale(1);
  }
}

/* Next/previous project */
.project-navigation {
  display: flex;
  justify-content: space-between;
  margin: 20px 0 120px 0;
  width: 100%;
}
.project-navigation a {
  text-decoration: none;
    font-family: var(--font-family-display);
    line-height: 1.9167rem;
  font-weight: 400;
  text-transform: uppercase;
  font-size: var(--fs-30);
  color: var(--red);
}
.project-navigation a:hover {
  color: var(--red-hover);
}
.nav-arrow {
  font-size: 1.2rem;
  text-decoration: none;
  color: var(--red);
  padding: 10px 15px;
  border: 1px solid var(--red);
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

/* Responsive */
@media screen and (max-width: 970px) {
  .project-navigation a {
    font-size: var(--fs-20);
  }
}

@media screen and (max-width: 628px) {
  .bird-container {
    animation-duration: 22s !important;
  }
  .left-section {
    padding: 5px 0;
  }
  nav a {
    font-size: 18px;
  }

  .bird-container {
    animation-duration: 15s !important;
  }
  .whatsapp-button {
    right: 15px;
    bottom: 15px;
  }
  .dark-light-button {
    left: 20px;
    bottom: 50%;
  }

  .dropdown-content {
    position: relative; /* Maintient les éléments visibles */
  }
}

.dropdown-trigger {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.dropdown-trigger:focus-visible {
  outline: 2px solid #a6ff00;
  outline-offset: 2px;
  border-radius: 4px;
}

/* Global reveal (whole site) */
.global-fade-up {
  opacity: 0;
  transform: translate3d(0, 24px, 0);
  transition:
    opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94),
    transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transition-delay: var(--global-reveal-delay, 0ms);
}

.global-fade-up.global-fade-visible {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}

@media (prefers-reduced-motion: reduce) {
  .global-fade-up {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
}
</style>
