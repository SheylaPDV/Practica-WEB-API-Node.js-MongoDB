'use strict';

const express = require('express');

const router = express.Router();
const Producto = require('../modelos/Producto');

// GET /routes/productos 
// (peticion para qe devuelva una lista de productos)

router.get('/', async (req, res, next) => {

    try {

        const productos = await Producto.find();

        res.json({ results: productos })

    } catch (err) {
        next(err);
    }
});

// GET /routes/productos
// devuelve un agente por id

router.get('/:id', async (req, res, next) => {

    try {
        const id = req.params.id;

        const producto = await Producto.findOne({ _id: id })
        res.json({ results: producto });
    } catch (err) {
        next(err)
    }
});

// POST /routes/productos
// Esto crea un nuevo producto desde postman

router.post('/', async (req, res, next) => {
    try {
        const nuevoProducto = req.body;

        // Creo un objeto de agente EN MEMORIA
        const producto = new Producto(nuevoProducto);

        // Guardando nuevo producto
        const productoGuardado = await producto.save();

        // respondo
        res.status(201).json({ results: productoGuardado });

    } catch (err) {
        next(err);
    }
})

module.exports = router;