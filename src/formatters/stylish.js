import _ from 'lodash';
import types from '../types.js';

const labels = { deleted: '-', added: '+', consist: ' ' };

// like JSON.stringify(object, null, 2), but without quotes
const stringify = (sourceObject, replacer, startLineOffset = 0, endLineOffset = 0) => {
  const openSymbol = '{';
  const closeSymbol = '}';
  const indentSymbol = replacer || ' ';
  const linesInitAcc = [];

  const iter = (linesAcc, currentObject, countOfIndents) => {
    const openIndent = indentSymbol.repeat(countOfIndents);
    const closeIndent = indentSymbol.repeat(countOfIndents + endLineOffset);

    const lines = _.entries(currentObject).flatMap(([key, value]) => {
      const preparedKey = openIndent + key;

      if (_.isObject(value)) {
        const deepCountOfIndents = countOfIndents + startLineOffset + endLineOffset;
        const processedValues = iter(linesInitAcc, value, deepCountOfIndents);
        const openLine = `${preparedKey}: ${openSymbol}`;
        const closeLine = closeIndent + closeSymbol;

        return [openLine, ...processedValues, closeLine];
      }

      return `${preparedKey}: ${value}`;
    });

    return lines;
  };

  const middleLines = iter(linesInitAcc, sourceObject, startLineOffset);
  const finalLines = [openSymbol, ...middleLines, closeSymbol];

  return finalLines.join('\n');
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
      default:
        return { ...acc, [`${labels.consist} ${key}`]: currentValue };
    }
  },
  {});

export default (data) => stringify(formatStylish(data), null, 2, 2);
