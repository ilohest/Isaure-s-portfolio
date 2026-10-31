/**
 * Nettoyage du Studio :
 *  - crée les « Secteurs » (nom FR + EN) et relie chaque projet au sien (le champ texte devient une référence) ;
 *  - donne un slug distinct aux projets branding qui partagent leur slug avec un projet web (« -branding ») ;
 *  - retire les champs « Type » (kind), « Rang » (rank) et « Lien personnalisé » (externalUrl) ;
 *  - initialise l'ordre glisser-déposer (orderRank) d'après l'ordre actuel du site (date, puis rang).
 *
 *   cd studio
 *   npx sanity exec scripts/migrate-studio-cleanup.ts --with-user-token -- --dry   # aperçu
 *   npx sanity exec scripts/migrate-studio-cleanup.ts --with-user-token            # applique
 *
 * À lancer AVANT de déployer le site (il lit les nouveaux slugs).
 */
import { getCliClient } from 'sanity/cli';
import { LexoRank } from 'lexorank';

const dry = process.argv.includes('--dry');
const client = getCliClient({ apiVersion: '2025-01-01' });

const SECTORS: [fr: string, en: string][] = [
  ['Art & littérature', 'Art & literature'],
  ['Musique classique', 'Classical music'],
  ['Coaching pour créatifs', 'Coaching for creatives'],
  ['Communication & branding', 'Communication & branding'],
  ['Événements sur mesure', 'Curated events'],
  ['Scénographie florale', 'Floral scenography'],
  ['Alimentation & boissons', 'Food & Beverage'],
  ['Santé & bien-être', 'Health & wellness'],
  ['Décoration d’intérieur & mobilier vintage', 'Home décor & Vintage furniture'],
  ['Hôtellerie & tourisme', 'Hospitality & tourism'],
  ['Illustration / peinture / art', 'Illustration / painting / art'],
  ['Legal tech / droit', 'Legal tech / law'],
  ['Professions réglementées', 'Regulated professions'],
  ['Éducation musicale', 'Music education'],
  ['Restaurant', 'Restaurant'],
  ['Architecture urbaine', 'Urban architecture'],
  ['Mariages & événements', 'Weddings & events'],
  ['Yoga', 'Yoga'],
];
const sectorId = (en: string) => 'sector-' + en.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const sectorByName = new Map<string, string>();
for (const [fr, en] of SECTORS) {
  sectorByName.set(fr, sectorId(en));
  sectorByName.set(en, sectorId(en));
}

type Doc = { _id: string; language: string; kind?: string; rank?: number; date?: string; year?: string; slug?: { current: string }; sector?: unknown; orderRank?: string };

const main = async () => {
  const docs = await client.fetch<Doc[]>('*[_type == "project"]');
  const published = docs.filter((d) => !d._id.startsWith('drafts.'));
  const webSlugs = new Set(published.filter((d) => (d.kind ?? 'web') === 'web').map((d) => d.slug?.current));

  const tx = client.transaction();
  for (const [fr, en] of SECTORS) tx.createOrReplace({ _id: sectorId(en), _type: 'sector', title: fr, titleEn: en });

  // ordre actuel du site : date puis rang, plus récent d'abord → premier de la liste
  const frDocs = published.filter((d) => d.language === 'fr');
  const key = (d: Doc) => (d.date ?? `${d.year}-01-01`) + String(d.rank ?? 0).padStart(12, '0');
  frDocs.sort((a, b) => (key(a) < key(b) ? 1 : -1));
  const rankOf = new Map<string, string>();
  let r = LexoRank.min();
  for (const d of frDocs) {
    r = r.genNext().genNext();
    rankOf.set(d._id, r.toString());
  }

  for (const d of docs) {
    const base = d._id.replace(/^drafts\./, '');
    const set: Record<string, unknown> = {};
    const slug = d.slug?.current ?? '';
    if (d.kind === 'branding' && webSlugs.has(slug)) set.slug = { _type: 'slug', current: `${slug}-branding` };
    if (typeof d.sector === 'string') {
      const id = sectorByName.get(d.sector);
      if (!id) console.warn(`⚠ secteur inconnu « ${d.sector} » (${d._id})`);
      else set.sector = { _type: 'reference', _ref: id };
    }
    if (d.language === 'fr' && rankOf.has(base)) set.orderRank = rankOf.get(base);
    console.log(d._id, JSON.stringify(set));
    tx.patch(d._id, (p) => p.set(set).unset(['kind', 'rank', 'externalUrl']));
  }
  if (dry) return console.log(`(aperçu) ${SECTORS.length} secteurs, ${docs.length} projets`);
  await tx.commit();
  console.log('✓ migration appliquée');
};
main();
