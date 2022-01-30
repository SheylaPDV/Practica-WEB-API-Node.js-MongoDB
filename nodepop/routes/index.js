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
      if (precio >= 0) {
        filtros.precio = { $gt: precio};
      }else{
        filtros.precio = { $lt: (precio * -1) };
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
  }

  res.render('index');
});


// // POST /routes/productos
// // Esto crea un nuevo producto desde postman

router.post('/', async (req, res, next) => {
  try {
      const nuevoProducto = "req.body;"

      // Creo un objeto de agente EN MEMORIA
      const producto = new Producto(nuevoProducto);

      // Guardando nuevo producto
      const productoGuardado = await producto.save();

      // respondo
      res.status(201).json({ results: productoGuardado });

  } catch (err) {
      next(err);
  }
});

// // GET /routes/productos
// devuelve un agente por id

router.get('/:id', async (req, res, next) => {

    try {
        const id = req.params.id;

        const producto = await Producto.findOne({ _id: id })

        agente.saluda();
        res.json({ results: producto });
    } catch (err) {
        next(err)
    }
});

module.exports = router;
