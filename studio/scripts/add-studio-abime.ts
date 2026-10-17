/**
 * Ajoute (ou met à jour) la carte « Studio Abîme » dans Sanity. Idempotent (id stable).
 *
 *   cd studio
 *   PORTFOLIO_ROOT=.. npx sanity exec scripts/add-studio-abime.ts --with-user-token
 */
import { createReadStream } from 'node:fs';
import { resolve } from 'node:path';
import { getCliClient } from 'sanity/cli';

const client = getCliClient({ apiVersion: '2025-01-01' });
const file = resolve(process.env.PORTFOLIO_ROOT || '..', 'public/assets/media/projects/web-dev/studio-abime/studio-abime-cover.webp');

const videoFile = resolve(process.env.PORTFOLIO_ROOT || '..', 'public/media/videos/studio-abime-preview.mp4');

const main = async () => {
  const va = await client.assets.upload('file', createReadStream(videoFile), { filename: 'studio-abime-preview.mp4' });
  const asset = await client.assets.upload('image', createReadStream(file), { filename: 'studio-abime-cover.webp' });
  const image = { _type: 'image', asset: { _type: 'reference', _ref: asset._id } };
  const common = {
    _type: 'project',
    title: 'Studio Abîme',
    slug: { _type: 'slug', current: 'studio-abime' },
    kind: 'web',
    date: '2026-10-01',
    rank: 202611,
    year: '2026',
    published: true,
    cover: image,
    video: { _type: 'file', asset: { _type: 'reference', _ref: va._id } },
    gallery: [{ _type: 'workImage', _key: asset._id.slice(-12), showInGrid: true, image }],
  };
  const id = 'project-web-studio-abime';
  const ref = (_ref: string) => ({ _type: 'reference', _ref, _weak: false });
  await client
    .transaction()
    .createOrReplace({ ...common, _id: id, language: 'fr', sector: 'Communication & branding', keywords: ['Web design', 'Communication', 'Branding'], summary: 'Un site qui se feuillette comme un dossier d’archives.' })
    .createOrReplace({ ...common, _id: `${id}-en`, language: 'en', sector: 'Communication & branding', keywords: ['Web design', 'Communication', 'Branding'], summary: 'A website you leaf through like an archive file.' })
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
  console.log('✓ project-web-studio-abime');
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
