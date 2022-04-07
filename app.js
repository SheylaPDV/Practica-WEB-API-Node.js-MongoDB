var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const i18n = require('./data/i18nConfigure');
var app = express();

require('./data/conexion_mongoDB');

// /setup de i18n
// se encarga de coger la cabecera de la peticiion lenguagwe

app.use(i18n.init);

// view engine setup
app.set('views', path.join(__dirname, 'views')); //path.join dice que una esas dos directivas
app.set('view engine', 'ejs'); //motor a utilizar de plantillas ejs

app.locals.title = 'NodePOP';

/***********/
// esto son Middlewares de nuestra aplicacion
// Los evalua Express ante cada peticion q ue recibe.
/***********/

app.use(logger('dev')); //middleware de log(lo que aparece en la terminal)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); //Middleware de estaticos

/**********/
//Rutas de mi API
/***********/

// app.use('/routes/productos', require('./routes/productos'));

/**********/
// Rutas de mi website
/**********/

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
