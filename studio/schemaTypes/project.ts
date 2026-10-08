import { defineField, defineType } from 'sanity';

/**
 * Un projet = une carte du puzzle de la page Work.
 * L'étude de cas détaillée reste dans le code (Astro) tant qu'elle n'est pas migrée :
 * renseignez alors « Lien personnalisé » ou laissez le slug pointer vers /work/...
 */
export const project = defineType({
  name: 'project',
  title: 'Projet',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Titre', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'title', maxLength: 80 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'kind',
      title: 'Type',
      type: 'string',
      initialValue: 'web',
      options: {
        list: [
          { title: 'Web', value: 'web' },
          { title: 'Branding', value: 'branding' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'date',
      title: 'Date de livraison',
      type: 'date',
      description: 'Sert à classer les projets (le plus récent d’abord).',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'rank',
      title: 'Rang (départage deux projets de même date)',
      type: 'number',
      description: 'Plus grand = plus récent.',
    }),
    defineField({ name: 'year', title: 'Année affichée', type: 'string', description: 'Ex. 2026' }),
    defineField({ name: 'sector', title: 'Secteur — EN', type: 'string' }),
    defineField({ name: 'sectorFr', title: 'Secteur — FR', type: 'string' }),
    defineField({
      name: 'cover',
      title: 'Couverture (face avant de la carte)',
      type: 'image',
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'keywords',
      title: 'Mots-clés — EN (carte d’info)',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Affichés sous le titre, dans l’ordre (ex. Brand identity, Website, Print).',
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'keywordsFr',
      title: 'Mots-clés — FR',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Version française des mots-clés (mêmes positions que la version anglaise).',
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'gallery',
      title: 'Images du projet (grille Work)',
      type: 'array',
      description: 'Toutes les images du projet. Cochez « Afficher dans la grille » sur celles à mettre en avant ; glissez-déposez pour changer l’ordre. Elles gardent leur format d’origine.',
      of: [
        {
          type: 'object',
          name: 'workImage',
          title: 'Image',
          fields: [
            { name: 'image', title: 'Image', type: 'image', options: { hotspot: false }, validation: (r) => r.required() },
            { name: 'caption', title: 'Légende (optionnelle)', type: 'string' },
            {
              name: 'showInGrid',
              title: 'Afficher dans la grille',
              type: 'boolean',
              initialValue: true,
              description: 'Décochez pour garder l’image dans le projet sans la mettre en avant dans la grille.',
            },
          ],
          preview: {
            select: { title: 'caption', media: 'image', on: 'showInGrid' },
            prepare: ({ title, media, on }) => ({ title: title || 'Image', subtitle: on === false ? 'masquée dans la grille' : 'dans la grille', media }),
          },
        },
      ],
    }),
    defineField({
      name: 'video',
      title: 'Vidéo (fichier mp4)',
      type: 'file',
      options: { accept: 'video/mp4,video/webm' },
      description: 'Affichée juste après la carte d’info.',
    }),
    defineField({
      name: 'videoUrl',
      title: 'ou lien de la vidéo',
      type: 'string',
      description: 'Si la vidéo est hébergée ailleurs.',
    }),
    defineField({
      name: 'summaryFr',
      title: 'Phrase du verso — FR',
      type: 'string',
      description: 'Une phrase très courte (≈ 60 caractères).',
      validation: (r) => r.max(90),
    }),
    defineField({
      name: 'summaryEn',
      title: 'Phrase du verso — EN',
      type: 'string',
      validation: (r) => r.max(90),
    }),
    defineField({
      name: 'externalUrl',
      title: 'Lien personnalisé (optionnel)',
      type: 'string',
      description: 'Par défaut : /work/web-development/<slug> ou /work/branding/<slug>.',
    }),
    defineField({ name: 'published', title: 'Publié', type: 'boolean', initialValue: true }),
    defineField({
      name: 'comingSoon',
      title: 'Bientôt disponible (masquer le contenu)',
      type: 'boolean',
      initialValue: false,
      description:
        'Activé : la page du projet affiche seulement « Coming soon » (titre, secteur, année). Le contenu peut déjà être préparé sans être dévoilé. Désactivez puis relancez le déploiement du site pour le montrer.',
    }),
  ],
  orderings: [{ title: 'Date, récent d’abord', name: 'dateDesc', by: [{ field: 'date', direction: 'desc' }] }],
  preview: { select: { title: 'title', subtitle: 'year', media: 'cover' } },
});
