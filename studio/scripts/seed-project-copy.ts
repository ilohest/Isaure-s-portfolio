/**
 * Encode les textes des pages projet (texte d'origine + traduction française) dans Sanity :
 * un document « projectCopy » par projet.
 *
 *  - textes d'origine : studio/.cache/project-copy/<web|branding>-<slug>.json
 *    (générés par le site : DUMP_PROJECT_COPY=1 npm run dev, puis ouvrir chaque page /en/work/…)
 *  - traductions : studio/translations/<web|branding>-<slug>.fr.json  { "texte d'origine": "traduction" }
 *
 * N'écrase jamais un texte déjà présent dans Sanity (il a pu être corrigé dans le Studio) : seules les lignes
 * manquantes sont ajoutées.
 *
 *   cd studio
 *   npx sanity exec scripts/seed-project-copy.ts --with-user-token -- --dry --only web-creyda
 *   npx sanity exec scripts/seed-project-copy.ts --with-user-token -- --only web-creyda     # écriture
 *   (sans --only : tous les projets qui ont un fichier de traduction)
 */
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { getCliClient } from 'sanity/cli';

const dry = process.argv.includes('--dry');
const onlyIdx = process.argv.indexOf('--only');
const only = onlyIdx > -1 ? process.argv[onlyIdx + 1] : undefined;
const client = getCliClient({ apiVersion: '2025-01-01' });
const root = resolve(process.cwd());

const norm = (s: string) => s.replace(/\s+/g, ' ').trim();
const keyOf = (s: string) => createHash('md5').update(norm(s)).digest('hex').slice(0, 12);

async function main() {
  const files = readdirSync(resolve(root, 'translations'))
    .filter((f) => f.endsWith('.fr.json'))
    .map((f) => f.replace('.fr.json', ''))
    .filter((id) => !only || id === only);

  let tx = client.transaction();
  let docs = 0;
  for (const id of files) {
    const srcFile = resolve(root, '.cache/project-copy', `${id}.json`);
    if (!existsSync(srcFile)) {
      console.log(`⚠︎ ${id} : pas de fichier de textes d'origine, ignoré`);
      continue;
    }
    const { ref, strings } = JSON.parse(readFileSync(srcFile, 'utf8')) as { ref: string; strings: string[] };
    const fr = JSON.parse(readFileSync(resolve(root, 'translations', `${id}.fr.json`), 'utf8')) as Record<string, string>;
    const missing = strings.filter((s) => !fr[s]);
    const docId = `projectCopy-${id}`;
    const existing = await client.fetch<{ entries?: { _key: string; fr?: string; en?: string }[] } | null>(
      '*[_id==$id][0]{entries[]{_key, fr, en}}',
      { id: docId },
    );
    const old = new Map((existing?.entries ?? []).map((e) => [e._key, e]));
    const entries = strings.map((s) => {
      const k = keyOf(s);
      const o = old.get(k);
      return { _key: k, _type: 'projectCopyEntry', source: s, fr: o?.fr?.trim() ? o.fr : fr[s] ?? '', en: o?.en ?? '' };
    });
    console.log(`${dry ? '[dry] ' : ''}${docId} — ${entries.length} textes, ${missing.length} sans traduction`);
    missing.forEach((m) => console.log(`    ⚠︎ à traduire : ${m.slice(0, 90)}`));
    tx = tx.createOrReplace({ _id: docId, _type: 'projectCopy', ref, entries });
    docs++;
  }
  if (dry) return console.log(`\n${docs} documents (rien n'a été écrit)`);
  await tx.commit();
  console.log(`\n✓ ${docs} documents écrits`);
}
main().catch((e) => {
  console.error(e);
  process.exit(1);
});
