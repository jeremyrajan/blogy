'use strict';
const expect = require('chai').expect;
const checkType = require('../../src/compilers/checkType');
const fileHandler = require('../../src/common/fileHandler');
const path = require('path');
const fs = require('fs-extra');

describe('check type API', () => {
  let title, config, type, file, param;
  beforeEach(() => {
    config = require('../../config');
    config.post.dir = path.join(__dirname, '..', 'data', 'posts');
    config.page.dir = path.join(__dirname, '..', 'data', 'pages');
    config.data.dir = path.join(__dirname, '..', 'data');
    fs.mkdirsSync(config.post.dir);
    fs.mkdirsSync(config.page.dir);
  });

  it('should match the files as per regex', () => {
    title = 'My Post'.split(' ');
    param = 'my-post';
    type = 'post';
    fileHandler.createFile(title, config, type, (err, filePath) => {
      expect(err).to.be.null;
      expect(filePath).to.not.be.null;
      checkType(param, config.data.dir, (err, result) => {
        expect(result).to.be.defined;
        expect(result.file).to.not.be.null;
        expect(result.type).to.be.equal(type);
        expect(err).to.be.null;
        fs.unlinkSync(filePath);
      });
    });
  });

  it('should return null, if it cant find the file', () => {
    param = 'my-post';
    checkType(param, config.data.dir, (err, result) => {
      expect(result).to.be.defined;
      expect(result.file).to.be.null;
      expect(result.type).to.be.null;
      expect(err).to.be.null;
    });
  });
});
