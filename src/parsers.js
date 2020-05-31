import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

const JSONparse = (value) => {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};

const parseValues = (obj) => _.entries(obj)
  .reduce((acc, [key, value]) => {
    const parsedValue = JSONparse(value);
    return { ...acc, [key]: _.isObjectLike(parsedValue) ? parseValues(parsedValue) : parsedValue };
  }, {});

const parsers = {
  json: (data) => JSON.parse(data),
  yml: (data) => yaml.safeLoad(data),
  ini: (data) => parseValues(ini.parse(data)),
};

export default (data, extension) => parsers[extension](data);
