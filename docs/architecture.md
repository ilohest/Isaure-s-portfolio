# Architecture du projet

## Stack technique

| Couche      | Technologie                                  | Rôle                                                       |
| ----------- | -------------------------------------------- | ---------------------------------------------------------- |
| Framework   | **Astro 5** (output: static)                 | Génération statique, routing file-based, View Transitions  |
| UI islands  | **Vue 3** (Options API + Composition API)    | Composants interactifs (galeries, animations, formulaires) |
| Styles      | **Tailwind CSS v4** + CSS custom             | Utility classes + design tokens CSS                        |
| Images      | **`astro:assets`** (`getImage`, `<Picture>`) | Génération avif/webp/srcset au build                       |
| Animations  | **GSAP** + **Lenis**                         | Animations JS + smooth scroll                              |
| SEO         | `@astrojs/sitemap` + JSON-LD + PageSeo       | Sitemap auto + schema.org + meta OG                        |
| Formulaire  | Mini-service Node.js (`mail-service/`)       | API `/api/contact` + Nodemailer                            |
| Déploiement | rsync → VPS Apache                           | Build statique servi depuis `dist/`                        |

---

## Arborescence principale

```
src/
  assets/
    media-src/              ← SOURCES images (entrée astro:assets)
      pages/home/           ← portraits, about images
      pages/contact/        ← strip contact
      pages/services/       ← hero, cards services
      pages/work/   ← reach-out CTA
      pages/2026-inspo/     ← galerie inspo (jpg sources)
      projects/branding/    ← mockups branding par projet
      projects/web-dev/     ← screenshots web-dev par projet
    media-static/           ← assets non transformables (logos SVG, etc.)
    fonts/                  ← polices locales (si applicable)

  components/
    shell/
      SiteHeader.astro      ← nav, logo (transition:persist)
      SiteFooter.astro      ← footer typographique (transition:persist)
      FlyingBird.vue        ← oiseau animé (transition:persist)
    media/
      ResponsiveImage.astro ← wrapper <Picture> astro:assets
    home/
      HomeHeroSection.vue
      HomeIntroSection.vue
      HomePartnersSection.vue
    services/
      ServicesHero.vue
      ServicesGrid.vue
      CreativeCollaborations.vue
      ReachOutCTA.vue
    web-dev/                ← un composant .astro par projet web
    branding/               ← un composant .astro par projet branding

  layouts/
    BaseLayout.astro        ← <html>, head, palette, ClientRouter

  pages/                    ← routing Astro (file-based)
    index.astro             ← page d'accueil
    services.astro          ← page services
    contact.astro           ← page contact
    2026-inspo.astro        ← page inspo
    work/
      index.astro
      branding/[slug].astro
      web-dev/[slug].astro

  scripts/                  ← scripts client (.ts)
    site-shell.ts           ← reveal-on-scroll, palette
    horizontal-scroll-gallery.ts

  styles/
    global.css              ← imports Tailwind + reset
    site-shell.css          ← design tokens CSS (--interactive-primary, --surface-base…)
    base-ui.css             ← classes PrimeVue + overrides

public/
  assets/media/             ← fichiers statiques sans pipeline (logos avif, images sans source)
  media/videos/             ← vidéos web recompressées (libx264, CRF 28)
  robots.txt, llms.txt, sitemap-index.xml

mail-service/               ← service Node.js formulaire contact (déployé séparément)
docs/                       ← documentation technique
scripts/                    ← scripts deploy + vidéo
```

---

## Pattern images : astro:assets

### Principe

`astro:assets` ne peut optimiser que des **imports ESM**, pas des strings `/assets/media/...`.

**Règle :** toute image avec un original disponible va dans `src/assets/media-src/` et est traitée via `getImage()` ou `<Picture>`/`<ResponsiveImage>`.

### Pattern `.astro` statique

```astro
---
import ResponsiveImage from '@/components/media/ResponsiveImage.astro';
import heroSrc from '/src/assets/media-src/pages/services/hero.jpg';
---
<ResponsiveImage src={heroSrc} alt="Hero" sizes="100vw" loading="eager" fetchpriority="high" />
```

### Pattern `.astro` avec galerie dynamique

```astro
---
import ResponsiveImage from '@/components/media/ResponsiveImage.astro';
import type { ImageMetadata } from 'astro';

const images = import.meta.glob<ImageMetadata>(
  '/src/assets/media-src/projects/branding/mon-projet/*.png',
  { eager: true, import: 'default' }
);
const pic = (base: string) =>
  images[`/src/assets/media-src/projects/branding/mon-projet/${base}.png`];
---
<ResponsiveImage src={pic('slide-1')} alt="Slide 1" sizes="(min-width: 960px) 80vw, 100vw" />
```

### Pattern Vue (parent .astro → prop)

Vue ne peut pas appeler `astro:assets`. Le parent `.astro` résout les srcsets avif et les passe en props :

```astro
---
import { getImage } from 'astro:assets';
import heroSrc from '/src/assets/media-src/pages/home/portrait.jpg';
import MonComposantVue from '@/components/MonComposantVue.vue';

const avif = await getImage({ src: heroSrc, widths: [320, 640, 960], format: 'avif' });
const heroAvifSrcset = avif.srcSet.attribute;
---
<MonComposantVue client:load heroAvifSrcset={heroAvifSrcset} />
```

Dans le composant Vue :

```vue
<picture>
  <source v-if="heroAvifSrcset" type="image/avif" :srcset="heroAvifSrcset" sizes="..." />
  <img src="/assets/media/pages/home/portrait-fallback.webp" alt="..." loading="eager" />
</picture>
```

### Images sans source disponible

Si l'original n'est pas dans `media-src/` (projet client sans fichiers source), les fichiers pré-optimisés en `public/assets/media/` sont référencés directement par string. C'est acceptable : ils sont déjà compressés.

---

## Navigation & performance

- **View Transitions** (`<ClientRouter />`) : navigation SPA sans rechargement complet
- **`transition:persist`** sur `SiteHeader`, `SiteFooter`, `FlyingBird` : le shell ne se re-render pas entre pages
- **Prefetch** (`defaultStrategy: 'hover', prefetchAll: true`) : pages pré-téléchargées au survol des liens

---

## Palette de couleurs

Deux palettes gérées via classe CSS sur `<html>` :

| Palette | Classe             | Couleur principale |
| ------- | ------------------ | ------------------ |
| Default | _(aucune)_         | Bleu `#4c5ef7`     |
| Sun     | `home-palette-sun` | Orange `#ff572a`   |

La palette est tirée au sort (30 % sun / 70 % default) au chargement, puis conservée en `window.__portfolioPalette` pour la durée de la session.

---

## Points d'attention

- Ne pas importer depuis `media-src/` dans les composants Vue — uniquement dans les `.astro` parents.
- Les vidéos restent dans `public/media/videos/` (Astro ne traite pas les vidéos).
- `npm run typecheck` (`astro check`) avant tout merge.
- Sur modifications du formulaire : redéployer `mail-service/` séparément.
