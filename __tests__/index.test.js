import path from 'path';
import fs from 'fs';
import gendiff from '../index.js';

const buildFixturePath = (filename, fixturesBasePath = '__fixtures__') => path.resolve(
  path.join(fixturesBasePath, filename),
);

const outputFormats = ['stylish', 'plain', 'json'];
const extensions = ['yml', 'ini', 'json'];
const expectedOutputByFormat = {};

const combinations = extensions.flatMap(
  (extension) => outputFormats.map((format) => [extension, format]),
);

beforeAll(() => {
  outputFormats.forEach(
    (format) => {
      const content = fs.readFileSync(
        buildFixturePath(`expected_${format}.txt`),
        'utf8',
      );
      expectedOutputByFormat[format] = content.trim();
    },
  );
});

test.each(combinations)('diff .%s-file formatted as %s', (extension, outputFormat) => {
  const beforePath = buildFixturePath(`before.${extension}`);
  const afterPath = buildFixturePath(`after.${extension}`);

  const actual = gendiff(beforePath, afterPath, outputFormat);
  const expected = expectedOutputByFormat[outputFormat];
  expect(actual).toEqual(expected);
});
