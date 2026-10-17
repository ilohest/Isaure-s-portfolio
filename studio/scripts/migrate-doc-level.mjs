/**
 * Passe les projets du modèle « un document, textes par langue » au modèle du plugin
 * @sanity/document-internationalization (comme Studio Abîme) : un document FR + un document EN par projet,
 * reliés par un « translation.metadata ». Les médias, la date, le type et le slug sont copiés dans chacun.
 *
 *   node studio/scripts/migrate-doc-level.mjs            # aperçu, n'écrit rien
 *   node studio/scripts/migrate-doc-level.mjs --apply    # migration (faire une sauvegarde avant)
 *
 * Utilise le jeton de la session `sanity login` (~/.config/sanity/config.json).
 */
import { readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { createClient } from '@sanity/client';

const apply = process.argv.includes('--apply');
const token = JSON.parse(readFileSync(`${homedir()}/.config/sanity/config.json`, 'utf8')).authToken;
const client = createClient({ projectId: 'lplxpp6m', dataset: 'production', apiVersion: '2025-01-01', token, useCdn: false, perspective: 'raw' });

const docs = await client.fetch(`*[_type == "project" && !defined(language) && !(_id in path("drafts.**"))]`);
const drafts = await client.fetch(`*[_type == "project" && _id in path("drafts.**")]._id`);
if (drafts.length) console.log(`⚠ ${drafts.length} brouillon(s) ignoré(s) :`, drafts.join(', '));

const ref = (id) => ({ _type: 'reference', _ref: id, _weak: false });
const tx = client.transaction();
for (const d of docs) {
  const { sector, summary, keywords, pageTexts, _createdAt, _updatedAt, _rev, ...common } = d;
  const make = (lang, id) => ({
    ...common,
    _id: id,
    _type: 'project',
    language: lang,
    sector: sector?.[lang] || undefined,
    summary: summary?.[lang] || undefined,
    keywords: keywords?.[lang]?.length ? keywords[lang] : undefined,
    // seulement les lignes renseignées dans cette langue (le texte anglais d'origine reste dans le code du site)
    pageTexts: (pageTexts ?? [])
      .filter((e) => e.text?.[lang]?.trim())
      .map((e) => ({ _key: e._key, _type: 'pageText', source: e.source ?? '', text: e.text[lang] })),
  });
  const fr = make('fr', d._id);
  const en = make('en', `${d._id}-en`);
  for (const x of [fr, en]) for (const k of Object.keys(x)) if (x[k] === undefined) delete x[k];
  tx.createOrReplace(fr).createOrReplace(en);
  tx.createOrReplace({
    _id: `translation.metadata.${d._id}`,
    _type: 'translation.metadata',
    schemaTypes: ['project'],
    translations: [
      { _key: 'fr', _type: 'internationalizedArrayReferenceValue', value: ref(fr._id) },
      { _key: 'en', _type: 'internationalizedArrayReferenceValue', value: ref(en._id) },
    ],
  });
  console.log(`${d.kind ?? 'web'}/${d.slug?.current}: FR ${fr.pageTexts.length} textes · EN ${en.pageTexts.length} textes`);
}
console.log(`\n${docs.length} projets → ${docs.length * 2} documents + ${docs.length} translation.metadata${apply ? '' : '  (aperçu : rien n’est écrit)'}`);
if (apply) {
  await tx.commit();
  console.log('Migration écrite.');
}
