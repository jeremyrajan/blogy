const fs = require('fs');
const moment = require('moment');
const path = require('path');

const createFile = (title, config, type, callback) => {
  if (!config) {
    return callback('No Config!', null);
  }

  if (!title) {
    return callback('Not a valid title, Exiting!', null);
  }
  const fileName = type === 'post' ? `${moment().format(config.post.timestamp)}-${title.join('-').toLowerCase()}.md` : `${title.join('-')}.md`;
  const dir = type === 'post' ? config.post.dir : config.page.dir;
  const fullPath = path.join(dir, fileName);
  fs.writeFileSync(fullPath, '');
  return callback(null, fullPath);
};

const deleteFile = (file, config, callback) => {
  if (!file) return callback('Not a valid file!', null);
  if (path.extname(file) !== '.md') {
    return callback('Not a valid file!', null);
  }
  if (!fs.existsSync(file)) {
    return callback('File does not exist!', null);
  }
  fs.unlinkSync(file);
  return callback(null, 'Deleted.');
};

module.exports = {
  createFile: createFile,
  deleteFile: deleteFile
};
