import path from 'path';
import fs from 'fs';
import gendiff from '../index.js';

const getFixturePath = (filename) => path.join('__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf8');

const outputFormats = ['stylish', 'plain', 'json'];
const extensions = ['yml', 'ini', 'json'];
const expectedOutputByFormat = {};

const combinations = extensions.flatMap(
  (extension) => outputFormats.map((format) => [extension, format]),
);

beforeAll(() => {
  outputFormats.forEach(
    (format) => {
      const content = readFile(`expected_${format}.txt`);
      expectedOutputByFormat[format] = content.trim();
    },
  );
});

test.each(combinations)('diff .%s-file formatted as %s', (extension, outputFormat) => {
  const beforePath = getFixturePath(`befre.${extension}`);
  const afterPath = getFixturePath(`after.${extension}`);

  const actual = gendiff(beforePath, afterPath, outputFormat);
  const expected = expectedOutputByFormat[outputFormat];
  expect(actual).toEqual(expected);
});
