import sharp from 'sharp';
import { readdir, mkdir, stat } from 'node:fs/promises';
import { join, basename, extname } from 'node:path';

const IN_DIR = process.argv[2];
const OUT_DIR = process.argv[3];
const MAX_WIDTH = 1920;

if (!IN_DIR || !OUT_DIR) {
  console.error('Usage: node optimize-images.mjs <in-dir> <out-dir>');
  process.exit(1);
}

await mkdir(OUT_DIR, { recursive: true });
const files = await readdir(IN_DIR);

for (const f of files) {
  if (!/\.(jpe?g|png)$/i.test(f)) continue;
  const inPath = join(IN_DIR, f);
  const stem = basename(f, extname(f))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  const outJpg = join(OUT_DIR, `${stem}.jpg`);
  const outWebp = join(OUT_DIR, `${stem}.webp`);

  const src = await stat(inPath);
  const meta = await sharp(inPath).metadata();
  const resize = meta.width > MAX_WIDTH ? { width: MAX_WIDTH } : null;

  let pipe = sharp(inPath).rotate();
  if (resize) pipe = pipe.resize(resize);

  const jpgInfo = await pipe.clone().jpeg({ quality: 80, mozjpeg: true }).toFile(outJpg);
  const webpInfo = await pipe.clone().webp({ quality: 75 }).toFile(outWebp);

  const srcKb = (src.size / 1024).toFixed(0);
  const jpgKb = (jpgInfo.size / 1024).toFixed(0);
  const webpKb = (webpInfo.size / 1024).toFixed(0);
  console.log(`${stem.padEnd(40)} ${meta.width}x${meta.height}  ${srcKb}KB -> jpg ${jpgKb}KB / webp ${webpKb}KB`);
}
