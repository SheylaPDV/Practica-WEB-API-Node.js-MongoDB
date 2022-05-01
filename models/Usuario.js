"use strict";
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const emailTransportConfigure = require("../data/emailTransportConfigure");

// CREO EL ESQUEMA
const usuarioSchema = mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
});
// METODO ESTATICO
usuarioSchema.statics.hashPassword = function (passwordEnClaro) {
  return bcrypt.hash(passwordEnClaro, 7);
};
// METODO DE INSTANCIA
usuarioSchema.methods.comparePassword = function (passwordEnClaro) {
  return bcrypt.compare(passwordEnClaro, this.password);
};

// CREO MODELO
const Usuario = mongoose.model("Usuario", usuarioSchema);

// EXPORTO EL MODELO
module.exports = Usuario;
