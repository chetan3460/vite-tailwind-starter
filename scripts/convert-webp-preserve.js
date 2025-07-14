import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';
import fg from 'fast-glob';
import path from 'path';
import fs from 'fs-extra';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const inputDir = path.resolve(__dirname, '../public/images');

const run = async () => {
  const imageFiles = await fg(['**/*.{jpg,jpeg,png}'], {
    cwd: inputDir,
    onlyFiles: true,
  });

  console.log(`🧪 Converting ${imageFiles.length} image(s) to WebP...`);

  await Promise.all(
    imageFiles.map(async file => {
      const src = path.join(inputDir, file);
      const dest = path.join(
        inputDir,
        file.replace(/\.(jpe?g|png)$/i, '.webp')
      );
      const buffer = await fs.readFile(src);
      const webp = await imagemin.buffer(buffer, {
        plugins: [imageminWebp({ quality: 75 })],
      });
      await fs.outputFile(dest, webp);
      console.log(`✅ ${file} → ${path.relative(inputDir, dest)}`);
    })
  );

  console.log('🎉 Done. WebP images generated alongside originals.');
};

run().catch(err => {
  console.error('❌ WebP conversion failed:', err);
});
