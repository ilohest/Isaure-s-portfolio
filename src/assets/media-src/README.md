# Media Sources

Ce dossier contient uniquement les fichiers maitres (source).

Regles:
- ne pas importer ces fichiers directement depuis les composants Vue
- utiliser `scripts/generate-images.mjs` pour generer les livrables web
- conserver la meme architecture entre source et sortie optimisee

Architecture miroir:
- source: `src/assets/media-src/<domaine>/<projet>/fichier.ext`
- sortie: `public/assets/media/<domaine>/<projet>/fichier-<width>.<format>`

Domaines:
- `pages/`
- `projects/web-dev/`
- `projects/branding/`
- `branding/`
- `common/`
