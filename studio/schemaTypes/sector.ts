import { defineField, defineType } from 'sanity';
import { TagIcon } from '@sanity/icons';
import { usedInField } from './usedIn';
import { sortTitleField } from './sortTitle';

/** Secteur d'activité : défini une fois (nom français + anglais), puis choisi dans chaque projet. */
export const sector = defineType({
  name: 'sector',
  icon: TagIcon,
  title: 'Secteur',
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
