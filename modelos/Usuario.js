'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const emailTransportConfigure = require('../data/emailTransportConfigure');

// creo el esquema
const usuarioSchema = mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
});
// metodo estatico
usuarioSchema.statics.hashPassword = function (passwordEnClaro) {
  return bcrypt.hash(passwordEnClaro, 7);
};
// metodo de instancia
usuarioSchema.methods.comparePassword = function (passwordEnClaro) {
  return bcrypt.compare(passwordEnClaro, this.password);
};

// usuarioSchema.methods.enviarEmail = async function (asunto, cuerpo) {
//   // crear el transport
//   const transport = await emailTransportConfigure();
//   // enviar el email
//   const result = await transport.sendMail({
//     from: process.env.EMAIL_SERVICE_FROM,
//     to: this.email,
//     subject: asunto,
//     html: cuerpo,
//   });
//   console.log('Message sent: %s', result.messageId);
//   console.log('Preview URL: %s', nodemailer.getTestMessageUrl(result));
//   return result;
// };
// creo el modelo
const Usuario = mongoose.model('Usuario', usuarioSchema);
// exporto el modelo

module.exports = Usuario;
