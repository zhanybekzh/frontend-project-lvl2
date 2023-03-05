import _ from 'lodash';

const tabs = (depth) => ' '.repeat(4 * depth - 2);

const printValue = (value, depth) => {
  if (!_.isObject(value)) { return value; }

  const content = Object
    .entries(value)
    .map(([key, val]) => `${tabs(depth)}  ${key}: ${printValue(val, depth + 1)}`)
    .join('\n');

  return `{\n${content}\n${tabs(depth - 1)}  }`;
};

const printLine = (depth, sign, key, value) => `${tabs(depth)}${sign} ${key}: ${printValue(value, depth + 1)}`;

const stylish = (tree, depth = 1) => {
  const content = tree.map((child) => {
    if (child.state === 'deleted') {
       return printLine(depth, '-', child.key, child.value);
    }
    if (child.state === 'added') {
      return printLine(depth, '+', child.key, child.value);
    }
    if (child.state === 'unchanged') {
      return printLine(depth, ' ', child.key, child.value);
    }
    if (child.state === 'changed') {
      return `${printLine(depth, '-', child.key, child.oldValue)}\n${printLine(depth, '+', child.key, child.newValue)}`;
    }
    if (child.tree) {
      return `${tabs(depth)}  ${child.key}: {\n${stylish(child.tree, depth + 1).join('\n')}\n${tabs(depth)}  }`;
    }
    return '';
  })

  if (depth === 1) {
    return `{\n${content.filter((item) => item).join('\n')}\n}`;
  }
  return content;
};

export default stylish;
