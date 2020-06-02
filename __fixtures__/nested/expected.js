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
    key: 'common',
    state: 'changed',
    type: 'nested',
    children: [
      {
        key: 'setting1',
        state: 'consist',
        type: 'flat',
        previousValue: 'Value 1',
        currentValue: 'Value 1',
      },
      {
        key: 'setting2',
        state: 'deleted',
        type: 'flat',
        previousValue: 200,
      },
      {
        key: 'setting3',
        state: 'changed',
        type: 'flat',
        previousValue: true,
        currentValue: {
          key: 'value',
        },
      },
      {
        key: 'setting6',
        state: 'changed',
        type: 'nested',
        children: [
          {
            key: 'key',
            state: 'consist',
            type: 'flat',
            previousValue: 'value',
            currentValue: 'value',
          },
          {
            key: 'ops',
            state: 'added',
            type: 'flat',
            currentValue: 'vops',
          },
        ],
      },
      {
        key: 'follow',
        state: 'added',
        type: 'flat',
        currentValue: false,
      },
      {
        key: 'setting4',
        state: 'added',
        type: 'flat',
        currentValue: 'blah blah',
      },
      {
        key: 'setting5',
        state: 'added',
        type: 'flat',
        currentValue: {
          key5: 'value5',
        },
      },
    ],
  },
  {
    key: 'group1',
    state: 'changed',
    type: 'nested',
    children: [
      {
        key: 'baz',
        state: 'changed',
        type: 'flat',
        previousValue: 'bas',
        currentValue: 'bars',
      },
      {
        key: 'foo',
        state: 'consist',
        type: 'flat',
        previousValue: 'bar',
        currentValue: 'bar',
      },
      {
        key: 'nest',
        state: 'changed',
        type: 'flat',
        previousValue: {
          key: 'value',
        },
        currentValue: 'str',
      },
    ],
  },
  {
    key: 'group2',
    state: 'deleted',
    type: 'flat',
    previousValue: {
      abc: 12345,
    },
  },
  {
    key: 'group3',
    state: 'added',
    type: 'flat',
    currentValue: {
      fee: 100500,
    },
  },
];
