/**
 * One-off / maintenance: compress huge PNGs in public/images to WebP for web.
 * Run: node scripts/optimize-landscape-images.mjs
 */
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const imgDir = path.join(root, "public", "images");

const files = [
  "bike-landscape-1.png",
  "bike-landscape-2.png",
  "bike-landscape-3.png",
  "bike-landscape-4.png",
];

async function main() {
  for (const name of files) {
    const input = path.join(imgDir, name);
    const base = name.replace(/\.png$/i, "");
    const output = path.join(imgDir, `${base}.webp`);
    await sharp(input)
      .resize(1920, 1080, { fit: "inside", withoutEnlargement: true })
      .webp({ quality: 82, effort: 4 })
      .toFile(output);
    const [inSt, outSt] = await Promise.all([
      fs.stat(input),
      fs.stat(output),
    ]);
    console.log(
      `${base}: ${(inSt.size / 1e6).toFixed(2)} MB → ${(outSt.size / 1e3).toFixed(0)} KB (webp)`,
    );
    await fs.unlink(input);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
