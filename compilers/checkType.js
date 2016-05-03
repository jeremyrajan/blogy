'use strict';
const glob = require('glob');
const path = require('path');
const dataDir = require('../config').data.dir;

const init = (param, callback) => {
  const pathCheck = path.join(dataDir, '**', '*.md');
  let files = glob.sync(pathCheck);
  let type = null;
  let md = null;
  const regex = new RegExp(param, 'i');

  files.forEach((file) => {
    if (file.match(regex)){
      md = file;
      type = file.split('/')[file.split('/').length - 2].match(/(post)|page/g)[0];
    }
  });

  return callback(null, {
    type: type,
    file: md
  });
};

module.exports = init;
