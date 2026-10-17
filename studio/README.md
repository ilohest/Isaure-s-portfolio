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

Seuls les projets sont gérés dans Sanity (le reste du site vit dans le code). **Un projet = un seul document** : les textes (secteur, mots-clés, phrase du verso, textes de la page) ont une valeur par langue (Français / English) ; images, vidéo, date, type et slug sont partagés. Si une langue est vide, le site reprend l'autre. Menu de gauche : « Projets web » / « Projets branding ».

Trois onglets par document :

- **Fiche projet** : nom, slug, type (web/branding), date (classe les projets, le plus récent en haut de Work), secteur, mots-clés, phrase du verso (une valeur par langue), publié / bientôt disponible.
- **Images & vidéo** : couverture, images du projet (cochez « Afficher dans la grille » pour les mettre en avant, glissez pour réordonner), vidéo mp4 ou lien.
- **Textes de la page** : pour chaque texte de l'étude de cas, le texte d'origine (anglais, lecture seule) puis sa version française et anglaise. Une langue vide garde le texte d'origine.

Ajouter une langue : l'ajouter dans `lib/i18n.ts` (les types `locale…` suivent), puis dans `src/i18n/index.ts` et `src/lib/sanity.ts` côté site.

Le site est statique : après une modification, il faut le reconstruire (`npm run build` à la racine, puis déploiement).
