'use strict';

const mongoose = require('mongoose');

// definir un esquema)
const anuncioSchema = mongoose.Schema({
    nombre: { type: String, index: true },
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [String]
}, {
    collection: 'productospop'
});

// metodo estatico del modelo
anuncioSchema.statics.lista = function(filtros, skip, limit, select, sort) {
    
    const query = Productospop.find(filtros);
    query.skip(skip);
    query.limit(limit);
    query.select(select);
    query.sort(sort);
    return query.exec();
};
   

// creo el modelo con ese esquema
const Productospop = mongoose.model('Productospop', anuncioSchema);

// opcional exportar modelo
module.exports = Productospop;