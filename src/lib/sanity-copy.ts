/**
 * Textes du site édités dans Sanity (documents « siteCopy »).
 * Lus à la construction du site et posés par-dessus les textes d'origine (src/i18n/fr.ts, en.ts) :
 * une ligne vide ou introuvable garde le texte du code, donc le site ne casse jamais.
 */
import { sanityClient } from './sanity';

export type CopyOverlay = Record<'fr' | 'en', Map<string, string>>;

const QUERY = `*[_type == "siteCopy"]{ entries[]{ key, fr, en } }`;

export const loadCopyOverlay = async (): Promise<CopyOverlay> => {
  const overlay: CopyOverlay = { fr: new Map(), en: new Map() };
  try {
    const docs = await sanityClient.fetch<{ entries?: { key?: string; fr?: string; en?: string }[] }[]>(QUERY);
    for (const d of docs) {
      for (const e of d.entries ?? []) {
        if (!e.key) continue;
        if (e.fr?.trim()) overlay.fr.set(e.key, e.fr);
        if (e.en?.trim()) overlay.en.set(e.key, e.en);
      }
    }
  } catch (err) {
    console.warn('[copy] Sanity indisponible, textes du code utilisés:', (err as Error).message);
  }
  return overlay;
};

/** Copie profonde de `base`, avec les textes Sanity posés aux bonnes clés (« section.sous.0.titre »). */
export const applyOverlay = <T extends object>(base: T, overlay: Map<string, string>): T => {
  const out = structuredClone(base) as Record<string, unknown>;
  for (const [key, value] of overlay) {
    const path = key.split('.');
    let node: unknown = out;
    for (let i = 0; i < path.length - 1 && node && typeof node === 'object'; i++) node = (node as Record<string, unknown>)[path[i]];
    const last = path[path.length - 1];
    if (node && typeof node === 'object' && typeof (node as Record<string, unknown>)[last] === 'string') {
      (node as Record<string, unknown>)[last] = value;
    }
  }
  return out as T;
};
