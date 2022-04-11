'use strict';
const mongoose = require('mongoose');

// creo el esquema
const usuarioSchema = mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
});
// crteo el modelo
const Usuario = mongoose.model('Usuario', usuarioSchema);
// exporto el modelo

module.exports = Usuario;
