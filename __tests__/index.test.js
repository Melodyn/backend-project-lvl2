import gendiff from '../src/index.js';
import * as nested from '../__fixtures__/nested/expected.js';
import * as flat from '../__fixtures__/flat/expected.js';

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
  const actual = gendiff(
    `__fixtures__/${format}/before.${extension}`,
    `__fixtures__/${format}/after.${extension}`,
    formatter,
  );
  expect(actual).toMatchObject(expected[format][formatter]);
});
