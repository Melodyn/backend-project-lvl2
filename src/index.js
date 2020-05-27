import fs from 'fs';
import path from 'path';
import comparator from './comparator.js';
import parsers from './parsers.js';

export default (filepathBefore, filepathAfter) => {
  const format = path.extname(filepathBefore).substring(1);
  const parser = parsers(format);

  const [dataBefore, dataAfter] = [filepathBefore, filepathAfter]
    .map((filepath) => path.resolve(filepath))
    .map((fullPath) => fs.readFileSync(fullPath, { encoding: 'utf8' }))
    .map(parser);

  return comparator(dataBefore, dataAfter);
};
