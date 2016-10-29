const glob = require('glob');
const path = require('path');
const fs = require('fs');
const getLink = require('./getLink');
const getTitle = require('./getTitle');
const getDate = require('./getDate');
const removeMarkdown = require('remove-markdown');

module.exports = (list) => {
  const posts = glob.sync(path.join(list.dir, '*.md'));
  const data = [];
  for (let i = 0; i < list.limit && i < posts.length; i++) { // eslint-disable-line
    data.push({
      title: getTitle(path.basename(posts[i])),
      link: getLink(path.basename(posts[i])),
      body: `${removeMarkdown(fs.readFileSync(posts[i]).toString().substr(0, list.excerpt))}...`,
      published: getDate(path.basename(posts[i]), list.displayDate)
    });
  }
  return data;
};
