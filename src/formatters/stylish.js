import _ from 'lodash';
import types from '../types.js';

const labels = { deleted: '-', added: '+', unchanged: ' ' };
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
  const lines = [
    openSymbol,
    ...(_.entries(data).flatMap(
      ([key, value]) => `${addPrefix(key, nestedIndent)}: ${stringify(value, nestedIndent)}`,
    )),
    addPrefix(closeSymbol, indent),
  ];

  return lines.join('\n');
};

const formatStylish = (diffTree) => {
  const iter = (tree, depth) => tree.flatMap((node) => {
    const indent = indentSymbol.repeat(depth);
    const {
      type, key, value1, value2, children,
    } = node;

    switch (type) {
      case types.deleted:
        return `${addPrefix(key, indent, labels.deleted)}: ${stringify(value1, indent)}`;
      case types.added:
        return `${addPrefix(key, indent, labels.added)}: ${stringify(value2, indent)}`;
      case types.changed:
        return [
          `${addPrefix(key, indent, labels.deleted)}: ${stringify(value1, indent)}`,
          `${addPrefix(key, indent, labels.added)}: ${stringify(value2, indent)}`,
        ];
      case types.nested:
        return [
          `${addPrefix(key, indent, labels.unchanged)}: ${openSymbol}`,
          ...(iter(children, depth + deepKeyOffset)),
          `${addPrefix(closeSymbol, indent)}`,
        ];
      case types.unchanged:
        return `${addPrefix(key, indent, labels.unchanged)}: ${stringify(value2, indent)}`;
      default:
        throw new Error(`Unexpected node type ${type}`);
    }
  });

  const lines = iter(diffTree, 1);

  return [openSymbol, ...lines, closeSymbol];
};

export default (data) => formatStylish(data).join('\n');
