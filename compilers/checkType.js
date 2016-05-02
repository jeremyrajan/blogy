'use strict';
const glob = require('glob');
const path = require('path');
const dataDir = require('../config/config').data.dir;

const init = (param, callback) => {
  const pathCheck = path.join(dataDir, '**', `${param}.md`);
  let file = glob.sync(pathCheck);
  let type = null;
  if (file.length > 0) {
    file = file[0];
    type = file.split('/')[file.split('/').length - 2].match(/(post)|page/g)[0];
  }

  return callback(null, {
    type: type,
    file: file
  });
};

module.exports = init;
