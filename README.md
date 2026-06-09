# Isaure Lohest — Portfolio

Site statique généré avec **Astro 5** + **Vue 3** (islands), déployé sur un VPS via Apache.

---

## Stack

| Couche | Technologie |
|---|---|
| Framework | Astro 5 (output: static) |
| UI islands | Vue 3 (Options API + Composition API) |
| Styles | Tailwind CSS v4 + CSS custom |
| Images | `astro:assets` — génération avif/webp au build |
| Animations | GSAP, Lenis (smooth scroll) |
| SEO | Sitemap Astro + JSON-LD + meta OG |
| Formulaire | Mini-service Node.js (mail-service/) + Nodemailer |
| Déploiement | rsync → VPS Apache (`dist/`) |

---

## Commandes

```bash
npm install          # installer les dépendances

npm run dev          # dev server (port 4330)
npm run build        # build statique → dist/
npm run preview      # prévisualiser le build local
npm run typecheck    # astro check (TypeScript)
npm run lint         # ESLint

npm run deploy:vps   # build + rsync + reload Apache
```

---

## Ajouter un nouveau projet (photos + vidéos)

### Photos

1. Place les originaux dans `src/assets/media-src/projects/<type>/<slug>/`
2. Dans le composant `.astro` du projet, utilise `import.meta.glob` + `<ResponsiveImage>` :

```astro
---
import ResponsiveImage from '../media/ResponsiveImage.astro';
import type { ImageMetadata } from 'astro';

const images = import.meta.glob<ImageMetadata>(
  '/src/assets/media-src/projects/web-dev/mon-projet/*.png',
  { eager: true, import: 'default' }
);
const pic = (base: string): ImageMetadata =>
  images[`/src/assets/media-src/projects/web-dev/mon-projet/${base}.png`];
---

<ResponsiveImage src={pic('nom-image')} alt="Description" sizes="(min-width: 960px) 50vw, 100vw" />
```

`astro:assets` génère automatiquement les variantes avif + webp au `npm run build`.

### Vidéos

1. Recompresse d'abord avec ffmpeg (obligatoire avant de mettre en ligne) :

```bash
ffmpeg -i SOURCE.mp4 \
  -vf "scale=1920:-2" -r 30 \
  -vcodec libx264 -preset slow -crf 28 \
  -pix_fmt yuv420p -movflags +faststart -an \
  OUTPUT-web.mp4
```

2. Place le fichier recompressé dans `public/media/videos/`
3. Référence-le avec `<video src="/media/videos/mon-projet-web.mp4" autoplay loop muted playsinline preload="metadata">`

---

## Déploiement VPS

```bash
# Config SSH (une seule fois)
cp scripts/deploy-vps.env.example scripts/deploy-vps.env
# remplir VPS_HOST, VPS_USER, VPS_PATH dans deploy-vps.env

# Déployer
npm run deploy:vps
```

Le script :
1. Lance `npm run build` (génère `dist/`)
2. Vérifie l'optimisation vidéo (`build:videos:check`)
3. Sauvegarde le `dist/` courant sur le VPS
4. Upload `dist/` via rsync
5. Reload Apache (`systemctl reload apache2`)

**Rollback manuel :**
```bash
ssh root@<VPS_IP> "cp -a /var/www/.../dist.backup.<date> /var/www/.../dist"
ssh root@<VPS_IP> "systemctl reload apache2"
```

**Formulaire contact :** le mini-service `mail-service/` tourne en parallèle sur le VPS derrière un ProxyPass Apache. Voir `mail-service/README.md` pour son déploiement séparé.

---

## Structure des dossiers

```
src/
  assets/
    media-src/          ← originaux (jpg, png) — traités par astro:assets au build
      pages/            ← images des pages (home, contact, services…)
      projects/         ← images des projets (branding, web-dev)
    media-static/       ← assets statiques non optimisés (logos vectoriels, etc.)
  components/
    shell/              ← SiteHeader, SiteFooter, FlyingBird
    media/              ← ResponsiveImage.astro (wrapper astro:assets)
    web-dev/            ← composants projet web-dev (*.astro)
    branding/           ← composants projet branding (*.astro)
    services/           ← sections page services
    home/               ← sections page d'accueil
  layouts/
    BaseLayout.astro    ← shell HTML, View Transitions, palette
  pages/                ← routes Astro (file-based routing)
  scripts/              ← scripts client (scroll, animations)
  styles/               ← CSS global

public/
  assets/media/         ← fichiers statiques publics (logos avif, images sans source)
  media/videos/         ← vidéos recompressées (servis directement)
  robots.txt, llms.txt

docs/
  architecture.md       ← architecture technique détaillée
  images-workflow.md    ← workflow images pas à pas
```

---

## SEO & IA

- `public/sitemap-index.xml` — généré automatiquement par `@astrojs/sitemap`
- `public/robots.txt` — directives robots
- `public/llms.txt` — contexte pour agents IA

---

## DNS / Apache (VPS)

Config Apache dans `/etc/apache2/sites-available/isaure-lohest.com.conf`.
Pour éditer : `nano /etc/apache2/sites-available/isaure-lohest.com.conf`

Redémarrer après changement : `systemctl reload apache2`
