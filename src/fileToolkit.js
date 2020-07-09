import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

export const getExtension = (filepath) => path.extname(filepath).substring(1);
export const buildPath = (...paths) => path.resolve(__dirname, '..', ...paths);
export const readFile = (...paths) => fs.readFileSync(buildPath(...paths), 'utf-8');
