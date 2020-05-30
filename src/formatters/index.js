import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

export default (format, states, shouldBeString) => ({
  stylish: (data) => stylish(data, states, shouldBeString),
  plain: (data) => plain(data, states, shouldBeString),
  json: (data) => json(data, shouldBeString),
}[format]);
