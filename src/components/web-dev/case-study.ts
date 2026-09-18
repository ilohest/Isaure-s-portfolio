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
