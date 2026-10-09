import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { documentInternationalization } from '@sanity/document-internationalization';
import { schemaTypes } from './schemaTypes';
import { structure } from './structure';
import { supportedLanguages, TRANSLATED_DOCUMENT_TYPES } from './lib/i18n';

export default defineConfig({
  name: 'portfolio',
  title: 'Isaure Lohest — Portfolio',
  projectId: 'lplxpp6m',
  dataset: 'production',
  plugins: [
    structureTool({ structure }),
    // un document par langue, reliés par un « translation.metadata » ; sélecteur de langue dans chaque projet
    documentInternationalization({
      supportedLanguages,
      schemaTypes: [...TRANSLATED_DOCUMENT_TYPES],
      languageField: 'language',
      weakReferences: false,
      bulkPublish: true,
    }),
  ],
  schema: {
    types: schemaTypes,
    // « Créer » passe par le plugin (un modèle par langue) : le modèle sans langue est retiré
    templates: (prev) => prev.filter((t) => t.id !== 'project'),
  },
  document: {
    newDocumentOptions: (prev) => prev.filter(({ templateId }) => templateId !== 'project' && templateId !== 'project-parameterized'),
  },
});
