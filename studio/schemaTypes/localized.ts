import { defineField, defineType } from 'sanity';
import { supportedLanguages } from '../lib/i18n';

/** Un type objet « une valeur par langue » pour chaque forme de texte. */
const localized = (name: string, title: string, make: (id: string, title: string) => ReturnType<typeof defineField>) =>
  defineType({
    name,
    title,
    type: 'object',
    options: { columns: 2 },
    fields: supportedLanguages.map(({ id, title: t }) => make(id, t)),
  });

export const localeString = localized('localeString', 'Texte court (par langue)', (id, title) =>
  defineField({ name: id, title, type: 'string' }),
);

export const localeText = localized('localeText', 'Texte long (par langue)', (id, title) =>
  defineField({ name: id, title, type: 'text', rows: 3 }),
);

export const localeKeywords = defineType({
  name: 'localeKeywords',
  title: 'Mots-clés (par langue)',
  type: 'object',
  fields: supportedLanguages.map(({ id, title }) =>
    defineField({ name: id, title, type: 'array', of: [{ type: 'string' }], options: { layout: 'tags' } }),
  ),
});
