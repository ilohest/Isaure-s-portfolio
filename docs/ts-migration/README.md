# Migration TypeScript - Orchestration Multi-Instances

Objectif: migrer progressivement vers TypeScript sans conflits entre instances, avec un niveau de qualité pro (lint, build, structure claire).

## Regles globales

- Une instance = un chantier = un scope de fichiers exclusif.
- Pas de modification hors scope.
- Chaque instance travaille sur une branche dediee: `codex/ts-<chantier>`.
- Chaque PR doit inclure:
  - resume technique (ce qui change)
  - risques et impacts
  - commandes de verification lancees
  - checklist DoD completee

## Ordre d'integration recommande

1. `A0` (socle TypeScript + outillage)
2. `A1` (Firebase Functions)
3. `A2` (router + data modules)
4. `A3` (contact form)
5. `A4` (App shell)
6. `A5` (dette + cleanup + gardes qualite)

## Definition of Done (DoD) commune

- `npm run lint` passe.
- `npm run build` passe.
- Pas de `any` non justifie.
- Pas de regression fonctionnelle visible.
- Pas de secret ajoute dans le repo.
- Changelog de migration mis a jour dans `docs/ts-migration/TRACKING.md`.

## Repartition des scopes

- `A0`: config globale TS, scripts, base types.
- `A1`: uniquement `/functions/**`.
- `A2`: uniquement `/src/router/**`, `/src/*-projects.js`, eventuels types associes.
- `A3`: uniquement `/src/components/ContactIsaure.vue`, `/src/firebase/index.js`, types associes.
- `A4`: uniquement `/src/App.vue`, eventuels composables/types relies.
- `A5`: `.eslintrc.js`, scripts de qualite, exclusions, debt cleanup TS-safe.

Ne pas modifier les memes fichiers entre instances.
