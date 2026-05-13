import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

function alphaFromBlack(r, g, b) {
  const lum = 0.299 * r + 0.587 * g + 0.114 * b;
  if (lum < 18) return 0;
  if (lum < 72) return Math.round(((lum - 18) / 54) * 255);
  return 255;
}

async function stripBlackBackground(inputPath) {
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    const a = alphaFromBlack(data[i], data[i + 1], data[i + 2]);
    data[i + 3] = Math.min(data[i + 3], a);
  }

  return sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .trim()
    .png();
}

async function fromSvg() {
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="g" x1="96" y1="256" x2="416" y2="256" gradientUnits="userSpaceOnUse">
      <stop stop-color="#c4b5fd"/>
      <stop offset="1" stop-color="#7dd3fc"/>
    </linearGradient>
  </defs>
  <text x="256" y="348" text-anchor="middle" fill="url(#g)" font-family="Segoe UI, system-ui, sans-serif" font-size="360" font-weight="400">n</text>
</svg>`;

  return sharp({
    create: {
      width: 512,
      height: 512,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  }).composite([{ input: Buffer.from(svg), top: 0, left: 0 }]);
}

const userSource = path.join(root, "public", "newgency-n.png");
let pipeline;

if (fs.existsSync(userSource)) {
  console.log("Using public/newgency-n.png");
  pipeline = await stripBlackBackground(userSource);
} else {
  console.log("Using generated SVG");
  pipeline = await fromSvg();
}

const ICON_SCALE = 0.72;

async function fitIcon(master, size) {
  const inner = Math.round(size * ICON_SCALE);
  const resized = await sharp(master)
    .resize(inner, inner, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  const left = Math.round((size - inner) / 2);
  const top = Math.round((size - inner) / 2);

  return sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([{ input: resized, left, top }])
    .png()
    .toBuffer();
}

const master = await pipeline.png().toBuffer();

const outputs = [
  { file: path.join(root, "app", "icon.png"), size: 512 },
  { file: path.join(root, "app", "apple-icon.png"), size: 180 },
  { file: path.join(root, "public", "favicon.png"), size: 32 },
  { file: path.join(root, "public", "apple-touch-icon.png"), size: 180 },
];

for (const { file, size } of outputs) {
  const out = await fitIcon(master, size);
  await sharp(out).toFile(file);
  console.log("Wrote", file);
}

const sample = await sharp(path.join(root, "public", "favicon.png")).raw().toBuffer();
let transparent = 0;
for (let i = 3; i < sample.length; i += 4) {
  if (sample[i] === 0) transparent += 1;
}
console.log("Transparent pixels in favicon:", transparent, "/", sample.length / 4);
