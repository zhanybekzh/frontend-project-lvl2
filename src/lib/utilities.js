import path from 'path';

export const getAbsFilePath = (pathfile) => {
  const currendDirectory = process.cwd();
  return path.resolve(currendDirectory, pathfile);
};

export const getFileExt = (pathfile) => path.extname(pathfile).slice(1);
