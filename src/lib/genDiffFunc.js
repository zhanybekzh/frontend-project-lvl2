import { readFileSync } from 'node:fs';
import path from 'path';
import parse from '../parser.js';
import formatAst from '../formatters/index.js';
import buildAst from '../buildAst.js';

const getAbsolutePath = (pathfile) => {
  const currendDirectory = process.cwd();
  return path.resolve(currendDirectory, pathfile);
};

const getExtension = (pathfile) => path.extname(pathfile).slice(1);

const genDiffFunc = (pathFile1, pathFile2, formatter = 'stylish') => {
  const absolutePathFile1 = getAbsolutePath(pathFile1);
  const absolutePathFile2 = getAbsolutePath(pathFile2);
  const contentFile1 = readFileSync(absolutePathFile1);
  const contentFile2 = readFileSync(absolutePathFile2);

  const data1 = parse(contentFile1, getExtension(pathFile1));
  const data2 = parse(contentFile2, getExtension(pathFile2));

  const ast = buildAst(data1, data2);
  return formatAst(ast, formatter);
};

export default genDiffFunc;
