import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

const normalizeType = (value) => {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};

const normalizeObject = (obj) => _.entries(obj)
  .reduce((acc, [key, value]) => {
    const normalizedValue = normalizeType(value);
    return {
      ...acc,
      [key]: _.isObjectLike(normalizedValue)
        ? normalizeObject(normalizedValue)
        : normalizedValue,
    };
  }, {});

const parseIni = (data) => normalizeObject(ini.parse(data));

const parsers = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  ini: parseIni,
};

export default (data, extension) => parsers[extension](data);
