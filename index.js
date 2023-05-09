const { retrieve_all } = require("./src/services/postgres");
const { list_record } = require("./src/services/airtable");

async function compare_data() {
  // Connect to Airtable and retrieve data
  const airtableData = await list_record().then(function (result) {
    console.log(result);
  });

  // Connect to PostgreSQL and retrieve data
  const postgresData = await retrieve_all();

  // Compare data
  const airtableDataStr = JSON.stringify(airtableData);
  const postgresDataStr = JSON.stringify(postgresData.rows);
  if (airtableDataStr === postgresDataStr) {
    console.log("Data is identical");
  } else {
    console.log("Data is different");
  }
}

compare_data();
