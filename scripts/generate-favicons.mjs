import sharp from 'sharp';
import path from 'node:path';

const srcPath = path.resolve('public/assets/media/common/images/favicon-white-square.png');
const size = 512;
const radius = Math.round(size * 0.16);

const roundedMask = Buffer.from(
  `<svg width="${size}" height="${size}"><rect x="0" y="0" width="${size}" height="${size}" rx="${radius}" ry="${radius}" fill="#fff"/></svg>`,
);

const variants = [
  {
    out: 'public/assets/media/common/images/favicon-blue-square.png',
    bg: { r: 0x4c, g: 0x5e, b: 0xf7 },
    fg: { r: 0xff, g: 0xff, b: 0xff },
  },
  {
    out: 'public/assets/media/common/images/favicon-yellow-square.png',
    bg: { r: 0xff, g: 0xf4, b: 0x7a },
    fg: { r: 0x34, g: 0x32, b: 0x32 },
  },
];

for (const { out, bg, fg } of variants) {
  const { data, info } = await sharp(srcPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const recolored = Buffer.alloc(data.length);

  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];
    // Luminance: 1 = white background, 0 = dark logo ink.
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    recolored[i] = Math.round(bg.r * luminance + fg.r * (1 - luminance));
    recolored[i + 1] = Math.round(bg.g * luminance + fg.g * (1 - luminance));
    recolored[i + 2] = Math.round(bg.b * luminance + fg.b * (1 - luminance));
    recolored[i + 3] = a;
  }

  await sharp(recolored, { raw: { width, height, channels } })
    .composite([{ input: roundedMask, blend: 'dest-in' }])
    .png()
    .toFile(path.resolve(out));

  console.log('wrote', out);
}
