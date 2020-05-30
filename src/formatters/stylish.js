import _ from 'lodash';
import { isNested } from '../helpers.js';

const stylish = (data, states) => {
  const labels = { deleted: '-', added: '+', consist: ' ' };
  return _.entries(data).reduce((acc, [key, value]) => {
    const { state, previousValue, currentValue } = value;
    switch (state) {
      case states.deleted:
        return { ...acc, [`${labels.deleted} ${key}`]: previousValue };
      case states.added:
        return { ...acc, [`${labels.added} ${key}`]: currentValue };
      case states.changed: {
        if (isNested(previousValue, currentValue)) {
          return { ...acc, [`${labels.consist} ${key}`]: stylish(currentValue, states) };
        }
        return {
          ...acc,
          [`${labels.deleted} ${key}`]: previousValue,
          [`${labels.added} ${key}`]: currentValue,
        };
      }
      default:
        return { ...acc, [`${labels.consist} ${key}`]: currentValue };
    }
  }, {});
};

export default (data, states, shouldBeString) => {
  const formatted = stylish(data, states);
  return shouldBeString ? JSON.stringify(formatted, null, 2) : formatted;
};
