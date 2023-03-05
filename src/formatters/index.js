import plain from './plain.js';
import stylish from './stylish.js';
import json from './json.js';

const formatAst = (ast, formatter) => {
  switch (formatter) {
    case 'json': 
      return json(ast);
    case 'plain':
      return plain(ast);
    default:
      return stylish(ast);
  }
};

export default formatAst;
