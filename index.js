const express = require('express');
const exphbs = require('express-handlebars');
const config = require('./config/config');
const compiler = require('./compilers');

const app = express();
app.set('views', config.dir);
app.use(express.static(`${config.dir}/public`));

app.engine('.hbs', exphbs({
  layoutsDir: config.dir,
  defaultLayout: 'layout',
  extname: '.hbs'
}));
app.set('view engine', '.hbs');

app.get('/', (req, res) => {
  res.render('home');
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


app.listen(config.port);
