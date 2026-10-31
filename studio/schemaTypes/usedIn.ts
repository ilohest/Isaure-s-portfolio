import { defineField } from 'sanity';
import { UsedInInput } from './UsedInInput';

/** Champ d’affichage (rien n’est stocké) : les projets qui utilisent ce secteur / service / technologie. */
export const usedInField = defineField({
  name: 'usedIn',
  title: 'Utilisé dans',
  type: 'string',
  readOnly: true,
  components: { input: UsedInInput },
});
