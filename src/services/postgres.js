const { Client } = require("pg");
import { dbConfig } from "../config/db";

var client = new Client(dbConfig);

client
  .connect()
  .then(() => console.log("Connected"))
  .catch((err) => console.log("connect error", err.stack));

// CREATE NEW RECORD

function create_record(table, name, age) {
  client.query();
}

// DELETE RECORD

function delete_record(name, age) {
  client.query()
}

// RETRIEVE ALL RECORDS

function retreive_all(table_name) {
  client.query("SELECT * FROM " + table_name)
}

// RETRIEVE SPECIFIC RECORDS

function retrieve_specfic_record(props) {
  client.query()
}