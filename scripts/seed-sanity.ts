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
    published: true,
    ...(cover ? { cover } : {}),
  });
  console.log(`✓ ${kind}/${slug}`);
}
