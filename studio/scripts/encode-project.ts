/**
 * Encode un projet dans Sanity à partir d'un fichier `projet.json` (format décrit dans docs/prompt-projet-ia.md)
 * et du dossier d'images / vidéos qui l'accompagne. Crée ou met à jour les deux documents (français et anglais),
 * les secteurs / services / technologies manquants, et envoie les fichiers.
 *
 *   cd studio
 *   npx sanity exec scripts/encode-project.ts --with-user-token -- --dry ../chemin/projet.json   # contrôle, n'écrit rien
 *   npx sanity exec scripts/encode-project.ts --with-user-token -- ../chemin/projet.json         # encode
 *
 * Les fichiers (images, vidéos) sont cherchés à côté du projet.json, dans le chemin donné par le champ « file ».
 */
import { randomBytes } from 'node:crypto';
import { createReadStream, existsSync, readFileSync } from 'node:fs';
import { basename, dirname, resolve } from 'node:path';
import { LexoRank } from 'lexorank';
import { getCliClient } from 'sanity/cli';

const client = getCliClient({ apiVersion: '2025-01-01' });
const args = process.argv.slice(2);
const dry = args.includes('--dry');
const input = args.find((a) => !a.startsWith('--'));
if (!input) throw new Error('Usage : encode-project.ts [--dry] chemin/projet.json');
const jsonPath = resolve(process.cwd(), input);
const baseDir = dirname(jsonPath);

type L = string | { fr?: string; en?: string };
type Lang = 'fr' | 'en';
const T = (v: L | undefined, lang: Lang): string => (v == null ? '' : typeof v === 'string' ? v : (v[lang] ?? v.fr ?? v.en ?? ''));

const errors: string[] = [];
const need = (cond: unknown, msg: string) => {
  if (!cond) errors.push(msg);
};
const key = () => randomBytes(6).toString('hex');
const slugify = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const norm = (s: string) => s.trim().toLowerCase();

/* ── texte riche : mini-markdown → blocs Sanity ────────────────────────────── */
const spans = (text: string) => {
  const out: { _type: 'span'; _key: string; text: string; marks: string[] }[] = [];
  const defs: { _key: string; _type: 'link'; href: string }[] = [];
  const re = /\*\*(.+?)\*\*|\*(.+?)\*|<u>(.+?)<\/u>|\[([^\]]+)\]\((https?:\/\/[^)\s]+|mailto:[^)\s]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  const push = (t: string, marks: string[] = []) => t && out.push({ _type: 'span', _key: key(), text: t, marks });
  while ((m = re.exec(text))) {
    push(text.slice(last, m.index));
    if (m[1] != null) push(m[1], ['strong']);
    else if (m[2] != null) push(m[2], ['em']);
    else if (m[3] != null) push(m[3], ['underline']);
    else {
      const d = { _key: key(), _type: 'link' as const, href: m[5] };
      defs.push(d);
      push(m[4], [d._key]);
    }
    last = m.index + m[0].length;
  }
  push(text.slice(last));
  return { children: out.length ? out : [{ _type: 'span' as const, _key: key(), text: '', marks: [] }], markDefs: defs };
};
const rich = (md: string) => {
  const blocks: any[] = [];
  for (const chunk of md.replace(/\r/g, '').split(/\n\s*\n/)) {
    const lines = chunk.split('\n').map((l) => l.trimEnd()).filter(Boolean);
    if (!lines.length) continue;
    if (lines.every((l) => /^\s*([-*]|\d+[.)])\s+/.test(l))) {
      for (const l of lines) {
        const num = /^\s*\d+[.)]\s+/.test(l);
        blocks.push({ _type: 'block', _key: key(), style: 'normal', listItem: num ? 'number' : 'bullet', level: 1, ...spans(l.replace(/^\s*([-*]|\d+[.)])\s+/, '')) });
      }
      continue;
    }
    const h = /^(#{1,4})\s+(.*)$/.exec(lines[0]);
    if (h && lines.length === 1) {
      blocks.push({ _type: 'block', _key: key(), style: h[1].length <= 2 ? 'h3' : 'h4', ...spans(h[2]) });
      continue;
    }
    blocks.push({ _type: 'block', _key: key(), style: 'normal', ...spans(lines.join('\n')) });
  }
  return blocks;
};

/* ── fichier projet.json ───────────────────────────────────────────────────── */
const p = JSON.parse(readFileSync(jsonPath, 'utf8'));
need(p.slug && /^[a-z0-9-]+$/.test(p.slug), 'slug : minuscules, chiffres et tirets (ex. mon-projet)');
need(['web', 'branding'].includes(p.type), 'type : "web" ou "branding"');
need(p.title, 'title : nom du projet');
// cover : facultative, Isaure ajoute les images dans le Studio
need(Array.isArray(p.sections) && p.sections.length, 'sections : au moins une section');
const SECTION_TYPES = ['text', 'notes', 'image', 'images', 'video', 'palette'];
const files: string[] = [];
const fileOf = (f: unknown, what: string) => {
  if (typeof f !== 'string' || !f) return void errors.push(`${what} : fichier manquant`);
  const abs = resolve(baseDir, f);
  if (!existsSync(abs)) errors.push(`${what} : fichier introuvable (${f})`);
  files.push(abs);
  return abs;
};
if (p.cover) fileOf(p.cover, 'cover');
if (p.cardVideo) fileOf(p.cardVideo, 'cardVideo');
(p.sections ?? []).forEach((s: any, i: number) => {
  const w = `sections[${i}] (${s.type})`;
  need(SECTION_TYPES.includes(s.type), `${w} : type inconnu — ${SECTION_TYPES.join(', ')}`);
  if (s.type === 'text' || s.type === 'notes') need(s.body, `${w} : body manquant`);
  if (s.type === 'image') fileOf(s.file, w);
  if (s.type === 'video') {
    fileOf(s.file, w);
    if (s.poster) fileOf(s.poster, `${w} poster`);
  }
  if (s.type === 'images') {
    need(['pair', 'grid', 'stack'].includes(s.layout ?? 'pair'), `${w} : layout "pair", "grid" ou "stack"`);
    need(Array.isArray(s.items) && s.items.length, `${w} : items manquants`);
    (s.items ?? []).forEach((it: any, k: number) => fileOf(it.file, `${w} items[${k}]`));
  }
  if (s.type === 'palette') need(Array.isArray(s.colors) && s.colors.every((c: string) => /^#[0-9a-f]{3}([0-9a-f]{3})?$/i.test(c)), `${w} : colors = liste de couleurs hexadécimales (#RRGGBB)`);
});
if (errors.length) {
  console.error('✗ projet.json invalide :\n - ' + errors.join('\n - '));
  process.exit(1);
}

/* ── envoi ─────────────────────────────────────────────────────────────────── */
const uploaded = new Map<string, { ref: string; kind: 'image' | 'file' }>();
const upload = async (abs: string, kind: 'image' | 'file') => {
  const hit = uploaded.get(abs);
  if (hit) return hit.ref;
  const ref = dry ? `dry-${basename(abs)}` : (await client.assets.upload(kind, createReadStream(abs), { filename: basename(abs) }))._id;
  uploaded.set(abs, { ref, kind });
  return ref;
};
const imageRef = async (f: string) => ({ _type: 'image', asset: { _type: 'reference', _ref: await upload(resolve(baseDir, f), 'image') } });
const fileRef = async (f: string) => ({ _type: 'file', asset: { _type: 'reference', _ref: await upload(resolve(baseDir, f), 'file') } });

const main = async () => {
  const baseSlug: string = p.slug;
  const slug = p.type === 'branding' && (await client.fetch<boolean>('count(*[_type == "project" && slug.current == $s && !(_id match "project-branding-*")]) > 0', { s: baseSlug })) ? `${baseSlug}-branding` : baseSlug;
  const docId = `project-${p.type}-${baseSlug}`;

  // secteur, services, technologies : on réutilise ceux qui existent (même nom), sinon on les crée
  const sectors = await client.fetch<{ _id: string; title?: string; titleEn?: string }[]>('*[_type == "sector"]{_id,title,titleEn}');
  const services = await client.fetch<{ _id: string; title?: string; titleEn?: string }[]>('*[_type == "service"]{_id,title,titleEn}');
  const techs = await client.fetch<{ _id: string; title?: string }[]>('*[_type == "technology"]{_id,title}');
  const create: any[] = [];
  const created: string[] = [];
  const find = <X extends { title?: string; titleEn?: string }>(list: X[], l: L) => list.find((x) => [T(l, 'fr'), T(l, 'en')].some((n) => n && [x.title, x.titleEn].some((y) => y && norm(y) === norm(n))));

  let sectorId: string | undefined;
  if (p.sector) {
    const f = find(sectors, p.sector);
    sectorId = f?._id ?? `sector-${slugify(T(p.sector, 'en') || T(p.sector, 'fr'))}`;
    if (!f) {
      create.push({ _id: sectorId, _type: 'sector', title: T(p.sector, 'fr'), titleEn: T(p.sector, 'en') || T(p.sector, 'fr') });
      created.push(`secteur « ${T(p.sector, 'fr')} »`);
    }
  }
  const serviceIds = (p.services ?? []).map((s: L) => {
    const f = find(services, s);
    const id = f?._id ?? `service-${slugify(T(s, 'en') || T(s, 'fr'))}`;
    if (!f && !create.some((c) => c._id === id)) {
      create.push({ _id: id, _type: 'service', title: T(s, 'fr'), titleEn: T(s, 'en') || T(s, 'fr') });
      created.push(`service « ${T(s, 'fr')} »`);
    }
    return id;
  });
  const techIds = (p.stack ?? []).map((t: string) => {
    const f = techs.find((x) => x.title && norm(x.title) === norm(t));
    const id = f?._id ?? `technology-${slugify(t)}`;
    if (!f && !create.some((c) => c._id === id)) {
      create.push({ _id: id, _type: 'technology', title: t });
      created.push(`technologie « ${t} »`);
    }
    return id;
  });

  const cover = p.cover ? await imageRef(p.cover) : undefined;
  const cardVideo = p.cardVideo ? await fileRef(p.cardVideo) : undefined;

  const sections = async (lang: Lang) => {
    const out: any[] = [];
    for (const s of p.sections) {
      if (s.type === 'text') out.push({ _key: key(), _type: 'textSection', heading: T(s.heading, lang), body: rich(T(s.body, lang)) });
      else if (s.type === 'notes')
        out.push({ _key: key(), _type: 'notesSection', heading: T(s.heading, lang), body: rich(T(s.body, lang)), notes: (s.notes ?? []).map((n: L) => T(n, lang)).filter(Boolean) });
      else if (s.type === 'image') out.push({ _key: key(), _type: 'imageSection', image: await imageRef(s.file), caption: T(s.caption, lang) });
      else if (s.type === 'images')
        out.push({
          _key: key(),
          _type: 'imagesSection',
          layout: s.layout ?? 'pair',
          images: await Promise.all(s.items.map(async (it: any) => ({ _key: key(), _type: 'figure', image: await imageRef(it.file), caption: T(it.caption, lang) }))),
        });
      else if (s.type === 'video')
        out.push({ _key: key(), _type: 'videoSection', video: await fileRef(s.file), ...(s.poster ? { poster: await imageRef(s.poster) } : {}), caption: T(s.caption, lang) });
      else if (s.type === 'palette')
        out.push({ _key: key(), _type: 'paletteSection', swatches: s.colors.map((hex: string) => ({ _key: key(), _type: 'swatch', hex })), note: T(s.note, lang) });
    }
    return out;
  };

  const ref = (_ref: string) => ({ _type: 'reference', _ref, _weak: false });
  const docs: { id: string; lang: Lang; fields: Record<string, unknown> }[] = [];
  for (const lang of ['fr', 'en'] as Lang[]) {
    docs.push({
      id: lang === 'fr' ? docId : `${docId}-en`,
      lang,
      fields: {
        title: lang === 'fr' ? T(p.title, 'fr') : T(p.title, 'en') || T(p.title, 'fr'),
        slug: { _type: 'slug', current: slug },
        year: p.year ?? '',
        date: p.date ?? (p.year ? `${p.year}-01-01` : undefined),
        published: p.published ?? false,
        ...(cover ? { cover } : {}),
        ...(cardVideo ? { video: cardVideo } : {}),
        ...(sectorId ? { sector: ref(sectorId) } : {}),
        business: T(p.business, lang),
        overview: T(p.overview, lang),
        ...(p.siteUrl ? { siteUrl: p.siteUrl, siteLabel: p.siteLabel ?? '' } : {}),
        services: serviceIds.map((id: string) => ({ _key: key(), ...ref(id), _weak: true })),
        stack: techIds.map((id: string) => ({ _key: key(), ...ref(id), _weak: true })),
        sections: await sections(lang),
      },
    });
  }

  const exists = await client.fetch<boolean>('defined(*[_id == $id][0]._id)', { id: docId });
  console.log(`${exists ? 'Mise à jour' : 'Création'} de « ${T(p.title, 'fr')} » (${p.type}/${slug}) — ${p.sections.length} sections, ${files.length} fichiers`);
  if (created.length) console.log('À créer :', created.join(', '));
  if (dry) {
    console.log('✓ contrôle OK (rien écrit)');
    return;
  }

  const tx = client.transaction();
  for (const c of create) tx.createIfNotExists(c);
  await tx.commit();

  let orderRank: string | undefined;
  if (!exists) {
    const min = await client.fetch<string | null>('*[_type == "project" && defined(orderRank)] | order(orderRank asc)[0].orderRank');
    orderRank = (min ? LexoRank.parse(min).genPrev() : LexoRank.middle()).toString();
  }
  for (const d of docs) {
    const has = await client.fetch<boolean>('defined(*[_id == $id][0]._id)', { id: d.id });
    if (!has) await client.create({ _id: d.id, _type: 'project', language: d.lang, ...(d.lang === 'fr' && orderRank ? { orderRank } : {}), ...d.fields });
    else {
      await client.patch(d.id).set(d.fields).commit();
      if (await client.fetch<boolean>('defined(*[_id == $id][0]._id)', { id: `drafts.${d.id}` })) await client.patch(`drafts.${d.id}`).set(d.fields).commit();
    }
  }
  await client.createIfNotExists({
    _id: `translation.metadata.${docId}`,
    _type: 'translation.metadata',
    schemaTypes: ['project'],
    translations: [
      { _key: 'fr', _type: 'internationalizedArrayReferenceValue', value: ref(docId) },
      { _key: 'en', _type: 'internationalizedArrayReferenceValue', value: ref(`${docId}-en`) },
    ],
  });
  console.log(`✓ « ${T(p.title, 'fr')} » encodé (${p.published ? 'publié' : 'non publié : cocher « Publié » dans le Studio pour l’afficher'})`);
};
main().catch((e) => {
  console.error(e);
  process.exit(1);
});
