import _ from 'lodash';
import { checkIsNested } from './helpers.js';

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

const toDiffTree = (before, after, states, types) => _.union(_.keys(before), _.keys(after))
  .map((key) => {
    const previousValue = before[key];
    const currentValue = after[key];
    const state = deriveState(previousValue, currentValue, states);
    const isNested = checkIsNested(previousValue, currentValue);
    const value = isNested
      ? {
        children: toDiffTree(previousValue, currentValue, states, types),
      }
      : { previousValue, currentValue };

    return {
      key,
      state,
      type: isNested ? types.nested : types.flat,
      ...value,
    };
  });

export default toDiffTree;
