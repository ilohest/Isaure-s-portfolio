type ProjectStructuredDataInput = {
  title: string;
  description: string;
  path: string;
  sectionLabel: string;
  sectionPath: string;
  projectType: 'Web development project' | 'Branding project';
};

const normalizeSiteUrl = (siteUrl: string) => siteUrl.replace(/\/$/, '');

export function useProjectStructuredData(input: ProjectStructuredDataInput) {
  const config = useRuntimeConfig();
  const siteUrl = normalizeSiteUrl(config.public.siteUrl || 'https://isaure-lohest.com');
  const canonicalUrl = `${siteUrl}${input.path}`;
  const achievementsUrl = `${siteUrl}/achievements`;
  const sectionUrl = `${siteUrl}${input.sectionPath}`;

  useHead({
    script: [
      {
        key: `ld-breadcrumb-${input.path}`,
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: `${siteUrl}/`,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Work',
              item: achievementsUrl,
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: input.sectionLabel,
              item: sectionUrl,
            },
            {
              '@type': 'ListItem',
              position: 4,
              name: input.title,
              item: canonicalUrl,
            },
          ],
        }),
      },
      {
        key: `ld-project-${input.path}`,
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'CreativeWork',
          name: input.title,
          description: input.description,
          url: canonicalUrl,
          inLanguage: 'en',
          author: {
            '@type': 'Person',
            name: 'Isaure Lohest',
            url: siteUrl,
          },
          creator: {
            '@type': 'Person',
            name: 'Isaure Lohest',
            url: siteUrl,
          },
          about: input.projectType,
          isPartOf: {
            '@type': 'CollectionPage',
            name: input.sectionLabel,
            url: sectionUrl,
          },
        }),
      },
    ],
  });
}
