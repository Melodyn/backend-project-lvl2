import _ from 'lodash';
import types from '../types.js';

const labels = { deleted: '-', added: '+', consist: ' ' };

// like JSON.stringify(object, null, 2), but without quotes
const stringify = (sourceObject, replacer, startLineOffset = 0, endLineOffset = 0) => {
  const openSymbol = '{';
  const closeSymbol = '}';
  const indentSymbol = replacer || ' ';

  const iter = (currentObject, openLineSymbol, closeLineSymbol, countOfIndents) => {
    const lines = _.entries(currentObject).flatMap(([key, value]) => {
      const openIndent = indentSymbol.repeat(countOfIndents);
      const closeIndent = indentSymbol.repeat(countOfIndents + endLineOffset);
      const preparedKey = openIndent + key;

      if (_.isObject(value)) {
        const openLine = `${preparedKey}: ${openSymbol}`;
        const closeLine = closeIndent + closeSymbol;
        const deepCountOfIndents = countOfIndents + startLineOffset + endLineOffset;

        return iter(value, openLine, closeLine, deepCountOfIndents);
      }

      return `${preparedKey}: ${value}`;
    });

    return [openLineSymbol, ...lines, closeLineSymbol];
  };

  const lines = iter(sourceObject, openSymbol, closeSymbol, startLineOffset);

  return lines.join('\n');
};

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
        return { ...acc, [`${labels.consist} ${key}`]: currentValue };
      default:
        throw new Error(`Unexpected type ${type}`);
    }
  },
  {});

export default (data) => stringify(formatStylish(data), null, 2, 2);
