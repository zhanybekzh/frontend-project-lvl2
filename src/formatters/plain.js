import _ from 'lodash';

const formatValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const plain = (ast, path = '') => {
    const content = [];
  
    ast.forEach((child) => {
      const name = path ? `${path}.${child.key}` : child.key;
  
      if (child.state === 'deleted') {
        content.push(`Property '${name}' was removed`);
      }
      if (child.state === 'added') {
        content.push(`Property '${name}' was added with value: ${formatValue(child.value)}`);
      }
      if (child.state === 'changed') {
        content.push(`Property '${name}' was updated. From ${formatValue(child.oldValue)} to ${formatValue(child.newValue)}`);
      }
      if (child.tree) {
        content.push(plain(child.tree, name));
      }
    });
    return content.join('\n');
  };
  
  export default plain;