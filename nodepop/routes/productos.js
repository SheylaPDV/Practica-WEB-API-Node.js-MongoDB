'use strict';

// Importo librerias
const express = require('express');
const router = express.Router();
const Producto = require('../modelos/Producto');

// GET /routes/productos 
// (peticion para qe devuelva una lista de productos)

router.get('/', async (req, res, next) => {

    try {
        const name = req.query.name;
        const precio = req.query.precio;
        const skip = req.query.skip;
        const limit = req.query.limit;
        const select = req.query.select;
        const sort = req.query.sort;

        const filtros = {};

        if (name) {
            filtros.name = name;
        }
        if (precio) {
            filtros.precio = precio;
        }

        const productos = await Producto.lista(filtros, skip, limit, select, sort);

        res.json({ results: productos })
    } catch (err) {
        next(err);
    }
});
// GET /routes/productos
// devuelve un agente por id

// router.get('/:id', async (req, res, next) => {

//     try {
//         const id = req.params.id;

//         const producto = await Producto.findOne({ _id: id })

//         agente.saluda();
//         res.json({ results: producto });
//     } catch (err) {
//         next(err)
//     }
// });

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

// // DELETE /routes/productos/:id
// // Elimina producto desde postman

// router.delete('/:id', async (req, res, next) => {
//     try {
//         const id = req.params.id;

//         await Producto.deleteOne({ _id: id });

//         res.json();
//     } catch (err) {
//         next(err);
//     }
// })

// // PUT routes/productos:id
// // Actualizar producto

// router.put('/:id', async (req, res, next) => {
//     try {
//         const id = req.params.id;
//         const productoData = req.body;

//         const productoActualizado = await Producto.findByIdAndUpdate(id, productoData, {
//             new: true //esta opcion es para que nos devuelva el estado final del documento modificado
//         });
//         res.json({ results: productoActualizado });
//     } catch (err) {
//         next(err);
//     }
// });

module.exports = router;