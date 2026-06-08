// One-off : convertit en WebP les photos PNG/JPG lourdes du home + contact-strip
// (le pipeline normal d'images passe par vite-imagetools, mais ces images sont
// référencées en statique depuis public/). Réduit le LCP + le poids réseau.
import { readFileSync, statSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import sharp from 'sharp';
import { globSync } from 'glob';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dirs = ['public/assets/media/pages/home', 'public/assets/media/pages/contact'];

const files = dirs.flatMap((d) =>
  globSync(`${d}/*.{png,jpg,jpeg}`, { cwd: root, absolute: true }),
);

let before = 0;
let after = 0;
let converted = 0;

for (const file of files) {
  const out = file.replace(/\.(png|jpe?g)$/i, '.webp');
  if (existsSync(out)) continue;
  const srcSize = statSync(file).size;
  await sharp(file)
    .resize({ width: 1280, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(out);
  const outSize = statSync(out).size;
  before += srcSize;
  after += outSize;
  converted += 1;
  console.log(
    `  ${(srcSize / 1024) | 0}KB → ${(outSize / 1024) | 0}KB  ${path.relative(root, out)}`,
  );
}

console.log(
  `\n${converted} images : ${(before / 1024 / 1024).toFixed(1)}Mo → ${(after / 1024 / 1024).toFixed(1)}Mo`,
);
