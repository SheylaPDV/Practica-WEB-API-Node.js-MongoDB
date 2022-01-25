'use strict';

// Cargo libreria de express
const libExpress = require('express');

// Crreo la aplicacion
const appExpress = libExpress();

//  ponemos metodos de la aplicacion
appExpress.get('/', (req, res, next) => { // req(objeto de la peticion) res(objeto de respuesta)
    console.log('recibo una petición a:', req.originalUrl);
    res.send('Hola');
});

// arrancamos la aplicacion
appExpress.listen(7000, () => {
    console.log('Servidor de HTTP arrancado en http://localhost:7000');
});