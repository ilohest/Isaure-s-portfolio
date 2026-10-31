import { defineField, defineType } from 'sanity';
import { CogIcon } from '@sanity/icons';
import { usedInField } from './usedIn';
import { sortTitleField } from './sortTitle';

/** Service rendu sur un projet (ex. Design éditorial) : défini une fois, FR + EN, puis choisi dans chaque projet. */
export const service = defineType({
  name: 'service',
  icon: CogIcon,
  title: 'Service',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Nom en français', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'titleEn', title: 'Nom en anglais', type: 'string', validation: (r) => r.required() }),
    usedInField,
    sortTitleField,
  ],
  orderings: [{ title: 'Nom', name: 'title', by: [{ field: 'sortTitle', direction: 'asc' }] }],
  preview: { select: { title: 'title', subtitle: 'titleEn' } },
});
