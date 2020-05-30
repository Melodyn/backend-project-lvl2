export default (data, shouldBeString) => (shouldBeString ? JSON.stringify(data, null, 2) : data);
