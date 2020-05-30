import fs from 'fs';
import path from 'path';
import comparator from './comparator.js';
import parsers from './parsers.js';
import formatters from './formatters/index.js';

const states = {
  added: 'added',
  deleted: 'deleted',
  changed: 'changed',
  consist: 'consist',
};

export default (filepathBefore, filepathAfter, outputFormat) => {
  const extension = path.extname(filepathBefore).substring(1);
  const parser = parsers(extension);
  const formatter = formatters(outputFormat, states);

  const [dataBefore, dataAfter] = [filepathBefore, filepathAfter]
    .map((filepath) => path.resolve(filepath))
    .map((fullPath) => fs.readFileSync(fullPath, { encoding: 'utf8' }))
    .map(parser);

  const diff = comparator(dataBefore, dataAfter, states);
  return formatter(diff);
};
