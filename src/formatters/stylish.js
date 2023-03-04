import _ from 'lodash';

const tabs = (depth) => ' '.repeat(4 * depth - 2);

const printValue = (valueToPrint, depth) => {
  if (!_.isObject(valueToPrint)) { return value; }

  const content = Object
    .entries(valueToPrint)
    .map(([key, valueToPrint]) => `${tabs(depth)}  ${key}: ${printValue(valueToPrint, depth + 1)}`)
    .join('\n');

  return `{\n${content}\n${tabs(depth - 1)}  }`;
};

const printLine = (depth, sign, key, value) => `${tabs(depth)}${sign} ${key}: ${printValue(value, depth + 1)}`;

const stylish = (tree, depth = 1) => {
  const content = [];

  tree.forEach((child) => {
    if (child.state === 'deleted') {
      content.push(printLine(depth, '-', child.key, child.value));
    }
    if (child.state === 'added') {
      content.push(printLine(depth, '+', child.key, child.value));
    }
    if (child.state === 'unchanged') {
      content.push(printLine(depth, ' ', child.key, child.value));
    }
    if (child.state === 'changed') {
      content.push(printLine(depth, '-', child.key, child.oldValue));
      content.push(printLine(depth, '+', child.key, child.newValue));
    }
    if (child.tree) {
      content.push(`${tabs(depth)}  ${child.key}: {`);
      content.push(...stylish(child.tree, depth + 1));
      content.push(`${tabs(depth)}  }`);
    }
  });

  if (depth === 1) {
    return `{\n${content.join('\n')}\n}`;
  }

  return content;
};

export default stylish;
