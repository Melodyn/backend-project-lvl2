export const stylishObject = {
  '  host': 'hexlet.io',
  '+ timeout': 20,
  '- timeout': 50,
  '- proxy': '123.234.53.22',
  '+ verbose': true,
  '- follow': false,
};

export const plainObject = [
  "Property 'timeout' was changed from 50 to 20",
  "Property 'proxy' was deleted",
  "Property 'follow' was deleted",
  "Property 'verbose' was added with value: true",
];
