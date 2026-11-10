import { defineArrayMember, defineField } from 'sanity';

/**
 * Sections de la page projet, dans l'ordre voulu. Chaque section est séparée de la précédente par un trait
 * horizontal ; on choisit sa forme (texte, notes sur le côté, image, images, vidéo, palette).
 * Les textes sont des textes riches : titres, paragraphes, listes, gras, italique, liens.
 */
const heading = defineField({ name: 'heading', title: 'Titre de la section', type: 'string', description: 'Affiché à gauche (ex. Projet, Concept).' });
const body = defineField({
  name: 'body',
  title: 'Texte',
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [
        { title: 'Paragraphe', value: 'normal' },
        { title: 'Titre', value: 'h3' },
        { title: 'Sous-titre', value: 'h4' },
      ],
      lists: [
        { title: 'Liste à puces', value: 'bullet' },
        { title: 'Liste numérotée', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Gras', value: 'strong' },
          { title: 'Italique', value: 'em' },
          { title: 'Souligné', value: 'underline' },
        ],
        annotations: [
          {
            name: 'link',
            title: 'Lien',
            type: 'object',
            fields: [{ name: 'href', title: 'Adresse', type: 'url', validation: (r) => r.uri({ scheme: ['http', 'https', 'mailto'] }) }],
          },
        ],
      },
    },
  ],
});
/** premier texte d'un texte riche, pour les aperçus de la liste */
const plain = (blocks?: { children?: { text?: string }[] }[]) => (blocks ?? []).map((b) => (b.children ?? []).map((c) => c.text ?? '').join('')).join(' ');
const imageField = (name = 'image', title = 'Image') => defineField({ name, title, type: 'image', options: { hotspot: false }, validation: (r) => r.required() });
const caption = defineField({ name: 'caption', title: 'Légende', type: 'string', description: 'Affichée à côté de l’image, avec son numéro.' });

export const textSection = defineArrayMember({
  name: 'textSection',
  title: 'Texte',
  type: 'object',
  fields: [heading, body],
  preview: { select: { title: 'heading', subtitle: 'body' }, prepare: ({ title, subtitle }) => ({ title: title || 'Texte', subtitle: plain(subtitle).slice(0, 90) }) },
});

export const notesSection = defineArrayMember({
  name: 'notesSection',
  title: 'Texte avec notes sur le côté',
  type: 'object',
  fields: [
    heading,
    body,
    defineField({ name: 'notes', title: 'Notes sur le côté', type: 'array', of: [{ type: 'text', rows: 3 }], description: 'Petites notes affichées à droite du texte.' }),
  ],
  preview: { select: { title: 'heading', notes: 'notes' }, prepare: ({ title, notes }) => ({ title: title || 'Texte avec notes', subtitle: `Notes sur le côté : ${notes?.length ?? 0}` }) },
});

export const imageSection = defineArrayMember({
  name: 'imageSection',
  title: 'Image seule',
  type: 'object',
  fields: [
    imageField(),
    caption,
    defineField({ name: 'joined', title: 'Coller à la section précédente', type: 'boolean', description: 'Pas de trait avant l’image : elle fait corps avec le texte au-dessus.', initialValue: false }),
  ],
  preview: { select: { title: 'caption', media: 'image' }, prepare: ({ title, media }) => ({ title: title || 'Image', subtitle: 'Image seule', media }) },
});

export const imagesSection = defineArrayMember({
  name: 'imagesSection',
  title: 'Plusieurs images',
  type: 'object',
  fields: [
    defineField({
      name: 'layout',
      title: 'Disposition',
      type: 'string',
      initialValue: 'pair',
      options: {
        layout: 'radio',
        list: [
          { title: 'Côte à côte (2 images, idéal pour des formats verticaux)', value: 'pair' },
          { title: 'Grille de petites images (2 colonnes)', value: 'grid' },
          { title: 'Les unes sous les autres, en grand (un seul trait pour tout le groupe)', value: 'stack' },
        ],
      },
    }),
    defineField({
      name: 'images',
      title: 'Images et vidéos',
      type: 'array',
      validation: (r) => r.min(2),
      of: [
        {
          type: 'object',
          name: 'figure',
          title: 'Image',
          fields: [imageField(), caption],
          preview: { select: { title: 'caption', media: 'image' }, prepare: ({ title, media }) => ({ title: title || 'Image', media }) },
        },
        {
          type: 'object',
          name: 'figureVideo',
          title: 'Vidéo (uniquement en disposition « les unes sous les autres »)',
          fields: [
            defineField({ name: 'video', title: 'Fichier vidéo', type: 'file', options: { accept: 'video/mp4,video/webm' }, validation: (r) => r.required() }),
            defineField({ name: 'poster', title: 'Image d’attente (optionnelle)', type: 'image' }),
            caption,
          ],
          preview: { select: { title: 'caption', media: 'poster' }, prepare: ({ title, media }) => ({ title: title || 'Vidéo', subtitle: 'Vidéo', media }) },
        },
      ],
    }),
  ],
  preview: { select: { images: 'images', layout: 'layout', media: 'images.0.image' }, prepare: ({ images, layout, media }) => ({ title: `${images?.length ?? 0} éléments`, subtitle: layout === 'grid' ? 'Grille' : layout === 'stack' ? 'Les unes sous les autres' : 'Côte à côte', media }) },
});

export const videoSection = defineArrayMember({
  name: 'videoSection',
  title: 'Vidéo',
  type: 'object',
  fields: [
    defineField({ name: 'video', title: 'Fichier vidéo', type: 'file', options: { accept: 'video/mp4,video/webm' }, validation: (r) => r.required() }),
    defineField({ name: 'poster', title: 'Image d’attente (optionnelle)', type: 'image' }),
    caption,
  ],
  preview: { select: { title: 'caption', media: 'poster' }, prepare: ({ title, media }) => ({ title: title || 'Vidéo', subtitle: 'Vidéo', media }) },
});

export const paletteSection = defineArrayMember({
  name: 'paletteSection',
  title: 'Palette',
  type: 'object',
  fields: [
    defineField({
      name: 'swatches',
      title: 'Couleurs',
      type: 'array',
      description: 'Les valeurs RVB et CMJN s’affichent automatiquement à partir du code hexadécimal.',
      validation: (r) => r.min(1),
      of: [
        {
          type: 'object',
          name: 'swatch',
          title: 'Couleur',
          fields: [
            defineField({
              name: 'hex',
              title: 'Code hexadécimal',
              type: 'string',
              description: 'Ex. #C3964B',
              validation: (r) => r.required().regex(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i, { name: 'hex', invert: false }).error('Un code du type #C3964B'),
            }),
          ],
          preview: { select: { title: 'hex' } },
        },
      ],
    }),
    defineField({ name: 'note', title: 'Texte sous la palette', type: 'text', rows: 6, description: 'Paragraphes séparés par une ligne vide.' }),
  ],
  preview: { select: { swatches: 'swatches' }, prepare: ({ swatches }) => ({ title: 'Palette', subtitle: (swatches ?? []).map((s: { hex?: string }) => s.hex).join(' · ') }) },
});

export const sectionTypes = [textSection, notesSection, imageSection, imagesSection, videoSection, paletteSection];
