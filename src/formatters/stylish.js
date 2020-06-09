import _ from 'lodash';
import types from '../types.js';

const labels = { deleted: '-', added: '+', consist: ' ' };

const stringify = (sourceObject, indentSymbol = ' ', indentCount = 2) => {
  const openingSymbol = '{';
  const closingSymbol = '}';

  const iter = (linesAcc, currentObject, countOfIndents) => {
    const indent = indentSymbol.repeat(countOfIndents);
    const lines = _.entries(currentObject).flatMap(([key, value]) => {
      const prefixedKey = indent + key;
      // console.log({ key, indent, countOfIndents });
      if (_.isObject(value)) {
        const processedValues = iter([], value, countOfIndents + indentCount);
        const openLine = `${prefixedKey}: ${openingSymbol}`;
        const closeLine = indent + closingSymbol;
        return [openLine, ...processedValues, closeLine];
      }
      return `${prefixedKey}: ${value}`;
    });

    return lines;
  };

  const middleLines = iter([], sourceObject, indentCount);
  const finalLines = [openingSymbol, ...middleLines, closingSymbol];

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

export default (data) => stringify(formatStylish(data));
