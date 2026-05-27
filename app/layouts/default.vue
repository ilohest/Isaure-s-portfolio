<template>
  <main ref="mainScroller" data-scroll-container>
    <div ref="mainContent" data-scroll-content>
      <SiteHeader :on-hero="isOnHero" :is-at-top="isAtTop" :is-visible="isHeaderVisible" />
      <slot />
      <FlyingBird v-if="birdEnabled" :is-dark="isDark" />
      <SiteFooter v-if="showSiteFooter" :is-home="isHomeFooter" :logo-src="footerLogoSrc" />
    </div>
  </main>
</template>

<script setup lang="ts">
const { isDark, footerLogoSrc } = useSiteTheme();
const {
  mainScroller,
  mainContent,
  isOnHero,
  isAtTop,
  isHeaderVisible,
  birdEnabled,
  showSiteFooter,
  isHomeFooter,
} = useSiteShell();

const { initializePalette } = useSitePalette();

onBeforeMount(() => {
  initializePalette();
});
</script>
