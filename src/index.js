import { readFileSync } from 'node:fs';
import path from 'path';
import parse from './parser.js';
import formatAst from './formatters/index.js';
import buildAst from './buildAst.js';

const getAbsolutePath = (filePath) => {
  const currendDirectory = process.cwd();
  return path.resolve(currendDirectory, filePath);
};

const getExtension = (filePath) => path.extname(filePath).slice(1);

const getData = (filePath) => {
  const absolutePathFile = getAbsolutePath(filePath);
  const contentFile = readFileSync(absolutePathFile);
  return parse(contentFile, getExtension(filePath));
};

const genDiffFunc = (filePath1, filePath2, formatter = 'stylish') => {
  const data1 = getData(filePath1);
  const data2 = getData(filePath2);
  const ast = buildAst(data1, data2);
  return formatAst(ast, formatter);
};

export default genDiffFunc;
