import program from 'commander';

export default () => {
  program.version('0.0.1')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'output format')
    .arguments('<filepath1> <filepath2>')
    .action((filepath1, filepath2) => {
      console.log(`format: ${program.format}, f1: ${filepath2}, f2: ${filepath2}`);
    })
    .parse(process.argv);
};
