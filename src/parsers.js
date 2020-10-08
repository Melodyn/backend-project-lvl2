import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

const numberifyValues = (obj) => _.mapValues(obj, (value) => {
  if (_.isObjectLike(value)) {
    return numberifyValues(value);
  }
  const parsed = parseFloat(value);
  return _.isNaN(parsed) ? value : parsed;
});
const parseIni = (data) => numberifyValues(ini.parse(data));

export default (data, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
    case 'yaml':
      return yaml.safeLoad(data);
    case 'ini':
      return parseIni(data);
    default:
      throw new Error(`Unexpected input format ${format}`);
  }
};
