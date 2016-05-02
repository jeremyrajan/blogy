const marked = require('marked');
const fs = require('fs');
const init = (file) => {
  const data = fs.readFileSync(file).toString();
  return marked(data);
};

module.exports = init;
