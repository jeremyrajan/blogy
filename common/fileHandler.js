const fs = require('fs');
const moment = require('moment');
const path = require('path');
const glob = require('glob');

const createFile = (title, config, type, callback) => {
  const fileName = type === 'post' ?  `${moment().format(config.timestamp)}-${title.join('-')}.md` : `${title.join('-')}.md`;
  const dir = type === 'post' ? config.postDir : config.pageDir;
  const fullPath = path.join(dir, fileName);
  fs.writeFileSync(fullPath, '');
  return callback(null, fullPath);
};

const findFile = (file, config) => {
 return(glob.sync(path.join(config.dataDir, '**/*.md'))[0]);
};

const deleteFile = (file, config, callback) => {
  if (path.extname(file) !== '.md') {
    return callback('Not a valid file!', null);
  }
  const filePath = findFile(file, config);
  fs.unlinkSync(filePath);
  return callback(null, 'Deleted.');
};

module.exports = {
  createFile: createFile,
  deleteFile: deleteFile
};
