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
  fallbackPath?: string;
  variants: MediaVariant[];
}

// Registry centralise les medias migrés.
export const mediaManifest: Record<string, MediaItem> = {
  homeSticker: {
    id: 'homeSticker',
    domain: 'pages',
    kind: 'image',
    alt: 'Sticker Isaure',
    fallbackPath: '/assets/media/pages/home/sticker-isaure-v2-noQR-960.png',
    variants: [
      { format: 'webp', width: 640, path: '/assets/media/pages/home/sticker-isaure-v2-noQR-640.webp' },
    ],
  },
  contactHero: {
    id: 'contactHero',
    domain: 'pages',
    kind: 'image',
    alt: 'Hero contact',
    fallbackPath: '/assets/media/pages/contact/getty-images-rzQE1PfPtqk-unsplash-960.png',
    variants: [
      {
        format: 'webp',
        width: 1280,
        path: '/assets/media/pages/contact/getty-images-rzQE1PfPtqk-unsplash-1280.webp',
      },
    ],
  },
};
