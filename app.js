var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const i18n = require('./data/i18nConfigure');
const sessionAuth = require('./data/sessionAuth');
const basicAuthMiddleware = require('./data/basicAuthMiddleware');
const MongoStore = require('connect-mongo');
var app = express();
const LoginController = require('./controllers/loginController');
const PrivadoController = require('./controllers/privadoController');
require('./data/conexion_mongoDB');
const loginController = new LoginController();
const privadoController = new PrivadoController();
const jwtAuth = require('./data/jwtAuth');
// view engine setup
app.set('views', path.join(__dirname, 'views')); //path.join dice que una esas dos directivas
app.set('view engine', 'html'); //motor a utilizar de plantillas ejs
app.engine('html', require('ejs').__express); //que renderice con extension htmlk pero con motor ejs
app.locals.title = 'NodePOP';

// esto son Middlewares de nuestra aplicacion
// Los evalua Express ante cada peticion q ue recibe.

app.use(logger('dev')); //middleware de log(lo que aparece en la terminal)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'publicOne'))); //Middleware de estaticos

// /setup de i18n
// se encarga de coger la cabecera de la peticiion lenguagwe
app.use(i18n.init);

//Rutas de mi API
app.use('/api/anuncios', jwtAuth, require('./routes/index'));
app.post('/api/authenticate', loginController.postJWT, );

// setup de sesiones del website
app.use(
  session({
    name: 'nodeapp-session', //nombre de coockie que establecera
    secret: 'dhfsd874rhfs7ugfcyurgefuy',
    saveUninitialized: true,
    resave: false, //fuerza a que una sesion se vuelva a salvar en un almacen de sesiones cuando la duracion nunca se ha modificado en la sesion
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 2, //la cookie expirara en 2 dias de inactividad
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_CONNECTION_STRING,
    }),
  }),
);

// hacemos que req.session este disponible poRA LAS VISTAS
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});
// Rutas de mi website

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use(
  '/features',
  // basicAuthMiddleware({
  //   name: 'pepito',
  //   pass: '1234',
  // }),
  require('./routes/features'),
);
app.use('/change-locale', require('./routes/change-locale'));
app.get('/login', loginController.index);
app.post('/login', loginController.post);
app.get('/logout', loginController.logout);
app.get('/privado', sessionAuth, privadoController.index);

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
