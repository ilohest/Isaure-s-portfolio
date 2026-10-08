/**
 * Active / désactive « Bientôt disponible » sur un projet.
 *   cd studio
 *   npx sanity exec scripts/set-coming-soon.ts --with-user-token -- studio-abime on
 *   npx sanity exec scripts/set-coming-soon.ts --with-user-token -- studio-abime off
 */
import { getCliClient } from 'sanity/cli';

const client = getCliClient({ apiVersion: '2025-01-01' });
const [slug, state] = process.argv.slice(-2);
const main = async () => {
  const ids = await client.fetch<string[]>(`*[_type == "project" && slug.current == $slug]._id`, { slug });
  if (!ids.length) throw new Error(`Projet introuvable : ${slug}`);
  for (const id of ids) await client.patch(id).set({ comingSoon: state === 'on' }).commit();
  console.log(`✓ ${slug} : comingSoon = ${state === 'on'}`);
};
main().catch((e) => {
  console.error(e);
  process.exit(1);
});
