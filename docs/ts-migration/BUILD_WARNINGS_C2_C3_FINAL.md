# Bilan final warnings build apres C2/C3

Date: 2026-02-24
Branche: `codex/ts-migration-orchestrator`

## Validation executee

Commande:

```bash
npm run build
```

Resultat:
- Build OK
- Webpack remonte 2 warnings (categories):
  - `asset size limit`
  - `entrypoint size limit`

## 1) Warnings restants (etat actuel)

- Seuil webpack: 244 KiB.
- Assets au-dessus du seuil: **197** fichiers (comptage sur `dist`).
- Repartition des assets > 244 KiB:
  - images: 139
  - videos (`.mp4`/`.mov`): 51
  - javascript: 3
  - css: 1
  - autres: 3

Plus gros assets actuels (extrait):
- `dist/media/videos/mark-conlan-home.mov`: 14.95 MiB
- `dist/img/blc6.eb20ed1d.png`: 7.43 MiB
- `dist/img/mockup2-bodamp.1fe3cc44.png`: 7.13 MiB
- `dist/media/video-boda-N&M.c936edd8.mp4`: 6.57 MiB
- `dist/media/video-didacmania.e7e159c3.mp4`: 5.91 MiB
- `dist/media/video-creyda-short.35eedce0.mp4`: 5.65 MiB
- `dist/img/blc11.07e3360e.png`: 5.03 MiB

Code/CSS les plus lourds:
- `dist/js/home.4221a018.js`: 1.39 MiB
- `dist/css/chunk-vendors.d17b1de6.css`: 670 KiB
- `dist/js/contact.fb2a8973.js`: 422 KiB
- `dist/js/chunk-vendors.994b4671.js`: 403 KiB

Warning entrypoint:
- `app`: 1.1 MiB (compose de `chunk-vendors` JS/CSS + `app` JS/CSS)

## 2) Comparaison avec etat precedent (avant C2/C3)

Constat de reproductibilite:
- Le build du commit pre-C2/C3 (`41deb7f`) et de l'etat C2 (`a093976`) echoue localement (asset CSS manquant: `assets/img/bird-animation.svg`), donc **pas de comparaison fiable warning-par-warning** possible par re-run historique.

Comparaison exploitable:
- Nombre de categories de warnings webpack sur l'etat courant: **2** (identique en nature: `asset size limit` + `entrypoint size limit`).
- Les plus gros assets restants sont encore majoritairement medias lourds (videos + PNG haute resolution).

Limite:
- Sans build historique reproductible, le delta exact "nombre d'assets au-dessus du seuil avant/apres C2/C3" n'est pas calculable proprement dans cette session.

## 3) 3 actions supplementaires classees par ROI

1. **ROI tres fort / effort faible**: sortir les videos > 1 MiB du bundle app (CDN/static externe) et ne garder que des URL runtime.
   - Impact attendu: baisse massive du bruit `asset size limit`, de la taille du `dist`, et du temps de download initial.
2. **ROI fort / effort faible**: convertir les PNG > 1 MiB en AVIF/WebP et servir via `srcset` (desktop/mobile deja present dans le projet).
   - Impact attendu: reduction immediate des plus gros images (`blc*`, `mockup*`, `bod*`).
3. **ROI moyen a fort / effort faible**: reduire `chunk-vendors.css` (purge CSS ciblee + import CSS a la demande sur pages projet).
   - Impact attendu: baisse de l'entrypoint `app` (1.1 MiB actuellement).

## 4) Micro-fix safe applique (documentation)

- Ajout de ce bilan final dans `docs/ts-migration/`.
- Pas de changement fonctionnel applicatif.
