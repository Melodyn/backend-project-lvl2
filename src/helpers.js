import _ from 'lodash';

// eslint-disable-next-line import/prefer-default-export
export const isNested = (previousValue, currentValue) => (
  _.isObjectLike(previousValue)
  && _.isObjectLike(currentValue)
);
