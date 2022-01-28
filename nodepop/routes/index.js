'use strict';

var express = require('express');
var router = express.Router();
const Producto = require('../modelos/Producto');

/* GET home page. */
router.get('/', async function (req, res, next) {

  res.locals.tituloProductos = 'LISTA DE PRODUCTOS:';

  try {
    const nombre = req.query.nombre;
    const precio = req.query.precio;
    const venta = req.query.venta;
    const tags = req.query.tags;
    const foto = req.query.foto;
    const skip = req.query.skip;
    const limit = req.query.limit;
    const select = req.query.select;
    const sort = req.query.sort;

    const filtros = {};

    if (nombre) {
      //filtros.nombre = nombre;
      filtros.nombre = new RegExp('^' + req.query.nombre, "i");
      console.log("Filtros" + filtros)
    }
    if (precio) {
      filtros.precio = precio;
    }
    if (venta) {
      filtros.venta = venta;
    }
    if (tags) {
      filtros.tags = tags;
    }
    if (foto) {
      filtros.foto = foto;
    };

    const productos = await Producto.lista(filtros, skip, limit, select, sort);
    res.locals.productos = productos;
    
  } catch (err) {
    next(err);
  }

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
