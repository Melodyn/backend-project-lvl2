import program from 'commander';
import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import comparator from './comparator.js';

const stringify = (obj) => [
  '{',
  ...(_.entries(obj).map(([key, value]) => `  ${key}: ${value}`)),
  '}',
].join('\n');

export default () => {
  program.version('0.0.1')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'output format')
    .arguments('<filepath1> <filepath2>')
    .action((filepath1, filepath2) => {
      const data1 = fs.readFileSync(path.resolve(filepath1), { encoding: 'utf8' });
      const data2 = fs.readFileSync(path.resolve(filepath2), { encoding: 'utf8' });
      const compareResult = comparator(JSON.parse(data1), JSON.parse(data2));
      const outputString = stringify(compareResult);
      console.log(outputString);
    })
    .parse(process.argv);
};
