"use strict";

const connectionPromise = require("./connectAMQP");
const QUEUE_NAME = "tareas";

async function main() {
  //nos conectamos al servidor
  const connection = await connectionPromise;
  // se suscribe a una cola, y si no existe la crea
  const canal = await connection.createChannel();

  // nos aseguramos que la cola existe (QUEUE_NAME es el nombre de la cola)
  await canal.assertQueue(QUEUE_NAME, {});

  // cada vez que llegue un mensaje a esa cola que me he asegurado que existe, que me avise
  canal.consume(QUEUE_NAME, async (message) => {
    try {
      // proceso el mensaje
      await sleep(1000);
      //contenido del mensaje con content.toString lo paso a string
      console.log(message.content.toString);
      // confirmo que he procesado el mensaje(ack es coinfirmacion)
      canal.ack(message);
    } catch (error) {
      console.log("Error en el mensaje", message);
      // he falladoa al procesar ese mensaje(diferenciar si ha siodo un error operacional o no)
      canal.nack(message); //dead letter queue
    }
  });
}

main().catch((err) => console.log("hubo un error", err));
