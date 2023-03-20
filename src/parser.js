import yaml from 'js-yaml';

const parse = (content, parser) => {
  switch (parser) {
    case 'json':
      return JSON.parse(content);
    case 'yml':
    case 'yaml':
      return yaml.load(content);
    default:
      throw new Error(`Unknown file extension: '${parser}'!`);
  }
};

export default parse;
