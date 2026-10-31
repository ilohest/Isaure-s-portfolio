# Prompt « nouveau projet » pour l'IA

Ce document sert à faire rédiger la page d'un projet par une autre IA (celle avec laquelle tu travailles sur le projet),
sous une forme que Claude peut encoder tel quel dans Sanity avec le skill `encode-project`.

**Mode d'emploi**

1. Ouvre une conversation avec l'IA du projet, donne-lui le prompt ci-dessous (bouton « Copier »), puis tout ce qu'elle doit savoir du projet (brief, captures, textes existants, liens).
2. Elle te rend un document (Markdown, ou `projet.json`) avec les textes seulement : les images et vidéos, tu les ajoutes toi-même dans le Studio.
3. Dis à Claude : « encode ce projet : `chemin/du/dossier/fichier` ». Claude le convertit si besoin, relit le ton avec `studio/documentation/ton-editorial.md` pour qu'il soit cohérent avec les autres projets, vérifie le fichier et crée les fiches français et anglais.
4. Le projet est créé **non publié**, sans image : dans le Studio, ajoute la couverture et les images, relis-le, puis coche « Publié ».

Le prompt se trouve dans le Studio : **Documentation**, avec un bouton « Copier ». Les listes de secteurs, services et technologies y sont lues en direct dans Sanity. Une valeur nouvelle est créée automatiquement ; pour éviter les doublons, mieux vaut réutiliser un nom de la liste quand il convient.

Le texte du prompt est dans `studio/documentation/prompt-projet.md` (c'est là qu'on le modifie).

## Ce que fait Claude ensuite

Le skill `encode-project` (dans `.claude/skills/encode-project/`) :

0. convertit un document Markdown en `projet.json` et relit le ton (guide : `studio/documentation/ton-editorial.md`) ;
1. lance un contrôle (`--dry`) : champs obligatoires, fichiers présents, types de sections, couleurs ;
2. (aucune image : elles sont ajoutées à la main) ;
3. crée les fiches FR et EN, les relie, et crée les secteurs / services / technologies qui n'existent pas encore ;
4. place le projet en tête de la liste, **non publié**.

Un projet déjà présent (même `slug` et même `type`) est mis à jour, sections comprises : les sections saisies à la main dans le Studio seraient remplacées.
