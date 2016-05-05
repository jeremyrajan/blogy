const moment = require('moment');
module.exports = (title, format) => {
  const date = moment(title.match(/\d{1,4}[\-|\.|\/]\d{1,2}[\-|\.|\/]\d{2,4}[\-|\.|\/]\d{1,2}[\:]\d{1,2}[\:]\d{1,2}/), 'YYYY-MM-DD hh:mm:ss Z'); // eslint-disable-line
  return date.format(format);
};
