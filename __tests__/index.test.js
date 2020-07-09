import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import gendiff from '../index.js';

/* eslint-disable no-underscore-dangle */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.resolve(__dirname, '..', '__fixtures__', filename);
const readFile = (pathToFile) => fs.readFileSync(getFixturePath(pathToFile), 'utf-8');

const outputFormats = ['stylish', 'plain', 'json'];
const extensions = ['yml', 'ini', 'json'];
const expectedOutputByFormat = {};

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
