'use strict';

const express = require('express');

const router = express.Router();
const Producto = require('../modelos/Producto');

// GET /api/productos (peticion para qe dvuelva una lista de productos)

router.get('/', async (req, res, next) => {

    try {

    const productos = await Producto.find();

    res.json({ results: productos })

    } catch (err) {
    next(err);
    }
});

module.exports = router;