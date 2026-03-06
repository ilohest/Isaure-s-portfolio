// scripts/optimize-videos.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import fs from 'fs-extra';
import { globSync } from 'glob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SRC_DIR = path.resolve(__dirname, '../src/assets/media-src/videos-originals');
const OUT_DIR = path.resolve(__dirname, '../public/media/videos');

const rawArgs = process.argv.slice(2);
const isDryRun = rawArgs.includes('--dry-run') || rawArgs.includes('-n');
const isCheckOnly = rawArgs.includes('--check');
const stems = rawArgs.filter((a) => !a.startsWith('-'));

const ffmpeg = spawnSync('ffmpeg', ['-version'], { stdio: 'ignore' });
if (ffmpeg.status !== 0) {
  console.error('❌ ffmpeg is required but was not found in PATH.');
  process.exit(1);
}

if (!(await fs.pathExists(SRC_DIR))) {
  console.error('❌ Source folder not found:', SRC_DIR);
  process.exit(1);
}

if (!isCheckOnly) {
  await fs.ensureDir(OUT_DIR);
}

const patterns = stems.length
  ? stems.map((stem) => path.join(SRC_DIR, `${stem}.*`))
  : [path.join(SRC_DIR, '*.{mov,mp4,m4v,avi}')];

const inputs = patterns
  .flatMap((pat) => globSync(pat, { nodir: true, nocase: true }))
  .filter((p) => !path.basename(p).startsWith('.'));

if (!inputs.length) {
  console.log('No videos found for:', stems.length ? stems.join(', ') : '(all)');
  process.exit(0);
}

const missingOutputs = [];
const staleOutputs = [];

const needsRebuild = async (srcPath, outPath) => {
  const outExists = await fs.pathExists(outPath);
  if (!outExists) return 'missing';
  const [srcStat, outStat] = await Promise.all([fs.stat(srcPath), fs.stat(outPath)]);
  return outStat.mtimeMs < srcStat.mtimeMs ? 'stale' : 'ok';
};

const runFfmpeg = (args) => {
  if (isDryRun) return { status: 0 };
  return spawnSync('ffmpeg', args, { stdio: 'inherit' });
};

if (isCheckOnly) {
  console.log(`🔎 Video check (${inputs.length} file(s)) from: ${path.relative(process.cwd(), SRC_DIR)}`);
}

for (const srcPath of inputs) {
  const stem = path.parse(srcPath).name;
  const outPath = path.join(OUT_DIR, `${stem}.mp4`);

  const state = await needsRebuild(srcPath, outPath);
  if (isCheckOnly) {
    if (state === 'missing') missingOutputs.push({ srcPath, outPath });
    if (state === 'stale') staleOutputs.push({ srcPath, outPath });
    continue;
  }

  if (state === 'ok') continue;

  console.log(`🛠  Optimizing video: ${stem} (${state})`);

  const ffArgs = [
    '-y',
    '-i',
    srcPath,
    '-an',
    '-vf',
    "scale='min(1280,iw)':-2,fps=30",
    '-c:v',
    'libx264',
    '-preset',
    'medium',
    '-crf',
    '28',
    '-pix_fmt',
    'yuv420p',
    '-movflags',
    '+faststart',
    outPath,
  ];

  const res = runFfmpeg(ffArgs);
  if (res.status !== 0) {
    console.error('❌ ffmpeg failed for:', srcPath);
    process.exit(res.status || 1);
  }
}

if (isCheckOnly) {
  const hasErrors = missingOutputs.length > 0 || staleOutputs.length > 0;
  if (!hasErrors) {
    console.log('✅ Video check OK: outputs are present and up to date.');
    process.exit(0);
  }

  if (missingOutputs.length) {
    console.error(`\n❌ Missing optimized videos (${missingOutputs.length}):`);
    for (const item of missingOutputs) {
      console.error(
        `- ${path.relative(path.resolve(__dirname, '..'), item.outPath)} (source: ${path.relative(path.resolve(__dirname, '..'), item.srcPath)})`,
      );
    }
  }

  if (staleOutputs.length) {
    console.error(`\n❌ Stale optimized videos (${staleOutputs.length}):`);
    for (const item of staleOutputs) {
      console.error(
        `- ${path.relative(path.resolve(__dirname, '..'), item.outPath)} (newer source: ${path.relative(path.resolve(__dirname, '..'), item.srcPath)})`,
      );
    }
  }

  console.error('\nCommand to fix: npm run build:videos');
  process.exit(1);
}

console.log(`✅ Done. Output: ${path.relative(path.resolve(__dirname, '..'), OUT_DIR)}`);

