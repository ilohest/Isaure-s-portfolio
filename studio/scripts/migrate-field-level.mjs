/**
 * Passe les projets du modèle « un document par langue » (FR + EN + translation.metadata) au modèle
 * « un document par projet, textes par langue ». Les médias, la date, le type et le slug viennent du document français
 * (anglais si le français n'a pas de couverture).
 *
 *   node studio/scripts/migrate-field-level.mjs            # aperçu, n'écrit rien
 *   node studio/scripts/migrate-field-level.mjs --apply    # migration (faire une sauvegarde avant)
 *
 * Utilise le jeton de la session `sanity login` (~/.config/sanity/config.json).
 */
import { readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { createClient } from '@sanity/client';

const apply = process.argv.includes('--apply');
const token = JSON.parse(readFileSync(`${homedir()}/.config/sanity/config.json`, 'utf8')).authToken;
const client = createClient({ projectId: 'lplxpp6m', dataset: 'production', apiVersion: '2025-01-01', token, useCdn: false, perspective: 'raw' });

const docs = await client.fetch(`*[_type == "project" && defined(language)]`);
const published = docs.filter((d) => !d._id.startsWith('drafts.'));
const drafts = docs.filter((d) => d._id.startsWith('drafts.'));
if (drafts.length) console.log(`⚠ ${drafts.length} brouillon(s) ignoré(s) :`, drafts.map((d) => d._id).join(', '));

const groups = new Map();
for (const d of published) {
  const key = `${d.kind ?? 'web'}/${d.slug?.current}`;
  groups.set(key, { ...groups.get(key), [d.language]: d });
}

const tx = client.transaction();
let n = 0;
for (const [key, { fr, en }] of groups) {
  const base = fr?.cover ? fr : en;
  if (!base) continue;
  const other = base === fr ? en : fr;
  const pick = (f) => base[f] ?? other?.[f];
  const loc = (f) => ({ _type: 'localeString', fr: fr?.[f] ?? '', en: en?.[f] ?? '' });

  const keys = new Map();
  for (const lang of ['fr', 'en']) {
    for (const e of (lang === 'fr' ? fr : en)?.pageTexts ?? []) {
      const cur = keys.get(e._key) ?? { _key: e._key, _type: 'pageText', source: e.source ?? '', text: { _type: 'localeText', fr: '', en: '' } };
      cur.text[lang] = e.text ?? '';
      if (!cur.source && e.source) cur.source = e.source;
      keys.set(e._key, cur);
    }
  }

  const doc = {
    _id: base._id.replace(/-en$/, ''),
    _type: 'project',
    title: pick('title'),
    slug: pick('slug'),
    kind: pick('kind') ?? 'web',
    date: pick('date'),
    rank: pick('rank'),
    year: pick('year'),
    externalUrl: pick('externalUrl'),
    published: pick('published'),
    comingSoon: pick('comingSoon'),
    cover: pick('cover'),
    gallery: base.gallery?.length ? base.gallery : other?.gallery,
    video: pick('video'),
    videoUrl: pick('videoUrl'),
    sector: loc('sector'),
    summary: loc('summary'),
    keywords: { _type: 'localeKeywords', fr: fr?.keywords ?? [], en: en?.keywords ?? [] },
    pageTexts: [...keys.values()],
  };
  for (const k of Object.keys(doc)) if (doc[k] === undefined || doc[k] === null) delete doc[k];
  tx.createOrReplace(doc);
  for (const d of [fr, en]) if (d && d._id !== doc._id) tx.delete(d._id);
  n += 1;
  console.log(`${key}: ${doc._id} ← ${fr ? 'FR' : '--'} + ${en ? 'EN' : '--'} · ${doc.pageTexts.length} textes · ${doc.gallery?.length ?? 0} images`);
}

const meta = await client.fetch(`*[_type == "translation.metadata"]._id`);
meta.forEach((id) => tx.delete(id));
console.log(`\n${n} projets · ${meta.length} translation.metadata supprimés · ${published.length - n} anciens documents langue fusionnés${apply ? '' : '  (aperçu : rien n’est écrit)'}`);
if (apply) {
  await tx.commit();
  console.log('Migration écrite.');
}
