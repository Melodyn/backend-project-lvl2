export const stylish = {
  '  common': {
    '+ follow': false,
    '  setting1': 'Value 1',
    '- setting2': 200,
    '- setting3': true,
    '+ setting3': { key: 'value' },
    '  setting6': {
      '  key': 'value',
      '+ ops': 'vops',
    },
    '+ setting4': 'blah blah',
    '+ setting5': { key5: 'value5' },
  },
  '  group1': {
    '+ baz': 'bars',
    '- baz': 'bas',
    '  foo': 'bar',
    '- nest': { key: 'value' },
    '+ nest': 'str',
  },
  '- group2': { abc: 12345 },
  '+ group3': { fee: 100500 },
};

export const plain = [
  "Property 'common.setting2' was deleted",
  "Property 'common.setting3' was changed from true to [complex value]",
  "Property 'common.setting6.ops' was added with value: vops",
  "Property 'common.follow' was added with value: false",
  "Property 'common.setting4' was added with value: blah blah",
  "Property 'common.setting5' was added with value: [complex value]",
  "Property 'group1.baz' was changed from bas to bars",
  "Property 'group1.nest' was changed from [complex value] to str",
  "Property 'group2' was deleted",
  "Property 'group3' was added with value: [complex value]",
];

export const json = [
  {
    type: 'nested',
    state: 'changed',
    key: 'common',
    children: [
      {
        type: 'flat',
        state: 'consist',
        key: 'setting1',
        previousValue: 'Value 1',
        currentValue: 'Value 1',
      },
      {
        type: 'flat',
        state: 'deleted',
        key: 'setting2',
        previousValue: 200,
      },
      {
        type: 'flat',
        state: 'changed',
        key: 'setting3',
        previousValue: true,
        currentValue: {
          key: 'value',
        },
      },
      {
        type: 'nested',
        state: 'changed',
        key: 'setting6',
        children: [
          {
            type: 'flat',
            state: 'consist',
            key: 'key',
            previousValue: 'value',
            currentValue: 'value',
          },
          {
            type: 'flat',
            state: 'added',
            key: 'ops',
            currentValue: 'vops',
          },
        ],
      },
      {
        type: 'flat',
        state: 'added',
        key: 'follow',
        currentValue: false,
      },
      {
        type: 'flat',
        state: 'added',
        key: 'setting4',
        currentValue: 'blah blah',
      },
      {
        type: 'flat',
        state: 'added',
        key: 'setting5',
        currentValue: {
          key5: 'value5',
        },
      },
    ],
  },
  {
    type: 'nested',
    state: 'changed',
    key: 'group1',
    children: [
      {
        type: 'flat',
        state: 'changed',
        key: 'baz',
        previousValue: 'bas',
        currentValue: 'bars',
      },
      {
        type: 'flat',
        state: 'consist',
        key: 'foo',
        previousValue: 'bar',
        currentValue: 'bar',
      },
      {
        type: 'flat',
        state: 'changed',
        key: 'nest',
        previousValue: {
          key: 'value',
        },
        currentValue: 'str',
      },
    ],
  },
  {
    type: 'flat',
    state: 'deleted',
    key: 'group2',
    previousValue: {
      abc: 12345,
    },
  },
  {
    type: 'flat',
    state: 'added',
    key: 'group3',
    currentValue: {
      fee: 100500,
    },
  },
];
