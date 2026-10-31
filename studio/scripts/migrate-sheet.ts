/**
 * Reprend dans Sanity le contenu d'une page projet écrit dans le code (src/components/{web-dev,branding}/*.astro) :
 * en-tête structuré, services, technologies, sections (images, textes, vidéos, palette), en français et en anglais.
 * Les textes français viennent de l'ancien champ « Textes de la page » (clé = hash du texte anglais).
 * L'« Activité du client » (colonne 2) n'existe pas dans le code : à écrire dans le Studio.
 *
 *   cd studio
 *   npx sanity exec scripts/migrate-sheet.ts --with-user-token -- averys vinciane-vinckenbosch     # applique
 *   npx sanity exec scripts/migrate-sheet.ts --with-user-token -- --dry averys                    # aperçu
 */
import { createHash, randomBytes } from 'node:crypto';
import { createReadStream, existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import ts from 'typescript';
import { getCliClient } from 'sanity/cli';

const ROOT = resolve(__dirname, '../..');
const client = getCliClient({ apiVersion: '2025-01-01' });
const args = process.argv.slice(2);
const dry = args.includes('--dry');
const businessOnly = args.includes('--business-only');
const slugs = args.filter((a) => !a.startsWith('--'));

/** slug → [type, fichier du composant] */
const FILES: Record<string, ['web' | 'branding', string]> = {
  averys: ['web', 'web-dev/AverysProject.astro'],
  'vinciane-vinckenbosch': ['web', 'web-dev/VincianeVinckenboschProject.astro'],
  'mark-conlan': ['web', 'web-dev/MarkConlanProject.astro'],
  'louis-cattiaux': ['web', 'web-dev/LouisCattiauxProject.astro'],
  'goa-kombucha-flow': ['web', 'web-dev/GoaKombuchaFlowProject.astro'],
  'academie-cle-do-re': ['web', 'web-dev/AcademieCleDoReProject.astro'],
  'alyssa-coleman-back-of-house': ['web', 'web-dev/AlyssaColemanBackOfHouseProject.astro'],
  bellelachaise: ['web', 'web-dev/BellelachaiseProject.astro'],
  'boda-carmen-nestor': ['web', 'web-dev/BodaCarmenNestorProject.astro'],
  'boda-lis-pavlos': ['web', 'web-dev/BodaLisPavlosProject.astro'],
  'boda-marta-y-pedro': ['web', 'web-dev/BodaMartaPedroProject.astro'],
  'canpruna-accomodation': ['web', 'web-dev/CanprunaProject.astro'],
  creyda: ['web', 'web-dev/CreydaProject.astro'],
  didacmania: ['web', 'web-dev/DidacmaniaProject.astro'],
  'private-event-operations-dashboard-wedding-edition': ['web', 'web-dev/EventDashboardProject.astro'],
  'goa-b2b': ['web', 'web-dev/GoaB2BProject.astro'],
  'the-perfect-hamburger': ['web', 'web-dev/HamburgerProject.astro'],
  'la-petite-serre-urbaine': ['web', 'web-dev/LaPetiteSerreUrbaineProject.astro'],
  'professional-platform': ['web', 'web-dev/ProfessionalPlatformProject.astro'],
  'studio-abime': ['web', 'web-dev/StudioAbimeProject.astro'],
  'tranche-de-cake': ['web', 'web-dev/TrancheDeCakeProject.astro'],
  'bellelachaise-branding': ['branding', 'branding/BellelachaiseBranding.astro'],
  'canpruna-accomodation-branding': ['branding', 'branding/CanprunaBranding.astro'],
  'trio-linaris': ['branding', 'branding/TioLinarisBranding.astro'],
  flou: ['branding', 'branding/FlouBranding.astro'],
  baud: ['branding', 'branding/BaudBranding.astro'],
  'elinor-kinesiologie': ['branding', 'branding/ElinorBranding.astro'],
};

/** slug → fin de l'identifiant du document, quand elle diffère du slug */
const DOC_SLUG: Record<string, string> = { 'professional-platform': 'client-lawyer-platform' };

const TECH = new Set(['astro', 'vue', 'vue.js', 'nuxt', 'sanity', 'sanity cms', 'shopify', 'liquid', 'wordpress', 'squarespace', 'showit', 'tilda', 'readymag', 'react', 'next.js', 'node', 'typescript', 'firebase', 'tailwind', 'php', 'webflow', 'figma']);
const DISPLAY: Record<string, string> = { astro: 'Astro', vue: 'Vue', nuxt: 'Nuxt', sanity: 'Sanity', shopify: 'Shopify', liquid: 'Liquid', wordpress: 'WordPress', squarespace: 'Squarespace', showit: 'Showit', tilda: 'Tilda', readymag: 'Readymag', react: 'React', typescript: 'TypeScript', firebase: 'Firebase', tailwind: 'Tailwind', php: 'PHP', webflow: 'Webflow', figma: 'Figma' };

const key = () => randomBytes(6).toString('hex');
const norm = (s: string) => s.replace(/\s+/g, ' ').trim();
const hash = (s: string) => createHash('md5').update(norm(s)).digest('hex').slice(0, 12);
const slugify = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const cap = (x: string) => x.charAt(0).toUpperCase() + x.slice(1);
const splitList = (t: string) => {
  const clean = t.replace(/&amp;/g, '&');
  return (/\s[-—–]\s/.test(clean) ? clean.split(/\s+[-—–]\s+/) : clean.split(/,\s+/)).map((x) => x.trim().replace(/\.$/, '')).filter(Boolean);
};
/** texte brut (paragraphes séparés par une ligne vide) → texte riche Sanity */
const pt = (text: string) =>
  text
    .split(/\n\s*\n/)
    .map((x) => x.trim())
    .filter(Boolean)
    .map((x) => ({ _type: 'block', _key: key(), style: 'normal', markDefs: [], children: [{ _type: 'span', _key: key(), text: x, marks: [] }] }));
const paras = (v: string | string[] | undefined) => (Array.isArray(v) ? v : v ? [v] : []);

type Block = { type: string; src?: unknown; alt?: string; poster?: string; title?: string; paragraphs?: string[]; swatches?: { hex: string }[]; note?: string | string[]; items?: { src: unknown; alt: string }[] };
interface Parsed {
  props: Record<string, any>;
  glob?: { dir: string; ext: string };
}

/** Lit le composant .astro : exécute son en-tête (sans les images) et évalue les attributs de <ProjectSheet>. */
const PROXY = new Set(['branding/TioLinarisBranding.astro', 'web-dev/AlyssaColemanBackOfHouseProject.astro', 'web-dev/DidacmaniaProject.astro', 'web-dev/StudioAbimeProject.astro', 'web-dev/CanprunaProject.astro', 'branding/CanprunaBranding.astro', 'web-dev/CreydaProject.astro', 'web-dev/AcademieCleDoReProject.astro']);
const parse = (file: string): Parsed => {
  if (PROXY.has(file)) return parseProxy(file);
  const text = readFileSync(resolve(ROOT, 'src/components', file), 'utf8');
  const [, front, template] = text.split(/^---\s*$/m);
  const glob = front.match(/import\.meta\.glob[^(]*\(\s*['"]([^'"]+)\/\*\.([^'"]+)['"]/);
  const imports: string[] = [];
  let code = front
    .replace(/^import\s+(\w+)\s+from\s+'([^']+\.(?:png|webp|jpe?g|avif))';?$/gm, (_, v, p) => (imports.push(`const ${v} = { __img: ${JSON.stringify(p)} };`), ''))
    .replace(/^import .*$/gm, '')
    .replace(/const images = import\.meta\.glob[\s\S]*?\);\n/, '')
    .replace(/const pic = [\s\S]*?\];\n/, '')
    .replace(/const \{ year[^}]*\} = Astro\.props;/, '');
  code = ts.transpileModule(code, { compilerOptions: { target: ts.ScriptTarget.ES2020 } }).outputText;
  const dir = glob ? glob[1] : '';
  const pic = (base: string) => ({ __img: `${dir}/${base}${/\.\w{3,4}$/.test(base) ? '' : '.' + (glob?.[2] ?? 'png')}` });

  // attributs de <ProjectSheet …/>
  const tag = template.slice(template.indexOf('<ProjectSheet') + '<ProjectSheet'.length);
  const attrs: { name: string; expr: string }[] = [];
  let i = 0;
  while (i < tag.length) {
    while (/\s/.test(tag[i])) i++;
    if (tag.startsWith('/>', i) || tag[i] === '>') break;
    const m = /^[\w-]+/.exec(tag.slice(i));
    if (!m) break;
    const name = m[0];
    i += name.length;
    if (tag[i] !== '=') {
      attrs.push({ name, expr: 'true' });
      continue;
    }
    i++;
    if (tag[i] === '"') {
      const j = tag.indexOf('"', i + 1);
      attrs.push({ name, expr: JSON.stringify(tag.slice(i + 1, j)) });
      i = j + 1;
    } else if (tag[i] === '{') {
      let depth = 0;
      let j = i;
      for (; j < tag.length; j++) {
        if (tag[j] === '{') depth++;
        else if (tag[j] === '}' && --depth === 0) break;
      }
      attrs.push({ name, expr: tag.slice(i + 1, j) });
      i = j + 1;
    } else break;
  }
  const body = `${imports.join('\n')}\n${code}\nreturn { ${attrs.filter((a) => !['year', 'others'].includes(a.name)).map((a) => `${JSON.stringify(a.name)}: (${a.expr})`).join(',\n')} };`;
  const props = new Function('pic', body)(pic);
  return { props, glob: glob ? { dir, ext: glob[2] } : undefined };
};

/** Variante : on exécute l'en-tête tel quel, les `import.meta.glob` renvoient des références de fichiers. */
const parseProxy = (file: string): Parsed => {
  const dirOf = resolve(ROOT, 'src/components', file, '..');
  const text = readFileSync(resolve(ROOT, 'src/components', file), 'utf8');
  const [, front, template] = text.split(/^---\s*$/m);
  const locals: string[] = [];
  let code = front.replace(/^import\s+\{\s*(\w+)\s*\}\s+from\s+'(\.[^']+)';?$/gm, (_, name, rel) => {
    const f = ['.ts', '.js'].map((e) => resolve(dirOf, rel + e)).find(existsSync);
    if (f) locals.push(ts.transpileModule(readFileSync(f, 'utf8').replace(/^export /gm, ''), { compilerOptions: { target: ts.ScriptTarget.ES2020 } }).outputText);
    return '';
  });
  code = code
    .replace(/^import .*$/gm, '')
    .replace(/const (\w+) = import\.meta\.glob[^(]*\(\s*['"]([^'"]+)['"][\s\S]*?\);\n/g, (_, v, pat) => `const ${v} = __glob(${JSON.stringify(pat)});\n`)
    .replace(/const \{ year[^}]*\} = Astro\.props;/, '');
  code = ts.transpileModule(code, { compilerOptions: { target: ts.ScriptTarget.ES2020 } }).outputText;
  const __glob = (pat: string) => {
    const ext = pat.slice(pat.lastIndexOf('.'));
    return new Proxy({}, { get: (_, k: string) => (typeof k === 'string' && k.endsWith(ext) && existsSync(resolve(ROOT, k.slice(1))) ? { __img: k, default: { __img: k } } : undefined) });
  };
  const tag = template.slice(template.indexOf('<ProjectSheet') + '<ProjectSheet'.length);
  const attrs: { name: string; expr: string }[] = [];
  let i = 0;
  while (i < tag.length) {
    while (/\s/.test(tag[i])) i++;
    if (tag.startsWith('/>', i) || tag[i] === '>') break;
    if (tag.startsWith('{...', i)) {
      let depth = 0;
      let j = i;
      for (; j < tag.length; j++) {
        if (tag[j] === '{') depth++;
        else if (tag[j] === '}' && --depth === 0) break;
      }
      attrs.push({ name: '...', expr: tag.slice(i + 4, j) });
      i = j + 1;
      continue;
    }
    const m = /^[\w-]+/.exec(tag.slice(i));
    if (!m) break;
    const name = m[0];
    i += name.length;
    if (tag[i] !== '=') {
      attrs.push({ name, expr: 'true' });
      continue;
    }
    i++;
    if (tag[i] === '"') {
      const j = tag.indexOf('"', i + 1);
      attrs.push({ name, expr: JSON.stringify(tag.slice(i + 1, j)) });
      i = j + 1;
    } else if (tag[i] === '{') {
      let depth = 0;
      let j = i;
      for (; j < tag.length; j++) {
        if (tag[j] === '{') depth++;
        else if (tag[j] === '}' && --depth === 0) break;
      }
      attrs.push({ name, expr: tag.slice(i + 1, j) });
      i = j + 1;
    } else break;
  }
  const body = `${locals.join('\n')}\n${code}\nreturn { ${attrs.filter((a) => !['year', 'others'].includes(a.name)).map((a) => (a.name === '...' ? `...(${a.expr})` : `${JSON.stringify(a.name)}: (${a.expr})`)).join(',\n')} };`;
  const props = new Function('__glob', body)(__glob);
  return { props };
};

const main = async () => {
  for (const slug of slugs) {
    const [kind, file] = FILES[slug] ?? [];
    if (!file) throw new Error(`projet inconnu : ${slug}`);
    const p = parse(file).props;
    const legacy = !p.blocks;
    if (legacy) {
      const meta: { label: string; value: string }[] = p.meta ?? [];
      p.sector ??= meta.find((m) => /sector/i.test(m.label))?.value;
      p.format ??= meta.find((m) => /format/i.test(m.label))?.value;
      p.blocks = [
        ...(p.heroVideo ? [{ type: 'video', src: p.heroVideo, poster: p.heroPoster, alt: p.heroAlt ?? '' }] : []),
        ...(p.media ?? []),
        ...(p.palette?.length ? [{ type: 'palette', swatches: p.palette, label: p.paletteLabel, note: p.paletteNote }] : []),
      ];
    }
    const blocks: Block[] = p.blocks;
    const docId = `project-${kind}-${DOC_SLUG[slug] ?? slug.replace(/-branding$/, '')}`;

    const frDoc = await client.fetch<{ pageTexts?: { _key?: string; source?: string; text?: string }[] }>('*[_id == $id][0]{ pageTexts }', { id: docId });
    const table = new Map((frDoc?.pageTexts ?? []).map((t) => [t.source ? hash(t.source) : (t as any)._key, t.text ?? '']));
    const missing = new Set<string>();
    const tr = (lang: 'fr' | 'en', s?: string) => {
      if (!s) return '';
      if (lang === 'en') return s;
      const v = table.get(hash(s));
      if (!v?.trim()) missing.add(s.slice(0, 50));
      return v?.trim() ? v : s;
    };

    // la phrase d'activité (sous l'année, et au dos de la carte Work) : l'ancien « format » du composant
    if (businessOnly) {
      for (const [id, lang] of [[docId, 'fr'], [`${docId}-en`, 'en']] as const) {
        if (!p.format) continue;
        const v = tr(lang, p.format);
        for (const i of [id, `drafts.${id}`]) if (!dry && (await client.fetch<boolean>('defined(*[_id == $d][0]._id)', { d: i }))) await client.patch(i).set({ business: v }).commit();
        console.log(`${id}: ${v}`);
      }
      continue;
    }

    // en-tête
    const tags: string[] = p.tags ?? [];
    const allSolutions = (p.solutions ?? splitList(p.responsibilities ?? '')).map(cap);
    const techTags = tags.filter((t) => TECH.has(t.toLowerCase()));
    const found = Object.keys(DISPLAY).filter((k) => allSolutions.some((x: string) => new RegExp('\\b' + k + '\\b', 'i').test(x)));
    const stack = [...techTags.map((t) => DISPLAY[t.toLowerCase()] ?? t), ...found.filter((k) => !techTags.some((t) => t.toLowerCase().startsWith(k))).map((k) => DISPLAY[k])];
    const refers = (x: string) => stack.some((t) => new RegExp('\\b' + t.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'i').test(x));
    const services: string[] = allSolutions.filter((x: string) => !refers(x));

    // fichiers
    const resolveFile = (v: unknown, pubOnly = false): string | undefined => {
      if (!v) return undefined;
      const rel = typeof v === 'object' ? (v as { __img: string }).__img : (v as string);
      if (!rel) return undefined;
      const abs = rel.startsWith('/src/') ? resolve(ROOT, rel.slice(1)) : resolve(ROOT, 'public', rel.slice(1));
      return existsSync(abs) ? abs : undefined;
    };
    const dimsByFile = new Map<string, { w: number; h: number }>();
    const upload = async (kindAsset: 'image' | 'file', v: unknown) => {
      const abs = resolveFile(v);
      if (!abs) {
        console.warn(`⚠ fichier introuvable : ${JSON.stringify(v)}`);
        return null;
      }
      if (dry) return { abs, ref: 'dry', dims: { w: 1000, h: 1000 } };
      const a = await client.assets.upload(kindAsset, createReadStream(abs), { filename: abs.split('/').pop() });
      const d = (a as any).metadata?.dimensions;
      return { abs, ref: a._id, dims: d ? { w: d.width as number, h: d.height as number } : { w: 1, h: 1 } };
    };

    // blocs → sections (regroupe deux images verticales qui se suivent, comme l'ancienne page)
    type Up = { ref: string; dims: { w: number; h: number } };
    const up = new Map<Block, Up | null>();
    for (const b of blocks) {
      if (b.type === 'image') up.set(b, await upload('image', b.src));
      if (b.type === 'video') up.set(b, await upload('file', b.src));
    }
    const posters = new Map<Block, Up | null>();
    for (const b of blocks) if (b.type === 'video' && b.poster) posters.set(b, await upload('image', b.poster));
    const galleryUps = new Map<Block, (Up | null)[]>();
    for (const b of blocks) if (b.type === 'gallery') galleryUps.set(b, await Promise.all((b.items ?? []).map((it) => upload('image', it.src))));
    const imgRef = (u: Up) => ({ _type: 'image', asset: { _type: 'reference', _ref: u.ref } });
    const portrait = (b?: Block) => b?.type === 'image' && !!up.get(b) && up.get(b)!.dims.w / up.get(b)!.dims.h < 0.9;

    const sections = (lang: 'fr' | 'en') => {
      const out: any[] = [];
      for (let i = 0; i < blocks.length; i++) {
        const b = blocks[i];
        if (b.type === 'image') {
          const u = up.get(b);
          if (!u) continue;
          const next = blocks[i + 1];
          if (portrait(b) && portrait(next)) {
            const u2 = up.get(next)!;
            out.push({ _key: key(), _type: 'imagesSection', layout: 'pair', images: [{ _key: key(), _type: 'figure', image: imgRef(u), caption: tr(lang, b.alt) }, { _key: key(), _type: 'figure', image: imgRef(u2), caption: tr(lang, next.alt) }] });
            i++;
          } else out.push({ _key: key(), _type: 'imageSection', image: imgRef(u), caption: tr(lang, b.alt) });
        } else if (b.type === 'video') {
          const u = up.get(b);
          if (!u) continue;
          const po = posters.get(b);
          out.push({ _key: key(), _type: 'videoSection', video: { _type: 'file', asset: { _type: 'reference', _ref: u.ref } }, ...(po ? { poster: imgRef(po) } : {}), caption: tr(lang, b.alt) });
        } else if (b.type === 'gallery') {
          const ups = galleryUps.get(b) ?? [];
          out.push({ _key: key(), _type: 'imagesSection', layout: 'grid', images: (b.items ?? []).flatMap((it, k) => (ups[k] ? [{ _key: key(), _type: 'figure', image: imgRef(ups[k]!), caption: tr(lang, it.alt) }] : [])) });
        } else if (b.type === 'text') {
          out.push({ _key: key(), _type: 'textSection', heading: tr(lang, b.title), body: pt((b.paragraphs ?? []).map((x) => tr(lang, x)).join('\n\n')) });
        } else if (b.type === 'palette') {
          out.push({ _key: key(), _type: 'paletteSection', swatches: (b.swatches ?? []).map((s) => ({ _key: key(), _type: 'swatch', hex: s.hex })), note: paras(b.note).map((x) => tr(lang, x)).join('\n\n') });
        }
      }
      if (p.showContext ?? legacy) out.push({ _key: key(), _type: 'textSection', heading: lang === 'fr' ? 'Contexte' : 'Context', body: pt(paras(p.projectParagraphs).map((x) => tr(lang, x)).join('\n\n')) });
      return out;
    };

    const link = p.url as { href: string; label: string } | undefined;
    const summary = `${slug}: ${blocks.length} blocs, ${services.length} services (${services.join(' | ')}), stack (${stack.join(', ')})`;
    if (dry) {
      console.log(summary, '\n  sections FR:', sections('fr').map((s) => s._type).join(','), '\n  manquants FR:', [...missing]);
      continue;
    }

    const tx = client.transaction();
    for (const t of stack) tx.createIfNotExists({ _id: `technology-${slugify(t)}`, _type: 'technology', title: t });
    for (const en of services) {
      const fr = tr('fr', en);
      tx.createIfNotExists({ _id: `service-${slugify(en)}`, _type: 'service', title: fr, titleEn: en });
    }
    await tx.commit();

    for (const [id, lang] of [[docId, 'fr'], [`${docId}-en`, 'en']] as const) {
      const set: Record<string, unknown> = {
        overview: tr(lang, paras(p.projectParagraphs)[0]),
        services: services.map((en) => ({ _key: key(), _type: 'reference', _ref: `service-${slugify(en)}` })),
        stack: stack.map((t) => ({ _key: key(), _type: 'reference', _ref: `technology-${slugify(t)}` })),
        sections: sections(lang),
        ...(link ? { siteUrl: link.href, siteLabel: link.label } : {}),
      };
      await client.patch(id).set(set).unset(['country']).commit();
      // un brouillon ouvert dans le Studio masque le document publié : on lui applique les mêmes champs
      if (await client.fetch<boolean>('defined(*[_id == $d][0]._id)', { d: `drafts.${id}` })) await client.patch(`drafts.${id}`).set(set).unset(['country']).commit();
    }
    console.log(`✓ ${summary}`);
    if (missing.size) console.log('  ⚠ sans traduction FR :', [...missing]);
  }
};
main();
