const { Client } = require("pg");
const axios = require("axios");
require("dotenv").config();

const dbConfig = {
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  database: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
};

var client = new Client(dbConfig);

client.connect().then(() => console.log('Connected')).catch((err) => console.log('connect error', err.stack))
