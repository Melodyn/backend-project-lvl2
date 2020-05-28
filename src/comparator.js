import _ from 'lodash';

const labels = {
  added: '+',
  removed: '-',
  consist: ' ',
};

const comparator = (before, after) => _.union(_.keys(before), _.keys(after))
  .reduce(
    (acc, key) => {
      const hasCurrentKeyOnBefore = _.has(before, key);
      const hasCurrentKeyOnAfter = _.has(after, key);
      const valueBefore = before[key];
      const valueAfter = after[key];

      const addedProperty = `${labels.added} ${key}`;
      const removedProperty = `${labels.removed} ${key}`;
      const consistProperty = `${labels.consist} ${key}`;

      if (hasCurrentKeyOnBefore && !hasCurrentKeyOnAfter) {
        return { ...acc, [removedProperty]: valueBefore };
      }
      if (!hasCurrentKeyOnBefore && hasCurrentKeyOnAfter) {
        return { ...acc, [addedProperty]: valueAfter };
      }

      if (_.isEqual(valueBefore, valueAfter)) {
        return { ...acc, [consistProperty]: valueBefore };
      }

      return (_.isObjectLike(valueAfter) && _.isObjectLike(valueBefore))
        ? {
          ...acc,
          [consistProperty]: comparator(valueBefore, valueAfter),
        }
        : {
          ...acc,
          [addedProperty]: valueAfter,
          [removedProperty]: valueBefore,
        };
    },
    {},
  );

export default comparator;
