import types from '../types.js';

const labels = { deleted: '-', added: '+', consist: ' ' };

const formatStylish = (diffTree) => diffTree
  .reduce((acc, node) => {
    const {
      type, key, previousValue, currentValue, children,
    } = node;

    switch (type) {
      case types.deleted:
        return { ...acc, [`${labels.deleted} ${key}`]: previousValue };
      case types.added:
        return { ...acc, [`${labels.added} ${key}`]: currentValue };
      case types.changed:
        return {
          ...acc,
          [`${labels.deleted} ${key}`]: previousValue,
          [`${labels.added} ${key}`]: currentValue,
        };
      case types.nested:
        return { ...acc, [`${labels.consist} ${key}`]: formatStylish(children) };
      case types.consist:
      default:
        return { ...acc, [`${labels.consist} ${key}`]: currentValue };
    }
  },
  {});

export default (data) => JSON.stringify(formatStylish(data), null, 2);
