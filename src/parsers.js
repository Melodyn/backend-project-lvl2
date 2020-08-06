import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

const numberifyValues = (obj) => _.mapValues(obj, (value) => (_.isObjectLike(value)
  ? numberifyValues(value)
  : (parseFloat(value) || value)));
const parseIni = (data) => numberifyValues(ini.parse(data));

const parsers = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  ini: parseIni,
};

export default (data, format) => parsers[format](data);
