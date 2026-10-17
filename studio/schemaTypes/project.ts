import { defineField, defineType } from 'sanity';
import { languageField } from '../lib/i18n';

/**
 * Un projet = une carte du puzzle de la page Work + sa page d'étude de cas.
 *
 * Chaque projet existe en deux documents : un en français, un en anglais (sélecteur de langue en haut du
 * document). Les deux ont le même slug ; les images et la vidéo se renseignent dans chaque langue
 * (Sanity ne stocke pas deux fois un même fichier). Si une version manque, le site reprend l'autre langue.
 *
 * Onglets : Fiche projet · Images & vidéo · Textes de la page.
 */
export const project = defineType({
  name: 'project',
  title: 'Projet',
  type: 'document',
  groups: [
    { name: 'meta', title: 'Fiche projet', default: true },
    { name: 'media', title: 'Images & vidéo' },
    { name: 'texts', title: 'Textes de la page' },
  ],
  fields: [
    languageField,

    /* ── Fiche projet ─────────────────────────────────────────────────────── */
    defineField({
      name: 'title',
      title: 'Nom du projet',
      type: 'string',
      group: 'meta',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Adresse de la page (slug)',
      type: 'slug',
      group: 'meta',
      description: 'Identique en français et en anglais : elle relie la page aux textes du site.',
      options: {
        source: 'title',
        maxLength: 80,
        // unique par langue : la version FR et la version EN d'un projet partagent le même slug
        isUnique: async (slug, context) => {
          const { document, getClient } = context;
          const id = (document?._id ?? '').replace(/^drafts\./, '');
          const hits = await getClient({ apiVersion: '2025-01-01' }).fetch<number>(
            `count(*[_type == "project" && slug.current == $slug && kind == $kind && language == $language && !(_id in [$id, "drafts." + $id])])`,
            { slug, kind: document?.kind ?? "web", language: document?.language ?? "fr", id },
          );
          return hits === 0;
        },
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'kind',
      title: 'Type',
      type: 'string',
      group: 'meta',
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
      group: 'meta',
      description: 'Sert à classer les projets (le plus récent d’abord).',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'rank',
      title: 'Rang (départage deux projets de même date)',
      type: 'number',
      group: 'meta',
      description: 'Plus grand = plus récent.',
    }),
    defineField({ name: 'year', title: 'Année affichée', type: 'string', group: 'meta', description: 'Ex. 2026' }),
    defineField({ name: 'sector', title: 'Secteur', type: 'string', group: 'meta', description: 'Ex. Gastronomie, Édition…' }),
    defineField({
      name: 'keywords',
      title: 'Mots-clés (carte d’info)',
      type: 'array',
      group: 'meta',
      of: [{ type: 'string' }],
      description: 'Affichés sous le titre, dans l’ordre (ex. Identité visuelle, Site web, Print).',
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'summary',
      title: 'Phrase du verso',
      type: 'string',
      group: 'meta',
      description: 'Une phrase très courte (≈ 60 caractères), au dos de la carte.',
      validation: (r) => r.max(90),
    }),
    defineField({
      name: 'externalUrl',
      title: 'Lien personnalisé (optionnel)',
      type: 'string',
      group: 'meta',
      description: 'Par défaut : /work/web-development/<slug> ou /work/branding/<slug>.',
    }),
    defineField({ name: 'published', title: 'Publié', type: 'boolean', group: 'meta', initialValue: true }),
    defineField({
      name: 'comingSoon',
      title: 'Bientôt disponible (masquer le contenu)',
      type: 'boolean',
      group: 'meta',
      initialValue: false,
      description:
        'Activé : la page du projet affiche seulement « Coming soon » (titre, secteur, année). Désactivez puis relancez le déploiement du site pour le montrer.',
    }),

    /* ── Images & vidéo ───────────────────────────────────────────────────── */
    defineField({
      name: 'cover',
      title: 'Couverture (face avant de la carte)',
      type: 'image',
      group: 'media',
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Images du projet (grille Work)',
      type: 'array',
      group: 'media',
      description:
        'Toutes les images du projet. Cochez « Afficher dans la grille » sur celles à mettre en avant ; glissez-déposez pour changer l’ordre. Elles gardent leur format d’origine.',
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
      group: 'media',
      options: { accept: 'video/mp4,video/webm' },
      description: 'Affichée juste après la carte d’info.',
    }),
    defineField({ name: 'videoUrl', title: 'ou lien de la vidéo', type: 'string', group: 'media', description: 'Si la vidéo est hébergée ailleurs.' }),

    /* ── Textes de la page ────────────────────────────────────────────────── */
    defineField({
      name: 'pageTexts',
      title: 'Textes de la page projet',
      type: 'array',
      group: 'texts',
      description:
        'Les textes de l’étude de cas, dans la langue de ce document. À gauche, le texte d’origine (anglais, lecture seule) ; écrivez à côté la version de cette langue. Une ligne vide garde le texte d’origine.',
      of: [
        {
          type: 'object',
          name: 'pageText',
          title: 'Texte',
          fields: [
            { name: 'source', title: 'Texte d’origine', type: 'text', rows: 2, readOnly: true },
            { name: 'text', title: 'Texte dans cette langue', type: 'text', rows: 3 },
          ],
          preview: {
            select: { title: 'text', subtitle: 'source' },
            prepare: ({ title, subtitle }) => ({ title: title || '— à écrire —', subtitle }),
          },
        },
      ],
    }),
  ],
  orderings: [{ title: 'Date, récent d’abord', name: 'dateDesc', by: [{ field: 'date', direction: 'desc' }] }],
  preview: {
    select: { title: 'title', year: 'year', language: 'language', published: 'published', soon: 'comingSoon', media: 'cover' },
    prepare: ({ title, year, language, published, soon, media }) => ({
      title,
      subtitle: [language?.toUpperCase(), year, published === false ? 'Masqué' : null, soon ? 'Bientôt disponible' : null].filter(Boolean).join(' · '),
      media,
    }),
  },
});
