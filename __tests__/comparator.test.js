import comparator from '../src/comparator.js';

const before = {
  host: 'hexlet.io',
  timeout: 50,
  proxy: '123.234.53.22',
  follow: false,
};
const after = {
  timeout: 20,
  verbose: true,
  host: 'hexlet.io',
};
const expected = {
  '  host': 'hexlet.io',
  '+ timeout': 20,
  '- timeout': 50,
  '- proxy': '123.234.53.22',
  '+ verbose': true,
  '- follow': false,
};

test('compare', () => {
  const actual = comparator(before, after);
  expect(actual).toMatchObject(expected);
});
