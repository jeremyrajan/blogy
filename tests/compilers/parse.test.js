'use strict';
const expect = require('chai').expect;
const parser = require('../../src/compilers/parse');
const fileHandler = require('../../src/common/fileHandler');
const path = require('path');
const fs = require('fs-extra');

// this is essentially to see if the marked lib is working fine.
describe('parser', () => {
  let title, config, type, file, param;
  beforeEach(() => {
    config = require('../../config');
    config.post.dir = path.join(__dirname, '..', 'data', 'posts');
    config.page.dir = path.join(__dirname, '..', 'data', 'pages');
    config.data.dir = path.join(__dirname, '..', 'data');
    fs.mkdirsSync(config.post.dir);
    fs.mkdirsSync(config.page.dir);
  });

  it('should return converted HTML, when passed markdown test', () => {
    title = 'My Post'.split(' ');
    param = 'my-post';
    type = 'post';
    const markdown = '# My Heading';
    fileHandler.createFile(title, config, type, (err, filePath) => {
      expect(err).to.be.null;
      expect(filePath).to.not.be.null;
      fs.writeFileSync(filePath, markdown);
      const htmlText = parser(filePath);
      expect(htmlText).to.not.be.null;
      fs.unlinkSync(filePath);
    });
  });

});
