### Hexlet tests and linter status:
[![Actions Status](https://github.com/zhanybekzh/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/zhanybekzh/frontend-project-lvl2/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/a3eec5d2b257ed808ce7/maintainability)](https://codeclimate.com/github/zhanybekzh/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/a3eec5d2b257ed808ce7/test_coverage)](https://codeclimate.com/github/zhanybekzh/frontend-project-lvl2/test_coverage)
[![.github/workflows/nodejs.yml](https://github.com/zhanybekzh/frontend-project-lvl2/actions/workflows/nodejs.yml/badge.svg?branch=main&event=push)](https://github.com/zhanybekzh/frontend-project-lvl2/actions/workflows/nodejs.yml)
# Utility for compare two configuration files and shows a difference.

It is a program with command-line interface (CLI) that generates a difference between two data structures or configuration files. Performs the following operations: reading files, parsing incoming data, building a tree of differences, forming the necessary output. The algorithm is based on tree recursion.

### Main features:
* Supports different input formats: json, yaml.
* Generates a report in the form of plain text, stylish and json.


1. Tilt the repository:
```
  git clone git@github.com:zhanybekzh/frontend-project-lvl2.git
```
2. Establish a dependency:
```
  make install
  make publish
```
For help run `gendiff -h` or `gendiff --help`:
```
$ gengiff --help
Usage: gendiff [options] <filepath1> <filepath2>
Compares two configuration files and shows a difference.
Options:
  -v, --version        output the version number
  -f, --format <type>  output format (default: "stylish")
  -h, --help           display help for command
```
Run:
```
gendiff [options] <path/to/file1> <path/to/file2>
```
## Work example.

[![asciicast](https://asciinema.org/a/PLF7iX1kFPCBOdgsq1q5994ob.svg)](https://asciinema.org/a/PLF7iX1kFPCBOdgsq1q5994ob)

### Compare two configuration files with complex value in stylish output format:
[![asciicast](https://asciinema.org/a/qckKcd7lgRDkRTfdAw8g7qmyf.svg)](https://asciinema.org/a/qckKcd7lgRDkRTfdAw8g7qmyf)

### Compare two configuration files with complex value in plain output format:
[![asciicast](https://asciinema.org/a/vKNM1jCwoIvV2CvsvfP13G9Mr.svg)](https://asciinema.org/a/vKNM1jCwoIvV2CvsvfP13G9Mr)

### Compare two configuration files with complex value in json output format:
[![asciicast](https://asciinema.org/a/oIZdgI5MxoHrRv6eHliN8Azyo.svg)](https://asciinema.org/a/oIZdgI5MxoHrRv6eHliN8Azyo)
