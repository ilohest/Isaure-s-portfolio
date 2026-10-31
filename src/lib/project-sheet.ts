/**
 * Page projet alimentée par Sanity : bandeau d'en-tête structuré + sections modulables (studio/schemaTypes/sections.ts).
 * Renvoie `null` tant que le projet n'a pas de sections dans Sanity : la page garde alors son contenu écrit dans le code.
 */
import type { ImageMetadata } from 'astro';
import { sanityClient } from './sanity';
import { parseProjectSlug } from '../i18n/routes';
import type { CaseStudySwatch, SheetBlock } from '../components/web-dev/case-study';

type Img = { url?: string; w?: number; h?: number } | null;
interface RawSection {
  _type: string;
  heading?: string;
  body?: PTBlock[] | string;
  notes?: string[];
  caption?: string;
  layout?: 'pair' | 'grid' | 'stack';
  note?: string;
  image?: Img;
  poster?: string;
  video?: string;
  images?: { _type?: string; caption?: string; image?: Img; video?: string; poster?: string }[];
  swatches?: { hex?: string }[];
}
interface RawProject {
  language: 'fr' | 'en';
  slug: string;
  title?: string;
  year?: string;
  business?: string;
  overview?: string;
  siteUrl?: string;
  siteLabel?: string;
  sector?: { title?: string; titleEn?: string } | null;
  services?: { title?: string; titleEn?: string }[];
  stack?: { title?: string }[];
  sections?: RawSection[];
}

const IMG = `{ "url": asset->url, "w": asset->metadata.dimensions.width, "h": asset->metadata.dimensions.height }`;
const QUERY = `*[_type == "project" && defined(language) && coalesce(published, true)]{
  language, "slug": slug.current, title, year, business, overview, siteUrl, siteLabel,
  "sector": sector->{ title, titleEn },
  "services": services[]->{ title, titleEn },
  "stack": stack[]->{ title },
  sections[]{
    _type, heading, body, notes, caption, layout, note,
    "image": image${IMG},
    "poster": poster.asset->url,
    "video": video.asset->url,
    "images": images[]{ _type, caption, "image": image${IMG}, "video": video.asset->url, "poster": poster.asset->url },
    swatches[]{ hex }
  }
}`;

let cache: Promise<RawProject[]> | undefined;
const fetchAll = () =>
  sanityClient.fetch<RawProject[]>(QUERY).catch((err) => {
    console.warn('[project-sheet] Sanity indisponible, pages projet du code utilisées:', (err as Error).message);
    return [] as RawProject[];
  });
// au build, une seule lecture pour toutes les pages ; en développement, relue à chaque page pour voir tout de suite les modifications du Studio
const load = () => (import.meta.env.DEV ? fetchAll() : (cache ??= fetchAll()));

interface PTBlock {
  _type: string;
  style?: string;
  listItem?: 'bullet' | 'number';
  children?: { text?: string; marks?: string[] }[];
  markDefs?: { _key: string; href?: string }[];
}
const esc = (t: string) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const SAFE = /^(https?:|mailto:)/i;
/** texte riche Sanity → HTML (paragraphes, titres, listes, gras, italique, liens) */
const toHtml = (blocks: PTBlock[]): string => {
  let out = '';
  let list: 'ul' | 'ol' | null = null;
  const close = () => {
    if (list) out += `</${list}>`;
    list = null;
  };
  for (const b of blocks) {
    if (b._type !== 'block') continue;
    const inner = (b.children ?? [])
      .map((c) => {
        let h = esc(c.text ?? '').replace(/\n/g, '<br>');
        for (const m of c.marks ?? []) {
          if (m === 'strong') h = `<strong>${h}</strong>`;
          else if (m === 'em') h = `<em>${h}</em>`;
          else if (m === 'underline') h = `<u>${h}</u>`;
          else {
            const href = b.markDefs?.find((d) => d._key === m)?.href;
            if (href && SAFE.test(href)) h = `<a href="${esc(href)}" target="_blank" rel="noopener noreferrer">${h}</a>`;
          }
        }
        return h;
      })
      .join('');
    if (b.listItem) {
      const tag = b.listItem === 'number' ? 'ol' : 'ul';
      if (list !== tag) {
        close();
        out += `<${tag}>`;
        list = tag;
      }
      out += `<li>${inner}</li>`;
    } else {
      close();
      const tag = b.style === 'h3' ? 'h3' : b.style === 'h4' ? 'h4' : 'p';
      if (inner) out += `<${tag}>${inner}</${tag}>`;
    }
  }
  close();
  return out;
};
const richText = (b?: PTBlock[] | string) => (Array.isArray(b) ? { html: toHtml(b), paragraphs: [] as string[] } : { html: undefined, paragraphs: paragraphs(b) });

const paragraphs = (t?: string) => (t ?? '').split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
const img = (i?: Img): ImageMetadata | undefined =>
  i?.url && i.w && i.h ? ({ src: i.url, width: i.w, height: i.h, format: 'webp' } as ImageMetadata) : undefined;

const swatch = (hex: string): CaseStudySwatch => {
  let h = hex.replace('#', '');
  if (h.length === 3) h = [...h].map((c) => c + c).join('');
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
  const k = 1 - Math.max(r, g, b) / 255;
  const cmy = (v: number) => (k === 1 ? 0 : Math.round(((1 - v / 255 - k) / (1 - k)) * 100));
  const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  return {
    hex: '#' + h.toUpperCase(),
    rgb: `${r}, ${g}, ${b}`,
    cmyk: `${cmy(r)}, ${cmy(g)}, ${cmy(b)}, ${Math.round(k * 100)}`,
    textColor: lum > 0.6 ? '#232323' : '#FFFDFD',
  };
};

const toBlocks = (sections: RawSection[]): SheetBlock[] =>
  sections.flatMap((s): SheetBlock[] => {
    switch (s._type) {
      case 'textSection':
        return [{ type: 'text', title: s.heading, ...richText(s.body) }];
      case 'notesSection':
        return [{ type: 'notes', title: s.heading, ...richText(s.body), notes: s.notes ?? [] }];
      case 'imageSection': {
        const src = img(s.image);
        return src ? [{ type: 'image', src, alt: s.caption ?? '' }] : [];
      }
      case 'imagesSection': {
        const stack = s.layout === 'stack';
        const items = (s.images ?? []).flatMap((it) => {
          if (it._type === 'figureVideo') return stack && it.video ? [{ video: it.video, poster: it.poster ? `${it.poster}?w=1400&auto=format` : undefined, alt: it.caption ?? '' }] : [];
          const src = img(it.image);
          return src ? [{ src, alt: it.caption ?? '' }] : [];
        });
        return items.length ? [{ type: 'gallery', items, layout: s.layout ?? 'pair' }] : [];
      }
      case 'videoSection':
        return s.video ? [{ type: 'video', src: s.video, poster: s.poster ? `${s.poster}?w=1400&auto=format` : undefined, alt: s.caption ?? '' }] : [];
      case 'paletteSection':
        return [{ type: 'palette', swatches: (s.swatches ?? []).filter((x) => x.hex).map((x) => swatch(x.hex!)), note: paragraphs(s.note) }];
      default:
        return [];
    }
  });

export const getSanitySheet = async (kind: 'web' | 'branding', slug: string, lang: 'fr' | 'en') => {
  const docs = (await load()).filter((d) => {
    const p = parseProjectSlug(d.slug);
    return p.kind === kind && p.slug === slug;
  });
  const mine = docs.find((d) => d.language === lang);
  const other = docs.find((d) => d.language !== lang);
  const sections = mine?.sections?.length ? mine.sections : other?.sections;
  if (!sections?.length) return null;
  const pick = <K extends keyof RawProject>(k: K) => mine?.[k] ?? other?.[k];
  const name = (x?: { title?: string; titleEn?: string } | null) => (lang === 'fr' ? x?.title || x?.titleEn : x?.titleEn || x?.title) ?? '';
  const sector = pick('sector');
  const siteUrl = pick('siteUrl');
  return {
    title: pick('title') ?? '',
    year: pick('year') ?? '',
    sector: name(sector),
    business: pick('business') ?? '',
    overview: pick('overview') ?? '',
    url: siteUrl ? { href: siteUrl, label: pick('siteLabel') || siteUrl.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '') } : undefined,
    services: (pick('services') ?? []).map(name).filter(Boolean),
    stack: (pick('stack') ?? []).map((t) => t?.title ?? '').filter(Boolean),
    blocks: toBlocks(sections),
  };
};
