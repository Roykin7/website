#!/usr/bin/env node
// Generates a brand-styled PDF for a job posting from scripts/job-pdf-data/<slug>.json
// into public/careers/<slug>.pdf. Rerun by hand whenever a role is added or edited:
//
//   node scripts/generate-job-pdf.mjs <slug>

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PDFDocument, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const CACHE_DIR = path.join(__dirname, '.font-cache');

const BRAND = rgb(0xe6 / 255, 0x4a / 255, 0x19 / 255);
const INK = rgb(0x0e / 255, 0x11 / 255, 0x16 / 255);
const INK_SOFT = rgb(0x3a / 255, 0x3f / 255, 0x47 / 255);
const MUTE = rgb(0x6b / 255, 0x72 / 255, 0x80 / 255);
const WHITE = rgb(1, 1, 1);

const PAGE_W = 595.28; // A4
const PAGE_H = 841.89;
const MARGIN = 56;
const CONTENT_W = PAGE_W - MARGIN * 2;
const HEADER_H = 118;
const FOOTER_H = 40;

async function fetchGoogleFontTTF(family, weight) {
  const cachePath = path.join(CACHE_DIR, `${family.replace(/\s+/g, '-')}-${weight}.ttf`);
  if (existsSync(cachePath)) return readFile(cachePath);

  const cssUrl = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}&display=swap`;
  const cssRes = await fetch(cssUrl, {
    // Old Android browsers get served plain .ttf instead of .woff/.woff2 by Google Fonts' UA sniffing.
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Linux; U; Android 4.1.1; en-us; Nexus 7 Build/JRO03D) AppleWebKit/535.19 (KHTML, like Gecko) Version/4.0 Safari/535.19',
    },
  });
  if (!cssRes.ok) throw new Error(`Failed to fetch font CSS for ${family} ${weight}: ${cssRes.status}`);
  const css = await cssRes.text();
  const match = css.match(/url\((https:[^)]+\.ttf)\)/);
  if (!match) throw new Error(`No .ttf URL found for ${family} ${weight}`);

  const fontRes = await fetch(match[1]);
  if (!fontRes.ok) throw new Error(`Failed to download font file for ${family} ${weight}: ${fontRes.status}`);
  const buf = Buffer.from(await fontRes.arrayBuffer());

  await mkdir(CACHE_DIR, { recursive: true });
  await writeFile(cachePath, buf);
  return buf;
}

// pdf-lib has a text-shaping bug: when a single drawText() call contains a digit adjacent to
// certain punctuation ( ) % – — — a kerning pair Inter Tight defines — the glyphs still render
// correctly on screen but the PDF's extracted/copy-pasted text comes out scrambled for that
// punctuation. Drawing one character per drawText() call sidesteps it (no adjacency, no kern
// pair, no corruption) at the cost of more draw calls, which is fine at this document's scale.
function makeTextHelpers(font) {
  const widthCache = new Map();
  const charWidth = (ch, size) => {
    const key = `${size}:${ch}`;
    let w = widthCache.get(key);
    if (w === undefined) {
      w = font.widthOfTextAtSize(ch, size);
      widthCache.set(key, w);
    }
    return w;
  };
  const textWidth = (text, size) => {
    let w = 0;
    for (const ch of text) w += charWidth(ch, size);
    return w;
  };
  const drawText = (page, text, { x, y, size, color }) => {
    let cx = x;
    for (const ch of text) {
      if (ch !== ' ') page.drawText(ch, { x: cx, y, size, font, color });
      cx += charWidth(ch, size);
    }
  };
  const wrapText = (text, size, maxWidth) => {
    const words = text.split(/\s+/);
    const lines = [];
    let line = '';
    for (const word of words) {
      const candidate = line ? `${line} ${word}` : word;
      if (textWidth(candidate, size) > maxWidth && line) {
        lines.push(line);
        line = word;
      } else {
        line = candidate;
      }
    }
    if (line) lines.push(line);
    return lines;
  };
  return { drawText, wrapText, textWidth };
}

async function main() {
  const slug = process.argv[2];
  if (!slug) {
    console.error('Usage: node scripts/generate-job-pdf.mjs <slug>');
    process.exit(1);
  }

  const dataPath = path.join(ROOT, 'scripts', 'job-pdf-data', `${slug}.json`);
  const data = JSON.parse(await readFile(dataPath, 'utf-8'));

  const doc = await PDFDocument.create();
  doc.registerFontkit(fontkit);

  const fontBytes = await fetchGoogleFontTTF('Inter Tight', 400);
  const font = await doc.embedFont(fontBytes);
  const { drawText, wrapText } = makeTextHelpers(font);

  const pages = [];
  let page = doc.addPage([PAGE_W, PAGE_H]);
  pages.push(page);
  let y = PAGE_H - HEADER_H - 36;

  const newPage = () => {
    page = doc.addPage([PAGE_W, PAGE_H]);
    pages.push(page);
    y = PAGE_H - MARGIN - 8;
  };

  const ensureSpace = (needed) => {
    if (y - needed < MARGIN + FOOTER_H) newPage();
  };

  // --- Header band (first page only) ---
  const firstPage = pages[0];
  firstPage.drawRectangle({ x: 0, y: PAGE_H - HEADER_H, width: PAGE_W, height: HEADER_H, color: BRAND });
  drawText(firstPage, 'S T E M C I T Y   L A B S', { x: MARGIN, y: PAGE_H - 40, size: 10, color: WHITE });

  const titleLines = wrapText(data.title, 23, CONTENT_W);
  titleLines.forEach((line, i) => {
    drawText(firstPage, line, { x: MARGIN, y: PAGE_H - 72 - i * 27, size: 23, color: WHITE });
  });

  data.meta.forEach((line) => {
    drawText(firstPage, line, { x: MARGIN, y, size: 9.5, color: MUTE });
    y -= 15;
  });
  y -= 10;

  // --- Sections ---
  for (const section of data.sections) {
    ensureSpace(40);
    y -= 6;
    drawText(page, section.heading, { x: MARGIN, y, size: 14.5, color: INK });
    y -= 10;
    page.drawRectangle({ x: MARGIN, y, width: 28, height: 2, color: BRAND });
    y -= 16;

    for (const para of section.paragraphs || []) {
      const lines = wrapText(para, 10.5, CONTENT_W);
      for (const line of lines) {
        ensureSpace(16);
        drawText(page, line, { x: MARGIN, y, size: 10.5, color: INK_SOFT });
        y -= 15.5;
      }
      y -= 4;
    }

    for (const bullet of section.bullets || []) {
      const lines = wrapText(bullet, 10.5, CONTENT_W - 16);
      lines.forEach((line, i) => {
        ensureSpace(16);
        if (i === 0) {
          page.drawCircle({ x: MARGIN + 3, y: y + 4, size: 2, color: BRAND });
        }
        drawText(page, line, { x: MARGIN + 16, y, size: 10.5, color: INK_SOFT });
        y -= 15.5;
      });
      y -= 3;
    }
    y -= 8;
  }

  // --- Footer on every page ---
  pages.forEach((p, i) => {
    p.drawLine({
      start: { x: MARGIN, y: FOOTER_H + 8 },
      end: { x: PAGE_W - MARGIN, y: FOOTER_H + 8 },
      thickness: 0.75,
      color: rgb(0.88, 0.86, 0.8),
    });
    drawText(p, 'stemcitylabs@gmail.com · stemcitylabs.org', { x: MARGIN, y: FOOTER_H - 6, size: 8.5, color: MUTE });
    drawText(p, `${i + 1} / ${pages.length}`, { x: PAGE_W - MARGIN - 30, y: FOOTER_H - 6, size: 8.5, color: MUTE });
  });

  const outDir = path.join(ROOT, 'public', 'careers');
  await mkdir(outDir, { recursive: true });
  const outPath = path.join(outDir, `${slug}.pdf`);
  await writeFile(outPath, await doc.save());
  console.log(`Wrote ${path.relative(ROOT, outPath)} (${pages.length} page${pages.length === 1 ? '' : 's'})`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
