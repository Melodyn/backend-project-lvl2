import stylish from './stylish.js';
import plain from './plain.js';

export default (format, states) => ({
  stylish: (data) => JSON.stringify(stylish(data, states), null, 2),
  plain: (data) => plain(data, states).join('\n'),
  json: (data) => JSON.stringify(data, null, 2),

  stylishObject: (data) => stylish(data, states),
  plainObject: (data) => plain(data, states),
}[format]);
