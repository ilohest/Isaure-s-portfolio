import { defineField, defineType } from 'sanity';
import { CodeBlockIcon } from '@sanity/icons';
import { usedInField } from './usedIn';
import { sortTitleField } from './sortTitle';

/** Technologie de la « Stack » d'un projet (Astro, Sanity, Shopify…) : le nom est le même dans les deux langues. */
export const technology = defineType({
  name: 'technology',
  icon: CodeBlockIcon,
  title: 'Technologie',
  type: 'document',
  fields: [defineField({ name: 'title', title: 'Nom', type: 'string', validation: (r) => r.required() }), usedInField, sortTitleField],
  orderings: [{ title: 'Nom', name: 'title', by: [{ field: 'sortTitle', direction: 'asc' }] }],
  preview: { select: { title: 'title' } },
});
