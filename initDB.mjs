"use strict";

import "./loadEnv.mjs";
import fsPromise from "fs/promises";
import readline from "readline";
// conexion a la base de datos
import dbConnection from "./data/conexion_mongoDB.js";
// const productoData = require('./productos.json')

// cargar modelos

import Producto from "./models/Producto.js";
import Usuario from "./models/Usuario.js";
import { resolve } from "path";

async function main() {
  // inicializar productos
  await initProductos();

  // incializar usuarios
  await initUsuarios();

  // desconectar la BD
  dbConnection.close();
}

async function initUsuarios() {
  //borrar los usuarios existentes
  const deleted = await Usuario.deleteMany();
  console.log(`Eliminados ${deleted.deletedCount} usuarios`);

  //crear usuarios de nuevo
  const usuarios = await Usuario.insertMany([
    //insertMany: pora insertar en DB
    {
      email: "admin@example.com",
      password: await Usuario.hashPassword("1234"),
    },
    {
      email: "user@example.com",
      password: await Usuario.hashPassword("1234"),
    },
  ]);
  console.log(`Creados ${usuarios.length} usuarios`);
}

main().catch((err) => console.log("Hubo un error", err));

async function initProductos() {
  // borrar todos los  productos que haya en la coleccion
  const deleted = await Producto.deleteMany();
  console.log(`Eliminados ${deleted.deletedCount} productos`);

  const data = await fsPromise.readFile("productos.json", "utf-8");
  const productoData = JSON.parse(data);

  // crear productos inciales de nuevo
  const productos = await Producto.insertMany(productoData);
  console.log(`Creados ${productos.length} productos`);
}
// confirmar con pregunta si borrar BD
function pregunta(texto) {
  return new Promise((resolve, reject) => {
    //conectar readline a la consola
    const rl = readline.createInterface({
      input: procces.stdin,
      output: process.stdout,
    });
    //hacemos pregunta
    rl.question(texto, (respuesta) => {
      rl.close();
      if (respuesta.toLowerCase() === "si") {
        resolve(true);
        return;
      }
      resolve(false);
    });
  });
}
