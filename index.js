const express = require('express');
const exphbs = require('express-handlebars');
const config = require('./config');
const compiler = require('./compilers');
const tasks = require('./tasks');

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
        data: compiler.parse(result.file)
      });
    } else {
      res.render('404');
    }
  });
});


app.listen(config.connection.port);
