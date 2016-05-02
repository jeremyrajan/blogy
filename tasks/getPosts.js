'use strict';
const glob = require('glob');
const path = require('path');
const fs = require('fs');
const getLink = require('./getLink');
const getTitle = require('./getTitle');

module.exports = (post) => {
  const posts = glob.sync(path.join(post.dir, '*.md'));
  const data = [];
  for (let i = 0; i < post.limit, i < posts.length; i++) {
    data.push({
      title: getTitle(path.basename(posts[i])),
      link: getLink(path.basename(posts[i])),
      body: fs.readFileSync(posts[i]).toString()
    });
  }
  return data;
}
