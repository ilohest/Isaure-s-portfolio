/**
 * Repli local (avant Sanity) : retrouve les images d'un projet dans son dossier public/,
 * en gardant une seule variante par image (les -640/-960/-1280/-1920 sont des déclinaisons).
 * Module « build seulement » (fs + sharp) : ne jamais l'importer côté navigateur.
 */
import { readdir, stat } from 'node:fs/promises';
import { join, dirname, extname, basename } from 'node:path';
import sharp from 'sharp';

export interface WorkImage {
  src: string;
  w: number;
  h: number;
  caption?: string;
}

const EXT_RANK: Record<string, number> = { '.webp': 0, '.png': 1, '.jpg': 2, '.jpeg': 2, '.avif': 3 };
const SIZE_RANK = [1280, 960, 1920, 640, 0]; // préférence de variante

const urlFor = (p: string) =>
  p
    .split('/')
    .map((seg) => encodeURIComponent(seg))
    .join('/');

const natural = (a: string, b: string) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });

export const fileExists = async (publicPath: string) => {
  try {
    await stat(join(process.cwd(), 'public', decodeURIComponent(publicPath)));
    return true;
  } catch {
    return false;
  }
};

export const galleryFor = async (coverPath: string, max = 8): Promise<WorkImage[]> => {
  const clean = decodeURIComponent(coverPath);
  const dirUrl = dirname(clean);
  const dirFs = join(process.cwd(), 'public', dirUrl);
  let files: string[] = [];
  try {
    files = await readdir(dirFs);
  } catch {
    return [];
  }

  const groups = new Map<string, { file: string; size: number; ext: number }[]>();
  for (const file of files) {
    const ext = extname(file).toLowerCase();
    if (!(ext in EXT_RANK)) continue;
    const stem = basename(file, extname(file));
    if (/favicon|icon|logo/i.test(stem)) continue;
    const m = stem.match(/^(.*?)-(\d{3,4})$/);
    const key = (m ? m[1] : stem).toLowerCase();
    const size = m ? Number(m[2]) : 0;
    const list = groups.get(key) ?? [];
    list.push({ file, size, ext: EXT_RANK[ext] });
    groups.set(key, list);
  }

  const coverStem = basename(clean, extname(clean)).replace(/-(\d{3,4})$/, '').toLowerCase();
  const keys = [...groups.keys()].sort(natural);
  if (keys.includes(coverStem)) keys.splice(keys.indexOf(coverStem), 1), keys.unshift(coverStem);

  const out: WorkImage[] = [];
  for (const key of keys.slice(0, max)) {
    const best = groups
      .get(key)!
      .sort((a, b) => {
        const sa = SIZE_RANK.indexOf(a.size) === -1 ? 9 : SIZE_RANK.indexOf(a.size);
        const sb = SIZE_RANK.indexOf(b.size) === -1 ? 9 : SIZE_RANK.indexOf(b.size);
        return sa - sb || a.ext - b.ext;
      })[0];
    try {
      const meta = await sharp(join(dirFs, best.file)).metadata();
      if (!meta.width || !meta.height) continue;
      out.push({ src: urlFor(`${dirUrl}/${best.file}`), w: meta.width, h: meta.height });
    } catch {
      /* image illisible : on l'ignore */
    }
  }
  return out;
};
