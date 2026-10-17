import type { StructureResolver } from 'sanity/structure';
import { supportedLanguages } from '../lib/i18n';

/** Seuls les projets s'éditent ici : un dossier par langue, du plus récent au plus ancien. */
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Projets')
    .items(
      supportedLanguages.map(({ id, title }) =>
        S.listItem()
          .title(`Projets — ${title}`)
          .id(id)
          .child(
            S.documentTypeList('project')
              .title(`Projets — ${title}`)
              .filter('_type == "project" && language == $language')
              .params({ language: id })
              .defaultOrdering([{ field: 'date', direction: 'desc' }]),
          ),
      ),
    );
