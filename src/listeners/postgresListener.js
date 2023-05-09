const { dbConfig } = require("../config/db");

const { Client } = require('pg')

const client = new Client(dbConfig);

client.connect();

// Set up a listener for PostgreSQL changes\
function start_listener() {
    console.log("Listening ...")
  client.query("LISTEN changes");
  client.on("notification", async (msg) => {
    console.log(msg.payload);
    console.log("Change detected")
  });
}

module.exports = {start_listener}