/**
 * Pilote : page Trio Linaris saisie dans Sanity (en-tête structuré + sections), reprise du contenu écrit dans
 * src/components/branding/TioLinarisBranding.astro. Crée au passage les Services et les Technologies.
 * Les textes français viennent de l'ancien champ « Textes de la page » (clé = hash du texte anglais).
 *
 *   cd studio
 *   npx sanity exec scripts/migrate-sheet-trio.ts --with-user-token
 */
import { createHash, randomBytes } from 'node:crypto';
import { createReadStream } from 'node:fs';
import { resolve } from 'node:path';
import { getCliClient } from 'sanity/cli';

const client = getCliClient({ apiVersion: '2025-01-01' });
const DIR = resolve(__dirname, '../../src/assets/media-src/projects/branding/tio-linaris');
const key = () => randomBytes(6).toString('hex');
const norm = (s: string) => s.replace(/\s+/g, ' ').trim();
const hash = (s: string) => createHash('md5').update(norm(s)).digest('hex').slice(0, 12);
const slugify = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const TECHNOLOGIES = ['Astro', 'Vue', 'Nuxt', 'Sanity', 'Shopify', 'Liquid', 'WordPress', 'Squarespace', 'Showit', 'Tilda', 'Readymag', 'React', 'TypeScript', 'Firebase', 'Tailwind', 'PHP', 'Webflow', 'Figma'];
const SERVICES: [fr: string, en: string][] = [
  ['Design éditorial', 'Editorial design'],
  ['Direction artistique', 'Art direction'],
  ['Système de mise en page', 'Layout system'],
];

const slides: [file: string, alt: string][] = [
  ['trio-linaris-slide-01', 'Trio Linaris cover portrait'],
  ['trio-linaris-slide-03', 'Pierre Cornu-Deyme profile page'],
  ['trio-linaris-slide-04', 'Vinciane Vinckenbosch profile page'],
  ['trio-linaris-slide-05', 'Alexandra Bidi profile page'],
  ['trio-linaris-slide-06', 'Trio Linaris contact page'],
  ['trio-linaris-slide-07', 'Trio Linaris performance photo overlay'],
  ['trio-linaris-slide-08', 'Trio Linaris logo page'],
  ['trio-linaris-slide-09', 'Trio Linaris programme page'],
  ['trio-linaris-slide-10', 'Trio Linaris appendix page'],
  ['trio-linaris-slide-02', 'Trio Linaris editorial introduction spread with architectural portrait'],
  ['trio-linaris-slide-11', 'Trio Linaris editorial introduction spread with studio portrait'],
];

const EN = {
  business: 'Chamber music ensemble (flute, viola and harp)',
  overview: 'This project consists of the art direction and editorial design of a presentation dossier, conceived as a PDF document for Trio Linaris, a chamber music ensemble bringing together flute, viola and harp.',
  project: [
    'This project consists of the art direction and editorial design of a presentation dossier, conceived as a PDF document for Trio Linaris, a chamber music ensemble bringing together flute, viola and harp.',
    'The visual approach draws directly from the codes of the classical music world: elegance, precision, and timelessness. The layout is built on a strong sense of rhythm and balance, echoing the structure of musical composition itself. Typography plays a central role, with refined serif contrasts and large-scale compositions that evoke both tradition and contemporary sophistication.',
  ],
  concept: [
    'The identity revolves around the idea of a "line" — inspired by the meaning of Linaris — translated visually through structured grids, subtle alignments, and flowing transitions between pages.',
    'A restrained color palette, warm tones, and generous negative space create a calm and immersive reading experience, allowing the photography and the musicians’ presence to stand out with clarity. The compositions alternate between editorial density and visual breathing space, reinforcing a sense of movement across the document.',
    'The result is a refined and modern interpretation of classical music aesthetics — bridging heritage and contemporary design, much like the trio’s own artistic positioning.',
  ],
  palette: [
    'A warm, refined palette built on contrast and materiality.',
    'Deep charcoal anchors the composition, paired with a range of reds — from burgundy to vibrant tones — echoing details like lipstick, laces, and harp strings. A soft off-white brings light and balance.',
    'The ensemble is unified by a warm golden ochre, inspired by concert hall gilding and the harp, adding richness and a distinctly classical elegance.',
  ],
  swatches: ['#C3964B', '#FFFDFD', '#8B0000', '#5C1616', '#232323'],
};

const main = async () => {
  const fr = await client.fetch<{ pageTexts?: { source?: string; text?: string }[] }>('*[_id == "project-branding-trio-linaris"][0]{ pageTexts }');
  const table = new Map((fr.pageTexts ?? []).map((t) => [hash(t.source ?? ''), t.text ?? '']));
  const tr = (lang: 'fr' | 'en', s: string) => (lang === 'fr' ? table.get(hash(s)) || s : s);
  const frParas = (list: string[], lang: 'fr' | 'en') => list.map((p) => tr(lang, p)).join('\n\n');

  const tx = client.transaction();
  for (const t of TECHNOLOGIES) tx.createOrReplace({ _id: `technology-${slugify(t)}`, _type: 'technology', title: t });
  for (const [f, e] of SERVICES) tx.createOrReplace({ _id: `service-${slugify(e)}`, _type: 'service', title: f, titleEn: e });
  await tx.commit();

  const up = async (file: string) => {
    const a = await client.assets.upload('image', createReadStream(file), { filename: file.split('/').pop() });
    return { _type: 'image', asset: { _type: 'reference', _ref: a._id } };
  };
  const cover = await up(`${DIR}/tio-linaris-title-cover.png`);
  const slideImgs = await Promise.all(slides.map(([f]) => up(`${DIR}/slideshow/${f}.png`)));
  console.log('✓ images envoyées');

  const sections = (lang: 'fr' | 'en') => [
    { _key: key(), _type: 'imageSection', image: cover, caption: tr(lang, 'Trio Linaris title composition') },
    ...slides.map(([, alt], i) => ({ _key: key(), _type: 'imageSection', image: slideImgs[i], caption: tr(lang, alt) })),
    { _key: key(), _type: 'textSection', heading: tr(lang, 'Project'), body: frParas(EN.project, lang) },
    { _key: key(), _type: 'textSection', heading: tr(lang, 'Concept'), body: frParas(EN.concept, lang) },
    { _key: key(), _type: 'paletteSection', swatches: EN.swatches.map((hex) => ({ _key: key(), _type: 'swatch', hex })), note: frParas(EN.palette, lang) },
  ];

  for (const [id, lang] of [['project-branding-trio-linaris', 'fr'], ['project-branding-trio-linaris-en', 'en']] as const) {
    await client
      .patch(id)
      .set({
        business: lang === 'fr' ? 'Ensemble de musique de chambre (flûte, alto et harpe)' : EN.business,
        overview: tr(lang, EN.overview),
        services: SERVICES.map(([, e]) => ({ _key: key(), _type: 'reference', _ref: `service-${slugify(e)}` })),
        sections: sections(lang),
      })
      .commit();
    console.log(`✓ ${id}`);
  }
};
main();
