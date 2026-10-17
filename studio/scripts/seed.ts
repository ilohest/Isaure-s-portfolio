/**
 * Importe les projets du site actuel dans Sanity (documents « project », un par langue, galeries d'images, vidéos).
 * Idempotent : les documents ont des ids stables (project-<type>-<slug>) ; relancer met à jour.
 * Les images sont dédoublonnées par Sanity (même fichier = même asset).
 *
 *   cd studio
 *   PORTFOLIO_ROOT=.. npx sanity exec scripts/seed.ts --with-user-token            # import
 *   PORTFOLIO_ROOT=.. npx sanity exec scripts/seed.ts --with-user-token -- --dry    # simple aperçu
 *
 * Utilise la session « sanity login » : aucun token à copier.
 */
import { createReadStream, existsSync, statSync } from 'node:fs';
import { basename, resolve } from 'node:path';
import { getCliClient } from 'sanity/cli';
import webDevProjects from '../../src/web-dev-projects';
import brandingProjects from '../../src/branding-projects';
import { FALLBACK_SUMMARY } from '../../src/lib/summaries';
import { galleryFor, fileExists, ROOT } from '../../src/lib/local-media';

const dry = process.argv.includes('--dry');
const client = getCliClient({ apiVersion: '2025-01-01' });

const slugOf = (link: string) => link.split('/').filter(Boolean).pop()!;
const rows = [
  ...webDevProjects.map((p) => ({ p, kind: 'web' as const })),
  ...brandingProjects.map((p) => ({ p, kind: 'branding' as const })),
];

const fsPath = (publicPath: string) => resolve(ROOT, 'public', decodeURIComponent(publicPath).replace(/^\//, ''));

/** petit pool : quelques envois en parallèle */
const pool = async <T, R>(items: T[], size: number, fn: (t: T) => Promise<R>): Promise<R[]> => {
  const out: R[] = [];
  let next = 0;
  await Promise.all(
    Array.from({ length: size }, async () => {
      while (next < items.length) {
        const i = next++;
        out[i] = await fn(items[i]);
      }
    }),
  );
  return out;
};

const main = async () => {
  let images = 0;
  let videos = 0;
  let bytes = 0;

  for (const { p, kind } of rows) {
    const slug = slugOf(p.projectLink);
    const gallery = await galleryFor(p.placeholder);
    const vsrc = 'src' in p ? (p as { src?: string }).src : undefined;
    const hasVideo = Boolean(vsrc && (await fileExists(vsrc)));
    const sector = p.sector ?? '';
    images += gallery.length;
    gallery.forEach((g) => (bytes += statSync(fsPath(g.src)).size));
    if (hasVideo) {
      videos++;
      bytes += statSync(fsPath(vsrc!)).size;
    }
    if (dry) {
      console.log(`· ${kind}/${slug} — ${gallery.length} images${hasVideo ? ' + vidéo' : ''}`);
      continue;
    }

    const uploaded = await pool(gallery, 4, async (g) => {
      const file = fsPath(g.src);
      if (!existsSync(file)) return null;
      const asset = await client.assets.upload('image', createReadStream(file), { filename: basename(file) });
      return { _type: 'workImage', _key: asset._id.slice(-12), showInGrid: true, image: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } } };
    });

    let video;
    if (hasVideo) {
      const vf = fsPath(vsrc!);
      const va = await client.assets.upload('file', createReadStream(vf), { filename: basename(vf) });
      video = { _type: 'file', asset: { _type: 'reference', _ref: va._id } };
    }

    const cover = uploaded[0]?.image;
    const common = {
      _type: 'project',
      title: p.title,
      slug: { _type: 'slug', current: slug },
      kind,
      date: `${p.year}-01-01`,
      rank: p.order,
      year: p.year,
      published: true,
      ...(cover ? { cover } : {}),
      gallery: uploaded.filter(Boolean),
      ...(video ? { video } : {}),
    };
    const keywords = [kind === 'web' ? 'Web design' : 'Branding', ...sector.split(/\s*[\/&]\s*/).filter(Boolean)];
    // un document par langue, reliés par un translation.metadata (voir scripts/migrate-bilingual.ts)
    const id = `project-${kind}-${slug}`;
    const ref = (_ref: string) => ({ _type: 'reference', _ref, _weak: false });
    await client
      .transaction()
      .createOrReplace({ ...common, _id: id, language: 'fr', sector, keywords, summary: FALLBACK_SUMMARY[slug]?.fr })
      .createOrReplace({ ...common, _id: `${id}-en`, language: 'en', sector, keywords, summary: FALLBACK_SUMMARY[slug]?.en })
      .createIfNotExists({
        _id: `translation.metadata.${id}`,
        _type: 'translation.metadata',
        schemaTypes: ['project'],
        translations: [
          { _key: 'fr', _type: 'internationalizedArrayReferenceValue', value: ref(id) },
          { _key: 'en', _type: 'internationalizedArrayReferenceValue', value: ref(`${id}-en`) },
        ],
      })
      .commit();
    console.log(`✓ ${kind}/${slug} — ${uploaded.filter(Boolean).length} images${video ? ' + vidéo' : ''}`);
  }

  console.log(`\n${rows.length} projets · ${images} images · ${videos} vidéos · ${(bytes / 1024 / 1024).toFixed(0)} Mo${dry ? ' (aperçu : rien envoyé)' : ''}`);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
