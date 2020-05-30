export const stylish = {
  '  host': 'hexlet.io',
  '+ timeout': 20,
  '- timeout': 50,
  '- proxy': '123.234.53.22',
  '+ verbose': true,
  '- follow': false,
};

export const plain = [
  "Property 'timeout' was changed from 50 to 20",
  "Property 'proxy' was deleted",
  "Property 'follow' was deleted",
  "Property 'verbose' was added with value: true",
];

export const json = {
  host: {
    previousValue: 'hexlet.io',
    currentValue: 'hexlet.io',
    state: 'consist',
  },
  timeout: {
    previousValue: 50,
    currentValue: 20,
    state: 'changed',
  },
  proxy: {
    previousValue: '123.234.53.22',
    state: 'deleted',
  },
  follow: {
    previousValue: false,
    state: 'deleted',
  },
  verbose: {
    currentValue: true,
    state: 'added',
  },
};
