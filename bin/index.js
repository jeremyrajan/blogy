#!/usr/bin/env node

'use strict';
const argv = require('yargs')
  .options({
    t: {
      alias: 'title',
      demand: true,
      default: 'My Post Title',
      describe: 'Title for post/page',
      type: 'array'
    },
    f: {
      alias: 'file',
      demand: false,
      describe: 'Page or post to delete',
      type: 'string'
    },
  })
  .argv;
const common = require('../src/common');
const config = require('../config');
const ops = ['create', 'delete'];
const types = ['page', 'post'];
let title = null;

if (argv._.length < 2) {
  common.msgHandler('Invalid arguments. Exiting...', 'err');
  process.exit();
}

const operation = argv._[0];
const type = argv._[1];
if (!!argv.title) {
  title = argv.title;
}
if (ops.indexOf(operation) === -1 || types.indexOf(type) === -1) {
  common.msgHandler('Invalid arguments. Exiting...', 'err');
  process.exit();
}
if (title === null) {
  common.msgHandler('Title is invalid. Exiting...', 'err');
  process.exit();
}

if (operation === 'create') {
  common.fileHandler.createFile(title, config, type, (err, filePath) => {
    common.msgHandler(`${type.toUpperCase()} created, at ${filePath}!`, 'success');
  });
}

if (operation === 'delete') {
  common.fileHandler.deleteFile(argv.file, config, (err, result) => {
    if (err) return common.msgHandler(err, 'err');
    common.msgHandler(result, 'warn');
  });
}
