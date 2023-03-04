import { readFileSync } from 'node:fs';
import path from 'path';
import _ from 'lodash';
import parse from './parser.js';
import formatAst from '../formatters/index.js';

const buildAst = (objFile1, objFile2) => {
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
    if (_.isObject(objFile1[key]) && _.isObject(objFile2[key])) {
      return { key, tree: buildAst(objFile1[key], objFile2[key]) };
    }
    if (_.has(objFile1, key) && _.has(objFile2, key) && objFile1[key] === objFile2[key]) {
      return { key, value: objFile1[key], state: 'unchanged' };
    }
    return {
      key, oldValue: objFile1[key], newValue: objFile2[key], state: 'changed',
    };
  });
  return analyzedArray;
};

const genDiffFunc = (pathFile1, pathFile2, formatter) => {
  const currendDirectory = process.cwd();
  const absolutePathFile1 = path.resolve(currendDirectory, pathFile1);
  const absolutePathFile2 = path.resolve(currendDirectory, pathFile2);
  const contentFile1 = readFileSync(absolutePathFile1);
  const contentFile2 = readFileSync(absolutePathFile2);

  const objFile1 = parse(contentFile1, path.extname(pathFile1).slice(1));
  const objFile2 = parse(contentFile2, path.extname(pathFile2).slice(1));

  const ast = buildAst(objFile1, objFile2);
  return formatAst(ast, formatter);
};

export default genDiffFunc;
