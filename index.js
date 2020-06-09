import fs from 'fs';
import path from 'path';
import toDiffTree from './src/toDiffTree.js';
import parse from './src/parsers.js';
import format from './src/formatters';

const getFullPath = (filepath) => path.resolve(filepath);
const getExtension = (filepath) => path.extname(filepath).substring(1);
const readFile = (filepath) => fs.readFileSync(getFullPath(filepath), 'utf8');

export default (filepathBefore, filepathAfter, outputFormat) => {
  const dataBefore = parse(readFile(filepathBefore), getExtension(filepathBefore));
  const dataAfter = parse(readFile(filepathAfter), getExtension(filepathAfter));

  const diffTree = toDiffTree(dataBefore, dataAfter);
  return format(outputFormat, diffTree);
};
