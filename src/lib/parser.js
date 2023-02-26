import yaml from 'js-yaml';

const parse = (content, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(content);
    case 'yml':
      return yaml.load(content);
    case 'yaml':
      return yaml.load(content);
    default:
      return {};
  }
};

export default parse;