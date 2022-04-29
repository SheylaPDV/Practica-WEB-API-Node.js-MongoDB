var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const session = require("express-session");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const i18n = require("./data/i18nConfigure");
const sessionAuth = require("./data/sessionAuth");
const basicAuthMiddleware = require("./data/basicAuthMiddleware");
const MongoStore = require("connect-mongo");
var app = express();
const LoginController = require("./controllers/loginController");
const ProductsController = require("./controllers/productsController");
require("./data/conexion_mongoDB");
const loginController = new LoginController();
const productsController = new ProductsController();
const jwtAuth = require("./data/jwtAuth");
const multer = require("multer");

const storage = multer.diskStorage({
  // destination para guardar los ficheros que hagan upload
  destination: function (req, file, cb) {
    // aqui defino donde guardo los ficheros
    cb(null, "images/img_productos/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});
console.log(storage)
const upload = multer({ storage: storage });

// view engine setup
app.set("views", path.join(__dirname, "views")); //path.join dice que una esas dos directivas
app.set("view engine", "html"); //motor a utilizar de plantillas ejs
app.engine("html", require("ejs").__express); //que renderice con extension htmlk pero con motor ejs
app.locals.title = "NodePOP";

// esto son Middlewares de nuestra aplicacion(intermediarios)
// Los evalua Express ante cada peticion que recibe.

app.use(logger("dev")); //middleware de log(lo que aparece en la terminal)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "publicOne"))); //Middleware de estaticos
app.use(express.static(path.join(__dirname, "images")));

// /setup de i18n
// se encarga de coger la cabecera de la peticiion lenguagwe
app.use(i18n.init);

//Rutas de mi API
app.post("");
app.get("/api/anuncios", jwtAuth, productsController.index);
app.post(
  "/api/anuncios",
  jwtAuth,
  upload.single("foto"),
  productsController.post
);
app.post("/api/authenticate", loginController.postJWT);

// setup de sesiones del website
app.use(
  session({
    name: "nodeapp-session", //nombre de coockie que establecera
    secret: "dhfsd874rhfs7ugfcyurgefuy",
    saveUninitialized: true,
    resave: false, //fuerza a que una sesion se vuelva a salvar en un almacen de sesiones cuando la duracion nunca se ha modificado en la sesion
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 2, //la cookie expirara en 2 dias de inactividad
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_CONNECTION_STRING,
    }),
  })
);

// hacemos que req.session este disponible poRA LAS VISTAS
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});
// Rutas de mi website

app.use("/", indexRouter);
app.use("/users", usersRouter);

app.use("/change-locale", require("./routes/change-locale"));
// trae email y contraseña
app.get("/login", loginController.index);
// post login recoge email y contraseña yt verifica
// app.post('/login', loginController.post);
// cierra sesion
app.get("/logout", loginController.logout);
// para ir a privado se necesita authorizatrion y email + contraseña
// app.get('/privado', sessionAuth, productsController.index);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
