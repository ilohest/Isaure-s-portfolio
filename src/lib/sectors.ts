/**
 * Secteurs d'activité des projets : version française.
 * Sanity (champ `sectorFr`) a la priorité ; cette table sert de repli (et alimente l'import).
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
  'Regulated professions': 'Professions réglementées',
  'Music education': 'Éducation musicale',
  Restaurant: 'Restaurant',
  'Urban architecture': 'Architecture urbaine',
  'Weddings & events': 'Mariages & événements',
  Yoga: 'Yoga',
};

interface WithSector {
  sector: string;
  sectorFr?: string;
}

export const sectorFor = (p: WithSector, lang: 'fr' | 'en') =>
  lang === 'fr' ? p.sectorFr || SECTOR_FR[p.sector] || p.sector : p.sector;
