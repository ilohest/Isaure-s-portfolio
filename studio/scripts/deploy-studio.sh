#!/usr/bin/env bash
# Reconstruit le Studio Sanity et le publie sur https://studio.isaure-lohest.com (VPS, Apache).
# Même accès SSH que le site : scripts/deploy-vps.env (dans le dossier du portfolio, ou via DEPLOY_ENV).
#   cd studio && ./scripts/deploy-studio.sh
set -euo pipefail
ENV_FILE="${DEPLOY_ENV:-../scripts/deploy-vps.env}"
[ -f "$ENV_FILE" ] || ENV_FILE="../../Isaure-s-portfolio/scripts/deploy-vps.env"
set -a; source "$ENV_FILE"; set +a
D=/var/www/html/isaure/sites/studio.isaure-lohest.com/current
npx sanity build /tmp/studio-dist -y
rsync -az --delete -e "ssh -o BatchMode=yes" /tmp/studio-dist/ "$DEPLOY_USER@$DEPLOY_HOST:$D/"
ssh -o BatchMode=yes "$DEPLOY_USER@$DEPLOY_HOST" "chmod -R a+rX $D"
echo "OK — https://studio.isaure-lohest.com"
