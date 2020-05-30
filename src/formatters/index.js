import stylish from './stylish.js';

export default (format, states) => ({
  stylish: (data) => JSON.stringify(stylish(data, states), null, 2),
  json: (data) => JSON.stringify(data, null, 2),
}[format]);
