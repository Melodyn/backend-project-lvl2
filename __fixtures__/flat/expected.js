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
    key: 'host',
    state: 'consist',
    type: 'flat',
    previousValue: 'hexlet.io',
    currentValue: 'hexlet.io',
  },
  {
    key: 'timeout',
    state: 'changed',
    type: 'flat',
    previousValue: 50,
    currentValue: 20,
  },
  {
    key: 'proxy',
    state: 'deleted',
    type: 'flat',
    previousValue: '123.234.53.22',
  },
  {
    key: 'follow',
    state: 'deleted',
    type: 'flat',
    previousValue: false,
  },
  {
    key: 'verbose',
    state: 'added',
    type: 'flat',
    currentValue: true,
  },
];
