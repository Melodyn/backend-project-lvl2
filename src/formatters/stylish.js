import _ from 'lodash';
import types from '../types.js';

const labels = { deleted: '-', added: '+', consist: ' ' };
const indentSymbol = '  ';
const deepKeyOffset = 2;
const openSymbol = '{';
const closeSymbol = '}';

const addPrefix = (symbol, indent, label = ' ') => `${indent}${label} ${symbol}`;

const stringify = (data, indent) => {
  if (!_.isObject(data)) {
    return data;
  }

  const nestedIndent = addPrefix(indentSymbol, indent);
  const strings = [
    openSymbol,
    ...(_.entries(data).flatMap(
      ([key, value]) => `${addPrefix(key, nestedIndent)}: ${stringify(value, nestedIndent)}`,
    )),
    addPrefix(closeSymbol, indent),
  ];

  return strings.join('\n');
};

const formatStylish = (diffTree) => {
  const iter = (tree, deep) => tree.flatMap((node) => {
    const indent = indentSymbol.repeat(deep);
    const {
      type, key, previousValue, currentValue, children,
    } = node;

    switch (type) {
      case types.deleted:
        return `${addPrefix(key, indent, labels.deleted)}: ${stringify(previousValue, indent)}`;
      case types.added:
        return `${addPrefix(key, indent, labels.added)}: ${stringify(currentValue, indent)}`;
      case types.changed:
        return [
          `${addPrefix(key, indent, labels.deleted)}: ${stringify(previousValue, indent)}`,
          `${addPrefix(key, indent, labels.added)}: ${stringify(currentValue, indent)}`,
        ];
      case types.nested:
        return [
          `${addPrefix(key, indent, labels.consist)}: ${openSymbol}`,
          ...(iter(children, deep + deepKeyOffset)),
          `${addPrefix(closeSymbol, indent)}`,
        ];
      case types.consist:
        return `${addPrefix(key, indent, labels.consist)}: ${stringify(currentValue, indent)}`;
      default:
        throw new Error(`Unexpected type ${type}`);
    }
  });

  const lines = iter(diffTree, 1);

  return [openSymbol, ...lines, closeSymbol];
};

export default (data) => formatStylish(data).join('\n');
