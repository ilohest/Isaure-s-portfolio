/**
 * Rend « faibles » les références des projets vers les Services et les Technologies déjà enregistrées,
 * pour pouvoir supprimer un service ou une technologie encore utilisé(e) (le schéma ne s'applique qu'aux nouvelles références).
 *
 *   cd studio
 *   npx sanity exec scripts/weaken-service-refs.ts --with-user-token -- --dry   # aperçu
 *   npx sanity exec scripts/weaken-service-refs.ts --with-user-token            # applique
 *
 * Touche aussi les brouillons (drafts.*). Sans effet sur ce que le site affiche.
 */
import { getCliClient } from 'sanity/cli';

const dry = process.argv.includes('--dry');
const client = getCliClient({ apiVersion: '2025-01-01' });

type Ref = { _key?: string; _ref?: string; _weak?: boolean };
type Doc = { _id: string; services?: Ref[]; stack?: Ref[] };

const strong = (refs?: Ref[]) => (refs ?? []).filter((r) => r._ref && r._weak !== true);

const run = async () => {
  const docs = await client.fetch<Doc[]>(`*[_type == "project"]{ _id, services, stack }`);
  let patched = 0;
  let refCount = 0;
  let tx = client.transaction();

  for (const d of docs) {
    const set: Record<string, unknown> = {};
    for (const field of ['services', 'stack'] as const) {
      const list = d[field];
      if (!strong(list).length) continue;
      refCount += strong(list).length;
      set[field] = list!.map((r) => (r._ref ? { ...r, _weak: true } : r));
    }
    if (!Object.keys(set).length) continue;
    patched++;
    tx = tx.patch(d._id, (p) => p.set(set));
  }

  console.log(`${patched} document(s) à modifier, ${refCount} référence(s) rendue(s) faible(s).`);
  if (dry || !patched) return console.log(dry ? 'Aperçu seulement : rien n’a été écrit.' : 'Rien à faire.');
  await tx.commit();
  console.log('Terminé.');
};

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
