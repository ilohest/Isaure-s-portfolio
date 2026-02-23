# Prompts prets a copier pour instances paralleles

## Prompt A0 - Socle TypeScript

Tu travailles uniquement sur le chantier `A0` dans ce repo.

Contexte:
- Projet Vue 3 CLI.
- Objectif: poser le socle TypeScript sans casser le build.

Scope exclusif:
- `package.json`
- `tsconfig.json` (creation)
- `src/shims-vue.d.ts` (creation si necessaire)
- config lint liee TS (uniquement si indispensable)

Taches:
1. Ajouter TypeScript et outillage minimal Vue CLI TS.
2. Ajouter un `tsconfig.json` strict mais pragmatique.
3. S'assurer que les fichiers JS existants peuvent continuer a compiler (mode progressif).
4. Ajouter scripts utiles si necessaire.

Contraintes:
- Ne touche pas aux composants metier.
- Ne modifie pas `functions/**`.

Validation obligatoire:
- `npm run lint`
- `npm run build`

Livrables PR:
- liste des fichiers modifies
- choix de config TS justifies en 5 points max
- risques restants.

---

## Prompt A1 - Migration Firebase Functions

Tu travailles uniquement sur le chantier `A1`.

Scope exclusif:
- `functions/**`

Taches:
1. Migrer `functions/index.js` vers TypeScript (`functions/src/index.ts` ou equivalent).
2. Typage strict des payloads Firestore du formulaire contact.
3. Conserver la logique mail existante.
4. Garder l'echappement HTML et la securite en place.
5. Mettre a jour la config build/deploy functions.

Contraintes:
- Aucun changement dans `src/**`.
- Aucun changement UI.

Validation obligatoire:
- build functions (commande locale du dossier functions)
- lint functions si configure
- verifier que la fonction exportee garde le meme nom.

Livrables PR:
- mapping ancien/nouveau chemin
- points de compatibilite deployment.

---

## Prompt A2 - Router + Data Modules

Tu travailles uniquement sur le chantier `A2`.

Scope exclusif:
- `src/router/index.js`
- `src/home-projects.js`
- `src/web-dev-projects.js`
- `src/branding-projects.js`
- fichiers de types relies (`src/types/**` si cree)

Taches:
1. Migrer ces modules en `.ts`.
2. Introduire interfaces explicites pour les objets de projet.
3. Taper correctement `RouteRecordRaw` et metadonnees de routes.
4. Eviter les `any`.

Contraintes:
- Ne pas toucher aux composants Vue.
- Ne pas toucher a `functions/**`.

Validation obligatoire:
- `npm run lint`
- `npm run build`

Livrables PR:
- schema de types ajoute
- decisions de typage route/meta.

---

## Prompt A3 - Formulaire Contact

Tu travailles uniquement sur le chantier `A3`.

Scope exclusif:
- `src/components/ContactIsaure.vue`
- `src/firebase/index.js` (migration TS)
- types associes au formulaire (`src/types/**`)

Taches:
1. Migrer la logique script du composant en TypeScript (`<script lang="ts">`).
2. Taper l'etat formulaire, options, payload Firestore.
3. Conserver UX existante et validation runtime.
4. Eviter `any`, utiliser unions et interfaces.

Contraintes:
- Pas de refonte visuelle.
- Pas de changement de copy.

Validation obligatoire:
- `npm run lint`
- `npm run build`
- test manuel de soumission (si possible localement).

Livrables PR:
- tableau avant/apres du modele de donnees formulaire.

---

## Prompt A4 - App Shell

Tu travailles uniquement sur le chantier `A4`.

Scope exclusif:
- `src/App.vue`
- eventuels composables utilitaires crees pour App uniquement.

Taches:
1. Migrer le script App en TypeScript.
2. Taper refs DOM, timers, et etat UI.
3. Garder le comportement identique.

Contraintes:
- Ne pas toucher au router/data/contact/functions.

Validation obligatoire:
- `npm run lint`
- `npm run build`

Livrables PR:
- liste des types critiques introduits.

---

## Prompt A5 - Quality Gate et Cleanup

Tu travailles uniquement sur le chantier `A5`.

Scope exclusif:
- `.eslintrc.js`
- eventuelle config TS lint/prettier
- scripts qualité dans `package.json`
- documentation migration (`docs/ts-migration/**`)

Taches:
1. Mettre en place des garde-fous TS propres (noImplicitAny, checks pragmatiques).
2. Ajuster lint pour ignorer uniquement les artefacts necessaires.
3. Proposer commandes CI locales simples (lint/build/typecheck).
4. Ne pas casser l'existant.

Contraintes:
- Pas de modifications metier.

Validation obligatoire:
- `npm run lint`
- `npm run build`
- `npm run typecheck` (si ajoute)

Livrables PR:
- checklist finale "repo clean/pro".
