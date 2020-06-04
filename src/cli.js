import program from 'commander';
import gendiff from '../index.js';

export default () => {
  program.version('1.0.0')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'output format', 'stylish')
    .arguments('<filepathBefore> <filepathAfter>')
    .action((filepathBefore, filepathAfter) => {
      const diff = gendiff(filepathBefore, filepathAfter, program.format, true);
      console.log(diff);
    })
    .parse(process.argv);
};
