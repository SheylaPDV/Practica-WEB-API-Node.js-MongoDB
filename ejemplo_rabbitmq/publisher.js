'use strict';

const connectionPromise = require('./connectAMQP');

const QUEUE_NAME = 'tareas';
async function main() {
  // conectar alk servidor AMQP (RabbitMQ)

  const connection = await connectionPromise;
  // conectar a un canal

  const canal = await connection.createChannel();
  // asegurar que existe una cola (si no existe que la cree, y si no, no pasa nada)

  await canal.assertQueue(QUEUE_NAME, {});
  // enviar un mensaje al worker

  const message = {
    nombre: 'tarea a realizar numero ' + Date.now(),
  };

  canal.sendToQueue(QUEUE_NAME, Buffer.from());
}

main().reject((err) => console.log('Hubo un error', err)); //llamo a la funcion y si hay un error
