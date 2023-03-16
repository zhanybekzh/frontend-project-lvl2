import _ from 'lodash';

const buildAst = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const keys = _.sortBy(_.union(keys1, keys2));

  const analyzedArray = keys.map((key) => {
    if (!_.has(data2, key)) {
      return { key, value: data1[key], state: 'deleted' };
    }
    if (!_.has(data1, key)) {
      return { key, value: data2[key], state: 'added' };
    }
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return { key, tree: buildAst(data1[key], data2[key]), state: 'nested' };
    }
    if (_.has(data1, key) && _.has(data2, key) && _.isEqual(data1[key], data2[key])) {
      return { key, value: data1[key], state: 'unchanged' };
    }
    return {
      key, valueOfFirstFile: data1[key], valueOfSecondFile: data2[key], state: 'changed',
    };
  });
  return analyzedArray;
};

export default buildAst;
