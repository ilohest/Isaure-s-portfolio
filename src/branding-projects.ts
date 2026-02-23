import type { BrandingProject } from './types/projects';

declare const require: (path: string) => string;

const brandingProjects: BrandingProject[] = [
  {
    id: 4,
    title: 'Flou',
    year: '2025',
    order: 202511,
    placeholder: '/assets/img/branding/Flou/flou-branding-960.png',
    projectLink: '/achievements/branding/flou',
  },
  {
    id: 3,
    title: 'Can Pruna',
    order: 202509,
    year: '2025',
    placeholder: require('./assets/img/canpruna-branding.png'),
    projectLink: '/achievements/branding/canpruna-accomodation',
  },
  {
    id: 2,
    title: 'Elinor kinésiologie',
    order: 202506,
    year: '2025',
    placeholder: require('./assets/img/elinor-branding-1.png'),
    projectLink: '/achievements/branding/elinor-kinesiologie',
  },
  {
    id: 1,
    title: 'Bellelachaise',
    order: 202504,
    year: '2025',
    placeholder: require('./assets/img/blc-branding-1.png'),
    projectLink: '/achievements/branding/bellelachaise',
  },
];

export default brandingProjects;
