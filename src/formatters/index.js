import stylish from './stylish.js';
import plain from './plain.js';

const formatJSON = (data) => JSON.stringify(data, null, 2);

const formatters = {
  stylish,
  plain,
  json: formatJSON,
};

export default (formatterName, data) => formatters[formatterName](data);
