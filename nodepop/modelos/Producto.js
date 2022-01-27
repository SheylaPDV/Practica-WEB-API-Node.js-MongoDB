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
});

// metodo estatico del modelo
anuncioSchema.statics.lista = function(filtros) {
    return Productospop.find({filtros})
}

// creo el modelo con ese esquema
const Productospop = mongoose.model('Productospop', anuncioSchema);

// opcional exportar modelo
module.exports = Productospop;