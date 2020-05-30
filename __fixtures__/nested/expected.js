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

export const json = {
  common: {
    previousValue: {
      setting1: 'Value 1',
      setting2: 200,
      setting3: true,
      setting6: {
        key: 'value',
      },
    },
    currentValue: {
      setting1: {
        previousValue: 'Value 1',
        currentValue: 'Value 1',
        state: 'consist',
      },
      setting2: {
        previousValue: 200,
        state: 'deleted',
      },
      setting3: {
        previousValue: true,
        currentValue: {
          key: 'value',
        },
        state: 'changed',
      },
      setting6: {
        previousValue: {
          key: 'value',
        },
        currentValue: {
          key: {
            previousValue: 'value',
            currentValue: 'value',
            state: 'consist',
          },
          ops: {
            currentValue: 'vops',
            state: 'added',
          },
        },
        state: 'changed',
      },
      follow: {
        currentValue: false,
        state: 'added',
      },
      setting4: {
        currentValue: 'blah blah',
        state: 'added',
      },
      setting5: {
        currentValue: {
          key5: 'value5',
        },
        state: 'added',
      },
    },
    state: 'changed',
  },
  group1: {
    previousValue: {
      baz: 'bas',
      foo: 'bar',
      nest: {
        key: 'value',
      },
    },
    currentValue: {
      baz: {
        previousValue: 'bas',
        currentValue: 'bars',
        state: 'changed',
      },
      foo: {
        previousValue: 'bar',
        currentValue: 'bar',
        state: 'consist',
      },
      nest: {
        previousValue: {
          key: 'value',
        },
        currentValue: 'str',
        state: 'changed',
      },
    },
    state: 'changed',
  },
  group2: {
    previousValue: {
      abc: 12345,
    },
    state: 'deleted',
  },
  group3: {
    currentValue: {
      fee: 100500,
    },
    state: 'added',
  },
};
