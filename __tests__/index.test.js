import gendiff from '../src/index.js';

const expected = {
  '  host': 'hexlet.io',
  '+ timeout': 20,
  '- timeout': 50,
  '- proxy': '123.234.53.22',
  '+ verbose': true,
  '- follow': false,
};

test.each([
  ['json'],
  ['yml'],
  ['ini'],
])('compare .%s-files', (format) => {
  const actual = gendiff(`__fixtures__/before.${format}`, `__fixtures__/after.${format}`);
  expect(actual).toMatchObject(expected);
});
