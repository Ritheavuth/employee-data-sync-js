const { dbConfig } = require("../config/db");

const { Client } = require("pg");

const client = new Client(dbConfig);

client.connect();

// Set up a listener for PostgreSQL changes\
function start_listener() {
  console.log("Listening ...");
  // Listen for PostgreSQL notifications
  client.query("LISTEN insert_notification");

  // Handle notification events
  client.on("notification", (notification) => {
    if (notification.channel === "insert_notification") {
      const payload = JSON.parse(notification.payload);
      console.log("Received notification:", payload);
      // Perform desired actions based on the received notification
    }
  });
}

module.exports = { start_listener };
