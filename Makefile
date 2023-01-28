install: 
	npm ci

run: 
	node bin/gendiff.js

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

publlish: 
	npm publish --dry-run

lint: 
	npx eslint .

.PHONY: test