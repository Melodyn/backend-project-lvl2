import { states, types } from '../enums.js';

const labels = { deleted: '-', added: '+', consist: ' ' };

const stylish = (diffTree) => diffTree
  .reduce((acc, node) => {
    const {
      type, state, key, previousValue, currentValue, children,
    } = node;

    switch (state) {
      case states.deleted:
        return { ...acc, [`${labels.deleted} ${key}`]: previousValue };
      case states.added:
        return { ...acc, [`${labels.added} ${key}`]: currentValue };
      case states.changed: {
        if (type === types.nested) {
          return { ...acc, [`${labels.consist} ${key}`]: stylish(children) };
        }
        return {
          ...acc,
          [`${labels.deleted} ${key}`]: previousValue,
          [`${labels.added} ${key}`]: currentValue,
        };
      }
      default:
        return { ...acc, [`${labels.consist} ${key}`]: currentValue };
    }
  },
  {});

export default (data) => JSON.stringify(stylish(data), null, 2);
