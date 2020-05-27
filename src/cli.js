import _ from 'lodash';
import program from 'commander';
import gendiff from './index.js';

const stringify = (obj) => [
  '{',
  ...(_.entries(obj).map(([key, value]) => `  ${key}: ${value}`)),
  '}',
].join('\n');

export default () => {
  program.version('1.0.0')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'output format')
    .arguments('<filepath1> <filepath2>')
    .action((filepath1, filepath2) => {
      const compareResult = gendiff(filepath1, filepath2);
      const outputString = stringify(compareResult);
      console.log(outputString);
    })
    .parse(process.argv);
};
