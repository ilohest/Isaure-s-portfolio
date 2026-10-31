import type { ComponentType } from 'react';
import type { StructureResolver } from 'sanity/structure';
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list';
import { BookIcon, CodeBlockIcon, CogIcon, ProjectsIcon, TagIcon } from '@sanity/icons';
import { baseLanguage } from '../lib/i18n';
import { PromptPane } from './PromptPane';

/**
 * Projets : une seule liste (version française), à réordonner par glisser-déposer ; l'ordre sert aussi pour l'anglais.
 * La traduction s'ouvre depuis le sélecteur de langue du projet.
 */
/** Liste d’un type de document, triée par nom (A→Z). */
const alphabetical = (S: Parameters<StructureResolver>[0], type: string, title: string, icon: ComponentType) =>
  S.listItem()
    .title(title)
    .icon(icon)
    .schemaType(type)
    .child(S.documentTypeList(type).title(title).defaultOrdering([{ field: 'sortTitle', direction: 'asc' }]));

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title('Studio')
    .items([
      orderableDocumentListDeskItem({
        type: 'project',
        title: 'Projets',
        icon: ProjectsIcon,
        id: 'projects',
        filter: '_type == "project" && language == $language',
        params: { language: baseLanguage },
        createIntent: false,
        S,
        context,
      }),
      alphabetical(S, 'sector', 'Secteurs', TagIcon),
      alphabetical(S, 'service', 'Services', CogIcon),
      alphabetical(S, 'technology', 'Technologies', CodeBlockIcon),
      S.divider(),
      S.listItem()
        .title('Documentation')
        .icon(BookIcon)
        .child(S.component(PromptPane).id('documentation').title('Documentation')),
    ]);
