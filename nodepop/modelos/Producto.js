'use strict';

const mongoose = require('mongoose');

// definir un esquema)
const anuncioSchema = mongoose.Schema({
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [String]
}, {
    collection: 'productospop'
})

// creo el modelo con ese esquema
const Productospop = mongoose.model('Productospop', anuncioSchema);

// opcional exportar modelo
module.exports = Productospop;