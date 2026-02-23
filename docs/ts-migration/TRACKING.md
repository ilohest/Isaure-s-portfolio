# Suivi des instances - Migration TypeScript

Mise a jour rapide a faire a chaque fin de session d'instance.

## Tableau de pilotage

| Instance | Branche | Scope | Etat | Derniere maj | Risque blocant | PR |
|---|---|---|---|---|---|---|
| A0 | `codex/ts-socle` | Config TS | TODO | - | - | - |
| A1 | `codex/ts-functions` | `functions/**` | TODO | - | - | - |
| A2 | `codex/ts-router-data` | router + project data | TODO | - | - | - |
| A3 | `codex/ts-contact` | contact + firebase client | TODO | - | - | - |
| A4 | `codex/ts-app-shell` | App.vue | TODO | - | - | - |
| A5 | `codex/ts-quality-gates` | lint/typecheck/doc | TODO | - | - | - |

## Etats possibles

- TODO
- IN_PROGRESS
- REVIEW
- MERGED
- BLOCKED

## Regles de suivi

1. Une instance passe en `REVIEW` uniquement si lint + build passent localement.
2. Si conflit de scope detecte, l'instance se met en `BLOCKED` et n'edite plus.
3. Tout blocage doit indiquer:
   - fichier concerne
   - raison
   - action demandee.

## Journal des integrations

### YYYY-MM-DD

- Merge `A0`:
  - Impact:
  - Verification:
  - Risques residuels:

- Merge `A1`:
  - Impact:
  - Verification:
  - Risques residuels:
