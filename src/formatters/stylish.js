import _ from 'lodash';
import types from '../types.js';

const labels = { deleted: '-', added: '+', consist: ' ' };

// // like JSON.stringify(object, null, 2), but without quotes
// const stringify = (sourceObject, replacer, startLineOffset = 0, endLineOffset = 0) => {
//   const openSymbol = '{';
//   const closeSymbol = '}';
//   const indentSymbol = replacer || ' ';
//
//   const iter = (currentObject, openLineSymbol, closeLineSymbol, countOfIndents) => {
//     const lines = _.entries(currentObject).flatMap(([key, value]) => {
//       const openIndent = indentSymbol.repeat(countOfIndents);
//       const closeIndent = indentSymbol.repeat(countOfIndents + endLineOffset);
//       const preparedKey = openIndent + key;
//
//       if (_.isObject(value)) {
//         const openLine = `${preparedKey}: ${openSymbol}`;
//         const closeLine = closeIndent + closeSymbol;
//         const deepCountOfIndents = countOfIndents + startLineOffset + endLineOffset;
//
//         return iter(value, openLine, closeLine, deepCountOfIndents);
//       }
//
//       return `${preparedKey}: ${value}`;
//     });
//
//     return [openLineSymbol, ...lines, closeLineSymbol];
//   };
//
//   const lines = iter(sourceObject, openSymbol, closeSymbol, startLineOffset);
//
//   return lines.join('\n');
// };

const indentSymbol = '  ';
const openSymbol = '{';
const closeSymbol = '}';

const stringify = (data, depth) => {
  if (!_.isObject(data)) {
    return data;
  }
  const indent = indentSymbol.repeat(depth);
};

const formatStylish = (diffTree) => {
  const iter = (tree, depth) => tree.flatMap((node) => {
    const {
      type, key, previousValue, currentValue, children,
    } = node;
    const indent = indentSymbol.repeat(depth);
    const processedPrevValue = stringify(previousValue);
    const processedCurrValue = stringify(currentValue);

    switch (type) {
      case types.deleted:
        return `${indent}${labels.deleted} ${key}: ${processedPrevValue}`;
      case types.added:
        return `${indent}${labels.added} ${key}: ${processedCurrValue}`;
      case types.changed:
        return [
          `${indent}${labels.added} ${key}: ${processedCurrValue}`,
          `${indent}${labels.deleted} ${key}: ${processedPrevValue}`,
        ].join('\n');
      case types.nested:
        return `${indent}${labels.consist} ${key}: ${iter(children, depth + 1)}`;
      case types.consist:
        return `${indent}${labels.consist} ${key}: ${processedCurrValue}`;
      default:
        throw new Error(`Unexpected type ${type}`);
    }
  });

  return iter(diffTree, 1);
};

export default (data) => formatStylish(data).join('\n');
