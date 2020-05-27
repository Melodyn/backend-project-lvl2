import yaml from 'js-yaml';

export default (format) => ({
  json: (data) => JSON.parse(data),
  yml: (data) => yaml.safeLoad(data),
}[format]);
