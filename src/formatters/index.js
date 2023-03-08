import plain from './plain.js';
import stylish from './stylish.js';

const formatAst = (ast, formatter) => {
  switch (formatter) {
    case 'json':
      return JSON.stringify(ast);
    case 'plain':
      return plain(ast);
    case 'stylish':
      return stylish(ast);
    default:
      throw new Error(`Unknown formatter: '${formatter}'!`);
  }
};

export default formatAst;
