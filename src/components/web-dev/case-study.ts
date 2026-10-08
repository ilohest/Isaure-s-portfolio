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
  | { type: 'image'; src: ImageMetadata; alt: string }
  | { type: 'video'; src: string; alt: string; poster?: string }
  | { type: 'text'; title?: string; paragraphs: string[] }
  | { type: 'palette'; swatches: CaseStudySwatch[]; label?: string; note?: string | string[] };
