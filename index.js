const express = require("express");
const serverless = require("serverless-http");

const app = express();
const fs = require('fs');
const path = require('path');
const fetch = require("node-fetch").default;
const config = require("./src/config/airtable.config")


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Enable CORS
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Routes

const auth_airtableRoutes = require("./src/routes/auth_airtable.routes");
const airtable_routes = require("./src/routes/airtable.routes")
const synchronizeRecords = require("./src/routes/new_sync.routes");
app.use("/auth", auth_airtableRoutes);
app.use("/airtable", airtable_routes);

const timestampFilePath = path.join(__dirname, 'lastSyncTimestamp.txt');

function readLastSyncTimestamp() {
  try {
    const timestamp = fs.readFileSync(timestampFilePath, 'utf8');
    return parseInt(timestamp);
  } catch (error) {
    return 0;
  }
}

// Function to write the last synchronization timestamp to the file
function writeLastSyncTimestamp(timestamp) {
  fs.writeFileSync(timestampFilePath, timestamp.toString(), 'utf8');
}


app.listen(5001, () => {
  console.log("Listening on Port 5001");
});

setInterval(async () => {
  const response = await fetch(
    "https://api.airtable.com/v0/bases/appI1LPBCtqT1pNPV/webhooks/ach3zwYwB7ELx2U0I/payloads",
    {
      headers: {
        Authorization: `Bearer ${config.APIKEY}`,
        "Content-Type": "application/json",
      },
    }
  );
  if (response.ok) {
    const data = await response.json();
    const payloads = data.payloads
    const arrayTimestamp = payloads.map(obj => obj["timestamp"])
    const latestTimestamp = new Date(Math.max(...arrayTimestamp.map(timestamp => new Date(timestamp))));
    const check = latestTimestamp <= readLastSyncTimestamp
    if (latestTimestamp <= readLastSyncTimestamp()) {
      return
    } else {
      synchronizeRecords();
      writeLastSyncTimestamp(latestTimestamp)
    }
  }
}, 2000)

// module.exports.handler = serverless(app)
