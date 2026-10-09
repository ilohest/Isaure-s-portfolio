/**
 * Passe les projets de l'ancien modèle (un document avec sectorFr / keywordsFr / summaryFr… + « projectCopy » + « siteCopy »)
 * au modèle bilingue : un document FR + un document EN par projet, reliés par un « translation.metadata ».
 * Les anciens documents « projectCopy » et « siteCopy » sont supprimés (le reste du site n'est plus dans Sanity).
 * Idempotent : relançable sans doublons. Faites une sauvegarde avant : npx sanity dataset export production backup.tar.gz
 *
 *   cd studio
 *   npx sanity exec scripts/migrate-bilingual.ts --with-user-token -- --dry   # aperçu
 *   npx sanity exec scripts/migrate-bilingual.ts --with-user-token            # migration
 */
import { getCliClient } from 'sanity/cli';

const dry = process.argv.includes('--dry');
const client = getCliClient({ apiVersion: '2025-01-01' });

type Old = Record<string, any> & { _id: string; slug?: { current: string }; kind?: string };
type Copy = { ref: string; entries?: { _key: string; source?: string; fr?: string; en?: string }[] };

const STRIP = ['_createdAt', '_updatedAt', '_rev', 'sectorFr', 'keywordsFr', 'summaryFr', 'summaryEn', 'pageTexts'];

const main = async () => {
  const projects = await client.fetch<Old[]>(`*[_type == "project" && !(_id in path("drafts.**")) && !defined(language)]`);
  const copies = await client.fetch<Copy[]>(`*[_type == "projectCopy"]`);
  const siteCopies = await client.fetch<string[]>(`*[_type == "siteCopy"]._id`);
  const copyOf = new Map(copies.map((c) => [c.ref, c]));

  const tx = client.transaction();
  for (const p of projects) {
    const slug = p.slug?.current;
    if (!slug) continue;
    const kind = p.kind ?? 'web';
    const entries = copyOf.get(`${kind}/${slug}`)?.entries ?? [];
    const texts = (lang: 'fr' | 'en') =>
      entries.filter((e) => e[lang]?.trim()).map((e) => ({ _key: e._key, _type: 'pageText', source: e.source ?? '', text: e[lang]! }));

    const base: Record<string, any> = Object.fromEntries(Object.entries(p).filter(([k]) => !STRIP.includes(k)));
    const idFr = p._id;
    const idEn = `${p._id}-en`;
    const fr = { ...base, _type: 'project', _id: idFr, language: 'fr', sector: p.sectorFr || p.sector, keywords: p.keywordsFr?.length ? p.keywordsFr : p.keywords, summary: p.summaryFr, pageTexts: texts('fr') };
    const en = { ...base, _type: 'project', _id: idEn, language: 'en', sector: p.sector, keywords: p.keywords, summary: p.summaryEn, pageTexts: texts('en') };

    console.log(`${dry ? '[dry] ' : ''}${kind}/${slug} — FR ${fr.pageTexts.length} textes, EN ${en.pageTexts.length} textes`);
    tx.createOrReplace(fr).createOrReplace(en);
    const ref = (id: string) => ({ _type: 'reference', _ref: id, _weak: false });
    tx.createOrReplace({
      _id: `translation.metadata.${p._id}`,
      _type: 'translation.metadata',
      schemaTypes: ['project'],
      translations: [
        { _key: 'fr', _type: 'internationalizedArrayReferenceValue', value: ref(idFr) },
        { _key: 'en', _type: 'internationalizedArrayReferenceValue', value: ref(idEn) },
      ],
    });
  }
  const copyIds = await client.fetch<string[]>(`*[_type == "projectCopy"]._id`);
  copyIds.forEach((id) => tx.delete(id));
  siteCopies.forEach((id) => tx.delete(id));

  console.log(`\n${projects.length} projets · ${copyIds.length} projectCopy et ${siteCopies.length} siteCopy supprimés${dry ? ' (aperçu : rien écrit)' : ''}`);
  if (!dry) await tx.commit();
};
main().catch((e) => {
  console.error(e);
  process.exit(1);
});
