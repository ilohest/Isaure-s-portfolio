# Workflow Images (rapide)

## 1) Ajouter les originaux
- Place tes images dans `src/assets/media-src/` en gardant l'architecture:
  - `pages/<projet>/...`
  - `branding/<projet>/...`
  - `projects/web-dev/<projet>/...`
  - `projects/branding/<projet>/...`
  - `common/<projet>/...`

## 2) Générer les versions web optimisées
```bash
npm run build:images
```

## 2bis) Vérifier (sans écrire) que tout est généré et à jour
```bash
npm run build:images:check
```

Le `npm run build` lance automatiquement ce check et échoue si des images sont manquantes ou obsolètes.

## 3) Générer seulement un dossier (plus rapide)
```bash
npm run build:images -- branding/flou
```

## 4) Simulation sans écrire de fichiers
```bash
npm run build:images -- --dry-run
```

## 5) Vérifier les références
- Les composants/runtime doivent pointer vers `"/assets/media/..."`.
- Ne pas pointer vers `"/assets/img/..."` (legacy supprimé).

## 6) Si tu modifies les Cloud Functions
```bash
cd functions
npm run build
firebase deploy --only functions
```
