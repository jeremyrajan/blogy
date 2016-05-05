const blogy = require('blogy');
const config = require('./config');

blogy.start(config, (err, result) => {
  console.log(`BlogY server started at ${config.connection.port}`);
});
