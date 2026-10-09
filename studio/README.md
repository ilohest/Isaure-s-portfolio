# Studio Sanity — portfolio Isaure Lohest

Projet Sanity : `lplxpp6m` · dataset : `production`.

## Lancer le studio en local

```bash
cd studio
npx sanity dev          # http://localhost:3333
```

Ajoutez `http://localhost:3333` aux origines CORS (sanity.io/manage → API → CORS origins) la première fois.

## Studio en ligne

Le Studio est publié sur **https://studio.isaure-lohest.com** (VPS, Apache, certificat Let's Encrypt ; l'adresse est autorisée dans les origines CORS du projet Sanity).
Après une modification du schéma : `cd studio && ./scripts/deploy-studio.sh`.

## Ajouter ou modifier un projet

Seuls les projets sont gérés dans Sanity (le reste du site vit dans le code). Chaque projet existe en **deux documents : français et anglais**, reliés entre eux. Menu de gauche : « Projets — Français » / « Projets — English ».

Pour un nouveau projet : créez-le dans une langue, puis utilisez le sélecteur de langue en haut du document pour créer l'autre version. Gardez le **même slug** dans les deux. Si une version manque, le site reprend l'autre langue.

Trois onglets par document :

- **Fiche projet** : nom, slug, type (web/branding), date (classe les projets, le plus récent en haut de Work), secteur, mots-clés, phrase du verso, publié / bientôt disponible.
- **Images & vidéo** : couverture, images du projet (cochez « Afficher dans la grille » pour les mettre en avant, glissez pour réordonner), vidéo mp4 ou lien.
- **Textes de la page** : les textes de l'étude de cas dans la langue du document (le texte d'origine, en anglais, est affiché en lecture seule). Une ligne vide garde le texte d'origine.

Le site est statique : après une modification, il faut le reconstruire (`npm run build` à la racine, puis déploiement).

## Importer les projets du site actuel

```bash
cd studio
PORTFOLIO_ROOT=.. npx sanity exec scripts/seed.ts --with-user-token -- --dry   # aperçu
PORTFOLIO_ROOT=.. npx sanity exec scripts/seed.ts --with-user-token            # import
```

Le script utilise votre session `sanity login` (aucun token à copier) et peut être relancé sans créer de doublons.
