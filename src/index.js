import fs from 'fs';
import path from 'path';
import comparator from './comparator.js';
import parser from './parsers.js';
import formatter from './formatters/index.js';

const states = {
  added: 'added',
  deleted: 'deleted',
  changed: 'changed',
  consist: 'consist',
};

const getFullPath = (filepath) => path.resolve(process.cwd(), filepath);
const getExtension = (filepath) => path.extname(filepath).substring(1);
const readFile = (filepath) => fs.readFileSync(getFullPath(filepath), 'utf8');

export default (filepathBefore, filepathAfter, outputFormat, shouldBeString = false) => {
  const [dataBefore, dataAfter] = [filepathBefore, filepathAfter]
    .map((filepath) => parser(readFile(filepath), getExtension(filepath)));

  const diff = comparator(dataBefore, dataAfter, states);
  return formatter(outputFormat, diff, shouldBeString, states);
};
