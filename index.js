const express = require('express');
const exphbs = require('express-handlebars');
const config = require('./config');
const compiler = require('./src/compilers');
const tasks = require('./src/tasks');
const path = require('path');

const init = (config, callback) => {
  const app = express();
  app.set('views', config.template.dir);
  app.use(express.static(config.template.public));

  app.engine('.hbs', exphbs({
    layoutsDir: config.template.dir,
    defaultLayout: config.template.layout,
    extname: '.hbs'
  }));
  app.set('view engine', '.hbs');
  app.locals.config = config; // set config as global, to be accessed in layouts/posts/pages

  app.get('/', (req, res) => {
    const posts = tasks.getPosts(config.post);
    res.render('home', { posts: posts });
  });

  app.get('/*', (req, res) => {
    const param = req.params[0];
    compiler.type(param, (err, result) => {
      if (result.type) {
        res.render(result.type, {
          body: compiler.parse(result.file),
          title: tasks.getTitle(path.basename(result.file)),
          date: tasks.getDate(path.basename(result.file), config.post.displayDate)
        });
      } else {
        res.render('404');
      }
    });
  });
  app.listen(config.connection.port);
  callback();
};

module.exports = {
  start: init
};
