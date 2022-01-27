'use strict';

const { text } = require('express');
const fsPromise = require('fs/promises');
const readline = require('readline');
// conexion a la base de datos
const dbConnection = require('./data/conexion_mongoDB');
// const productoData = require('./productos.json')

// cargar modelos
const Producto = require('./modelos/Producto');

dbConnection.once('open', () => {
    main().catch(err => console.log('Hubo un error', err));
})

async function main() {

const borrar = await pregunta('¿Estas seguro de que quieres borrar la BD? ')
if(!borrar) {
    process.exit(0);
}

// inicializar productos
await initProductos();

// desconectar la BD
dbConnection.close();
}


async function initProductos() {
    // borrar todos los documentos de productos que haya en la coleccion 
    const deleted = await Producto.deleteMany();
    console.log(`Eliminados ${deleted.deletedCount} productos`);

    const data = await fsPromise.readFile('productos.json', 'utf-8');
    const productoData = JSON.parse(data);
    // crear productos inciales

const productos = await Producto.insertMany(productoData);
console.log(`Creados ${productos.length} productos`);
}

function pregunta(texto) {
    return new Promise((resolve, reject) => {
        // conectar readline a la consola
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        // hacemos la pregunta
        rl.question(texto, respuesta => {
            rl.close();
            if (respuesta.toLowerCase() === 'si') {
                resolve(true);
                return;
            }
            resolve(false);
        })
    })
}