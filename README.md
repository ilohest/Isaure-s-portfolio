## Project setup

npm install

### Compiles and hot-reloads for development

npm run serve

### Compiles and minifies for production

npm run build

### Lints and fixes files

npm run lint

### Images

Workflow recommandé (court):  
`docs/images-workflow.md`

Architecture du projet:  
`docs/architecture.md`

Structure active:

- `src/assets/media-src/` = originaux
- `public/assets/media/` = versions optimisées servies en prod

### SEO & IA

Fichiers publics utiles:

- `public/sitemap.xml` (URLs indexables)
- `public/robots.txt` (directives robots + lien sitemap)
- `public/llms.txt` (contexte pour agents IA)

Mise à jour recommandée:

- mettre à jour `lastmod` dans `public/sitemap.xml` à chaque lot de nouvelles pages
- vérifier les meta OG/Twitter/canonical dans `public/index.html`

### Générer des images dans tous les formats

### Traiter seulement un dossier Flou:

npm run build:images -- branding/flou

### Traiter seulement un fichier:

npm run build:images -- branding/flou/flou-1.png

### Traiter 2 dossiers Flou + Can Pruna:

npm run build:images -- branding/flou projects/web-dev/canpruna

### Simulation (voir ce qui serait généré sans écrire):

npm run build:images -- --dry-run

### Vérifier les images générées (sans écrire):

npm run build:images:check

`npm run build` lance ce check automatiquement avant la compilation.

### Quand modifications dans les mails (`functions/src/index.ts`), il faut redéployer:

isaurelohest@Mac functions % firebase deploy --only functions

### Mise en ligne

Structure cible sur le VPS:

- `/var/www/html/isaure/vue-portfolio/` = racine du projet
- `/var/www/html/isaure/vue-portfolio/dist/` = build servi par Apache

Déploiement recommandé (build local + upload du `dist/` seulement):

```bash
# 1) En local, depuis le repo
npm run build

# 2) Upload du build vers le VPS
rsync -avz --delete dist/ root@82.112.255.95:/var/www/html/isaure/vue-portfolio/dist/

# 3) Recharger Apache sur le VPS
ssh root@82.112.255.95 "sudo systemctl reload apache2"
```

Option rollback rapide (sauvegarde du dist courant avant upload):

```bash
# Backup du dist actuel sur le VPS
ssh root@82.112.255.95 "cp -a /var/www/html/isaure/vue-portfolio/dist /var/www/html/isaure/vue-portfolio/dist.backup.$(date +%Y%m%d-%H%M%S)"

# Deploy
rsync -avz --delete dist/ root@82.112.255.95:/var/www/html/isaure/vue-portfolio/dist/
ssh root@82.112.255.95 "sudo systemctl reload apache2"
```

# Configurations DNS:

cd /etc/apache2/sites-available/
nano isaure-lohest.com.conf
