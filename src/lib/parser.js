import yaml from 'js-yaml';

const parse = (content, ext) => {
  switch (ext) {
    case 'json':
      return JSON.parse(content);
    case 'yml':
    case 'yaml':
      return yaml.load(content);
    default:
      throw new Error(`Unknown file extension: '${ext}'!`);
  }
};

export default parse;
