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
const fs = require('fs-extra');
const path = require('path');
const npmInit = require('init-package-json');
const npmi = require('npmi');
let title = null;

const installDependencies = (lib, dir) => {
  common.msgHandler(npmi.NPM_VERSION, 'warn'); // prints the installed npm version used by npmi
  const options = {
    name: lib,
    path: dir,
    forceInstall: false,
    npmLoad: {
      loglevel: 'silent',
      save: true
    }
  };
  npmi(options, (err, result) => {
    if (err) {
      if (err.code === npmi.LOAD_ERR) common.msgHandler(`Load Error: ${err}`, 'err');
      else if (err.code === npmi.INSTALL_ERR) common.msgHandler(`Install error: ${err}`, 'err');
      return common.msgHandler(err.message, 'err');
    }
  });
};

if (argv._.length < 2) {
  common.msgHandler('Invalid arguments. Exiting...', 'err');
  process.exit();
}

if (argv._[0] === 'new') {
  const project = argv._[1];
  const dir = path.join(process.cwd(), project);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  fs.copySync(path.join(__dirname, '..', 'bootstrap'), dir);
  const initFile = path.resolve(process.env.HOME, '.npm-init')

  npmInit(dir, initFile, (er, data) => {
    installDependencies('blogy', dir);
  });

} else {
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
}
