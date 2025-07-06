import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// For ESM modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageJson = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../package.json'), 'utf-8')
);

const versionData = {
  version: packageJson.version,
  date: new Date().toISOString(),
};

fs.writeFileSync(
  path.resolve(__dirname, '../public/version.json'),
  JSON.stringify(versionData, null, 2)
);

console.log('✅ version.json generated:', versionData);
