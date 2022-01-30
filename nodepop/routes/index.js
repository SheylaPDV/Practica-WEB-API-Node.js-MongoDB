'use strict';

var express = require('express');
var router = express.Router();
const Producto = require('../modelos/Producto');

/* GET página inicio */
router.get('/apiv1/anuncios', async function (req, res, next) {

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
      filtros.nombre = new RegExp('^' + req.query.nombre, "i");
      console.log("Filtros" + filtros)
    }
    if (precio) {
      if (precio < 0) {
        filtros.precio = { $lte: (precio * -1) };
      } else {
        filtros.precio = precio;
      }
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
  };

  res.render('index');
});

module.exports = router;
