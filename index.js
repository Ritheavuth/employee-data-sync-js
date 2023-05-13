const { create_record } = require("./src/services/postgres");
const { dbConfig } = require("./src/config/db");

const { Client } = require("pg");

const client = new Client(dbConfig);

client.connect();

client.query('LISTEN events');

client.on('notification', (notification) => {
  console.log('Received notification:', notification.payload);
  // Perform desired actions based on the received notification
});


setTimeout(() => {
  create_record(
    "E3",
    "Someone",
    new Date(2002, 11, 24),
    "Phnom Penh",
    "+855939456654",
    "someone@somewhere.com",
    "",
    "",
    new Date(2020, 10, 28),
    new Date(2050, 10, 28),
    30,
    true,
    "something"
  );
}, 7000);
