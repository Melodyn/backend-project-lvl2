import _ from 'lodash';
import { isNested } from './helpers.js';

const deriveState = (previousValue, currentValue, states) => {
  switch (true) {
    case (previousValue !== undefined && currentValue === undefined):
      return states.deleted;
    case (previousValue === undefined && currentValue !== undefined):
      return states.added;
    case (!_.isEqual(previousValue, currentValue)):
      return states.changed;
    default:
      return states.consist;
  }
};

const comparator = (before, after, states) => _.union(_.keys(before), _.keys(after))
  .reduce((acc, key) => {
    const previousValue = before[key];
    const currentValue = after[key];
    const state = deriveState(previousValue, currentValue, states);
    const processedCurrentValue = isNested(previousValue, currentValue)
      ? comparator(previousValue, currentValue, states)
      : currentValue;

    return {
      ...acc,
      [key]: {
        previousValue,
        currentValue: processedCurrentValue,
        state,
      },
    };
  },
  {});

export default comparator;
