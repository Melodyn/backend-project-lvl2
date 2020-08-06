import _ from 'lodash';
import types from './types.js';

const toDiffTree = (data1, data2) => _.union(_.keys(data1), _.keys(data2))
  .sort()
  .map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];

    if (!_.has(data1, key)) {
      return {
        type: types.added,
        key,
        value2,
      };
    }

    if (!_.has(data2, key)) {
      return {
        type: types.deleted,
        key,
        value1,
      };
    }

    if (_.isObject(value1) && _.isObject(value2)) {
      return {
        type: types.nested,
        key,
        children: toDiffTree(value1, value2),
      };
    }

    if (value1 !== value2) {
      return {
        type: types.changed,
        key,
        value1,
        value2,
      };
    }

    return {
      type: types.unchanged,
      key,
      value2,
    };
  });

export default toDiffTree;
