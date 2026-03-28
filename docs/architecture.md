# Architecture du projet

## Objectif
Ce dépôt contient le portfolio d'Isaure (frontend Nuxt 4 / Vue 3) et les Cloud Functions Firebase associées au formulaire de contact.

## Stack technique
- Frontend: Nuxt 4 + Vue 3 (`/app` pour l'enveloppe Nuxt, `/src/components` pour les sections/pages métier)
- UI: PrimeVue + PrimeIcons + PrimeFlex
- Styles: Tailwind CSS + CSS custom (`/src/assets/style.css`, `/app/assets/styles/site-shell.css`)
- Build frontend: Nuxt + Nitro + Vite
- Typage: TypeScript (`tsc` via `.nuxt/tsconfig.json`)
- Qualité: ESLint + Prettier
- Images: `sharp` via script Node (`/scripts/generate-images.mjs`)
- Backend serverless: Firebase Functions v2 (TypeScript, Nodemailer)
- Données: Firestore (trigger `contactMessages/{messageId}`)

## Arborescence principale
- `/app/app.vue`: racine Nuxt
- `/app/layouts/default.vue`: shell global (header, footer, thème, animations de scroll)
- `/app/pages`: routing fichier Nuxt
- `/app/composables`: SEO et logique shell/thème Nuxt
- `/src/components`: pages/composants UI
- `/src/components/web-dev`, `/src/components/branding`, `/src/components/services`: domaines métier
- `/src/assets/media-src`: images sources (masters)
- `/public/assets/media`: images optimisées servies en production
- `/functions/src/index.ts`: logique email côté Firebase Functions
- `/docs`: documentation technique et workflows

## Architecture frontend
- Rendu Nuxt SSR/prérendu avec pages explicites dans `/app/pages`.
- Routing hiérarchique sous `/achievements` via le file-based routing Nuxt.
- Code-splitting par page et par projet via imports dynamiques ciblés.
- Shell global géré par `/app/layouts/default.vue` et ses composables (`useSiteShell`, `useSiteTheme`).

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
- `npm run build` construit directement l'application Nuxt.
- La génération ou vérification des médias se lance séparément via les scripts `build:images*` et `build:videos*`.

## Pipeline build & qualité
Commandes utiles:
- Dev: `npm run dev`
- Lint: `npm run lint`
- Type-check: `npm run typecheck`
- Build prod: `npm run build`
- Quality gate local: `npm run ci:quality`

## Déploiement VPS (frontend)
Structure cible:
- `/var/www/html/isaure/vue-portfolio/`
- `/var/www/html/isaure/vue-portfolio/.output/`

Flux recommandé:
1. Build local (`npm run build`)
2. Déployer `.output/` ou `.output/public` selon la stratégie retenue (Node server ou statique)
3. Redémarrer le process Node ou recharger le serveur web en conséquence

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
