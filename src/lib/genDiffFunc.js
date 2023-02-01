import { readFileSync } from 'node:fs';
import path from 'path';
import _ from 'lodash';

const genDiffFunc = (pathFile1, pathFile2) => {
  const currendDirectory = process.cwd();
  const absolutePathFile1 = path.resolve(currendDirectory, pathFile1);
  const absolutePathFile2 = path.resolve(currendDirectory, pathFile2);
  const contentFile1 = readFileSync(absolutePathFile1);
  const contentFile2 = readFileSync(absolutePathFile2);
  const objFile1 = JSON.parse(contentFile1);
  const objFile2 = JSON.parse(contentFile2);
  const keys1 = Object.keys(objFile1);
  const keys2 = Object.keys(objFile2);
  const keysList = _.sortBy(_.union(keys1, keys2));

  const analyzedArray = keysList.map((key) => {
    if (!_.has(objFile2, key)) {
      return { key, value: objFile1[key], state: 'deleted' };
    }
    if (!_.has(objFile1, key)) {
      return { key, value: objFile2[key], state: 'added' };
    }
    if (_.has(objFile1, key) && _.has(objFile2, key) && objFile1[key] === objFile2[key]) {
      return { key, value: objFile1[key], state: 'unchanged' };
    }
    return {
      key, oldValue: objFile1[key], newValue: objFile2[key], state: 'changed',
    };
  });
  let result = '{\n';
  const analyzedBody = analyzedArray.map((line) => {
    if (line.state === 'deleted') {
      return `    - ${line.key}: ${line.value}`;
    }
    if (line.state === 'added') {
      return `    + ${line.key}: ${line.value}`;
    }
    if (line.state === 'unchanged') {
      return `      ${line.key}: ${line.value}`;
    }
    if (line.state === 'changed') {
      return `    - ${line.key}: ${line.oldValue}\n    + ${line.key}: ${line.newValue}`;
    }
    return '';
  });
  result += analyzedBody.join('\n');
  result += '\n}';
  console.log(result);
};

export default genDiffFunc;
