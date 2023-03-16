import _ from 'lodash';

const tabs = (depth) => ' '.repeat(4 * depth - 2);

const stringify = (value, depth) => {
  if (!_.isObject(value)) { return value; }

  const content = Object
    .entries(value)
    .map(([key, val]) => `${tabs(depth)}  ${key}: ${stringify(val, depth + 1)}`)
    .join('\n');

  return `{\n${content}\n${tabs(depth - 1)}  }`;
};

const printLine = (depth, sign, key, value) => `${tabs(depth)}${sign} ${key}: ${stringify(value, depth + 1)}`;

const stylish = (tree) => {
  const iter = (node, depth) => {
    const content = node.map((child) => {
      switch (child.state) {
        case 'deleted':
          return printLine(depth, '-', child.key, child.value);
        case 'added':
          return printLine(depth, '+', child.key, child.value);
        case 'changed':
          return `${printLine(depth, '-', child.key, child.valueOfFirstFile)}\n${printLine(depth, '+', child.key, child.valueOfSecondFile)}`;
        case 'tree':
          return `${tabs(depth)}  ${child.key}: {\n${iter(child.tree, depth + 1)}\n${tabs(depth)}  }`;
        case 'unchanged':
          return printLine(depth, ' ', child.key, child.value);
        default:
          throw new Error(`Unknown child state: '${child.state}'!`);
      }
    });
    return content.join('\n');
  };
  return `{\n${iter(tree, 1)}\n}`;
};

export default stylish;
