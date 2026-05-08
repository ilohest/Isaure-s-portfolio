# Media Sources

Ce dossier contient uniquement les fichiers maitres (source).

Regles:
- ne pas importer ces fichiers directement depuis les composants Vue
- utiliser `scripts/generate-images.mjs` pour generer les livrables web
- conserver la meme architecture entre source et sortie optimisee

Architecture miroir:
- source projet: `src/assets/media-src/projects/<type>/<slug-projet>/fichier.ext`
- sortie projet: `public/assets/media/projects/<type>/<slug-projet>/fichier-<width>.<format>`
- source page: `src/assets/media-src/pages/<page>/fichier.ext`
- sortie page: `public/assets/media/pages/<page>/fichier-<width>.<format>`

Domaines:
- `pages/`
- `projects/web-dev/`
- `projects/branding/`
- `common/` uniquement pour les assets globaux du site, jamais pour un projet
