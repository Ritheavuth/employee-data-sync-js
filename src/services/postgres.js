const { Client } = require("pg");
import { dbConfig } from "../config/db";

var client = new Client(dbConfig);

client
  .connect()
  .then(() => console.log("Connected"))
  .catch((err) => console.log("connect error", err.stack));

// CREATE NEW RECORD

async function create_record(
  id,
  name,
  date_of_birth,
  address,
  phone,
  email,
  emergency_contact,
  emergency_person,
  date_of_employment,
  date_of_resignation,
  affiliation_fiscal_year,
  qualifications,
  work_contents
) {
  const query = {
    text: "INSERT INTO $1 (id, name, date_of_birth, address, phone, email, emergency_contact, emergency_person, date_of_employment, date_of_resignation, affiliation_fiscal_year, qualifications, work_content) VALUES ($2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)",
    values: [
      table_name,
      id,
      name,
      date_of_birth,
      address,
      phone,
      email,
      emergency_contact,
      emergency_person,
      date_of_employment,
      date_of_resignation,
      affiliation_fiscal_year,
      qualifications,
      work_contents,
    ],
  };

  try {
    const res = await client.query(query);
    console.log("New record created:", res.rows[0]);
  } catch (err) {
    console.error("Error creating record:", err);
  }
}

// DELETE RECORD

async function delete_record(table_name, id) {
  const query = {
    text: "DELETE FROM $1 WHERE id = $2",
    values: [table_name, id],
  };

  try {
    const res = await client.query(query);
    console.log(`Record with id ${id} deleted`);
  } catch (err) {
    console.error("Error deleting record:", err);
  }
}

// RETRIEVE ALL RECORDS

async function retrieve_all(table_name) {
  const query = {
    text: "SELECT * FROM $1",
    values: [table_name],
  };

  try {
    const res = await client.query(query);
    console.log(`Retrieved ${res.rowCount} records:`);
    console.log(res.rows);
  } catch (err) {
    console.error("Error retrieving records:", err);
  }
}

// UPDATE SPECIFIC RECORD

async function update_specific_record(
  table_name,
  id,
  name,
  date_of_birth,
  address,
  phone,
  email,
  emergency_contact,
  emergency_person,
  date_of_employment,
  date_of_resignation,
  affiliation_fiscal_year,
  qualifications,
  work_contents
) {
  const query = {
    text: "UPDATE $1 SET name = $3, date_of_birth = $4, address = $5, phone = $6, email = $7, emergency_contact = $8, emergency_person = $9, date_of_employment = $10, date_of_resignation = $11, affiliation_fiscal_year = $12, qualifications = $13, work_contents = $14 WHERE id = $2 ",
    values: [
      table_name,
      id,
      name,
      date_of_birth,
      address,
      phone,
      email,
      emergency_contact,
      emergency_person,
      date_of_employment,
      date_of_resignation,
      affiliation_fiscal_year,
      qualifications,
      work_contents,
    ],
  };
  try {
    const res = await client.query(query);
    console.log(`Record with id ${id} updated`);
  } catch (err) {
    console.error("Error updating record:", err);
  }
}

// RETRIEVE SPECIFIC RECORD

async function retrieve_specfic_record(table_name, id) {
  const query = {
    text: "SELECT * FROM $1 WHERE id = $2",
    values: [table_name, id],
  };

  try {
    const res = await client.query(query);
    console.log(`Retrieved ${res.rowCount} records:`);
    console.log(res.rows);
  } catch (err) {
    console.error("Error retrieving records:", err);
  }
}

module.exports = {
  create_record,
  retrieve_all,
  retrieve_specfic_record,
  update_specific_record,
  delete_record,
};
