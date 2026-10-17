import type { StructureResolver } from 'sanity/structure';

/** Seuls les projets s'éditent ici : une seule liste, du plus récent au plus ancien. */
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Projets')
    .items([
      S.listItem()
        .title('Projets')
        .id('projects')
        .child(S.documentTypeList('project').title('Projets').defaultOrdering([{ field: 'date', direction: 'desc' }])),
    ]);
