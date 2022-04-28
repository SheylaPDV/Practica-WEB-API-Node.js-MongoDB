"use strict";
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const emailTransportConfigure = require("../data/emailTransportConfigure");
// const {Requester} = require('cote')

// CREAMOS REQUESTER CON NOMBRE NODEAPP
// const requester = new Requester({name: nodeapp});

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

// ----------------------------------------------------------------------------------------------------------------
// ENVIAR EMAIL AL USUARIO

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
//   console.log("Message sent: %s", result.messageId);
//   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(result));
//   return result;
// };

// // recibo cuerpo y asunto en la funcion asincrona
// usuarioSchema.methods.enviarEmailConMicroservicio = async function (
//   asunto,
//   cuerpo
// ) {
//   // pedimos a la nube de microservicios
//   const evento = {
//     type: "enviar email",
//     // pasamos parametros
//     from: process.env.EMAIL_SERVICE_FROM,
//     to: this.email,
//     subject: asunto,
//     html: cuerpo,
//   };
//   // esta nueva promesa tendria un resolve y lo que haria es requester.send del evento y en la funcion donde recibe el resultado ponemos resolve, y asi llame a resolve y resuelve la promesa
//   return new Promise((resolve, reject) =>
//     requester.send(evento, (err, resultado) => {
//       if (err) {
//         const error = new Error(err.message);
//         //  si no devuelve el email, error
//         error.status = 500;
//         reject(err);
//         return;
//       }
//       resolve(resultado);
//     })
//   );
// };

// ------------------------------------------------------------------------------------------------------------------

// CREO MODELO
const Usuario = mongoose.model("Usuario", usuarioSchema);

// EXPORTO EL MODELO
module.exports = Usuario;
