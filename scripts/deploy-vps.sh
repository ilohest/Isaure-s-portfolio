#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"

usage() {
  cat <<'EOF'
Deploy le build (dist/) sur un VPS via rsync + reload Apache.

Prerequis:
  - npm, rsync, ssh (et acces SSH au VPS)
  - Sur le VPS: sudo systemctl reload apache2 (ou service equivalent)

Config:
  - Copier scripts/deploy-vps.env.example -> scripts/deploy-vps.env
  - Ou exporter les variables d'env avant de lancer le script

Usage:
  ./scripts/deploy-vps.sh
  ./scripts/deploy-vps.sh --no-build
  ./scripts/deploy-vps.sh --no-media-check
  ./scripts/deploy-vps.sh --no-backup
  ./scripts/deploy-vps.sh --no-reload

Options:
  --env <path>      Charge un fichier env (default: scripts/deploy-vps.env si present)
  --no-build        Ne lance pas `npm run build`
  --no-media-check  Ne lance pas les checks medias (images/videos) avant le build
  --no-backup       Ne cree pas de backup du dist courant sur le VPS
  --no-reload       Ne reload pas le service (apache2 par defaut)
  --dry-run         Affiche les commandes sans deployer
EOF
}

need_cmd() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "Erreur: commande manquante: $1" >&2
    exit 1
  fi
}

ENV_FILE=""
DO_BUILD="1"
DO_MEDIA_CHECK="1"
DO_BACKUP="1"
DO_RELOAD="1"
DRY_RUN="0"

while [[ $# -gt 0 ]]; do
  case "$1" in
    -h|--help)
      usage
      exit 0
      ;;
    --env)
      ENV_FILE="${2:-}"
      if [[ -z "$ENV_FILE" ]]; then
        echo "Erreur: --env attend un chemin" >&2
        exit 1
      fi
      shift 2
      ;;
    --no-build)
      DO_BUILD="0"
      shift
      ;;
    --no-media-check)
      DO_MEDIA_CHECK="0"
      shift
      ;;
    --no-backup)
      DO_BACKUP="0"
      shift
      ;;
    --no-reload)
      DO_RELOAD="0"
      shift
      ;;
    --dry-run)
      DRY_RUN="1"
      shift
      ;;
    *)
      echo "Option inconnue: $1" >&2
      usage
      exit 1
      ;;
  esac
done

if [[ -z "$ENV_FILE" ]]; then
  if [[ -f "$SCRIPT_DIR/deploy-vps.env" ]]; then
    ENV_FILE="$SCRIPT_DIR/deploy-vps.env"
  fi
fi

if [[ -n "$ENV_FILE" ]]; then
  if [[ ! -f "$ENV_FILE" ]]; then
    echo "Erreur: fichier env introuvable: $ENV_FILE" >&2
    exit 1
  fi

  # shellcheck disable=SC1090
  set -a
  source "$ENV_FILE"
  set +a
fi

: "${DEPLOY_HOST:?DEPLOY_HOST manquant (ex: 82.112.255.95)}"
: "${DEPLOY_USER:?DEPLOY_USER manquant (ex: root)}"
: "${DEPLOY_PATH:?DEPLOY_PATH manquant (ex: /var/www/html/isaure/vue-portfolio)}"

DEPLOY_DIST_DIR="${DEPLOY_DIST_DIR:-dist}"
DEPLOY_SERVICE="${DEPLOY_SERVICE:-apache2}"
DEPLOY_SSH_OPTS="${DEPLOY_SSH_OPTS:-"-o BatchMode=yes"}"

need_cmd npm
need_cmd rsync
need_cmd ssh
need_cmd date

REPO_ROOT="$(cd -- "$SCRIPT_DIR/.." && pwd)"
LOCAL_DIST="$REPO_ROOT/$DEPLOY_DIST_DIR"

REMOTE="${DEPLOY_USER}@${DEPLOY_HOST}"
REMOTE_DIST="${DEPLOY_PATH%/}/$DEPLOY_DIST_DIR"

echo "Deploy:"
echo "  Local:  $LOCAL_DIST/"
echo "  Remote: $REMOTE:$REMOTE_DIST/"

if [[ "$DO_BUILD" == "1" ]]; then
  if [[ "$DO_MEDIA_CHECK" == "1" ]]; then
    echo "Check medias: npm run build:videos:check (images:check est inclus dans npm run build)"
    if [[ "$DRY_RUN" == "0" ]]; then
      (cd "$REPO_ROOT" && npm run build:videos:check)
    fi
  fi

  echo "Build: npm run build"
  if [[ "$DRY_RUN" == "0" ]]; then
    (cd "$REPO_ROOT" && npm run build)
  fi
fi

if [[ ! -d "$LOCAL_DIST" ]]; then
  echo "Erreur: dist introuvable: $LOCAL_DIST" >&2
  exit 1
fi

REMOTE_MKDIR_CMD="sudo mkdir -p \"${DEPLOY_PATH%/}\" \"${REMOTE_DIST%/}\""
REMOTE_BACKUP_CMD=""
if [[ "$DO_BACKUP" == "1" ]]; then
  TS="$(date +%Y%m%d-%H%M%S)"
  REMOTE_BACKUP_CMD="if [ -d \"${REMOTE_DIST%/}\" ]; then sudo cp -a \"${REMOTE_DIST%/}\" \"${REMOTE_DIST%/}.backup.${TS}\"; fi"
fi

REMOTE_RELOAD_CMD=""
if [[ "$DO_RELOAD" == "1" ]]; then
  REMOTE_RELOAD_CMD="sudo systemctl reload \"$DEPLOY_SERVICE\""
fi

RSYNC_CMD=(rsync -avz --delete "$LOCAL_DIST/" "$REMOTE:$REMOTE_DIST/")

echo "SSH mkdir: $REMOTE_MKDIR_CMD"
if [[ -n "$REMOTE_BACKUP_CMD" ]]; then
  echo "SSH backup: $REMOTE_BACKUP_CMD"
fi
echo "Rsync: ${RSYNC_CMD[*]}"
if [[ -n "$REMOTE_RELOAD_CMD" ]]; then
  echo "SSH reload: $REMOTE_RELOAD_CMD"
fi

if [[ "$DRY_RUN" == "1" ]]; then
  exit 0
fi

ssh $DEPLOY_SSH_OPTS "$REMOTE" "$REMOTE_MKDIR_CMD"
if [[ -n "$REMOTE_BACKUP_CMD" ]]; then
  ssh $DEPLOY_SSH_OPTS "$REMOTE" "$REMOTE_BACKUP_CMD"
fi
"${RSYNC_CMD[@]}"
if [[ -n "$REMOTE_RELOAD_CMD" ]]; then
  ssh $DEPLOY_SSH_OPTS "$REMOTE" "$REMOTE_RELOAD_CMD"
fi

echo "OK"
