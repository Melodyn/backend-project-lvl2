import _ from 'lodash';
import types from './types.js';

const toDiffTree = (before, after) => _.union(_.keys(before), _.keys(after))
  .sort()
  .map((key) => {
    const previousValue = before[key];
    const currentValue = after[key];

    if (!_.has(before, key)) {
      return {
        type: types.added,
        key,
        currentValue,
      };
    }

    if (!_.has(after, key)) {
      return {
        type: types.deleted,
        key,
        previousValue,
      };
    }

    if (_.isObject(previousValue) && _.isObject(currentValue)) {
      return {
        type: types.nested,
        key,
        children: toDiffTree(previousValue, currentValue),
      };
    }

    if (previousValue !== currentValue) {
      return {
        type: types.changed,
        key,
        previousValue,
        currentValue,
      };
    }

    return {
      type: types.consist,
      key,
      currentValue,
    };
  });

export default toDiffTree;
