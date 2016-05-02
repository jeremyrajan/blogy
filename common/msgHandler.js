const chalk = require('chalk');

const msgHandler = (message, type) => {
  if (!message) {
    return;
  }
  switch (type) {
    case 'err':
      console.log(chalk.red(message));
      break;
    case 'warn':
      console.log(chalk.yellow(message));
      break;
    case 'success':
      console.log(chalk.green(message));
      break;
    default:
      console.log(chalk.blue(message));
      break;
  }
};

module.exports = msgHandler;
