import formatPlain from './plain.js';
import formatStylish from './stylish.js';

const formatAst = (ast, formatter) => {
  switch (formatter) {
    case 'json':
      return JSON.stringify(ast);
    case 'plain':
      return formatPlain(ast);
    case 'stylish':
      return formatStylish(ast);
    default:
      throw new Error(`Unknown formatter: '${formatter}'!`);
  }
};

export default formatAst;
