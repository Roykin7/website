import sharp from 'sharp';

const overlay = Buffer.from(`
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="dark" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0" stop-color="#0E1116" stop-opacity="0.55"/>
      <stop offset="1" stop-color="#0E1116" stop-opacity="0.92"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#dark)"/>
  <circle cx="72" cy="92" r="11" fill="#E64A19"/>
  <text x="96" y="103" font-family="Inter, sans-serif" font-size="28" font-weight="500" fill="#F6F3EB">STEMCity Labs</text>
  <text x="72" y="430" font-family="Fraunces, Georgia, serif" font-size="76" font-weight="500" fill="#F6F3EB">Where Africa's makers,</text>
  <text x="72" y="510" font-family="Fraunces, Georgia, serif" font-size="76" font-weight="500" fill="#F6F3EB">students, and founders</text>
  <text x="72" y="582" font-family="Fraunces, Georgia, serif" font-size="76" font-style="italic" font-weight="500" fill="#E64A19">build what's next.</text>
</svg>
`);

const info = await sharp('public/images/site/dt1.jpg')
  .resize(1200, 630, { fit: 'cover', position: 'center' })
  .composite([{ input: overlay }])
  .jpeg({ quality: 85, mozjpeg: true })
  .toFile('public/og-image.jpg');

console.log(`Generated public/og-image.jpg: ${info.width}x${info.height}, ${(info.size / 1024).toFixed(0)} KB`);
