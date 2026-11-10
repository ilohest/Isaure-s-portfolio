import type { ImageMetadata } from 'astro';

export type CaseStudyMedia =
  | { type: 'image'; src: ImageMetadata; alt: string }
  | { type: 'video'; src: string; alt: string; poster?: string };

export interface CaseStudySwatch {
  hex: string;
  rgb: string;
  cmyk: string;
  textColor: string;
}

/** Suite libre de blocs pour la page projet v2 (voir components/v2/ProjectSheet.astro). */
export type SheetBlock =
  | { type: 'image'; src: ImageMetadata; alt: string; /** sans trait avant, collée à la section précédente */ joined?: boolean }
  | { type: 'video'; src: string; alt: string; poster?: string }
  /** plusieurs petites images regroupées en grille, chacune avec sa légende */
  | { type: 'gallery'; items: { src?: ImageMetadata; video?: string; poster?: string; alt: string }[]; layout?: 'grid' | 'pair' | 'stack' }
  | { type: 'text'; title?: string; paragraphs: string[]; html?: string }
  /** texte avec de petites notes dans la marge de droite */
  | { type: 'notes'; title?: string; paragraphs: string[]; notes: string[]; html?: string }
  | { type: 'palette'; swatches: CaseStudySwatch[]; label?: string; note?: string | string[] };
