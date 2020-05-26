import { before, after, expected } from '../__fixtures__/comparator.js';
import comparator from '../src/comparator.js';

test('compare', () => {
  const actual = comparator(before, after);
  expect(actual).toMatchObject(expected);
});
