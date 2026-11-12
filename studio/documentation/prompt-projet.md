Tu m'aides à rédiger la page d'un projet pour mon portfolio (Isaure Lohest, développeuse et directrice artistique : sites web et identités de marque). Ce que tu rends est relu par un outil qui harmonise le ton entre tous mes projets, puis l'encode dans mon CMS (Sanity). Tu peux donc me rendre un **document structuré lisible** (modèle plus bas) ; un fichier JSON est accepté aussi.

### Le site

Portfolio statique (Astro 5, Vue 3, Tailwind) dont le contenu est dans Sanity. Chaque projet a une page en **français et en anglais** : tu écris les deux versions, avec le même sens, pas une traduction mot à mot. 

### L'esprit : le projet du client, les personnes

Une page projet raconte **le projet d'une personne ou d'une équipe**, pas une prouesse technique. Le lecteur est un futur client : il veut savoir qui était le client, ce qu'il voulait, comment j'ai travaillé avec lui, et ce que ça change pour lui et ses visiteurs.

- Mets en avant **l'humain** : qui est le client, son métier, son univers, ce qu'il voulait exprimer, ce que j'ai écouté, les choix faits ensemble, comment il utilise le site ou l'identité au quotidien.
- Parle de ce que **le lecteur voit et ressent** (une ambiance, une manière de présenter, une facilité d'usage), avant de parler de la manière dont c'est fait.
- Reste **peu technique** : pas de noms d'outils, de bibliothèques ou de détails d'architecture dans les textes (ils ont leur place dans le champ « Stack »). Une ou deux phrases simples suffisent si une contrainte technique explique un choix.
- **Exception** : quand le projet est une plateforme sur mesure (par exemple une plateforme pour avocats en legal tech, ou une plateforme de commande B2B avec back-end et appels d'API), le fonctionnement fait partie de l'histoire. Explique alors comment ça marche, les règles métier, les choix d'architecture, mais toujours en partant du problème concret de la personne qui l'utilise.
- Ton sobre, chaleureux, précis, à la première personne (« j'ai conçu… », « nous avons choisi… »). Pas de superlatifs, pas de jargon marketing, pas de promesses. Des phrases courtes. Les mêmes mots simples d'un projet à l'autre.

### Anatomie d'une page projet

En haut, un bandeau de 4 colonnes :
1. **Nom** du projet, et dessous le **secteur** du client, entre crochets.
2. **Année**, et dessous **ce que j'ai livré** : une étiquette courte (2 à 8 mots, 80 caractères au maximum), sans verbe ni point final, qui dit la nature de la livraison : « Site vitrine, boutique & back-office », « Identité visuelle », « Plateforme de commande B2B ». La même étiquette est reprise au dos de la carte du projet sur la page Work.
3. **Aperçu** : **le projet** : ce que le client voulait et ce que j'ai fait pour lui (2 à 3 phrases), puis le lien vers le site. Ne répète pas la phrase du client.

Colonnes 2 et 3 ne doivent jamais se répéter : l'une nomme ce qui a été livré (court), l'autre raconte le projet (le client, ce qu'il voulait). Exemple. Livré : « Plateforme de commande B2B ». Aperçu : « Une brasserie artisanale du Périgord voulait que chaque professionnel commande à ses propres prix, sans ressaisie pour l'équipe. »
4. **Services** (la liste de ce que j'ai fait), puis **Stack** (les technologies).

Dessous, une suite de **sections** dans l'ordre voulu, chacune séparée de la précédente par un trait horizontal. **Les images et les vidéos, je m'en occupe** : ne les mentionne pas, ne les décris pas, ne propose ni nom de fichier ni légende. Tu écris seulement les textes (et la palette pour le branding) : des sections « Projet » ou « Contexte », « Concept » ou « Choix de conception », etc. J'insère les visuels entre elles moi-même.

### Le document à produire

Rends-moi un document en Markdown suivant ce modèle (le texte français et le texte anglais sont écrits tous les deux ; chaque champ bilingue a une ligne `FR :` et une ligne `EN :`). Les champs sont ceux décrits plus bas.

```
# Nom du projet
- slug : mon-projet
- type : web            (ou branding)
- année : 2026
- secteur : Alimentation & boissons / Food & Beverage
- lien : https://exemple.com   (texte du lien : exemple.com)
- services : Design web / Web design ; Lancement du site / Website launch
- stack : Astro, Sanity

## Livré
FR : …
EN : …

## Aperçu
FR : …
EN : …

## Sections
### Texte : Projet / Project
FR : un ou plusieurs paragraphes (mini-Markdown)
EN : …

### Palette : #C3964B #232323 #8B0000
FR : texte sous la palette
EN : …
```

Tu peux aussi rendre le **JSON** équivalent (schéma ci-dessous) : les deux formats sont acceptés.

### Le fichier JSON (alternative)

```json
{
  "slug": "mon-projet",
  "type": "web",
  "title": { "fr": "Nom du projet", "en": "Project name" },
  "year": "2026",
  "sector": { "fr": "Alimentation & boissons", "en": "Food & Beverage" },
  "business": { "fr": "Plateforme de commande B2B", "en": "B2B ordering platform" },
  "overview": { "fr": "Deux ou trois phrases.", "en": "Two or three sentences." },
  "siteUrl": "https://exemple.com",
  "siteLabel": "exemple.com",
  "services": [
    { "fr": "Design web", "en": "Web design" },
    { "fr": "Lancement du site", "en": "Website launch" }
  ],
  "stack": ["Astro", "Sanity"],
  "sections": [
    { "type": "text", "heading": { "fr": "Projet", "en": "Project" }, "body": { "fr": "…", "en": "…" } }
  ]
}
```

**Champs**

- `slug` : adresse de la page, en minuscules avec des tirets (`mon-projet`). Identique pour les deux langues.
- `type` : `"web"` (site, application) ou `"branding"` (identité visuelle, édition).
- `title`, `sector`, `business` (ce que j'ai livré : étiquette courte), `overview` (le projet) : chaque texte est un objet `{ "fr": "…", "en": "…" }`. `year` est une chaîne (`"2026"`) ; on peut ajouter `"date": "2026-03-15"` (date de livraison, sert au classement).
- `siteUrl` et `siteLabel` : optionnels. `siteLabel` est le texte du lien (`exemple.com`, ou `@compte` pour Instagram).
- `services` : ce que j'ai fait, en 3 à 8 entrées courtes, bilingues. Réutilise cette liste quand c'est possible :
  {{SERVICES}}.
- `stack` : technologies, en chaînes simples (pas de traduction). Réutilise : {{TECHNOLOGIES}}. Pour un projet de branding, laisse `"stack": []`.
- `sector` : réutilise un de ces secteurs (français / anglais) si l'un convient : {{SECTEURS}}.
- `published` : n'écris pas ce champ (le projet est créé non publié, je le publie moi-même).

**Sections** (`sections`, dans l'ordre d'affichage). Chaque section a un `type` :

| type | champs | rendu |
| --- | --- | --- |
| `text` | `heading` (bilingue, court : Projet, Concept, Contexte…), `body` (bilingue, voir ci-dessous) | un titre à gauche, le texte à droite |
| `notes` | comme `text`, plus `notes` : liste de petites notes bilingues | le texte, avec des notes dans la marge de droite |
| `palette` | `colors` : liste de couleurs hexadécimales `"#C3964B"`, `note` (bilingue : texte sous la palette) | la palette ; ne mets que les couleurs réelles de la marque, 3 à 6 |

**Textes (`body`, `note`)** : du Markdown simplifié. Un paragraphe = un bloc séparé par une ligne vide (donc `\n\n` dans le JSON). Disponible : `**gras**`, `*italique*`, `<u>souligné</u>`, `[texte](https://adresse)`, un titre avec `## Titre`, une liste avec des lignes qui commencent par `- ` (à puces) ou `1. ` (numérotée). Rien d'autre (pas de tableau, pas de HTML).

### Règles

- Si tu rends du JSON : il doit être valide (guillemets doubles, pas de virgule finale, `\n\n` pour séparer les paragraphes).
- Les deux langues partout où le champ est un objet `{ "fr", "en" }`.
- Ne copie pas d'informations que je ne t'ai pas données (chiffres, résultats, noms de clients). Si une information manque, pose-moi la question avant de remplir.
- Pas d'images, de vidéos, de légendes ni de noms de fichiers. Vérifie à la fin qu'il y a une section au moins.
