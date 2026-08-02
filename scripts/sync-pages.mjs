#!/usr/bin/env node
/**
 * Sync production single-file build into docs/ for GitHub Pages
 * (Deploy from a branch → /docs).
 *
 * Usage: node scripts/sync-pages.mjs
 * Or:    npm run pages:sync
 */
import { copyFileSync, existsSync, mkdirSync, writeFileSync, readFileSync, cpSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const distHtml = join(root, "dist", "index.html");
const docsDir = join(root, "docs");
const docsHtml = join(docsDir, "index.html");
const publicDir = join(root, "public");

if (!existsSync(distHtml)) {
  console.error("Missing dist/index.html. Run `npm run build` first.");
  process.exit(1);
}

mkdirSync(docsDir, { recursive: true });
copyFileSync(distHtml, docsHtml);

// Jekyll must not process the artifact (underscore folders, etc.)
writeFileSync(join(docsDir, ".nojekyll"), "");

// SPA / deep-link fallback: same single-file app
copyFileSync(distHtml, join(docsDir, "404.html"));

// Static public assets that Vite copies into dist/ (if any)
// Keep catalog photography with the Pages artifact too; product cards use these paths.
const productsFromDist = join(root, "dist", "products");
if (existsSync(productsFromDist)) {
  cpSync(productsFromDist, join(docsDir, "products"), { recursive: true });
}
const staticAssets = ["og-cover.svg", "robots.txt", "sitemap.xml", "favicon.svg"];
for (const name of staticAssets) {
  const from = join(publicDir, name);
  if (existsSync(from)) {
    copyFileSync(from, join(docsDir, name));
  }
  const fromDist = join(root, "dist", name);
  if (existsSync(fromDist)) {
    copyFileSync(fromDist, join(docsDir, name));
  }
}

const sizeKb = (readFileSync(docsHtml).byteLength / 1024).toFixed(1);
console.log(`Synced docs/index.html (${sizeKb} KB), docs/404.html, .nojekyll`);
