import { HIDDEN_SLUGS } from './projects';

interface P {
  title: string;
  year: string;
  sector?: string;
  order: number;
  projectLink: string;
}

/** Année du projet et trois « autres projets » (les suivants, du plus récent au plus ancien, sans les projets masqués). */
export const sheetContext = (all: P[], path: string) => {
  const slugOf = (l: string) => l.split('/').filter(Boolean).pop() ?? '';
  const byRecent = [...all]
    .filter((p) => !HIDDEN_SLUGS.has(slugOf(p.projectLink)) || p.projectLink === path)
    .sort((a, b) => b.order - a.order);
  const ci = byRecent.findIndex((p) => p.projectLink === path);
  const others = [1, 2, 3].map((k) => {
    const p = byRecent[(ci + k) % byRecent.length];
    return { title: p.title, href: p.projectLink, year: p.year, sector: p.sector ?? '' };
  });
  return { year: byRecent[ci]?.year ?? '', others };
};
