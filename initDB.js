'use strict';

const fsPromise = require('fs/promises');
// conexion a la base de datos
const dbConnection = require('./data/conexion_mongoDB');
// const productoData = require('./productos.json')

// cargar modelos
const Producto = require('./modelos/Producto');

async function main() {
  // inicializar productos
  await initProductos();

  // desconectar la BD
  dbConnection.close();
}

main().catch((err) => console.log('Hubo un error', err));

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
