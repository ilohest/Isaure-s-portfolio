/**
 * Traductions des pages projet, stockées dans Sanity (documents « projectCopy »).
 * Le texte d'origine (anglais, dans le code) sert de clé : si Sanity n'a pas de version, il s'affiche tel quel.
 * `recordCopy` (avec DUMP_PROJECT_COPY=1) liste les textes à traduire, pour préparer l'import.
 */
import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { sanityClient } from './sanity';

export type ProjectKind = 'web' | 'branding';
type Entry = { fr?: string; en?: string };

const norm = (s: string) => s.replace(/\s+/g, ' ').trim();
export const keyOf = (s: string) => createHash('md5').update(norm(s)).digest('hex').slice(0, 12);

let cache: Promise<Map<string, Map<string, Entry>>> | undefined;
const load = () =>
  (cache ??= (async () => {
    const out = new Map<string, Map<string, Entry>>();
    try {
      const rows = await sanityClient.fetch<{ ref?: string; entries?: { _key: string; fr?: string; en?: string }[] }[]>(
        '*[_type=="projectCopy"]{ ref, entries[]{ _key, fr, en } }',
      );
      for (const r of rows) {
        if (!r.ref) continue;
        out.set(r.ref, new Map((r.entries ?? []).map((e) => [e._key, { fr: e.fr, en: e.en }])));
      }
    } catch (err) {
      console.warn('[project-copy] Sanity indisponible, textes du code utilisés:', (err as Error).message);
    }
    return out;
  })());

/** Fonction de traduction pour un projet et une langue : texte d'origine → texte à afficher. */
export const getTx = async (kind: ProjectKind, slug: string, lang: 'fr' | 'en') => {
  const entries = (await load()).get(`${kind}/${slug}`);
  return (s?: string): string => {
    if (!s) return '';
    const e = entries?.get(keyOf(s));
    const v = lang === 'fr' ? e?.fr : e?.en;
    return v?.trim() ? v : s;
  };
};

/** Mode préparation : écrit la liste des textes d'un projet dans studio/.cache/project-copy/. */
export const recordCopy = (kind: ProjectKind, slug: string, strings: (string | undefined)[]) => {
  if (!process.env.DUMP_PROJECT_COPY) return;
  const dir = `${process.cwd()}/studio/.cache/project-copy`;
  mkdirSync(dir, { recursive: true });
  const file = `${dir}/${kind}-${slug}.json`;
  const prev: string[] = existsSync(file) ? JSON.parse(readFileSync(file, 'utf8')).strings : [];
  const merged = [...new Set([...prev, ...strings.filter((x): x is string => Boolean(x)).map(norm)])];
  writeFileSync(file, JSON.stringify({ ref: `${kind}/${slug}`, strings: merged }, null, 2));
};
