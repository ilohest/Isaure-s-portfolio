// scripts/generate-images.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'fs-extra';
import { globSync } from 'glob';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Dossiers racine
const SRC_DIR = path.resolve(__dirname, '../src/assets/media-src'); // originaux
const MEDIA_OUT_DIR = path.resolve(__dirname, '../public/assets/media'); // sortie principale

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
const isCheckOnly = rawArgs.includes('--check');
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

if (!(await fs.pathExists(SRC_DIR))) {
  console.error('Dossier source introuvable:', SRC_DIR);
  process.exit(1);
}

// Préparation dossiers (uniquement en mode génération)
if (!isCheckOnly) {
  await fs.ensureDir(MEDIA_OUT_DIR);
}

if (!files.length) {
  console.log('Aucune image trouvée pour:', targets.join(', '));
  console.log('Base de recherche:', SRC_DIR);
  process.exit(0);
}

if (isCheckOnly) {
  console.log(`🔎 Vérification des images générées (${files.length} fichier(s)) depuis: ${targets.join(', ')}`);
} else {
  console.log(`🛠  Génération d’images (${files.length} fichier(s)) depuis: ${targets.join(', ')}`);
  if (isDryRun) console.log('🔎 Mode simulation: aucun fichier ne sera écrit.');
}

const missingOutputs = [];
const staleOutputs = [];

for (const srcPath of files) {
  const relDir = path.relative(SRC_DIR, path.dirname(srcPath));
  const srcStat = await fs.stat(srcPath);

  const ext = path.extname(srcPath).toLowerCase();
  if (!SUPPORTED_EXT.includes(ext)) continue;

  const base = path.basename(srcPath, ext);

  // Heuristique “logo-like”
  const isLogoLike = /\b(logo|icon|palette|brandbook)\b/i.test(base);

  // Métadonnées
  const meta = await sharp(srcPath).metadata();
  const width = meta?.width ?? 0;
  const height = meta?.height ?? 0;
  const hasAlpha = Boolean(meta?.hasAlpha);

  // On génère TOUS les labels, le resize se charge d’éviter l’upscale
  const labelWidths = TARGET_WIDTHS;

  if (!isCheckOnly) {
    console.log('[IMG]', base, {
      w: width,
      h: height,
      alpha: hasAlpha,
      isLogoLike,
      labels: labelWidths,
    });
  }

  // Helper: rend un fichier pour un "label" avec nom suffixé par le label.
  // Le rendu réel est min(label, width), on n'upscale jamais.
  const renderForLabel = async (fmt, label, outBase) => {
    const targetW = width ? Math.min(label, width) : label;
    const pipeline = sharp(srcPath);
    if (targetW) pipeline.resize({ width: targetW, withoutEnlargement: true });

    let outFile;
    if (fmt === 'avif') {
      outFile = `${outBase}-${label}.avif`;
      if (!isDryRun) {
        await pipeline.avif({ quality: AVIF_QUALITY, effort: 4 }).toFile(outFile);
      }
    } else if (fmt === 'webp') {
      outFile = `${outBase}-${label}.webp`;
      if (!isDryRun) {
        await pipeline.webp({ quality: WEBP_QUALITY, alphaQuality: 90, effort: 4 }).toFile(outFile);
      }
    } else {
      outFile = `${outBase}-${label}.png`;
      if (!isDryRun) {
        await pipeline.png({ compressionLevel: PNG_COMPRESSION, palette: true }).toFile(outFile);
      }
    }
    console.log('✔', path.relative(path.resolve(__dirname, '..'), outFile));
  };

  const relOutputDir = relDir;
  const outDir = path.join(MEDIA_OUT_DIR, relOutputDir);
  const outBase = path.join(outDir, base);
  if (!isCheckOnly) {
    await fs.ensureDir(outDir);
  }

  if (isCheckOnly) {
    const expectedOutputs = [];
    for (const label of labelWidths) {
      expectedOutputs.push(`${outBase}-${label}.avif`);
      expectedOutputs.push(`${outBase}-${label}.webp`);
    }
    expectedOutputs.push(`${outBase}-960.png`);
    if (COPY_ORIGINAL) expectedOutputs.push(`${outBase}-orig${ext}`);

    for (const outFile of expectedOutputs) {
      const exists = await fs.pathExists(outFile);
      if (!exists) {
        missingOutputs.push({ srcPath, outFile });
        continue;
      }

      const outStat = await fs.stat(outFile);
      if (outStat.mtimeMs < srcStat.mtimeMs) {
        staleOutputs.push({ srcPath, outFile });
      }
    }
    continue;
  }

  // Génération AVIF/WEBP pour chaque label.
  for (const label of labelWidths) {
    await renderForLabel('avif', label, outBase);
    await renderForLabel('webp', label, outBase);
  }

  // Fallback PNG à suffixe fixe -960 (toujours .png, pour coller au HTML).
  const fallbackLabel = 960;
  const fallbackW = width ? Math.min(fallbackLabel, width) : fallbackLabel;
  const fallbackOut = `${outBase}-${fallbackLabel}.png`;

  if (!isDryRun) {
    await sharp(srcPath)
      .resize({ width: fallbackW, withoutEnlargement: true })
      .png({ compressionLevel: PNG_COMPRESSION, palette: true })
      .toFile(fallbackOut);
  }
  console.log('✔', path.relative(path.resolve(__dirname, '..'), fallbackOut));

  if (COPY_ORIGINAL) {
    const origOut = `${outBase}-orig${ext}`;
    if (!isDryRun) await fs.copyFile(srcPath, origOut);
  }
}

if (isCheckOnly) {
  const hasErrors = missingOutputs.length > 0 || staleOutputs.length > 0;
  if (!hasErrors) {
    console.log('✅ Vérification OK: toutes les images générées sont présentes et à jour.');
    process.exit(0);
  }

  if (missingOutputs.length) {
    console.error(`\n❌ Fichiers générés manquants (${missingOutputs.length}):`);
    for (const item of missingOutputs) {
      console.error(
        `- ${path.relative(path.resolve(__dirname, '..'), item.outFile)} (source: ${path.relative(path.resolve(__dirname, '..'), item.srcPath)})`,
      );
    }
  }

  if (staleOutputs.length) {
    console.error(`\n❌ Fichiers générés obsolètes (${staleOutputs.length}):`);
    for (const item of staleOutputs) {
      console.error(
        `- ${path.relative(path.resolve(__dirname, '..'), item.outFile)} (source plus récente: ${path.relative(path.resolve(__dirname, '..'), item.srcPath)})`,
      );
    }
  }

  console.error('\nCommande de correction: npm run build:images');
  process.exit(1);
}

console.log(`✅ Terminé. Sortie: ${path.relative(path.resolve(__dirname, '..'), MEDIA_OUT_DIR)}`);
