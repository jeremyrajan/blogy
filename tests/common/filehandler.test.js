'use strict';
const expect = require('chai').expect;
const fileHandler = require('../../src/common/fileHandler');
const path = require('path');
const fs = require('fs-extra');

describe('create File', () => {
  let title, config, type, file;
  beforeEach(() => {
    config = require('../../config');
    config.post.dir = path.join(__dirname, '..', 'data', 'posts');
    config.page.dir = path.join(__dirname, '..', 'data', 'pages');
    fs.mkdirsSync(config.post.dir);
    fs.mkdirsSync(config.page.dir);
  });
  it('should exit, if the config is empty', () => {
    config = null;
    fileHandler.createFile(title, config, type, (err, result) => {
      expect(err).to.be.exist;
      expect(result).to.be.null;
    });
  });

  it('should exit, if the title is not valid', () => {
    title = null;
    fileHandler.createFile(title, config, type, (err, result) => {
      expect(err).to.be.exist;
      expect(result).to.be.null;
    });
  });

  it('should create a post, if config, title and type are valid', () => {
    title = 'This is my test post'.split(' ');
    type = 'post';
    fileHandler.createFile(title, config, type, (err, result) => {
      expect(err).to.be.null;
      expect(result).to.exist;
      const file = path.basename(result);
      const year = new Date().getFullYear().toString();
      expect(file.startsWith(year)).to.be.true;
      fs.unlinkSync(result); // cleanup
    });
  });

  it('should create a page, is data is valid', () => {
    title = 'This is my test post'.split(' ');
    type = 'page';
    fileHandler.createFile(title, config, type, (err, result) => {
      expect(err).to.be.null;
      expect(result).to.exist;
      const file = path.basename(result);
      const year = new Date().getFullYear().toString();
      expect(file.startsWith(year)).to.be.false;
      fs.unlinkSync(result); // cleanup
    });
  });
});

describe('delete File', () => {
  let title, config, type, fileTxt, fileMd;
  beforeEach(() => {
    config = require('../../config');
    config.post.dir = path.join(__dirname, '..', 'data', 'posts');
    config.page.dir = path.join(__dirname, '..', 'data', 'pages');
    fs.mkdirsSync(config.post.dir);
    fs.mkdirsSync(config.page.dir);
    fileTxt = fs.writeFileSync(path.join(config.post.dir, 'test.txt'), '');
    fileMd = fs.writeFileSync(path.join(config.post.dir, 'test.md'), '');
  });

  it('should abort, if the file is not .md', () => {
    fileHandler.deleteFile(fileTxt, config, (err, result) => {
      expect(err).to.exist;
      expect(result).to.be.null;
    });
  });

  it('should err out, if doesnt exist', () => {
    fileMd = 'test.md';
    fileHandler.deleteFile(fileMd, config, (err, result) => {
      expect(err).to.exist;
      expect(result).to.be.null;
    });
  });

  it('should delete the file, if the settings are valid', () => {
    fileHandler.deleteFile(path.join(config.post.dir, 'test.md'), config, (err, result) => {
      expect(err).to.be.null;
      expect(result).to.exist;
      expect(result).to.be.equal('Deleted.');
    });
  });

  afterEach(() => {
    fs.unlinkSync(path.join(config.post.dir, 'test.txt')); // cleanup
  });
});
