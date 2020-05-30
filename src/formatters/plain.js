import _ from 'lodash';
import { isNested } from '../helpers.js';

const processValue = (value) => ((typeof value === 'object') ? '[complex value]' : value);

const plain = (data, states) => _.entries(data)
  .reduce((acc, [key, value]) => {
    const { state, previousValue, currentValue } = value;
    const processedPrevValue = processValue(previousValue);
    const processedCurrValue = processValue(currentValue);

    switch (state) {
      case states.deleted:
        return acc.concat(`Property '${key}' was deleted`);
      case states.added:
        return acc.concat(`Property '${key}' was added with value: ${processedCurrValue}`);
      case states.changed: {
        if (isNested(previousValue, currentValue)) {
          const processedNestedValues = _.entries(currentValue).map(
            ([nestedKey, nestedValue]) => plain({ [`${key}.${nestedKey}`]: nestedValue }, states),
          );
          return acc.concat(...processedNestedValues);
        }
        return acc.concat(`Property '${key}' was changed from ${processedPrevValue} to ${processedCurrValue}`);
      }
      default:
        return acc;
    }
  }, [])
  .filter(_.identity);

export default (data, states, shouldBeString) => {
  const formatted = plain(data, states);
  return shouldBeString ? formatted.join('\n') : formatted;
};
