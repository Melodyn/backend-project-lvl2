import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

const numberifyValues = (obj) => _.mapValues(obj, (value) => (_.isObjectLike(value)
  ? numberifyValues(value)
  : (parseFloat(value) || value)));
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
      throw new Error(`Unexpected input format ${format}`)
  }
};
