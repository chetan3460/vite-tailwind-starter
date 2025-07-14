// scripts/generate-webp-dist.js
import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';
import fg from 'fast-glob';
import path from 'path';
import fs from 'fs-extra';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const inputDir = path.resolve(__dirname, '../public/images');
const outputDir = path.resolve(__dirname, '../.webp-dist/images');

const run = async () => {
  const files = await fg(['**/*.{png,jpg,jpeg}'], {
    cwd: inputDir,
    onlyFiles: true,
  });

  console.log(`🧪 Generating WebP to: ${outputDir}`);

  await Promise.all(
    files.map(async file => {
      const input = path.join(inputDir, file);
      const output = path.join(
        outputDir,
        file.replace(/\.(png|jpe?g)$/i, '.webp')
      );

      const buffer = await fs.readFile(input);
      const webp = await imagemin.buffer(buffer, {
        plugins: [imageminWebp({ quality: 75 })],
      });

      await fs.outputFile(output, webp);
      console.log(`✅ ${file} → WebP`);
    })
  );
};

run().catch(console.error);
