// 'use strict';

// //Sale ventanita cuando vas a acceder a cxrewar poroducto pidiendote estas credenciales si no no te deja entrare
// const basicAuth = require('basic-auth');

// module.exports = (usuarioPermitido) => {
//   return (req, res, next) => {
//     const userRequest = basicAuth(req);
//     if (
//       !userRequest ||
//       userRequest.name !== 'pepito' ||
//       userRequest.pass !== usuarioPermitido.pass
//     ) {
//       //esto es para sponer una cabecera en la respuesta
//       res.set('WWW-Authenticate', 'Basic realm=Authization Required');
//       res.sendStatus(401);
//       return;
//     }
//     //si las credenciales son pepito /1234 le dejo pàsar
//     next();
//   };
// };
