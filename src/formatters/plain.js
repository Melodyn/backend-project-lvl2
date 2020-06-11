import _ from 'lodash';
import types from '../types.js';

const processValue = (value) => (_.isObject(value) ? '[complex value]' : value);

const formatPlain = (diffTree) => diffTree
  .flatMap((node) => {
    const {
      type, key, previousValue, currentValue, children,
    } = node;
    const processedPrevValue = processValue(previousValue);
    const processedCurrValue = processValue(currentValue);

    switch (type) {
      case types.deleted:
        return `Property '${key}' was deleted`;
      case types.added:
        return `Property '${key}' was added with value: ${processedCurrValue}`;
      case types.changed:
        return `Property '${key}' was changed from ${processedPrevValue} to ${processedCurrValue}`;
      case types.nested:
        return formatPlain(children.map(
          ({ key: childKey, ...other }) => ({ key: `${key}.${childKey}`, ...other }),
        ));
      case types.consist:
        return '';
      default:
        throw new Error(`Unexpected type ${type}`);
    }
  })
  .filter(_.identity);

export default (data) => formatPlain(data).join('\n');
