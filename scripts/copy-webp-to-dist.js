// scripts/copy-webp-to-dist.js
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const src = path.resolve(__dirname, '../.webp-dist/images');
const dest = path.resolve(__dirname, '../dist/images');

const run = async () => {
  await fs.copy(src, dest, { overwrite: true });
  console.log('✅ Copied WebP images to dist/images');
};

run().catch(console.error);
