import fs from 'fs';
import path from 'path';
import toDiffTree from './src/toDiffTree.js';
import parser from './src/parsers.js';
import formatter from './src/formatters';

const getFullPath = (filepath) => path.resolve(filepath);
const getExtension = (filepath) => path.extname(filepath).substring(1);
const readFile = (filepath) => fs.readFileSync(getFullPath(filepath), 'utf8');

export default (filepathBefore, filepathAfter, outputFormat) => {
  const [dataBefore, dataAfter] = [filepathBefore, filepathAfter]
    .map((filepath) => parser(readFile(filepath), getExtension(filepath)));

  const diffTree = toDiffTree(dataBefore, dataAfter);
  return formatter(outputFormat, diffTree);
};
