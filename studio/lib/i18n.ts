/**
 * Multilingue au niveau des CHAMPS : un projet = un seul document ; seuls les textes existent en plusieurs
 * langues (types « locale… » : un sous-champ par langue). Médias, date, type et slug sont partagés.
 * Ajouter une langue = l'ajouter ici, puis dans src/i18n/index.ts et src/lib/sanity.ts côté site.
 */
export const supportedLanguages = [
  { id: 'fr', title: 'Français' },
  { id: 'en', title: 'English' },
] as const;
export type LanguageId = (typeof supportedLanguages)[number]['id'];
export const baseLanguage: LanguageId = 'fr';
