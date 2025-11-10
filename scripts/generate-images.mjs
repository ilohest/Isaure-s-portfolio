// scripts/generate-images.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'fs-extra';
import { globSync } from 'glob';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Dossiers racine
const SRC_DIR = path.resolve(__dirname, '../src/assets/img_src'); // originaux
const OUT_DIR = path.resolve(__dirname, '../public/assets/img'); // sortie

// Réglages
const TARGET_WIDTHS = [640, 960, 1280, 1920]; // suffixes stables
const WEBP_QUALITY = 78;
const AVIF_QUALITY = 50;
const PNG_COMPRESSION = 9;
const SUPPORTED_EXT = ['.png', '.jpg', '.jpeg'];
const COPY_ORIGINAL = false;

// --------- Sélection des dossiers ciblés ---------
const rawArgs = process.argv.slice(2);
const isDryRun = rawArgs.includes('--dry-run') || rawArgs.includes('-n');
const argPaths = rawArgs.filter((a) => !a.startsWith('-'));

// Si aucun chemin passé, on traite tout le SRC_DIR
const targets = argPaths.length ? argPaths : ['.'];

// Normalise en globs depuis SRC_DIR
const patterns = targets.map((p) => {
  const absOrRel = path.isAbsolute(p) ? p : path.join(SRC_DIR, p);
  const stat = fs.existsSync(absOrRel) ? fs.statSync(absOrRel) : null;
  if (stat && stat.isFile()) return absOrRel;
  return path.join(absOrRel, '**/*.{png,jpg,jpeg}');
});

// Collecte et dédoublonnage
const filesSet = new Set();
for (const pat of patterns) {
  for (const f of globSync(pat, { nodir: true })) filesSet.add(f);
}
const files = Array.from(filesSet);

// Préparation dossiers
await fs.ensureDir(SRC_DIR);
await fs.ensureDir(OUT_DIR);

if (!files.length) {
  console.log('Aucune image trouvée pour:', targets.join(', '));
  console.log('Base de recherche:', SRC_DIR);
  process.exit(0);
}

console.log(`🛠  Génération d’images (${files.length} fichier(s)) depuis: ${targets.join(', ')}`);
if (isDryRun) console.log('🔎 Mode simulation: aucun fichier ne sera écrit.');

for (const srcPath of files) {
  const relDir = path.relative(SRC_DIR, path.dirname(srcPath));
  const outDir = path.join(OUT_DIR, relDir);
  await fs.ensureDir(outDir);

  const ext = path.extname(srcPath).toLowerCase();
  if (!SUPPORTED_EXT.includes(ext)) continue;

  const base = path.basename(srcPath, ext);
  const outBase = path.join(outDir, base);

  // Heuristique “logo-like”
  const isLogoLike = /\b(logo|icon|palette|brandbook)\b/i.test(base);

  // Métadonnées
  const meta = await sharp(srcPath).metadata();
  const width = meta?.width ?? 0;
  const height = meta?.height ?? 0;
  const hasAlpha = Boolean(meta?.hasAlpha);
  const keepPng = hasAlpha || isLogoLike;

  // Liste des "labels" à produire (suffixes stables)
  // - Si l’image est >= au plus petit preset, on garde tous les presets <= width
  // - Sinon, on produit quand même le plus petit preset (ex: 640) mais on rend à width réel
  let labelWidths = TARGET_WIDTHS.filter((w) => width && w <= width);
  if (!labelWidths.length) labelWidths = [TARGET_WIDTHS[0]]; // ex: 640

  console.log('[IMG]', base, {
    w: width,
    h: height,
    alpha: hasAlpha,
    isLogoLike,
    labels: labelWidths,
  });

  // Helper: rend un fichier pour un "label" avec nom suffixé par le label
  // Le rendu réel est min(label, width), on n’upscale jamais.
  const renderForLabel = async (fmt, label) => {
    const targetW = width ? Math.min(label, width) : label;
    const pipeline = sharp(srcPath);
    if (targetW) pipeline.resize({ width: targetW, withoutEnlargement: true });

    let outFile;
    if (fmt === 'avif') {
      outFile = `${outBase}-${label}.avif`;
      if (!isDryRun) await pipeline.avif({ quality: AVIF_QUALITY, effort: 4 }).toFile(outFile);
    } else if (fmt === 'webp') {
      outFile = `${outBase}-${label}.webp`;
      if (!isDryRun)
        await pipeline.webp({ quality: WEBP_QUALITY, alphaQuality: 90, effort: 4 }).toFile(outFile);
    } else {
      outFile = `${outBase}-${label}.png`;
      if (!isDryRun)
        await pipeline.png({ compressionLevel: PNG_COMPRESSION, palette: true }).toFile(outFile);
    }
    console.log('✔', path.relative(OUT_DIR, outFile));
  };

  // Génération AVIF/WEBP (+ PNG si logo/transparence) pour chaque label
  for (const label of labelWidths) {
    await renderForLabel('avif', label);
    await renderForLabel('webp', label);
    if (keepPng) await renderForLabel('png', label);
  }

  // Fallback PNG à suffixe fixe -960 (format d’origine dans le nom)
  // Contenu réel = min(960, width) sans upscale
  const fallbackLabel = 960;
  const fallbackW = width ? Math.min(fallbackLabel, width) : fallbackLabel;
  const fallbackOut = `${outBase}-${fallbackLabel}${ext}`;
  if (!isDryRun) {
    await sharp(srcPath).resize({ width: fallbackW, withoutEnlargement: true }).toFile(fallbackOut);
  }
  console.log('✔', path.relative(OUT_DIR, fallbackOut));

  if (COPY_ORIGINAL) {
    const origOut = `${outBase}-orig${ext}`;
    if (!isDryRun) await fs.copyFile(srcPath, origOut);
  }
}

console.log('✅ Terminé. Servez les images depuis /public/assets/img');
