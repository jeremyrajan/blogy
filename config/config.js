module.exports = {
  dir: `${process.cwd()}/templates/default`,
  timestamp: 'YYYY-MM-DD', // this is used to create post URL.
  ops: ['create', 'delete'],
  types: ['page', 'post'],
  postDir: `${process.cwd()}/data/posts`,
  pageDir: `${process.cwd()}/data/pages`,
  dataDir: `${process.cwd()}/data`,
  port: 3000
};
