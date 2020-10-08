import { readFile, getExtension } from './src/fileToolkit.js';
import toDiffTree from './src/toDiffTree.js';
import parse from './src/parsers.js';
import format from './src/formatters/index.js';

export default (filepath1, filepath2, outputFormat = 'stylish') => {
  const data1 = parse(readFile(filepath1), getExtension(filepath1));
  const data2 = parse(readFile(filepath2), getExtension(filepath2));

  const diffTree = toDiffTree(data1, data2);
  return format(diffTree, outputFormat);
};
