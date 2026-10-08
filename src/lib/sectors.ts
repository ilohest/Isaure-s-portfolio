/**
 * Secteurs d'activité des projets : version française.
 * Sanity (champs `sectorFr`, `keywordsFr`) a la priorité ; cette table sert de repli (et alimente l'import).
 */
export const SECTOR_FR: Record<string, string> = {
  'Art & literature': 'Art & littérature',
  'Classical music': 'Musique classique',
  'Coaching for creatives': 'Coaching pour créatifs',
  'Communication & branding': 'Communication & branding',
  'Curated events': 'Événements sur mesure',
  'Floral scenography': 'Scénographie florale',
  'Food & Beverage': 'Alimentation & boissons',
  'Health & wellness': 'Santé & bien-être',
  'Home décor & Vintage furniture': 'Décoration d’intérieur & mobilier vintage',
  'Hospitality & tourism': 'Hôtellerie & tourisme',
  'Illustration / painting / art': 'Illustration / peinture / art',
  'Legal tech / law': 'Legal tech / droit',
  'Music education': 'Éducation musicale',
  Restaurant: 'Restaurant',
  'Urban architecture': 'Architecture urbaine',
  'Weddings & events': 'Mariages & événements',
  Yoga: 'Yoga',
};

const cap = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);

/** Mots-clés en français : le type de projet, puis les morceaux du secteur. */
export const keywordsFr = (kind: 'web' | 'branding', sectorFr: string): string[] => [
  kind === 'web' ? 'Web design' : 'Branding',
  ...sectorFr
    .split(/\s*[\/&]\s*/)
    .map((x) => cap(x.trim()))
    .filter(Boolean),
];

interface WithSector {
  sector: string;
  sectorFr?: string;
  keywords: string[];
  keywordsFr?: string[];
  kind: 'web' | 'branding';
}

export const sectorFor = (p: WithSector, lang: 'fr' | 'en') =>
  lang === 'fr' ? p.sectorFr || SECTOR_FR[p.sector] || p.sector : p.sector;

export const keywordsFor = (p: WithSector, lang: 'fr' | 'en') =>
  lang === 'fr' ? (p.keywordsFr?.length ? p.keywordsFr : keywordsFr(p.kind, sectorFor(p, 'fr'))) : p.keywords;
