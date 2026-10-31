import { defineField } from 'sanity';
import { SortTitleField } from './SortTitleField';

/** Champ de tri (invisible, rien à saisir) pour les listes alphabétiques du Studio. */
export const sortTitleField = defineField({
  name: 'sortTitle',
  title: 'Clé de tri',
  type: 'string',
  readOnly: true,
  components: { field: SortTitleField },
});
