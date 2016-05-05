const blogy = require('blogy');
const config = require('./config');

blogy.start(config, () => {
  console.log(`BlogY server started at ${config.connection.port}`);
});
