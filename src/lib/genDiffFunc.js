import { readFileSync } from 'node:fs';
import parse from './parser.js';
import formatAst from '../formatters/index.js';
import buildAst from './buildAst.js';
import { getAbsFilePath, getFileExt } from './utilities.js';

const genDiffFunc = (pathFile1, pathFile2, formatter = 'stylish') => {
  const absolutePathFile1 = getAbsFilePath(pathFile1);
  const absolutePathFile2 = getAbsFilePath(pathFile2);
  const contentFile1 = readFileSync(absolutePathFile1);
  const contentFile2 = readFileSync(absolutePathFile2);

  const data1 = parse(contentFile1, getFileExt(pathFile1));
  const data2 = parse(contentFile2, getFileExt(pathFile1));

  const ast = buildAst(data1, data2);
  return formatAst(ast, formatter);
};

export default genDiffFunc;
