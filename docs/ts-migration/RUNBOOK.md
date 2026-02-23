# Runbook de coordination (multi-instances)

## 1) Preparation (1 fois)

1. Mettre `main` a jour.
2. Donner a chaque instance:
   - son prompt (voir `AGENT_PROMPTS.md`)
   - sa branche cible
   - son scope exclusif.

## 2) Kickoff des instances

Exemple de message court a envoyer a chaque instance:

```text
Travaille uniquement sur le chantier A2, branche codex/ts-router-data.
Lis docs/ts-migration/AGENT_PROMPTS.md et execute strictement le prompt A2.
N'edite aucun fichier hors scope.
```

## 3) Standup de suivi (2 fois/jour)

Chaque instance doit remonter:

- etat (`IN_PROGRESS`, `REVIEW`, `BLOCKED`)
- fichiers modifies
- commandes de verification et resultat
- blocages.

Reporter dans `TRACKING.md`.

## 4) Strategie d'integration

1. Merger A0 en premier.
2. Rebase des autres branches sur `main` apres A0.
3. Merger ensuite A1/A2/A3/A4 selon readiness.
4. Merger A5 en dernier pour consolider les quality gates.

## 5) Regles anti-conflits

- Si un fichier est touche hors scope: PR refusee.
- Si lint/build echoue: PR refusee.
- Si comportement metier change sans demande: PR refusee.

## 6) Controle final

Sur `main` apres tous merges:

- `npm run lint`
- `npm run build`
- verification rapide des pages critiques:
  - home
  - contact
  - une page projet
  - soumission du formulaire contact
