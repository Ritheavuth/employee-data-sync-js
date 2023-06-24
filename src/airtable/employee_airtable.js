// import fetch from "node-fetch";
// const axios = require("axios");
const fetch = require("node-fetch").default;

// DECLARE VARIABLES
const AIRTABLE_BASE_URL = "https://api.airtable.com/v0/";
const BASE_ID = "app0IJRrEst11dBaC";
const TABLE_ID = "tbl1WCkNbq6JO3gT2";
const TOKEN = "keycrr0KD1OuoMzek";

// RETRIEVE SPECIFIC RECORD
async function retrieve_record(recordId) {
  const api_url = AIRTABLE_BASE_URL + `${BASE_ID}/${TABLE_ID}/${recordId}`;
  const response = await fetch(api_url, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  if (response.status === 200) {
    const data = await response.json();
    return data;
  }
  return "ERROR: Couldn't retrieve data from record id " + recordId;
}

// LIST All RECORDS
async function list_record() {
  const api_url = AIRTABLE_BASE_URL + `${BASE_ID}/${TABLE_ID}`;
  const response = await fetch(api_url, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  if (response.status === 200) {
    const data = await response.json();
    return data;
  }
  return "ERROR: Couldn't retrieve data from table id " + TABLE_ID;
}

// UPDATE SPECIFIC RECORD
async function update_record(recordId, fields) {
  const api_url = AIRTABLE_BASE_URL + `${BASE_ID}/${TABLE_ID}/${recordId}`;
  const response = await fetch(api_url, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify(fields),
  });
  if (response.status === 200) {
    const data = await response.json();
    return data;
  }
  return "ERROR: Couldn't update data to record id " + recordId;
}

// UPDATE MULTIPLE RECORDS
async function update_multi_record(records) {
  const api_url = AIRTABLE_BASE_URL + `${BASE_ID}/${TABLE_ID}`;
  const response = await fetch(api_url, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify(records),
  });
  if (response.status === 200) {
    const data = await response.json();
    return data;
  }
  return "ERROR: Couldn't update record to table id " + TABLE_ID;
}

// CREATE RECORD
async function create_record(records) {
  const api_url = AIRTABLE_BASE_URL + `${BASE_ID}/${TABLE_ID}`;
  const response = await fetch(api_url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify(records),
  });
  if (response.status === 200) {
    const data = await response.json();
    return data;
  }
  return "ERROR: Couldn't create record to table id " + TABLE_ID;
}

// DELETE SPECIFIC RECORD
async function delete_record(recordId) {
  const api_url = AIRTABLE_BASE_URL + `${BASE_ID}/${TABLE_ID}/${recordId}`;
  const response = await fetch(api_url, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  if (response.status === 200) {
    const data = await response.json();
    return data;
  }
  return "ERROR: Couldn't delete record from record id " + recordId;
}

// DELETE MULTIPLE RECORDS
async function delete_multi_record(records) {
  const api_url =
    AIRTABLE_BASE_URL +
    `${BASE_ID}/${TABLE_ID}?records=` +
    records.join("&records=");
  console.log(api_url);
  const response = await fetch(api_url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  console.log(response.status);
  if (response.status === 200) {
    const data = await response.json();
    return data;
  }
  return "ERROR: Couldn't delete records from table id " + TABLE_ID;
}

// RETREIVE SPECIFIC RECORD FROM RECORD_ID = "recd0djStSULZusSh"
// retrieve_record("recd0djStSULZusSh").then(function(result) {
//     console.log(result)
// })

// LIST RECORDS FROM TABLE_ID = "tbl1WCkNbq6JO3gT2"
// list_record().then(function(result) {
//     console.log(result)
// })

// UPDATE SPECIFIC RECORD TO RECORD_ID = "recd0djStSULZusSh"
// const fields = {
//     "fields": {
//         "Work contents": "Backend Developer"
//     }
// }
// update_record("recd0djStSULZusSh", fields).then(function(result) {
//     console.log(result)
// })

// UPDATE MULTIPLE RECORD TO TABLE_ID = "tbl1WCkNbq6JO3gT2"
// const records = {
//     "records": [
//         {
//             "fields": {
//                 "Name": "Vuth",
//                 "Work contents": "Developer"
//             },
//             "id": "recArHI6zCvlILwEA"
//         }
//     ]
// }
// update_multi_record(records).then(function(result) {
//     console.log(result)
// })

// CREATE RECORDS TO TABLE_ID = "tbl1WCkNbq6JO3gT2"
// const records = {
//     "records": [
//       {
//         "fields": {
//             "Name": "Sky",
//             "Work contents": "Developer"
//         }
//       },
//       {
//         "fields": {
//             "Name": "Rose"
//         }
//       }
//     ]
// }

// create_record(records).then(function(result) {
//     console.log(result)
// })

// DELETE MULTI_RECORDS FROM TABLE_ID = "tbl1WCkNbq6JO3gT2"
// const records = ["recF67CX8EdI2IaxC", "recGLPvTmxyrXTuYH"]
// delete_multi_record(records).then(function(result) {
//     console.log(result)
// })

// DELELTE SPECIFIC_RECORDS FROM RECORD_ID = "recBPKDCEU12bPbxX"
// delete_record("recBPKDCEU12bPbxX").then(function(result) {
//     console.log(result)
// })

module.exports = {
  retrieve_record,
  list_record,
  update_record,
  update_multi_record,
  create_record,
  delete_record,
  delete_multi_record,
};
