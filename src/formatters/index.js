import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formatters = {
  stylish,
  plain,
  json,
};

export default (formatterName, data, shouldBeString, states, types) => (
  formatters[formatterName](data, shouldBeString, states, types)
);
