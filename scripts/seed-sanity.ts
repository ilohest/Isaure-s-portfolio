/**
 * Importe les projets locaux (web-dev-projects.ts + branding-projects.ts) dans Sanity.
 * Idempotent : les documents ont des ids stables (project-<kind>-<slug>), relancer met à jour.
 *
 *   SANITY_WRITE_TOKEN=xxxx npx tsx scripts/seed-sanity.ts
 *
 * Token : sanity.io/manage → projet → API → Tokens → « Editor ».
 */
import { createClient } from '@sanity/client';
import { createReadStream, existsSync } from 'node:fs';
import { basename, resolve } from 'node:path';
import webDevProjects from '../src/web-dev-projects';
import brandingProjects from '../src/branding-projects';
import { FALLBACK_SUMMARY } from '../src/lib/summaries';
import { galleryFor, fileExists } from '../src/lib/local-media';

const token = process.env.SANITY_WRITE_TOKEN;
if (!token) {
  console.error('SANITY_WRITE_TOKEN manquant.');
  process.exit(1);
}

const client = createClient({
  projectId: 'lplxpp6m',
  dataset: 'production',
  apiVersion: '2025-01-01',
  useCdn: false,
  token,
});

const slugOf = (link: string) => link.split('/').filter(Boolean).pop()!;

const rows = [
  ...webDevProjects.map((p) => ({ p, kind: 'web' as const })),
  ...brandingProjects.map((p) => ({ p, kind: 'branding' as const })),
];

for (const { p, kind } of rows) {
  const slug = slugOf(p.projectLink);
  const file = resolve('public', decodeURIComponent(p.placeholder).replace(/^\//, ''));
  let cover;
  if (existsSync(file)) {
    const asset = await client.assets.upload('image', createReadStream(file), { filename: basename(file) });
    cover = { _type: 'image', asset: { _type: 'reference', _ref: asset._id } };
  } else {
    console.warn(`  ! couverture introuvable : ${file}`);
  }
  // galerie : images du dossier du projet (une variante par image)
  const gallery = [];
  for (const g of await galleryFor(p.placeholder)) {
    const gf = resolve('public', decodeURIComponent(g.src).replace(/^\//, ''));
    if (!existsSync(gf)) continue;
    const ga = await client.assets.upload('image', createReadStream(gf), { filename: basename(gf) });
    gallery.push({
      _type: 'workImage',
      _key: ga._id.slice(-12),
      image: { _type: 'image', asset: { _type: 'reference', _ref: ga._id } },
    });
  }
  // vidéo (si le projet en a une)
  let video;
  const vsrc = 'src' in p ? (p as { src?: string }).src : undefined;
  if (vsrc && (await fileExists(vsrc))) {
    const vf = resolve('public', decodeURIComponent(vsrc).replace(/^\//, ''));
    const va = await client.assets.upload('file', createReadStream(vf), { filename: basename(vf) });
    video = { _type: 'file', asset: { _type: 'reference', _ref: va._id } };
  }
  const sector = p.sector ?? '';

  await client.createOrReplace({
    _id: `project-${kind}-${slug}`,
    _type: 'project',
    title: p.title,
    slug: { _type: 'slug', current: slug },
    kind,
    date: `${p.year}-01-01`,
    rank: p.order,
    year: p.year,
    sector: p.sector,
    summaryFr: FALLBACK_SUMMARY[slug]?.fr,
    summaryEn: FALLBACK_SUMMARY[slug]?.en,
    keywords: [kind === 'web' ? 'Web design' : 'Branding', ...sector.split(/\s*[\/&]\s*/).filter(Boolean)],
    gallery,
    ...(video ? { video } : {}),
    published: true,
    ...(cover ? { cover } : {}),
  });
  console.log(`✓ ${kind}/${slug}`);
}
