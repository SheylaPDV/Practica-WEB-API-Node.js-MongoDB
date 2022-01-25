var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  res.locals.productos = 'LISTA DE PRODUCTOS:';
  res.locals.usuarios = [
    { nombre: 'Sheyla', edad: 30}
  ];
  res.render('index');
});

module.exports = router;
