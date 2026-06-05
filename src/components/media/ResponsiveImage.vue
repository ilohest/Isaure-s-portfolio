<template>
  <picture>
    <source v-if="img.sources.avif" type="image/avif" :srcset="img.sources.avif" :sizes="sizes" />
    <source v-if="img.sources.webp" type="image/webp" :srcset="img.sources.webp" :sizes="sizes" />
    <img
      :src="img.img.src"
      :width="img.img.w"
      :height="img.img.h"
      :alt="alt"
      :loading="loading"
      :fetchpriority="fetchpriority"
      decoding="async"
    />
  </picture>
</template>

<script setup lang="ts">
// Composant unique remplaçant les 40 blocs <picture> manuels.
// `img` provient d'un import vite-imagetools en mode `as=picture`, ex:
//   import hero from '@/assets/media-src/.../x.jpg?w=640;960;1280;1920&format=avif;webp&as=picture'
// → { sources: { avif?, webp? }, img: { src, w, h } }
export interface PictureImport {
  sources: { avif?: string; webp?: string };
  img: { src: string; w: number; h: number };
}

withDefaults(
  defineProps<{
    img: PictureImport;
    alt: string;
    /** Attribut HTML `sizes` (ex: "100vw", "(max-width: 768px) 100vw, 50vw"). */
    sizes?: string;
    loading?: 'lazy' | 'eager';
    fetchpriority?: 'high' | 'low' | 'auto';
  }>(),
  { sizes: '100vw', loading: 'lazy', fetchpriority: 'auto' },
);
</script>
