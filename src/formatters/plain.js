import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const plain = (ast) => {
  const iter = (node, path) => {
    const content = node.map((child) => {
      const name = path ? `${path}.${child.key}` : child.key;
      switch (child.state) {
        case 'deleted':
          return `Property '${name}' was removed`;
        case 'added':
          return `Property '${name}' was added with value: ${stringify(child.value)}`;
        case 'changed':
          return `Property '${name}' was updated. From ${stringify(child.valueOfFirstFile)} to ${stringify(child.valueOfSecondFile)}`;
        case 'tree':
          return iter(child.tree, name);
        case 'unchanged':
          return '';
        default:
          throw new Error(`Unknown child state: '${child.state}'!`);
      }
    });
    return content.filter((item) => item).join('\n');
  };
  return iter(ast, '');
};

export default plain;
