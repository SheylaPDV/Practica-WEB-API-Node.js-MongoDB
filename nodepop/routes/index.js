var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {

  res.locals.productos = 'LISTA DE PRODUCTOS:';
  
  res.render('index');
});

//pasar parametros en la ruta
// router.get('/talla/:talla/color/:color', (req, res, next) => {
//   const talla = req.params.talla;
//   const color = req.params.color;

// if (color != 'rojo') {
//   next(new Error('error, solo puedes usar rojo'));
//   return;
// }

//   console.log(req.params)

//   res.send(`ok, he recibido la talla ${talla} y el color ${color}`);
// })


module.exports = router;
