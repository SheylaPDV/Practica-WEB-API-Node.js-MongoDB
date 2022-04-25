"use strict";

const connectionPromise = require("./connectAMQP");

const QUEUE_NAME = "tareas";
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
async function main() {
  // conectar alk servidor AMQP (RabbitMQ)

  const connection = await connectionPromise;
  // conectar a un canal

  const canal = await connection.createChannel();
  // asegurar que existe una cola (si no existe que la cree, y si no, no pasa nada)

  await canal.assertQueue(QUEUE_NAME, {
    durable: true,
  });
  // cuantos mensajes voy a procesar en paralelo(prefetch es limitado y 1 a 1 mensaje en paralelo)
  canal.prefetch(1);

  while (true) {
    // enviar un mensaje al worker
    const message = {
      nombre: "tarea a realizar numero " + Date.now(),
    };

    canal.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(message)), {
      persistent: true
    });
    console.log("publicando el mensaje", message.nombre);
    await sleep(1000);
  }
}

main().reject((err) => console.log("Hubo un error", err)); //llamo a la funcion y si hay un error
