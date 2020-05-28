export default (format) => ({
  stylish: (data) => JSON.stringify(data, null, 2),
  json: (data) => data,
}[format]);
