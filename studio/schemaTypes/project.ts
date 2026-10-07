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
    defineField({ name: 'sector', title: 'Secteur', type: 'string' }),
    defineField({
      name: 'cover',
      title: 'Couverture (face avant de la carte)',
      type: 'image',
      options: { hotspot: true },
      validation: (r) => r.required(),
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
  ],
  orderings: [{ title: 'Date, récent d’abord', name: 'dateDesc', by: [{ field: 'date', direction: 'desc' }] }],
  preview: { select: { title: 'title', subtitle: 'year', media: 'cover' } },
});
