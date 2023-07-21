const express = require("express");
const sql = require("../models/db");
const router = express.Router();
const fetch = require("node-fetch").default;
var Airtable = require("airtable");
var config = require("../config/airtable.config");
const Employee = require("../models/employee.model");

var base = new Airtable({ apiKey: config.APIKEY }).base(config.BASE_ID);

const synchronizeRecords = async () => {
  try {
    const airtableRecords = await base(config.TABLE_NAME).select().all();
    const mysqlRecords = await Employee.findAll();
    const recordsToInsert = [];
    const recordsToUpdate = [];
    const recordsToDelete = [];
    airtableRecords.forEach((airtableRecord) => {
      const airtableUniqueId = airtableRecord.get(
        config.UNIQUEIDENTIFIERCOLUMN
      );

      const matchingMySQLRecord = mysqlRecords.find(
        (mysqlRecord) => mysqlRecord.EmployeeNumber === airtableUniqueId
      );

      if (matchingMySQLRecord) {
        // Record exists in both Airtable and MySQL
        // Compare field values and add to recordsToUpdate if there are differences
        if (shouldUpdateRecord(airtableRecord, matchingMySQLRecord)) {
          recordsToUpdate.push(airtableRecord);
        }
      } else {
        // Record exists in Airtable but is missing in MySQL
        // Add to recordsToInsert
        recordsToInsert.push(airtableRecord);
      }

      // Check if MySQL record exists but not in Airtable
      mysqlRecords.forEach((mysqlRecord) => {
        const matchingAirtableRecord = airtableRecords.find(
          (record) =>
            record.get(config.UNIQUEIDENTIFIERCOLUMN) ===
            mysqlRecord.EmployeeNumber
        );

        if (!matchingAirtableRecord) {
          // Record exists in MySQL but is missing in Airtable
          // Add to recordsToDelete
          recordsToDelete.push(mysqlRecord);
        }
      });
    });

    // Perform the necessary operations in MySQL
    insertRecords(recordsToInsert);
    updateRecords(recordsToUpdate);
    deleteRecords(recordsToDelete);
  } catch (error) {
    console.error("Error occurred during synchronization:", error);
  }
};

function shouldUpdateRecord(airtableRecord, mysqlRecord) {
  // Get field names of the Airtable record
  const airtableFields = Object.keys(airtableRecord.fields);

  // Iterate over each field
  for (let i = 0; i < airtableFields.length; i++) {
    const fieldName = airtableFields[i];
    const airtableValue = airtableRecord.get(fieldName);
    const mysqlValue = mysqlRecord[fieldName];

    // Compare field values
    if (airtableValue !== mysqlValue) {
      return true; // Record should be updated
    }
  }

  return false; // Record does not need to be updated
}

// Function to insert records
function insertRecords(recordsToInsert) {
  recordsToInsert.forEach((record) => {
    const newEmployee = new Employee(record.fields);
    Employee.insert(newEmployee)
      .then((result) => {
        return
      })
      .catch((error) => {
        console.error("Error inserting employee:", error);
      });
  });
}

// Function to update records
function updateRecords(recordsToUpdate) {
  recordsToUpdate.forEach((record) => {
    const { EmployeeNumber, ...updatedFields } = record.fields;
    Employee.update(EmployeeNumber, updatedFields)
      .then((result) => {
        return
      })
      .catch((error) => {
        console.error("Error updating employee:", error);
      });
  });
}

// Function to delete records
function deleteRecords(recordsToDelete) {
  recordsToDelete.forEach((record) => {
    const { EmployeeNumber } = record;
    Employee.remove(EmployeeNumber)
      .then((result) => {
        return
      })
      .catch((error) => {
        console.error("Error deleting employee:", error);
      });
  });
}

module.exports = synchronizeRecords;
