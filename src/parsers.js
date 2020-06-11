import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

const normalizeValue = (value) => {
  const numerableValue = parseInt(value, 10);
  return _.isNaN(numerableValue) ? value : numerableValue;
};
const normalizeIni = (obj) => _.entries(obj)
  .reduce((acc, [key, value]) => {
    const normalizedValue = normalizeValue(value);
    return {
      ...acc,
      [key]: _.isObjectLike(normalizedValue)
        ? normalizeIni(normalizedValue)
        : normalizedValue,
    };
  }, {});
const parseIni = (data) => normalizeIni(ini.parse(data));

const parsers = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  ini: parseIni,
};

export default (data, extension) => parsers[extension](data);
