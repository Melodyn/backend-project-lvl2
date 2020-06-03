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

export const json = [
  {
    type: 'flat',
    state: 'consist',
    key: 'host',
    previousValue: 'hexlet.io',
    currentValue: 'hexlet.io',
  },
  {
    type: 'flat',
    state: 'changed',
    key: 'timeout',
    previousValue: 50,
    currentValue: 20,
  },
  {
    type: 'flat',
    state: 'deleted',
    key: 'proxy',
    previousValue: '123.234.53.22',
  },
  {
    type: 'flat',
    state: 'deleted',
    key: 'follow',
    previousValue: false,
  },
  {
    type: 'flat',
    state: 'added',
    key: 'verbose',
    currentValue: true,
  },
];
