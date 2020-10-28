import _ from 'lodash';
import types from '../types.js';

const keyOffset = 4;
const prefixOffset = 2;
const indentSymbol = ' ';
const openSymbol = '{';
const closeSymbol = '}';
const labels = {
  deleted: '-',
  added: '+',
  unchanged: ' ',
  nested: ' ',
};

const addPrefix = (key, type, indent) => `${indent}${labels[type]} ${key}`;
const stringify = (value, depth) => {
  if (!_.isObject(value)) {
    return value;
  }

  const indentSize = depth * keyOffset;
  const keyIndent = indentSymbol.repeat(indentSize);
  const bracketIndent = indentSymbol.repeat(indentSize - keyOffset);
  const lines = Object.entries(value)
    .flatMap(([key, val]) => `${keyIndent}${key}: ${stringify(val, depth + 1)}`);

  return [
    openSymbol,
    ...lines,
    `${bracketIndent}${closeSymbol}`,
  ].join('\n');
};

const formatStylish = (diffTree) => {
  const iter = (tree, depth) => tree.flatMap((node) => {
    const {
      type, key, value1, value2, children,
    } = node;

    const indentSize = depth * keyOffset;
    const keyIndent = indentSymbol.repeat(indentSize - prefixOffset);
    const bracketIndent = indentSymbol.repeat(indentSize);
    const toStr = (value) => stringify(value, depth + 1);

    switch (type) {
      case types.deleted:
        return `${addPrefix(key, type, keyIndent)}: ${toStr(value1)}`;
      case types.added:
        return `${addPrefix(key, type, keyIndent)}: ${toStr(value2)}`;
      case types.changed:
        return [
          `${addPrefix(key, types.deleted, keyIndent)}: ${toStr(value1)}`,
          `${addPrefix(key, types.added, keyIndent)}: ${toStr(value2)}`,
        ];
      case types.unchanged:
        return `${addPrefix(key, type, keyIndent)}: ${toStr(value2)}`;
      case types.nested:
        return [
          `${addPrefix(key, type, keyIndent)}: ${openSymbol}`,
          ...iter(children, depth + 1),
          `${bracketIndent}${closeSymbol}`,
        ];
      default:
        throw new Error(`Unexpected node type ${type}`);
    }
  });

  const lines = iter(diffTree, 1);

  return [openSymbol, ...lines, closeSymbol];
};

export default (data) => formatStylish(data).join('\n');
