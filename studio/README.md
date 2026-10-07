# Studio Sanity — portfolio Isaure Lohest

Projet Sanity : `lplxpp6m` · dataset : `production`.

## Lancer le studio en local

```bash
cd studio
npx sanity dev          # http://localhost:3333
```

Ajoutez `http://localhost:3333` aux origines CORS (sanity.io/manage → API → CORS origins) la première fois.

## Ajouter ou modifier un projet

Dans le studio, document « Projet » :

- **Titre, slug, type (web/branding), date** : la date classe les projets (le plus récent en haut de Work).
- **Couverture** : image de l'aperçu.
- **Phrases FR / EN** : une phrase courte, affichée sur la carte du projet.
- **Mots-clés** : affichés dans la carte d'info de la grille Work (dans l'ordre).
- **Images du projet** : toutes les images du projet. Cochez « Afficher dans la grille » sur celles à mettre en avant ; glissez-déposez pour changer l'ordre. Elles gardent leur format d'origine.
- **Vidéo** : fichier mp4 (ou lien) ; elle s'affiche juste après la carte d'info.
- **Publié** : décochez pour masquer un projet.

Le site est statique : après une modification, il faut le reconstruire (`npm run build` à la racine, puis déploiement).

## Importer les projets du site actuel

```bash
cd studio
PORTFOLIO_ROOT=.. npx sanity exec scripts/seed.ts --with-user-token -- --dry   # aperçu
PORTFOLIO_ROOT=.. npx sanity exec scripts/seed.ts --with-user-token            # import
```

Le script utilise votre session `sanity login` (aucun token à copier) et peut être relancé sans créer de doublons.
