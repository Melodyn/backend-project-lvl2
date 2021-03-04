import { readFile, buildPath } from '../src/fileToolkit.js';
import gendiff from '../index.js';

const getFixturePath = (filename) => buildPath(['__fixtures__', filename]);

const outputFormats = ['stylish', 'plain', 'json'];
const extensions = ['yml', 'ini', 'json'];
const expectedOutputByFormat = {};

const combinations = extensions.flatMap(
  (extension) => outputFormats.map((format) => [extension, format]),
);

beforeAll(() => {
  outputFormats.forEach(
    (format) => {
      const content = readFile([getFixturePath(`expected_${format}.txt`)]);
      // eslint-disable-next-line
      expectedOutputByFormat[format] = content.trim();
    },
  );
});

test.each(combinations)('diff .%s-file formatted as %s', (extension, outputFormat) => {
  const filepath1 = getFixturePath(`file1.${extension}`);
  const filepath2 = getFixturePath(`file2.${extension}`);

  const actual = gendiff(filepath1, filepath2, outputFormat);
  const expected = expectedOutputByFormat[outputFormat];
  expect(actual).toEqual(expected);
});
