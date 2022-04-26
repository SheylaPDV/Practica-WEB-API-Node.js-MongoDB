"use strict";

const connectionPromise = require("./connectAMQP");

// Aqui damos el nombre a la cola
const QUEUE_NAME = "tareas";
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Aqui se publican lkos mensajes
async function main() {

  // conectar al servidor AMQP (RabbitMQ)
  const connection = await connectionPromise;

  // conectar a un canal(el metodo createChannel, es un canal de comunicacion con el servidor de la nube, pero no crea nada)
  const canal = await connection.createChannel();

  // asegurar que existe una cola (si no existe que la cree,)
  await canal.assertQueue(QUEUE_NAME, {
    durable: true,
  });

  // cuantos mensajes voy a procesar en paralelo(prefetch es limitado y 1 a 1 mensaje en paralelo)
  // canal.prefetch(1);

let sendAgain = true;

  while (true) {

    //si no pùedo mandar mas porquie el buffer esta lleno:
    if(!sendAgain) {
      console.log('Buffer lleno, Esperando a evento drain');
      // parar hasta que ocurra el evento drain (en el momento que salte el canal drain, se resuelve) ej: para evitar que se llene el embudo y se derrame
      await new Promise(resolve => canal.on('drain', resolve))
    }
    // enviar un mensaje al worker
    const message = {
      nombre: "tarea a realizar numero " + Date.now(),
    };
    //  a que cola lo vamos a mandar con sendToQueue: (nombre de cola, contenido (darle formato texto, buena practica ),objeto de opciones )
    sendAgain = canal.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(message)), {
      persistent: true
    });
    console.log("publicando el mensaje", message.nombre);
    // await sleep(1000);
  }
}

//llamo a la funcion y si falla que llame a console.log con el error
main().catch((err) => console.log("Hubo un error", err)); 
