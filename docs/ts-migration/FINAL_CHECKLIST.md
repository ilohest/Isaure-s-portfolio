# Final TS Migration Checklist

Objectif: fournir une checklist de release exploitable en review PR pour clore la migration TypeScript.

## 1) Etat final migration (statut)

### DONE
- [ ] Codebase applicative migrée en TypeScript sur le scope principal `src/**`.
- [ ] Router typé (meta, résolution de titre, navigation).
- [ ] Formulaire de contact typé (state, payload Firestore, options).
- [ ] Déclarations de types projet stabilisées (`src/types/**`, shims, modules tiers).
- [ ] Nettoyage post-migration effectué (code mort sûr retiré, sans rupture runtime).
- [ ] Baseline qualité verte localement (`lint`, `typecheck`, `build`).

### Non-bloquant (release possible)
- [ ] Warnings webpack de taille d'assets/entrypoint connus et documentés.
- [ ] Dette visuelle/perf non critique n'impactant pas la conformité fonctionnelle.

### Backlog perf (post-release)
- [ ] Réduction du poids des médias lourds (images/vidéos) sur pages projets.
- [ ] Optimisation du chunk initial et stratégie de chargement médias.
- [ ] Politique d'assets responsive (génération, formats, dimensions) consolidée.
- [ ] Suivi Lighthouse/Web Vitals après déploiement.

## 2) Vérifications standard avant merge

Exécuter depuis la racine du repo:

```bash
npm run lint
npm run typecheck
npm run build
```

Critères de validation:
- `lint` passe sans erreur.
- `typecheck` passe sans erreur TS.
- `build` termine avec succès (warnings perf acceptés si inchangés/connus).

## 3) Checklist reviewer PR

- [ ] Scope de changement respecté (pas de refactor annexe hors objectif).
- [ ] Risque runtime faible (modifs typage et cleanup sûres).
- [ ] Pas d'ajout de dépendance non justifiée.
- [ ] Aucun secret/token dans le diff.
- [ ] Notes de migration/perf mises à jour dans `docs/ts-migration/`.
- [ ] Plan de rollback vérifié (section ci-dessous).

## 4) Rollback minimal (incident prod)

Objectif: revenir rapidement à un état stable sans opération complexe.

1. Identifier le dernier commit stable en production (`git log --oneline`).
2. Revenir au commit stable dans une branche de hotfix:
   - `git checkout -b hotfix/rollback-ts-migration`
   - `git revert <sha_problematique>` (ou série de commits concernés)
3. Vérifier localement:
   - `npm run lint`
   - `npm run typecheck`
   - `npm run build`
4. Déployer le rollback.
5. Ouvrir un ticket post-mortem avec:
   - cause racine,
   - impact,
   - correctif durable,
   - tests de non-régression à ajouter.

## 5) Evidences à joindre à la PR

- Sortie (ou capture) de `npm run lint`.
- Sortie (ou capture) de `npm run typecheck`.
- Sortie (ou capture) de `npm run build`.
- Lien vers notes complémentaires:
  - `docs/ts-migration/PERF_NOTES.md`
  - `docs/ts-migration/BUILD_WARNINGS_C2_C3_FINAL.md`
