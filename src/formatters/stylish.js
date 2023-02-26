const stylish = (ast) => {
  let result = '{\n';
  const analyzedBody = ast.map((line) => {
    if (line.state === 'deleted') {
      return `    - ${line.key}: ${line.value}`;
    }
    if (line.state === 'added') {
      return `    + ${line.key}: ${line.value}`;
    }
    if (line.state === 'unchanged') {
      return `      ${line.key}: ${line.value}`;
    }
    if (line.state === 'changed') {
      return `    - ${line.key}: ${line.oldValue}\n    + ${line.key}: ${line.newValue}`;
    }
    return '';
  });
  result += analyzedBody.join('\n');
  result += '\n}';
  return result;
}
