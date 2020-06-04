import _ from 'lodash';
import { states, types } from '../enums.js';

const processValue = (value) => (_.isObjectLike(value) ? '[complex value]' : value);

const plain = (diffTree) => diffTree
  .map((node) => {
    const {
      type, state, key, previousValue, currentValue, children,
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
        return plain(processedChildren);
      }
      default:
        return '';
    }
  })
  .flat()
  .filter(_.identity);

export default (data) => plain(data).join('\n');
