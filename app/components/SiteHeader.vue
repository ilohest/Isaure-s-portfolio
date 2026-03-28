<template>
  <header :class="{ 'header--hidden': !isVisible && !isMobileMenuOpen }">
    <div class="header-inner">
    <div
      class="header-bar"
      :class="isTransparentHeader ? 'header-bar--transparent' : 'header-bar--solid'"
    >
      <NuxtLink to="/" class="mobile-logo-container" @click="closeMenu">
        <img src="/assets/media/common/images/isaure-logo-W-960.avif" alt="logo" class="mobile-logo" />
      </NuxtLink>

      <div class="mobile-menu">
        <button class="hamburger" :class="{ open: isMobileMenuOpen }" @click="toggleMobileMenu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>

    <nav class="desktop-menu" :class="desktopNavClass">
      <NuxtLink to="/" class="desktop-logo" aria-label="Home">
        <img :src="desktopLogoSrc" alt="Isaure Lohest" class="logo-desktop" />
      </NuxtLink>

      <ul>
        <li :class="{ active: isHomeActive }">
          <NuxtLink to="/" @click="closeMenu">home</NuxtLink>
        </li>
        <li :class="{ active: isAchievementsActive }">
          <NuxtLink to="/achievements" @click="closeMenu">achievements</NuxtLink>
        </li>
        <li :class="{ active: isServicesActive }">
          <NuxtLink to="/services" @click="closeMenu">services</NuxtLink>
        </li>
        <li :class="{ active: isContactActive }">
          <NuxtLink to="/contact" @click="closeMenu">contact</NuxtLink>
        </li>
      </ul>
    </nav>
    </div>

    <Teleport to="body">
      <div v-if="isMobileMenuOpen" class="mobile-menu-content" :class="{ opened: isMobileMenuOpen }">
        <button class="mobile-menu-close" type="button" aria-label="Close menu" @click="closeMenu">
          <span></span>
          <span></span>
        </button>
        <ul>
          <li class="menu-item show" :class="{ active: isHomeActive }" style="--stagger-delay: 0.05s">
            <NuxtLink to="/" @click="closeMenu">home</NuxtLink>
          </li>
          <li class="menu-item show" :class="{ active: isAchievementsActive }" style="--stagger-delay: 0.13s">
            <NuxtLink to="/achievements" @click="closeMenu">achievements</NuxtLink>
          </li>
          <li class="menu-item show" :class="{ active: isServicesActive }" style="--stagger-delay: 0.21s">
            <NuxtLink to="/services" @click="closeMenu">services</NuxtLink>
          </li>
          <li class="menu-item show" :class="{ active: isContactActive }" style="--stagger-delay: 0.29s">
            <NuxtLink to="/contact" @click="closeMenu">contact</NuxtLink>
          </li>
        </ul>
      </div>
    </Teleport>
  </header>
</template>

<script setup lang="ts">
const props = defineProps<{
  onHero?: boolean;
  isAtTop?: boolean;
  isVisible?: boolean;
}>();

const route = useRoute();
const isMobileMenuOpen = ref(false);

watch(
  () => route.fullPath,
  () => {
    isMobileMenuOpen.value = false;
  },
);

const isHomeActive = computed(() => route.path === '/');
const isAchievementsActive = computed(() => route.path.startsWith('/achievements'));
const isServicesActive = computed(() => route.path.startsWith('/services'));
const isContactActive = computed(() => route.path.startsWith('/contact'));
const isServicesRoute = computed(() => route.path.startsWith('/services'));
const isHomeRoute = computed(() => route.path === '/');
const isTransparentHeader = computed(
  () => Boolean(props.isAtTop) && (isServicesRoute.value || isHomeRoute.value),
);

const desktopNavClass = computed(() => {
  if (isTransparentHeader.value) {
    return 'header-nav--transparent';
  }

  if (isServicesRoute.value) {
    return 'header-nav--default';
  }

  return props.onHero ? 'header-nav--hero' : 'header-nav--default';
});

const desktopLogoSrc = computed(() => {
  if (isTransparentHeader.value || isServicesRoute.value) {
    return '/assets/media/common/images/isaure-logo-W-960.avif';
  }

  return props.onHero
    ? '/assets/media/common/images/isaure-logo-B-960.avif'
    : '/assets/media/common/images/isaure-logo-W-960.avif';
});

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMenu = () => {
  isMobileMenuOpen.value = false;
};
</script>

<style scoped>
header {
  z-index: 500;
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  max-width: 100%;
  height: 0;
  overflow: visible;
}

.header-inner {
  transform: translateY(0);
  transition: transform 0.28s ease;
  will-change: transform;
}

.header--hidden .header-inner {
  transform: translateY(calc(-100% - 12px));
}

.header-bar,
.desktop-menu {
  border-bottom: 1px solid var(--text-inverse);
  color: var(--text-inverse);
}

.header-bar {
  display: none;
  align-items: center;
  justify-content: space-between;
  padding: 5px 10px;
  border-bottom-width: 1px;
}

.header-bar--transparent {
  background: transparent;
}

.header-bar--solid {
  background: var(--surface-accent);
}

.desktop-menu {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 5px 10px;
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
}

.desktop-menu a,
.mobile-menu a {
  text-decoration: none;
  font-family: var(--font-family-display);
  line-height: 1.9167rem;
  font-weight: 400;
  letter-spacing: -0.05em;
  font-size: 20px;
  color: inherit;
  position: relative;
  display: inline-block;
}

.desktop-menu a:not(.desktop-logo)::after,
.mobile-menu a::after {
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

.desktop-menu a:hover::after,
.desktop-menu a.router-link-active::after,
.mobile-menu a:hover::after,
.mobile-menu a.router-link-active::after,
.menu-item.active a::after {
  transform: scaleX(1);
}

.desktop-logo {
  display: block;
}

.logo-desktop {
  height: 35px;
  width: auto;
  display: block;
}

.mobile-logo-container {
  display: none;
}

.mobile-logo {
  height: 50px;
  width: 50px;
}

.header-nav--default {
  background: var(--surface-accent);
}

.header-nav--transparent {
  background: transparent;
}

.header-nav--hero {
  background: var(--text-inverse);
  color: var(--surface-inverse);
}

.mobile-menu {
  display: none;
  position: relative;
  z-index: 160;
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
  z-index: 170;
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

.mobile-menu-content {
  background-color: var(--surface-accent);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  min-height: 100dvh;
  padding: 5.5rem 1.5rem 2rem;
  z-index: 140;
  overflow-y: auto;
  position: fixed;
  inset: 0;
  animation: expandFromTopRight 0.5s ease-out forwards;
}

.mobile-menu-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 34px;
  height: 34px;
  border: 0;
  background: transparent;
  cursor: pointer;
  z-index: 180;
}

.mobile-menu-close span {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 26px;
  height: 2px;
  background: var(--text-inverse);
  transform-origin: center;
}

.mobile-menu-close span:first-child {
  transform: translate(-50%, -50%) rotate(45deg);
}

.mobile-menu-close span:last-child {
  transform: translate(-50%, -50%) rotate(-45deg);
}

.mobile-menu-content ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
  padding: 0;
  margin: 0;
  text-align: center;
}

.mobile-menu-content a {
  color: var(--text-inverse);
  text-decoration: none;
  font-family: 'Red Hat Text', sans-serif;
  letter-spacing: 0;
}

.mobile-menu-content a::after {
  display: none;
}

.menu-item {
  opacity: 0;
  transform: translateX(-100%);
  animation: slideInFromLeft 0.5s ease-out forwards;
  animation-delay: var(--stagger-delay);
}

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

@keyframes expandFromTopRight {
  0% {
    transform: scale(0);
    transform-origin: top right;
  }
  100% {
    transform: scale(1);
    transform-origin: top right;
  }
}

@media (max-width: 970px) {
  .header-inner {
    width: 100%;
  }

  .header-bar {
    display: flex;
  }

  .mobile-menu {
    display: flex;
    width: 18%;
    justify-content: center;
    align-items: center;
  }

  .mobile-logo-container {
    width: 18%;
    display: flex;
    justify-content: center;
  }

  .desktop-menu {
    display: none;
  }
}
</style>
