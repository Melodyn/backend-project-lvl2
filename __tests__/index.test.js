import gendiff from '../src/index.js';

const expected = {
  '  host': 'hexlet.io',
  '+ timeout': 20,
  '- timeout': 50,
  '- proxy': '123.234.53.22',
  '+ verbose': true,
  '- follow': false,
};

test('compare', () => {
  const actualJSON = gendiff('__fixtures__/before.json', '__fixtures__/after.json');
  expect(actualJSON).toMatchObject(expected);

  const actualYML = gendiff('__fixtures__/before.yml', '__fixtures__/after.yml');
  expect(actualYML).toMatchObject(expected);
});
