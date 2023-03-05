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
  const content = ast.map((child) => {
    const name = path ? `${path}.${child.key}` : child.key;

    if (child.state === 'deleted') {
      return `Property '${name}' was removed`;
    }
    if (child.state === 'added') {
      return `Property '${name}' was added with value: ${formatValue(child.value)}`;
    }
    if (child.state === 'changed') {
      return `Property '${name}' was updated. From ${formatValue(child.oldValue)} to ${formatValue(child.newValue)}`;
    }
    if (child.tree) {
      return plain(child.tree, name);
    }
    return '';
  });
  return content.filter((item) => item).join('\n');
};

export default plain;
