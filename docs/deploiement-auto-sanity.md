# Mise en ligne automatique à la publication dans Sanity

Quand tu publies dans le Studio, un webhook Sanity prévient GitHub, qui lance le workflow
`.github/workflows/deploy-on-sanity.yml` : build du site, envoi sur le VPS, reload d'Apache.
Compte 3 à 5 minutes entre « Publier » et le site à jour. `scripts/deploy-vps.sh` reste utilisable à la main.

## À faire une seule fois

### 1. Secrets GitHub
Dépôt → Settings → Secrets and variables → Actions → New repository secret :

| Secret | Valeur |
| --- | --- |
| `DEPLOY_HOST` | l'IP du VPS (celle de `scripts/deploy-vps.env`) |
| `DEPLOY_USER` | l'utilisateur SSH (idem) |
| `DEPLOY_PATH` | le dossier sur le VPS (idem, ex. `/var/www/html/isaure/vue-portfolio`) |
| `DEPLOY_SSH_KEY` | une clé privée **dédiée** à ce déploiement (voir ci-dessous) |
| `DEPLOY_KNOWN_HOSTS` | résultat de `ssh-keyscan -t ed25519 <IP du VPS>` |

Clé dédiée (ne réutilise pas ta clé personnelle) :

```bash
ssh-keygen -t ed25519 -N "" -C "github-deploy" -f ~/.ssh/github-deploy
ssh-copy-id -i ~/.ssh/github-deploy.pub <utilisateur>@<IP du VPS>
cat ~/.ssh/github-deploy
```

Colle le contenu de la clé privée (`cat`) dans `DEPLOY_SSH_KEY`, puis supprime-la de ton Mac si tu veux.

### 2. Jeton GitHub pour le webhook
GitHub → Settings → Developer settings → Fine-grained tokens → Generate :
dépôt `Isaure-s-portfolio` uniquement, permission **Contents : Read and write** (c'est ce qu'exige l'API
`dispatches`). Copie le jeton.

### 3. Webhook Sanity
sanity.io/manage → projet `lplxpp6m` → API → Webhooks → Create :

- **URL** : `https://api.github.com/repos/ilohest/Isaure-s-portfolio/dispatches`
- **Dataset** : `production` · **Trigger on** : Create, Update, Delete
- **Filter** : `_type in ["project", "sector", "service", "technology"]` (adapte si d'autres types alimentent le site)
- **Projection** : `{"event_type": "sanity-publish"}`
- **HTTP method** : POST · **HTTP Headers** :
  - `Authorization` : `Bearer <le jeton de l'étape 2>`
  - `Accept` : `application/vnd.github+json`
- **Drafts** : décoché (seules les publications déclenchent)

## Vérifier
Publie une modification, puis regarde l'onglet **Actions** du dépôt : une exécution
« Déployer le site (publication Sanity) » doit démarrer. Tu peux aussi la lancer à la main (Run workflow).

## Bon à savoir
- Plusieurs publications rapprochées : elles sont mises en file, une seule mise en ligne à la fois.
- Le dépôt est public : les secrets restent dans GitHub, jamais dans le code.
- La clé SSH donne accès au VPS : garde-la dédiée, et révoque-la dans `~/.ssh/authorized_keys` du VPS si besoin.
