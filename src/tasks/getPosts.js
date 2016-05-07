'use strict';
const glob = require('glob');
const path = require('path');
const fs = require('fs');
const getLink = require('./getLink');
const getTitle = require('./getTitle');
const getDate = require('./getDate');
const removeMarkdown = require('remove-markdown');

module.exports = (post) => {
  const posts = glob.sync(path.join(post.dir, '*.md'));
  const data = [];
  for (let i = 0; i < post.limit && i < posts.length; i++) {
    data.push({
      title: getTitle(path.basename(posts[i])),
      link: getLink(path.basename(posts[i])),
      body: `${removeMarkdown(fs.readFileSync(posts[i]).toString().substr(0, post.excerpt))}...`,
      published: getDate(path.basename(posts[i]), post.displayDate)
    });
  }
  return data;
};
