import _ from 'lodash';
import types from '../types.js';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return value;
};
const processKey = (prefix, key) => (_.isEmpty(prefix) ? key : `${prefix}.${key}`);

const formatPlain = (diffTree) => {
  const iter = (tree, parentName) => tree
    .flatMap((node) => {
      const {
        type, key, value1, value2, children,
      } = node;
      const processedValue1 = stringify(value1);
      const processedValue2 = stringify(value2);
      const processedKey = processKey(parentName, key);

      switch (type) {
        case types.deleted:
          return `Property '${processedKey}' was removed`;
        case types.added:
          return `Property '${processedKey}' was added with value: ${processedValue2}`;
        case types.changed:
          return `Property '${processedKey}' was updated. From ${processedValue1} to ${processedValue2}`;
        case types.nested:
          return iter(children, processedKey);
        case types.unchanged:
          return null;
        default:
          throw new Error(`Unexpected node type ${type}`);
      }
    });

  const strings = iter(diffTree, '');

  return strings.filter(_.identity);
};

export default (data) => formatPlain(data).join('\n');
