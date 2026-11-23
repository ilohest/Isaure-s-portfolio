# Mise en ligne automatique à la publication dans Sanity

Quand tu publies dans le Studio, un webhook Sanity appelle `https://isaure-lohest.com/hooks/sanity`.
Le VPS (service `portfolio-hook`) attend 20 s, récupère le code (`git pull`), construit le site et le met en ligne.
Compte environ 1 à 2 minutes. `scripts/deploy-vps.sh` reste utilisable à la main depuis le Mac.

## Comment ça marche
- Dossier de build sur le VPS : `/opt/portfolio-build` (clone du dépôt + fichiers ignorés par git : `src/assets/media-src`, `public/assets/...`, `.env.local`).
- `scripts/vps/hook.mjs` : récepteur du webhook (port local 8788, relayé par Apache sur `/hooks/sanity`), protégé par un secret (`/etc/portfolio-hook.env` sur le VPS). Plusieurs publications rapprochées = une seule reconstruction.
- `scripts/vps/build-and-deploy.sh` : `git pull`, `npm ci` si besoin, build, sauvegarde `dist.backup`, copie vers le site, reload d'Apache.
- Journal : `journalctl -u portfolio-hook -n 100` sur le VPS.
- Premier build : ~1 h (optimisation des images). Ensuite : ~1 min grâce au cache.

## À savoir
- **Nouvelles images/vidéos sources locales** (`src/assets/media-src`, `public/assets`, non versionnées) : les envoyer sur le VPS avant de publier, par exemple
  `rsync -a src/assets/media-src/ root@<IP>:/opt/portfolio-build/src/assets/media-src/`.
- **Changements de code** : le VPS construit depuis `origin/main` : pousse (`git push`) avant de publier dans Sanity.
- Lancer un build à la main : `ssh root@<IP> /opt/portfolio-build/scripts/vps/build-and-deploy.sh`.

## Réglage du webhook Sanity
sanity.io/manage → projet `lplxpp6m` → API → Webhooks :
- URL : `https://isaure-lohest.com/hooks/sanity` · POST · Dataset `production` · Create/Update/Delete
- Filtre : `_type in ["project", "sector", "service", "technology"]`
- Header : `Authorization: Bearer <secret du VPS>`
- Drafts : décoché
