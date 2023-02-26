import { readFileSync } from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiffFunc from '../src/lib/genDiffFunc.js';

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test('genDiffFunc', () => {
  const correctResult = 'correctResult.txt';
  expect(genDiffFunc(getFixturePath('file1.json'), getFixturePath('file2.json'))).toEqual(readFile(correctResult));
});
