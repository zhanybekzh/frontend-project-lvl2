import { readFileSync } from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiffFunc from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const testCases = [
  ['file1.json', 'file2.json', undefined, 'stylishRightResult.txt'],
  ['file1.json', 'file2.json', undefined,  'stylishRightResult.txt'],
  ['file1.json', 'file2.json', 'stylish', 'stylishRightResult.txt'],
  ['file1.json', 'file2.json', 'plain', 'plainRightResult.txt'],
  ['file1.json', 'file2.json', 'json', 'jsonRightResult.json'],
  ['file1.yml', 'file2.yaml', 'stylish', 'stylishRightResult.txt'],
  ['file1.yml', 'file2.yaml', 'plain', 'plainRightResult.txt'],
  ['file1.yml', 'file2.yaml', 'json', 'jsonRightResult.json'],
];

test.each(testCases)(
  'genDiffFunc(%s, %s, %s)',
  (file1, file2, format, expectedResult) => {
    const filePath1 = getFixturePath(file1);
    const filePath2 = getFixturePath(file2);
    const expected = readFile(expectedResult);
    expect(genDiffFunc(filePath1, filePath2, format)).toEqual(expected);
  },
);
