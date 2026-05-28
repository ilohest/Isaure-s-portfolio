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

const forceBrowserChromeColor = () => {
  if (!import.meta.client) return;
  document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]').forEach((meta) => {
    meta.content = '#ffffff';
  });
};

useHead({
  meta: [{ key: 'theme-color', name: 'theme-color', content: '#ffffff' }],
});

onBeforeMount(() => {
  initializePalette();
});

onMounted(() => {
  forceBrowserChromeColor();
  window.requestAnimationFrame(forceBrowserChromeColor);
  window.setTimeout(forceBrowserChromeColor, 250);
});
</script>
