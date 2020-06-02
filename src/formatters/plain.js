import _ from 'lodash';

const processValue = (value) => (_.isObject(value) ? '[complex value]' : value);

const plain = (diffTree, states, types) => diffTree
  .map((node) => {
    const {
      state, type, key, previousValue, currentValue, children,
    } = node;
    const processedPrevValue = processValue(previousValue);
    const processedCurrValue = processValue(currentValue);

    switch (state) {
      case states.deleted:
        return `Property '${key}' was deleted`;
      case states.added:
        return `Property '${key}' was added with value: ${processedCurrValue}`;
      case states.changed: {
        if (type === types.flat) {
          return `Property '${key}' was changed from ${processedPrevValue} to ${processedCurrValue}`;
        }
        const processedChildren = children.map(
          ({ key: childKey, ...other }) => ({ key: `${key}.${childKey}`, ...other }),
        );
        return plain(processedChildren, states, types);
      }
      default:
        return '';
    }
  })
  .flat()
  .filter(_.identity);

export default (data, shouldBeString, states, types) => {
  const formatted = plain(data, states, types);
  return shouldBeString ? formatted.join('\n') : formatted;
};
