/**
 * Ajoute la version française des secteurs et mots-clés aux projets Sanity (champs sectorFr et keywordsFr).
 * Ne touche à aucun autre champ (patch « set » seulement) et reste idempotent.
 *
 *   cd studio
 *   npx sanity exec scripts/seed-sectors.ts --with-user-token -- --dry     # aperçu
 *   npx sanity exec scripts/seed-sectors.ts --with-user-token              # écriture
 */
import { getCliClient } from 'sanity/cli';
import { SECTOR_FR, keywordsFr } from '../../src/lib/sectors';

const dry = process.argv.includes('--dry');
const client = getCliClient({ apiVersion: '2025-01-01' });

async function main() {
  const rows = await client.fetch<{ _id: string; title: string; kind?: 'web' | 'branding'; sector?: string }[]>(
    '*[_type=="project"]{_id,title,kind,sector}',
  );
  let n = 0;
  let tx = client.transaction();
  for (const r of rows) {
    const fr = r.sector ? SECTOR_FR[r.sector] : undefined;
    if (!fr) {
      console.log(`⚠︎ ${r.title} : secteur « ${r.sector ?? ''} » sans traduction, ignoré`);
      continue;
    }
    const kw = keywordsFr(r.kind ?? 'web', fr);
    console.log(`${dry ? '[dry] ' : ''}${r.title} — ${fr} — ${kw.join(', ')}`);
    tx = tx.patch(r._id, (p) => p.set({ sectorFr: fr, keywordsFr: kw }));
    n++;
  }
  if (dry) return console.log(`\n${n} projets (rien n'a été écrit)`);
  await tx.commit();
  console.log(`\n✓ ${n} projets mis à jour`);
}
main().catch((e) => {
  console.error(e);
  process.exit(1);
});
