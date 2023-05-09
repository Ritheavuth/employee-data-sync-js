const { Client } = require("pg");
const { dbConfig } =  require("../config/db");

var client = new Client(dbConfig);

client
  .connect()
  .then(() => console.log("Connected"))
  .catch((err) => console.log("connect error", err.stack));

// CREATE TABLE

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
    text: "INSERT INTO employee_table (id, name, date_of_birth, address, phone, email, emergency_contact, emergency_person, date_of_employment, date_of_resignation, affiliation_fiscal_year, qualifications, work_content) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)",
    values: [
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

async function delete_record(id) {
  const query = {
    text: "DELETE FROM employee_table WHERE id = $2",
    values: [id],
  };

  try {
    const res = await client.query(query);
    console.log(`Record with id ${id} deleted`);
  } catch (err) {
    console.error("Error deleting record:", err);
  }
}

// RETRIEVE ALL RECORDS

async function retrieve_all() {
  const query = {
    text: "SELECT * FROM employee_table",
  };

  try {
    const res = await client.query(query);
    console.log(`Retrieved ${res.rowCount} records:`);
    console.log(res.rows);
    return res
  } catch (err) {
    console.error("Error retrieving records:", err);
  }
}

// UPDATE SPECIFIC RECORD

async function update_specific_record(
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
    text: "UPDATE employee_table SET name = $2, date_of_birth = $3, address = $4, phone = $5, email = $6, emergency_contact = $7, emergency_person = $8, date_of_employment = $9, date_of_resignation = $10, affiliation_fiscal_year = $11, qualifications = $12, work_contents = $13 WHERE id = $1 ",
    values: [
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

async function retrieve_specfic_record(id) {
  const query = {
    text: "SELECT * FROM employee_table WHERE id = $1",
    values: [id],
  };

  try {
    const res = await client.query(query);
    console.log(`Retrieved ${res.rowCount} records:`);
    console.log(res.rows);
  } catch (err) {
    console.error("Error retrieving records:", err);
  }
}

// await create_record(
//   "employee_db",
//   "3",
//   "John Doe",
//   Date('2002-01-15'),
//   "Somewhere...",
//   "+85593857589",
//   "johndoe@gmail.com",
//   "+85592475848",
//   "Mother",
//   Date('2010-05-30'),
//   null,
//   null,
//   true,
//   "Something..."
// )

module.exports = {
  create_record,
  retrieve_all,
  retrieve_specfic_record,
  update_specific_record,
  delete_record,
};
