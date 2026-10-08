/**
 * Encode les textes du site (src/i18n/fr.ts + en.ts) dans Sanity : un document « siteCopy » par section.
 * Idempotent : ids stables (siteCopy-<section>). Relancer ne touche pas aux textes déjà présents dans Sanity (ils peuvent avoir été modifiés dans le Studio) : seules les clés nouvelles sont ajoutées.
 *
 *   cd studio
 *   npx sanity exec scripts/seed-copy.ts --with-user-token -- --dry     # aperçu, rien n'est écrit
 *   npx sanity exec scripts/seed-copy.ts --with-user-token              # écriture dans le dataset
 *
 * Utilise la session « sanity login » : aucun token à copier.
 */
import { createHash } from 'node:crypto';
import { getCliClient } from 'sanity/cli';
import { fr } from '../../src/i18n/fr';
import { en } from '../../src/i18n/en';

const dry = process.argv.includes('--dry');
const client = getCliClient({ apiVersion: '2025-01-01' });
const SKIP = new Set(['lang', 'htmlLang', 'ogLocale', 'switchTo']);

type Row = { key: string; fr: string; en: string };
const walk = (a: unknown, b: unknown, path: string[], out: Row[]) => {
  if (typeof a === 'string') {
    if (!SKIP.has(path[path.length - 1] ?? '')) out.push({ key: path.join('.'), fr: a, en: typeof b === 'string' ? b : '' });
    return;
  }
  if (Array.isArray(a)) a.forEach((v, i) => walk(v, (b as unknown[] | undefined)?.[i], [...path, String(i)], out));
  else if (a && typeof a === 'object')
    for (const k of Object.keys(a)) walk((a as Record<string, unknown>)[k], (b as Record<string, unknown> | undefined)?.[k], [...path, k], out);
};

async function main() {
  // textes déjà dans Sanity : on les garde (modifiés dans le Studio ou non), on n'ajoute que les clés manquantes
  const existing = await client.fetch<{ _id: string; entries?: { key: string; fr?: string; en?: string }[] }[]>(
    '*[_type=="siteCopy"]{_id, entries[]{key, fr, en}}',
  );
  const kept = new Map<string, { fr?: string; en?: string }>();
  existing.forEach((d) => d.entries?.forEach((e) => kept.set(`${d._id}|${e.key}`, e)));

  const docs = Object.keys(fr as Record<string, unknown>)
    .map((section) => {
      const rows: Row[] = [];
      walk((fr as Record<string, unknown>)[section], (en as Record<string, unknown>)[section], [section], rows);
      return {
        _id: `siteCopy-${section}`,
        _type: 'siteCopy',
        page: section,
        entries: rows.map((r) => {
          const old = kept.get(`siteCopy-${section}|${r.key}`);
          return {
            _key: createHash('md5').update(r.key).digest('hex').slice(0, 12),
            _type: 'copyEntry',
            key: r.key,
            fr: old?.fr?.trim() ? old.fr : r.fr,
            en: old?.en?.trim() ? old.en : r.en,
          };
        }),
      };
    })
    .filter((d) => d.entries.length);

  for (const d of docs) console.log(`${dry ? '[dry] ' : ''}${d._id} — ${d.entries.length} textes`);
  if (dry) return console.log(`\n${docs.length} documents, ${docs.reduce((n, d) => n + d.entries.length, 0)} textes (rien n'a été écrit)`);

  let tx = client.transaction();
  docs.forEach((d) => (tx = tx.createOrReplace(d)));
  await tx.commit();
  console.log(`\n✓ ${docs.length} documents écrits`);
}
main().catch((e) => {
  console.error(e);
  process.exit(1);
});
