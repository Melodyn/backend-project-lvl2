import { buildPath, readFile } from '../src/filesToolkit.js';
import gendiff from '../index.js';

const outputFormats = ['stylish', 'plain', 'json'];
const extensions = ['yml', 'ini', 'json'];
const expectedOutputByFormat = {};

const getFixturePath = (filename) => buildPath('__fixtures__', filename);
const combinations = extensions.flatMap(
  (extension) => outputFormats.map((format) => [extension, format]),
);

beforeAll(() => {
  outputFormats.forEach(
    (format) => {
      const content = readFile(getFixturePath(`expected_${format}.txt`));
      expectedOutputByFormat[format] = content.trim();
    },
  );
});

test.each(combinations)('diff .%s-file formatted as %s', (extension, outputFormat) => {
  const beforePath = getFixturePath(`before.${extension}`);
  const afterPath = getFixturePath(`after.${extension}`);

  const actual = gendiff(beforePath, afterPath, outputFormat);
  const expected = expectedOutputByFormat[outputFormat];
  expect(actual).toEqual(expected);
});

test('relative & full path', () => {});
