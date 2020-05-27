import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

const parseValues = (obj) => _.entries(obj)
  .reduce((acc, [key, value]) => {
    try {
      const parsedValue = JSON.parse(value);
      return { ...acc, [key]: parsedValue };
    } catch {
      return { ...acc, [key]: value };
    }
  }, {});

export default (format) => ({
  json: (data) => JSON.parse(data),
  yml: (data) => yaml.safeLoad(data),
  ini: (data) => parseValues(ini.parse(data)),
}[format]);
