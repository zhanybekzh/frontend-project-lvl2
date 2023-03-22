import _ from 'lodash';

const getIndent = (depth) => ' '.repeat(4 * depth - 2);

const stringify = (value, depth) => {
  if (!_.isObject(value)) { return value; }

  const content = Object
    .entries(value)
    .map(([key, val]) => `${getIndent(depth)}  ${key}: ${stringify(val, depth + 1)}`)
    .join('\n');

  return `{\n${content}\n${getIndent(depth - 1)}  }`;
};

const printLine = (depth, sign, key, value) => `${getIndent(depth)}${sign} ${key}: ${stringify(value, depth + 1)}`;

const formatStylish = (tree) => {
  const iter = (node, depth) => {
    const content = node.map((child) => {
      switch (child.type) {
        case 'deleted':
          return printLine(depth, '-', child.key, child.value);
        case 'added':
          return printLine(depth, '+', child.key, child.value);
        case 'changed':
          return `${printLine(depth, '-', child.key, child.value1)}\n${printLine(depth, '+', child.key, child.value2)}`;
        case 'nested':
          return `${getIndent(depth)}  ${child.key}: {\n${iter(child.tree, depth + 1)}\n${getIndent(depth)}  }`;
        case 'unchanged':
          return printLine(depth, ' ', child.key, child.value);
        default:
          throw new Error(`Unknown child type: '${child.type}'!`);
      }
    });
    return content.join('\n');
  };
  return `{\n${iter(tree, 1)}\n}`;
};

export default formatStylish;
