import { defineField, defineType } from 'sanity';
import { ProjectsIcon } from '@sanity/icons';
import { EyeClosedIcon } from '@sanity/icons';
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list';
import { languageField } from '../lib/i18n';
import { sectionTypes } from './sections';

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
  icon: ProjectsIcon,
  title: 'Projet',
  type: 'document',
  groups: [
    { name: 'meta', title: 'Fiche projet', default: true },
    { name: 'content', title: 'Contenu de la page' },
    { name: 'texts', title: 'Textes de l’ancienne page', hidden: ({ document }) => Array.isArray(document?.sections) && document.sections.length > 0 },
  ],
  fields: [
    languageField,
    orderRankField({ type: 'project', newItemPosition: 'before' }),

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
            `count(*[_type == "project" && slug.current == $slug && language == $language && !(_id in [$id, "drafts." + $id])])`,
            { slug, language: document?.language ?? "fr", id },
          );
          return hits === 0;
        },
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date de livraison',
      type: 'date',
      group: 'meta',
      description: 'Sert à classer les projets (le plus récent d’abord).',
      validation: (r) => r.required(),
    }),
    defineField({ name: 'year', title: 'Année affichée', type: 'string', group: 'meta', description: 'Ex. 2026' }),
    defineField({
      name: 'cover',
      title: 'Couverture (face avant de la carte)',
      type: 'image',
      group: 'meta',
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'video',
      title: 'Vidéo (fichier mp4)',
      type: 'file',
      group: 'meta',
      options: { accept: 'video/mp4,video/webm' },
      description: 'Affichée juste après la carte d’info.',
    }),
    defineField({ name: 'videoUrl', title: 'ou lien de la vidéo', type: 'string', group: 'meta', description: 'Si la vidéo est hébergée ailleurs.' }),
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

    /* ── En-tête de la page (le bandeau du haut) ──────────────────────────── */
    defineField({
      name: 'sector',
      title: 'Secteur',
      type: 'reference',
      to: [{ type: 'sector' }],
      group: 'content',
      description: 'Colonne 1, sous le nom du projet. Choisi dans la liste « Secteurs ».',
    }),
    defineField({
      name: 'business',
      title: 'Le client (colonne 2, sous l’année)',
      type: 'text',
      rows: 3,
      group: 'content',
      description:
        'QUI est le client et ce qu’il fait : une ou deux phrases (300 caractères max). Rien sur le projet ici (c’est le rôle de « Le projet »). Reprise au dos de la carte sur la page Work. Ex. « Une brasserie artisanale du Périgord, qui vend du kombucha aux bars et aux épiceries. »',
      validation: (r) => r.max(300),
    }),
    defineField({
      name: 'overview',
      title: 'Le projet (colonne 3, « Aperçu »)',
      type: 'text',
      rows: 4,
      group: 'content',
      description:
        'CE QUE le client voulait et ce que j’ai fait pour lui : 2 à 3 phrases, en partant des personnes plutôt que de la technique. Ne répète pas la phrase du client. Ex. « Une plateforme où chaque professionnel commande à ses propres prix, sans ressaisie pour l’équipe. »',
    }),
    defineField({
      name: 'siteUrl',
      title: 'Lien vers le site (optionnel)',
      type: 'url',
      group: 'content',
      description: 'Affiché sous l’aperçu, avec une flèche ↗.',
      validation: (r) => r.uri({ scheme: ['http', 'https'] }),
    }),
    defineField({ name: 'siteLabel', title: 'Texte du lien (optionnel)', type: 'string', group: 'content', description: 'Ex. averys.app ou @f.lou.wers. Par défaut : l’adresse du site.', hidden: ({ document }) => !document?.siteUrl }),
    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      group: 'content',
      of: [{ type: 'reference', to: [{ type: 'service' }], weak: true }],
      description: 'Colonne 4, titre « Services ». Choisis dans la liste « Services » ; glisse pour réordonner.',
    }),
    defineField({
      name: 'stack',
      title: 'Stack',
      type: 'array',
      group: 'content',
      of: [{ type: 'reference', to: [{ type: 'technology' }], weak: true }],
      description: 'Colonne 4, titre « Stack », sous les services. Choisies dans la liste « Technologies ».',
    }),

    /* ── Sections de la page ──────────────────────────────────────────────── */
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      group: 'content',
      of: sectionTypes,
      description: 'Ajoute les sections une à une, dans l’ordre d’affichage. Un trait horizontal sépare chaque section.',
    }),

    /* ── Textes de la page ────────────────────────────────────────────────── */
    defineField({
      name: 'pageTexts',
      title: 'Traductions de l’ancienne page',
      type: 'array',
      group: 'texts',
      description:
        'Uniquement pour les pages qui n’ont pas encore de sections. Pour chaque texte, l’original (anglais, lecture seule) puis sa version dans la langue de ce document ; vide = le texte d’origine reste. Dès qu’une section est ajoutée à la page, cet onglet disparaît.',
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
  orderings: [orderRankOrdering, { title: 'Date, récent d’abord', name: 'dateDesc', by: [{ field: 'date', direction: 'desc' }] }],
  preview: {
    select: { title: 'title', year: 'year', language: 'language', published: 'published', soon: 'comingSoon', media: 'cover' },
    prepare: ({ title, year, language, published, soon, media }) => ({
      title,
      subtitle: [language?.toUpperCase(), year, published === false ? 'Non publié' : null, soon ? 'Bientôt disponible' : null].filter(Boolean).join(' · '),
      // œil barré à la place de la vignette : les projets non publiés se repèrent d'un coup d'œil
      media: published === false ? EyeClosedIcon : media,
    }),
  },
});
