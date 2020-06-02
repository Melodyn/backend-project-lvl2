import fs from 'fs';
import path from 'path';
import toDiffTree from './toDiffTree.js';
import parser from './parsers.js';
import formatter from './formatters/index.js';

const states = {
  added: 'added',
  deleted: 'deleted',
  changed: 'changed',
  consist: 'consist',
};

const types = {
  flat: 'flat',
  nested: 'nested',
};

const getFullPath = (filepath) => path.resolve(filepath);
const getExtension = (filepath) => path.extname(filepath).substring(1);
const readFile = (filepath) => fs.readFileSync(getFullPath(filepath), 'utf8');

export default (filepathBefore, filepathAfter, outputFormat, shouldBeString = false) => {
  const [dataBefore, dataAfter] = [filepathBefore, filepathAfter]
    .map((filepath) => parser(readFile(filepath), getExtension(filepath)));

  const diffTree = toDiffTree(dataBefore, dataAfter, states, types);
  return formatter(outputFormat, diffTree, shouldBeString, states, types);
};
