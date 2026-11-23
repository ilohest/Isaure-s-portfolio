#!/usr/bin/env bash
# Exécuté SUR LE VPS (dossier /opt/portfolio-build) : récupère le code, construit le site, le publie.
# Lancé par le récepteur de webhook (hook.mjs) ou à la main : /opt/portfolio-build/scripts/vps/build-and-deploy.sh
set -euo pipefail

BUILD_DIR=/opt/portfolio-build
LIVE=/var/www/html/isaure/vue-portfolio/dist

exec 9>/var/lock/portfolio-build.lock
flock 9

cd "$BUILD_DIR"
echo "=== $(date -Is) début ==="
git fetch -q origin main
git reset -q --hard origin/main   # ne touche pas aux fichiers ignorés (images sources, .env.local)

if ! cmp -s package-lock.json .last-lock 2>/dev/null; then
  npm ci --no-audit --no-fund
  cp package-lock.json .last-lock
fi

NODE_OPTIONS=--max-old-space-size=2048 nice -n 19 npm run build
chmod -R a+rX dist

rm -rf "$LIVE.backup"
cp -a "$LIVE" "$LIVE.backup"
rsync -aL --delete dist/ "$LIVE/"
systemctl reload apache2
echo "=== $(date -Is) terminé ==="
