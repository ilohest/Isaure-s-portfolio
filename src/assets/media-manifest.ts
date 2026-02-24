export type MediaDomain = 'common' | 'pages' | 'projects' | 'branding';
export type MediaKind = 'image' | 'video';

export interface MediaVariant {
  format: string;
  width?: number;
  path: string;
}

export interface MediaItem {
  id: string;
  domain: MediaDomain;
  kind: MediaKind;
  alt?: string;
  legacyPath?: string;
  variants: MediaVariant[];
}

// Phase 1: registry centralise les medias migrés.
// Tant que la migration est en cours, `legacyPath` garde la compatibilite.
export const mediaManifest: Record<string, MediaItem> = {
  homeSticker: {
    id: 'homeSticker',
    domain: 'pages',
    kind: 'image',
    alt: 'Sticker Isaure',
    legacyPath: '/assets/img/Pages/sticker-isaure-v2-noQR-960.png',
    variants: [
      { format: 'avif', width: 640, path: '/assets/media/pages/home/images/page-home-sticker-640.avif' },
      { format: 'webp', width: 640, path: '/assets/media/pages/home/images/page-home-sticker-640.webp' },
    ],
  },
  contactHero: {
    id: 'contactHero',
    domain: 'pages',
    kind: 'image',
    alt: 'Hero contact',
    legacyPath: '/assets/img/Pages/getty-images-rzQE1PfPtqk-unsplash-960.png',
    variants: [
      {
        format: 'avif',
        width: 1280,
        path: '/assets/media/pages/contact/images/page-contact-hero-1280.avif',
      },
      {
        format: 'webp',
        width: 1280,
        path: '/assets/media/pages/contact/images/page-contact-hero-1280.webp',
      },
    ],
  },
};

