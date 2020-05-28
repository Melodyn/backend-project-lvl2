import gendiff from '../src/index.js';

const expected = {
  flat: {
    '  host': 'hexlet.io',
    '+ timeout': 20,
    '- timeout': 50,
    '- proxy': '123.234.53.22',
    '+ verbose': true,
    '- follow': false,
  },
  nested: {
    '  common': {
      '+ follow': false,
      '  setting1': 'Value 1',
      '- setting2': 200,
      '- setting3': true,
      '+ setting3': { key: 'value' },
      '  setting6': {
        '  key': 'value',
        '+ ops': 'vops',
      },
      '+ setting4': 'blah blah',
      '+ setting5': { key5: 'value5' },
    },
    '  group1': {
      '+ baz': 'bars',
      '- baz': 'bas',
      '  foo': 'bar',
      '- nest': { key: 'value' },
      '+ nest': 'str',
    },
    '- group2': { abc: 12345 },
    '+ group3': { fee: 100500 },
  },
};

test.each([
  ['flat', 'json'],
  ['flat', 'yml'],
  ['flat', 'ini'],
  ['nested', 'json'],
])('compare %s .%s-files', (format, extension) => {
  const actual = gendiff(
    `__fixtures__/${format}/before.${extension}`,
    `__fixtures__/${format}/after.${extension}`,
    'json',
  );
  expect(actual).toMatchObject(expected[format]);
});
