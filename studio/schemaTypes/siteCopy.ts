import { defineField, defineType } from 'sanity';

/**
 * Textes du site (FR / EN), une fiche par page : nav, home, work, services, process, about, faq, contact, footer…
 * Chaque ligne = une clé technique (en lecture seule) + sa version française + sa version anglaise.
 * Le site lit ces fiches à la construction ; si une ligne est vide, le texte d'origine du code est utilisé.
 */
export const copyEntry = defineType({
  name: 'copyEntry',
  title: 'Texte',
  type: 'object',
  fields: [
    defineField({ name: 'key', title: 'Clé', type: 'string', readOnly: true }),
    defineField({ name: 'fr', title: 'Français', type: 'text', rows: 2 }),
    defineField({ name: 'en', title: 'English', type: 'text', rows: 2 }),
  ],
  preview: {
    select: { title: 'fr', subtitle: 'key' },
    prepare: ({ title, subtitle }) => ({ title: title || '—', subtitle }),
  },
});

export const siteCopy = defineType({
  name: 'siteCopy',
  title: 'Textes du site',
  type: 'document',
  fields: [
    defineField({ name: 'page', title: 'Page / section', type: 'string', readOnly: true }),
    defineField({
      name: 'entries',
      title: 'Textes',
      type: 'array',
      of: [{ type: 'copyEntry' }],
      description: 'Écrivez les deux langues. **gras** est reconnu dans certains textes (ex. pied de page).',
    }),
  ],
  preview: { select: { title: 'page' } },
});
