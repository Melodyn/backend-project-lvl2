import stylish from './stylish.js';
import plain from './plain.js';

const formatJSON = (data) => JSON.stringify(data, null, 2);

export default (data, format) => {
  switch (format) {
    case 'stylish':
      return stylish(data);
    case 'plain':
      return plain(data);
    case 'json':
      return formatJSON(data);
    default:
      throw new Error(`Unexpected output format ${format}`);
  }
};
