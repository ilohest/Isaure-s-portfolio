import { defineField, defineType } from 'sanity';

/**
 * Textes d'une page projet, en FR et EN.
 * Chaque ligne garde le texte d'origine (anglais, issu du code, en lecture seule) comme clé de rattachement,
 * avec sa version française et une version anglaise modifiable. Le site remplace le texte d'origine par la
 * version de la langue affichée ; une ligne vide garde le texte d'origine.
 */
export const projectCopyEntry = defineType({
  name: 'projectCopyEntry',
  title: 'Texte',
  type: 'object',
  fields: [
    defineField({ name: 'source', title: 'Texte d’origine', type: 'text', rows: 2, readOnly: true }),
    defineField({ name: 'fr', title: 'Français', type: 'text', rows: 3 }),
    defineField({ name: 'en', title: 'English (optionnel : laisser vide pour garder le texte d’origine)', type: 'text', rows: 3 }),
  ],
  preview: {
    select: { title: 'fr', subtitle: 'source' },
    prepare: ({ title, subtitle }) => ({ title: title || '— à traduire —', subtitle }),
  },
});

export const projectCopy = defineType({
  name: 'projectCopy',
  title: 'Textes de page projet',
  type: 'document',
  fields: [
    defineField({ name: 'ref', title: 'Projet', type: 'string', readOnly: true, description: 'web/<slug> ou branding/<slug>' }),
    defineField({ name: 'entries', title: 'Textes', type: 'array', of: [{ type: 'projectCopyEntry' }] }),
  ],
  preview: { select: { title: 'ref' } },
});
