'use strict';

require('dotenv').config();
//  para conectar libreria amqplib
const amqplib = require('amqplib'); // si quereis usar callbacks: require con esto: amqplib/callback_api
// conectamos con la url que hemos pegado en .env desde rabbit
console.log('la variable vale:', "")
const connectionPromise = amqplib.connect("amqps://kqbokphw:uL098rhY6Mly7qw18gNy5B2ZqBQkBy9q@stingray.rmq.cloudamqp.com/kqbokphw");

module.exports = connectionPromise;
