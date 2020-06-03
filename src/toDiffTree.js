import _ from 'lodash';
import { states, types } from './enums.js';

export const checkIsNested = (previousValue, currentValue) => (
  _.isObjectLike(previousValue)
  && _.isObjectLike(currentValue)
);

const deriveState = (previousValue, currentValue) => {
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

const toDiffTree = (before, after) => _.union(_.keys(before), _.keys(after))
  .map((key) => {
    const previousValue = before[key];
    const currentValue = after[key];
    const state = deriveState(previousValue, currentValue);
    const isNested = checkIsNested(previousValue, currentValue);
    const value = isNested
      ? {
        children: toDiffTree(previousValue, currentValue),
      }
      : { previousValue, currentValue };

    return {
      type: (isNested ? types.nested : types.flat),
      state,
      key,
      ...value,
    };
  });

export default toDiffTree;
