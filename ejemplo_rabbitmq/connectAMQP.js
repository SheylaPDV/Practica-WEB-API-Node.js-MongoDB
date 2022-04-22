'use strict';

require('dotenv').config();

const amqplib = require('amqplib'); // si quereis usar callbacks: require con esto: amqplib/callback_api

const connectionPromise = amqplib.connect(process.env.RABBITMQ_URL);

module.exports = connectionPromise;
