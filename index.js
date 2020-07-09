import { readFile, getExtension } from './src/filesToolkit.js';
import toDiffTree from './src/toDiffTree.js';
import parse from './src/parsers.js';
import format from './src/formatters/index.js';

export default (filepathBefore, filepathAfter, outputFormat) => {
  const dataBefore = parse(readFile(filepathBefore), getExtension(filepathBefore));
  const dataAfter = parse(readFile(filepathAfter), getExtension(filepathAfter));

  const diffTree = toDiffTree(dataBefore, dataAfter);
  return format(outputFormat, diffTree);
};
