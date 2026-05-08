# Media Delivery

Ce dossier contient les medias optimises servis en production.

Structure cible:
- `common/` pour les assets globaux du site
- `pages/<page>/` pour les assets propres a une page
- `projects/web-dev/<slug-projet>/` pour les projets web
- `projects/branding/<slug-projet>/` pour les projets branding

Les dossiers de projets ne doivent pas etre places dans `common/` ou dans un dossier
`branding/` a la racine.

Generation:
- `npm run build:images`
- `npm run build:images:media`
