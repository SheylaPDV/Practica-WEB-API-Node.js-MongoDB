'use strict';

// Cargo libreria de express
const express = require('express');

// Creo la aplicación
const appExpress = express();

// Metodos de la aplicación
appExpress.use((req, res, next) => { // req:(objeto de la peticion) res:(objeto de respuesta)
    console.log('recibo una petición a:', req.originalUrl);
    next();
});

// Middlewares
appExpress.get('/pepe', (req, res, next) => {
    res.send('Soy Pepe');
})

// Arranco la aplicación
appExpress.listen(7000, () => {
    console.log('Servidor de HTTP arrancado en http://localhost:7000');
});