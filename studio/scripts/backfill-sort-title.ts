/**
 * Remplit la clé de tri (sortTitle) des secteurs, services et technologies déjà créés.
 * Ensuite elle se met à jour toute seule quand on change un nom dans le Studio.
 *
 *   cd studio
 *   npx sanity exec scripts/backfill-sort-title.ts --with-user-token -- --dry   # aperçu
 *   npx sanity exec scripts/backfill-sort-title.ts --with-user-token            # applique
 */
import { getCliClient } from 'sanity/cli';

const dry = process.argv.includes('--dry');
const client = getCliClient({ apiVersion: '2025-01-01' });

const sortKey = (title?: string) =>
  (title ?? '').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[’']/g, '').toLowerCase().trim();

const run = async () => {
  const docs = await client.fetch<{ _id: string; title?: string; sortTitle?: string }[]>(`*[_type in ["sector", "service", "technology"]]{ _id, title, sortTitle }`);
  const todo = docs.filter((d) => sortKey(d.title) !== (d.sortTitle ?? ''));
  console.log(`${todo.length} document(s) sur ${docs.length} à mettre à jour.`);
  if (dry || !todo.length) return console.log(dry ? 'Aperçu seulement : rien n’a été écrit.' : 'Rien à faire.');
  let tx = client.transaction();
  for (const d of todo) tx = tx.patch(d._id, (p) => p.set({ sortTitle: sortKey(d.title) }));
  await tx.commit();
  console.log('Terminé.');
};

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
