<script setup lang="ts">
export interface ResolvedPicture {
  src: string;
  width: number;
  height: number;
  avifSrcset?: string;
  webpSrcset?: string;
  sizes?: string;
}

defineProps<{
  img: ResolvedPicture;
  alt: string;
  loading?: 'lazy' | 'eager';
  fetchpriority?: 'high' | 'low' | 'auto';
  imgClass?: string;
  pictureClass?: string;
}>();
</script>

<template>
  <picture :class="pictureClass">
    <source v-if="img.avifSrcset" type="image/avif" :srcset="img.avifSrcset" :sizes="img.sizes" />
    <source v-if="img.webpSrcset" type="image/webp" :srcset="img.webpSrcset" :sizes="img.sizes" />
    <img
      :src="img.src"
      :width="img.width"
      :height="img.height"
      :alt="alt"
      :class="imgClass"
      :loading="loading ?? 'lazy'"
      :fetchpriority="fetchpriority"
      decoding="async"
    />
  </picture>
</template>
