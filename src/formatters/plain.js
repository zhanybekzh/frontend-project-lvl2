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

const formatPlain = (ast) => {
  const iter = (node, path) => {
    const content = node.map((child) => {
      const name = path ? `${path}.${child.key}` : child.key;
      switch (child.type) {
        case 'deleted':
          return `Property '${name}' was removed`;
        case 'added':
          return `Property '${name}' was added with value: ${stringify(child.value)}`;
        case 'changed':
          return `Property '${name}' was updated. From ${stringify(child.value1)} to ${stringify(child.value2)}`;
        case 'nested':
          return iter(child.tree, name);
        case 'unchanged':
          return null;
        default:
          throw new Error(`Unknown child type: '${child.type}'!`);
      }
    });
    return content.filter((item) => item).join('\n');
  };
  return iter(ast, '');
};

export default formatPlain;
