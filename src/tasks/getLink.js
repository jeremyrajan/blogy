module.exports = (title) => {
  return title.replace(/\d{1,4}[\-|\.|\/]\d{1,2}[\-|\.|\/]\d{2,4}[\-|\.|\/]\d{1,2}[\:]\d{1,2}[\:]\d{1,2}-/, '').replace('.md', ''); // eslint-disable-line
};
