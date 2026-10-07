import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schemaTypes';

export default defineConfig({
  name: 'portfolio',
  title: 'Isaure Lohest — Portfolio',
  projectId: 'lplxpp6m',
  dataset: 'production',
  plugins: [structureTool()],
  schema: { types: schemaTypes },
});
