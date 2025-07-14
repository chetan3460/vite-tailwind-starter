// scripts/cleanup-images.js
import fg from 'fast-glob';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distImagesDir = path.resolve(__dirname, '../dist/images');

const run = async () => {
  const filesToDelete = await fg(['**/*.{jpg,jpeg,png}'], {
    cwd: distImagesDir,
    absolute: true,
    onlyFiles: true,
  });

  await Promise.all(filesToDelete.map(file => fs.remove(file)));
  console.log('🗑️ Removed original images from dist/images');
};

run().catch(console.error);
