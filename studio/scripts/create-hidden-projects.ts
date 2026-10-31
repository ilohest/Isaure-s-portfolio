/**
 * Crée les fiches Sanity de Didacmania et Tranche de CaKe, NON PUBLIÉES (cochez « Publié » pour les afficher sur le site).
 * Le contenu de la page se reprend ensuite avec migrate-sheet.ts.
 *
 *   cd studio
 *   npx sanity exec scripts/create-hidden-projects.ts --with-user-token
 */
import { createReadStream } from 'node:fs';
import { resolve } from 'node:path';
import { getCliClient } from 'sanity/cli';

const client = getCliClient({ apiVersion: '2025-01-01' });
const DIR = resolve(__dirname, '../../src/assets/media-src/projects/web-dev');
const ref = (_ref: string) => ({ _type: 'reference', _ref, _weak: false });

const PROJECTS = [
  { slug: 'didacmania', title: 'Didacmanía', cover: 'didacmania/didacmania-desktop1.avif', sector: undefined },
  { slug: 'tranche-de-cake', title: 'Tranche de CaKe', cover: 'tranche-de-cake/tdc-desktop2.avif', sector: 'sector-food-beverage' },
];

const main = async () => {
  for (const p of PROJECTS) {
    const id = `project-web-${p.slug}`;
    const asset = await client.assets.upload('image', createReadStream(resolve(DIR, p.cover)));
    const common = {
      _type: 'project',
      title: p.title,
      slug: { _type: 'slug', current: p.slug },
      published: false,
      cover: { _type: 'image', asset: ref(asset._id) },
      ...(p.sector ? { sector: ref(p.sector) } : {}),
    };
    await client
      .transaction()
      .createIfNotExists({ ...common, _id: id, language: 'fr' })
      .createIfNotExists({ ...common, _id: `${id}-en`, language: 'en' })
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
    console.log(`✓ ${p.slug}`);
  }
};
main();
