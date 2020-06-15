import _ from 'lodash';
import types from '../types.js';

const processValue = (value) => (_.isObject(value) ? '[complex value]' : value);
const processKey = (prefix, key) => (_.isEmpty(prefix) ? key : `${prefix}.${key}`);

const formatPlain = (diffTree) => {
  const iter = (tree, parentName) => tree
    .flatMap((node) => {
      const {
        type, key, previousValue, currentValue, children,
      } = node;
      const processedPrevValue = processValue(previousValue);
      const processedCurrValue = processValue(currentValue);
      const processedKey = processKey(parentName, key);

      switch (type) {
        case types.deleted:
          return `Property '${processedKey}' was deleted`;
        case types.added:
          return `Property '${processedKey}' was added with value: ${processedCurrValue}`;
        case types.changed:
          return `Property '${processedKey}' was changed from ${processedPrevValue} to ${processedCurrValue}`;
        case types.nested:
          return iter(children, processedKey);
        case types.consist:
          return null;
        default:
          throw new Error(`Unexpected type ${type}`);
      }
    });

  const strings = iter(diffTree, '');

  return strings.filter(_.identity);
};

export default (data) => formatPlain(data).join('\n');
