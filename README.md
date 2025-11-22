## Project setup

npm install

### Compiles and hot-reloads for development

npm run serve

### Compiles and minifies for production

npm run build

### Lints and fixes files

npm run lint

### Strucutre images

/src/assets/img_src/ ← originaux (PNG/JPG/SVG)
/public/assets/img/ ← versions optimisées générées (sortie)

### Générer des images dans tous les formats

### Traiter seulement un dossier Flou:

npm run build:images -- branding/Flou

### Traiter seulement un fichier:

npm run build:images -- branding/Flou/flou-1.png

### Traiter 2 dossiers Flou + Can Pruna:

npm run build:images -- branding/Flou web-dev/CanPruna

### Simulation (voir ce qui serait généré sans écrire):

npm run build:images -- branding/Flou --dry-run

### Mise en ligne

PS D:\Users\Isaure\Documents\Workspace\Pro\portfolio\vue-portfolio> npm run build
scp -r D:\Users\Isaure\Documents\Workspace\Pro\portfolio\vue-portfolio\dist\* root@82.112.255.95:/var/www/html/isaure/vue-portfolio

ssh root@82.112.255.95

- dans D:\Users\Isaure\Documents\Workspace\Pro\isaure-s-portfolio, ziper tout sauf les .git, .gitignore et node\_-_modules
- PS D:\Users\Isaure\Documents\Workspace\Pro\isaure-s-portfolio> scp Archive.zip root@82.112.255.95:/var/www/html/isaure/vue-portfolio
- ssh root@82.112.255.95
- root@srv629259:~# cd /var/www/html/isaure/vue-portfolio
- find . -mindepth 1 ! -name 'Archive.zip' -exec rm -rf {} + (supprime tout sauf le zip)
- unzip Archive.zip
- rm Archive.zip
- npm install
- npm run build
- sudo systemctl reload apache2

OU:

- build en local : npm run build
- isaurelohest@MacBook-Air-de-Isaure Isaure-s-portfolio % rsync -avz --delete dist/ root@82.112.255.95:/var/www/html/isaure/vue-portfolio/dist/
- root@srv629259:~# cd /var/www/html/isaure/vue-portfolio
- sudo systemctl reload apache2
