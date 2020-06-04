import path from 'path';
import gendiff from '../index.js';
import * as nested from '../__fixtures__/nested/expected.js';
import * as flat from '../__fixtures__/flat/expected.js';

const expected = {
  flat,
  nested,
};

const buildPath = (format, extension, fixturesBasePath = '__fixtures__') => [
  path.resolve(`${fixturesBasePath}/${format}/before.${extension}`),
  path.resolve(`${fixturesBasePath}/${format}/after.${extension}`),
];

const formatters = ['stylish', 'plain', 'json'];
const extensions = ['yml', 'ini', 'json'];
const types = ['flat', 'nested'];

const combinations = types
  .map((type) => extensions.map(
    (extension) => formatters.map(
      (format) => [type, extension, format],
    ),
  )
    .flat())
  .flat();

test.each(combinations)('diff %s .%s-files formatted as %s', (format, extension, formatter) => {
  const [beforePath, afterPath] = buildPath(format, extension);
  const actual = gendiff(beforePath, afterPath, formatter);
  expect(actual).toMatchObject(expected[format][formatter]);
});
