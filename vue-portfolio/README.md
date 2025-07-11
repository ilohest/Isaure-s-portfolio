# portfolio

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### Mise en ligne

PS D:\Users\Isaure\Documents\Workspace\Pro\portfolio\vue-portfolio> npm run build
scp -r D:\Users\Isaure\Documents\Workspace\Pro\portfolio\vue-portfolio\dist\* root@82.112.255.95:/var/www/html/isaure/vue-portfolio

ssh root@82.112.255.95

- dans D:\Users\Isaure\Documents\Workspace\Pro\portfolio\vue-portfolio, ziper tout sauf les .git, .gitignore et node\_-_modules
- mettre portfolio.zip dans D:\Users\Isaure\Documents\Workspace\Pro\portfolio
- PS D:\Users\Isaure\Documents\Workspace\Pro\portfolio> scp portfolio.zip root@82.112.255.95:/var/www/html/isaure/vue-portfolio
- ssh root@82.112.255.95
- root@srv629259:~# cd /var/www/html/isaure/vue-portfolio
- find . -mindepth 1 ! -name 'portfolio.zip' -exec rm -rf {} + (supprime tout sauf le zip)
- unzip portfolio.zip
- rm portfolio.zip
- npm install
- npm run build
- sudo systemctl reload apache2
