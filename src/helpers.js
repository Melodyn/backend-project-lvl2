import _ from 'lodash';

// eslint-disable-next-line import/prefer-default-export
export const checkIsNested = (previousValue, currentValue) => (
  _.isObjectLike(previousValue)
  && _.isObjectLike(currentValue)
);
