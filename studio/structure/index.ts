import type { StructureResolver } from 'sanity/structure';

/** Seuls les projets s'éditent ici : web puis branding, du plus récent au plus ancien. */
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Projets')
    .items(
      [
        { id: 'web', title: 'Projets web' },
        { id: 'branding', title: 'Projets branding' },
      ].map(({ id, title }) =>
        S.listItem()
          .title(title)
          .id(id)
          .child(
            S.documentTypeList('project')
              .title(title)
              .filter('_type == "project" && coalesce(kind, "web") == $kind')
              .params({ kind: id })
              .defaultOrdering([{ field: 'date', direction: 'desc' }]),
          ),
      ),
    );
