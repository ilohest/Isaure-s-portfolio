# Workflow Images

> Le pipeline images est géré par **`astro:assets`** (intégré à Astro). Il n'y a plus de script `build:images` à lancer — tout se passe automatiquement au `npm run build`.

---

## Ajouter des photos à un projet existant

### 1. Place les originaux dans `src/assets/media-src/`

Respecte l'arborescence :

```
src/assets/media-src/
  pages/
    home/          ← images de la page d'accueil
    contact/       ← bande contact
    services/      ← images de la page services
    work/  ← images page work
  projects/
    branding/<slug>/    ← mockups branding
    web-dev/<slug>/     ← screenshots web-dev
```

Formats acceptés : `.jpg`, `.jpeg`, `.png`, `.webp`

### 2. Référence les images dans le composant `.astro` du projet

**Galerie dynamique (import.meta.glob) — cas le plus courant :**

```astro
---
import ResponsiveImage from '@/components/media/ResponsiveImage.astro';
import type { ImageMetadata } from 'astro';

const images = import.meta.glob<ImageMetadata>(
  '/src/assets/media-src/projects/web-dev/mon-projet/*.png',
  { eager: true, import: 'default' }
);
const pic = (base: string): ImageMetadata =>
  images[`/src/assets/media-src/projects/web-dev/mon-projet/${base}.png`];
---

<ResponsiveImage
  src={pic('ma-capture-01')}
  alt="Description de l'image"
  sizes="(min-width: 960px) 50vw, 100vw"
/>
```

**Image unique (import direct) :**

```astro
---
import { Picture } from 'astro:assets';
import heroImg from '/src/assets/media-src/pages/services/hero.jpg';
---

<Picture
  src={heroImg}
  formats={['avif', 'webp']}
  widths={[640, 960, 1280, 1920]}
  sizes="100vw"
  alt="Hero services"
  loading="eager"
  fetchpriority="high"
/>
```

### 3. Build

```bash
npm run build
```

Astro génère automatiquement les variantes avif + webp dans `dist/_astro/` avec noms hachés. Aucune action manuelle requise.

---

## Ajouter des images dans un composant Vue

Vue ne peut pas appeler `astro:assets` directement. Il faut passer par le parent `.astro` :

### Dans la page `.astro` parente

```astro
---
import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';
import MonComposant from '@/components/MonComposant.vue';

const glob = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/media-src/pages/mon-dossier/*.jpg',
  { eager: true }
);

const src = glob['/src/assets/media-src/pages/mon-dossier/mon-image.jpg']?.default;
let avifSrcset = '';
if (src) {
  const result = await getImage({ src, widths: [480, 640, 960, 1280], format: 'avif' });
  avifSrcset = result.srcSet.attribute;
}
---

<MonComposant client:load monImageAvifSrcset={avifSrcset} />
```

### Dans le composant Vue

```vue
<script>
export default {
  props: {
    monImageAvifSrcset: { type: String, default: '' },
  },
};
</script>

<template>
  <picture>
    <source v-if="monImageAvifSrcset" type="image/avif" :srcset="monImageAvifSrcset" sizes="..." />
    <img src="/assets/media/pages/mon-dossier/mon-image-fallback.webp" alt="..." loading="lazy" />
  </picture>
</template>
```

---

## Ajouter des vidéos

Les vidéos ne passent pas par `astro:assets`. Pipeline manuel obligatoire :

### 1. Recompresse avec ffmpeg

```bash
ffmpeg -i SOURCE.mp4 \
  -vf "scale=1920:-2" \
  -r 30 \
  -vcodec libx264 -preset slow -crf 28 \
  -pix_fmt yuv420p \
  -movflags +faststart \
  -an \
  OUTPUT-web.mp4
```

Options :

- `-vf "scale=1920:-2"` — redimensionne à max 1920px de large (conserve le ratio)
- `-r 30` — limite à 30 fps
- `-crf 28` — qualité (18 = quasi-lossless, 28 = bon compromis web, 35 = léger mais dégradé)
- `-an` — supprime la piste audio (les vidéos portfolio sont muettes)
- `-movflags +faststart` — fast start pour streaming progressif

### 2. Place dans `public/media/videos/`

```
public/media/videos/mon-projet-web.mp4
```

### 3. Référence dans le composant

```html
<video
  src="/media/videos/mon-projet-web.mp4"
  autoplay
  loop
  muted
  playsinline
  preload="metadata"
></video>
```

---

## Images sans source disponible

Si tu n'as pas l'original (projet archivé, fichier perdu) :

- Garde les versions compressées déjà dans `public/assets/media/`
- Référence-les directement par string dans le composant
- Ces images ne profiteront pas du pipeline avif/srcset mais fonctionnent

---

## Récapitulatif : où va quoi

| Type                     | Emplacement             | Pipeline                       |
| ------------------------ | ----------------------- | ------------------------------ |
| Originaux photos/mockups | `src/assets/media-src/` | `astro:assets` (auto au build) |
| Logos, assets statiques  | `public/assets/media/`  | Aucun (servis tels quels)      |
| Vidéos recompressées     | `public/media/videos/`  | ffmpeg (manuel, une fois)      |
| Fonts                    | `src/assets/fonts/`     | Importées via CSS              |
