/**
 * Passe le « Texte » des sections (texte simple) en texte riche : un paragraphe par bloc séparé par une ligne vide.
 * Sans effet sur ce qui est déjà en texte riche.
 *
 *   cd studio
 *   npx sanity exec scripts/migrate-rich-text.ts --with-user-token
 */
import { randomBytes } from 'node:crypto';
import { getCliClient } from 'sanity/cli';

const client = getCliClient({ apiVersion: '2025-01-01' });
const key = () => randomBytes(6).toString('hex');
const pt = (text: string) =>
  text
    .split(/\n\s*\n/)
    .map((x) => x.trim())
    .filter(Boolean)
    .map((x) => ({ _type: 'block', _key: key(), style: 'normal', markDefs: [], children: [{ _type: 'span', _key: key(), text: x, marks: [] }] }));

const main = async () => {
  const docs = await client.fetch<{ _id: string; sections?: any[] }[]>('*[_type == "project" && defined(sections)]{ _id, sections }');
  let n = 0;
  for (const d of docs) {
    let changed = false;
    const sections = d.sections!.map((s) => {
      if ((s._type === 'textSection' || s._type === 'notesSection') && typeof s.body === 'string') {
        changed = true;
        n++;
        return { ...s, body: pt(s.body) };
      }
      return s;
    });
    if (changed) await client.patch(d._id).set({ sections }).commit();
  }
  console.log(`✓ ${n} textes convertis`);
};
main();
