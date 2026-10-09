import { defineField } from 'sanity';

/**
 * Multilingue au niveau DOCUMENT (plugin @sanity/document-internationalization), comme dans Studio Abîme :
 * un projet = un document français + un document anglais, reliés par un « translation.metadata ».
 * Aucun champ « par langue » dans le schéma : chaque document est écrit dans une seule langue.
 * Ajouter une langue = l'ajouter ici (et dans src/i18n/index.ts côté site).
 */
export const supportedLanguages = [
  { id: 'fr', title: 'Français' },
  { id: 'en', title: 'English' },
];
export const baseLanguage = 'fr';

/** Types soumis à la traduction. */
export const TRANSLATED_DOCUMENT_TYPES = ['project'] as const;

/** Champ `language`, explicite pour qu'il soit toujours présent dans les requêtes ; non modifiable à la main. */
export const languageField = defineField({
  name: 'language',
  title: 'Langue',
  type: 'string',
  readOnly: true,
  initialValue: baseLanguage,
  options: { list: supportedLanguages.map(({ id, title }) => ({ value: id, title })) },
});
