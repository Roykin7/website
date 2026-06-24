import sharp from 'sharp';
import { readdir, rename, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, basename, extname } from 'node:path';

const dirs = ['public/images/team', 'public/images/site'];
const MAX_W = 1600;

for (const dir of dirs) {
  const files = await readdir(dir);
  for (const f of files) {
    if (!/\.(jpe?g|png)$/i.test(f)) continue;
    const stem = basename(f, extname(f));
    const webp = join(dir, `${stem}.webp`);
    if (existsSync(webp)) continue;
    const info = await sharp(join(dir, f))
      .rotate()
      .resize({ width: MAX_W, withoutEnlargement: true })
      .webp({ quality: 75 })
      .toFile(webp);
    console.log(`${dir}/${stem}.webp  ${(info.size / 1024).toFixed(0)}KB`);
  }
}

// Downsize josh.jpg specifically (it's 535KB)
const joshIn = 'public/images/team/josh.jpg';
const joshTmp = 'public/images/team/josh.tmp.jpg';
const before = (await stat(joshIn)).size;
await sharp(joshIn)
  .rotate()
  .resize({ width: 1200, withoutEnlargement: true })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(joshTmp);
const after = (await stat(joshTmp)).size;
if (after < before * 0.9) {
  await rename(joshTmp, joshIn);
  console.log(`josh.jpg downsized: ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB`);
} else {
  const { unlink } = await import('node:fs/promises');
  await unlink(joshTmp);
  console.log('josh.jpg already optimal');
}
