---
name: encode-project
description: Encode un projet du portfolio dans Sanity à partir d'un document de projet (Markdown ou projet.json rédigé par une autre IA) (textes seulement, sans images) : relit le ton pour qu'il soit cohérent avec les autres projets, puis crée les fiches FR et EN, secteur, services, technologies et sections. À utiliser quand Isaure donne un fichier de projet, ou demande d'encoder / ajouter / importer un nouveau projet dans Sanity.
---

# Encoder un projet dans Sanity

Le format du fichier est décrit dans `studio/documentation/prompt-projet.md` (le prompt qu’Isaure donne à l’IA qui rédige le projet, aussi affiché dans le Studio, Documentation). Le script est `studio/scripts/encode-project.ts`.

## Procédure

1. **Repérer le fichier** : le chemin donné par Isaure. Il peut être un **document Markdown** (le modèle du prompt) ou un `projet.json`. Le fichier ne contient **pas d'images** : Isaure les ajoute elle-même dans le Studio (couverture comprise, le script accepte un projet sans `cover`). Ne pas en demander ni en inventer.
1bis. **Si c'est du Markdown** : le convertir en `projet.json` (même dossier, à côté du fichier source, sans toucher à ce dernier) en suivant le format du script (voir le tableau des sections dans `studio/documentation/prompt-projet.md`). Correspondances : « Le client » → `business`, « Aperçu » → `overview`, `### Texte` → `text`, `### Palette` → `palette`. (Si le document contient quand même des sections image / vidéo, les ignorer et le dire.)
1ter. **Relire le ton** avec `studio/documentation/ton-editorial.md` : harmoniser l'humain, le niveau technique, la voix, la typographie, les légendes, la longueur des champs ; vérifier que « Le client » ne parle pas du projet et ne répète pas « Aperçu » ; ne rien inventer (chiffres, noms, résultats). Garder le fond, corriger la forme. Dire à Isaure, en quelques lignes, ce qui a été réécrit de façon notable ; si un texte manque d'information (client peu décrit, aucun contexte), le signaler plutôt que d'inventer.
2. **Contrôle d'abord**, depuis `studio/` :
   ```bash
   npx sanity exec scripts/encode-project.ts --with-user-token -- --dry /chemin/projet.json
   ```
   Il liste les erreurs (champ manquant, fichier introuvable, type de section inconnu, couleur invalide) et ce qui serait créé (nouveaux secteurs, services, technologies). Si le fichier est invalide : ne rien corriger toi-même sur le fond ; dis à Isaure ce qui manque, ou corrige ce qui est purement formel (JSON mal fermé, nom de fichier avec une autre casse) en le disant.
3. **Vérifier les doublons évidents** dans « À créer » : un service ou une technologie qui existe déjà sous un nom proche (« Vue » / « Vue.js », « Design web » / « Web design ») doit être aligné sur l'existant dans le JSON plutôt que créé. Si c'est ambigu, demande.
4. **Encoder** (même commande sans `--dry`). Le projet est créé **non publié** (sauf `"published": true` dans le fichier) et placé en tête de la liste.
5. **Vérifier** : relire la sortie, puis `npm run build` à la racine ; la page `/projets/<slug>` n'existe que si le projet est publié, donc pour la voir : demander à Isaure de cocher « Publié » dans le Studio.
6. **Rendre compte** : ce qui a été créé (fiches, sections, nouveaux secteurs / services / technologies), ce qui reste à faire (cocher « Publié », relire les traductions), et que rien n'est commité ni déployé.

## À savoir

- Un projet déjà présent (même `slug`, même `type`) est mis à jour : les sections sont remplacées, **donc les images ajoutées à la main disparaîtraient**. Ne pas ré-encoder une fiche existante sans l'accord d'Isaure.
- Un projet `branding` dont le `slug` existe déjà en `web` reçoit automatiquement le suffixe `-branding`.
- Les textes riches viennent d'un mini-Markdown (`**gras**`, `*italique*`, `<u>souligné</u>`, `[lien](url)`, `## Titre`, listes) converti en texte riche Sanity.
- Les pages du site lisent Sanity au build : les modifications n'apparaissent en ligne qu'après un nouveau build et déploiement (`scripts/deploy-vps.sh`), à ne lancer que sur demande.
- Le script utilise la session `sanity login` (pas de token à coller). Le Studio doit être connecté avec le compte du projet `lplxpp6m`.
