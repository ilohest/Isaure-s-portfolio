# Architecture du projet

## Objectif
Ce dépôt contient le portfolio d'Isaure (frontend Vue 3) et les Cloud Functions Firebase associées au formulaire de contact.

## Stack technique
- Frontend: Vue 3 + Vue Router (`/src`)
- UI: PrimeVue + PrimeIcons + PrimeFlex
- Styles: Tailwind CSS + CSS custom (`/src/assets/style.css`)
- Build frontend: Vue CLI 5 (Webpack)
- Typage: TypeScript (`vue-tsc`)
- Qualité: ESLint + Prettier
- Images: `sharp` via script Node (`/scripts/generate-images.mjs`)
- Backend serverless: Firebase Functions v2 (TypeScript, Nodemailer)
- Données: Firestore (trigger `contactMessages/{messageId}`)

## Arborescence principale
- `/src/main.ts`: bootstrap app Vue (plugins, styles)
- `/src/router/index.ts`: routes + lazy loading par chunks
- `/src/components`: pages/composants UI
- `/src/components/web-dev`, `/src/components/branding`, `/src/components/services`: domaines métier
- `/src/assets/media-src`: images sources (masters)
- `/public/assets/media`: images optimisées servies en production
- `/functions/src/index.ts`: logique email côté Firebase Functions
- `/docs`: documentation technique et workflows

## Architecture frontend
- SPA Vue avec historique navigateur (`createWebHistory`).
- Routing hiérarchique sous `/achievements` avec pages projets dédiées.
- Code-splitting par route via imports dynamiques (`webpackChunkName`).
- Optimisation Webpack définie dans `/vue.config.js`:
  - chunks dédiés (`chunk-framework`, `chunk-ui`, `chunk-firebase`, `chunk-vendors`)
  - seuils de performance (warnings > 1MB asset)

## Pipeline images
Sources:
- Entrée: `/src/assets/media-src/**`
- Sortie: `/public/assets/media/**`

Commande de génération:
```bash
npm run build:images
```

Commande de vérification (sans écriture):
```bash
npm run build:images:check
```

Règle build:
- `npm run build` lance d'abord `build:images:check`.
- Le build échoue si des images générées sont manquantes ou obsolètes.

## Pipeline build & qualité
Commandes utiles:
- Dev: `npm run serve`
- Lint: `npm run lint`
- Type-check: `npm run typecheck`
- Build prod: `npm run build`
- Quality gate local: `npm run ci:quality`

## Déploiement VPS (frontend)
Structure cible:
- `/var/www/html/isaure/vue-portfolio/`
- `/var/www/html/isaure/vue-portfolio/dist/`

Flux recommandé:
1. Build local (`npm run build`)
2. Upload `dist/` via `rsync --delete`
3. Reload Apache

Voir les commandes détaillées dans `/README.md`.

## Firebase Functions
Fonction principale:
- `sendContactEmails` (trigger Firestore `onDocumentCreated`)
- Fichier: `/functions/src/index.ts`
- Région: `europe-west1`

Responsabilités:
- Parse/normalise la payload du formulaire
- Construit et envoie les emails (owner + confirmation)
- Utilise SMTP via variables d'environnement (`SMTP_HOST`, `SMTP_USER`, etc.)

Build/deploy functions:
```bash
cd functions
npm run build
npm run deploy
```

## Points d'attention
- Ne pas importer `media-src` directement depuis les composants; toujours référencer `/assets/media/...`.
- Garder `build:images:check` vert avant merge/deploy.
- Sur changements routing/chunks, vérifier taille des bundles après `npm run build`.
- Sur changements formulaire contact, valider le flux Firestore -> Function -> SMTP.

## Mise à jour de ce document
Mettre à jour ce fichier quand l'un de ces éléments change:
- stack (librairie majeure, versionnement runtime)
- structure des dossiers
- workflow image/build/deploy
- architecture des routes
- logique Firebase Functions
