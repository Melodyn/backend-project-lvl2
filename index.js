import fs from 'fs';
import path from 'path';
import toDiffTree from './src/toDiffTree.js';
import parse from './src/parsers.js';
import format from './src/formatters/index.js';

export const getExtension = (filepath) => path.extname(filepath).substring(1);
export const readFile = (pathToFile) => fs.readFileSync(path.resolve(pathToFile), 'utf8');

export default (filepathBefore, filepathAfter, outputFormat) => {
  const dataBefore = parse(readFile(filepathBefore), getExtension(filepathBefore));
  const dataAfter = parse(readFile(filepathAfter), getExtension(filepathAfter));

  const diffTree = toDiffTree(dataBefore, dataAfter);
  return format(outputFormat, diffTree);
};
