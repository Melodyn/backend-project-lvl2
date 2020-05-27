import fs from 'fs';
import path from 'path';
import comparator from './comparator.js';
import parsers from './parsers.js';

export default (filepath1, filepath2) => {
  const format = path.extname(filepath1).substring(1);
  const parser = parsers(format);

  const [data1, data2] = [filepath1, filepath2]
    .map((filepath) => path.resolve(filepath))
    .map((fullPath) => fs.readFileSync(fullPath, { encoding: 'utf8' }))
    .map(parser);

  return comparator(data1, data2);
};
