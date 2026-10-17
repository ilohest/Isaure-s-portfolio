/**
 * Traductions des pages projet, stockées dans Sanity (champ « Textes de la page » de chaque projet, un document par langue).
 * Le texte d'origine (anglais, dans le code) sert de clé : si Sanity n'a pas de version, il s'affiche tel quel.
 * `recordCopy` (avec DUMP_PROJECT_COPY=1) liste les textes à traduire, pour préparer l'import.
 */
import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { sanityClient } from './sanity';

export type ProjectKind = 'web' | 'branding';

const norm = (s: string) => s.replace(/\s+/g, ' ').trim();
export const keyOf = (s: string) => createHash('md5').update(norm(s)).digest('hex').slice(0, 12);

let cache: Promise<Map<string, Map<string, string>>> | undefined;
// clé « <langue>:<kind>/<slug> » → (clé du texte d'origine → texte dans cette langue)
const load = () =>
  (cache ??= (async () => {
    const out = new Map<string, Map<string, string>>();
    try {
      const rows = await sanityClient.fetch<{ language?: string; kind?: string; slug?: string; pageTexts?: { _key: string; text?: string }[] }[]>(
        '*[_type=="project" && defined(language)]{ language, kind, "slug": slug.current, pageTexts[]{ _key, text } }',
      );
      for (const r of rows) {
        if (!r.slug) continue;
        out.set(`${r.language}:${r.kind ?? 'web'}/${r.slug}`, new Map((r.pageTexts ?? []).map((e) => [e._key, e.text ?? ''])));
      }
    } catch (err) {
      console.warn('[project-copy] Sanity indisponible, textes du code utilisés:', (err as Error).message);
    }
    return out;
  })());

/** Fonction de traduction pour un projet et une langue : texte d'origine → texte à afficher. */
export const getTx = async (kind: ProjectKind, slug: string, lang: 'fr' | 'en') => {
  const entries = (await load()).get(`${lang}:${kind}/${slug}`);
  return (s?: string): string => {
    if (!s) return '';
    const v = entries?.get(keyOf(s));
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
