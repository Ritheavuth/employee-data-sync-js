const { Client } = require("pg");

const dbConfig = {
  host: "employee-db.cb1nrnmeyfto.us-east-1.rds.amazonaws.com",
  port: 5432,
  database: "employee_db",
  user: "paylessgate",
  password: "admin123",
};

var client = new Client(dbConfig);

client
  .connect()
  .then(() => console.log("Connected"))
  .catch((err) => console.log("connect error", err.stack));

// CREATE NEW RECORD

function create_record(name, age) {
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