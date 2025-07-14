// scripts/cleanup-webp-temp.js
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const webpTempDir = path.resolve(__dirname, '../.webp-dist');

const run = async () => {
  await fs.remove(webpTempDir);
  console.log('🧹 Cleaned up .webp-dist');
};

run().catch(console.error);
