module.exports = (text) => {
  return text.replace(/\d{1,4}[\-|\.|\/]\d{1,2}[\-|\.|\/]\d{2,4}-/, '').replace('.md', '').replace(/-/g, ' ');
};
