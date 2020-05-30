import path from 'path';
import gendiff from '../src/index.js';
import * as nested from '../__fixtures__/nested/expected.js';
import * as flat from '../__fixtures__/flat/expected.js';

const buildPath = (format, extension, fixturesBasePath = '__fixtures__') => [
  path.resolve(`${fixturesBasePath}/${format}/before.${extension}`),
  path.resolve(`${fixturesBasePath}/${format}/after.${extension}`),
];

const expected = {
  flat,
  nested,
};

test.each([
  ['flat', 'yml', 'stylish'],
  ['flat', 'ini', 'stylish'],
  ['flat', 'json', 'stylish'],
  ['flat', 'json', 'plain'],
  ['flat', 'json', 'json'],
  ['nested', 'json', 'stylish'],
  ['nested', 'json', 'plain'],
  ['nested', 'json', 'json'],
])('diff %s .%s-files formatted as %s', (format, extension, formatter) => {
  const [beforePath, afterPath] = buildPath(format, extension);
  const actual = gendiff(beforePath, afterPath, formatter);
  expect(actual).toMatchObject(expected[format][formatter]);
});
