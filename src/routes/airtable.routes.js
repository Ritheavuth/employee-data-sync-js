const express = require('express');
const router = express.Router();
const fetch = require("node-fetch").default;

const Employee = require('../models/employee.model');
const update_multi_record = require('../airtable/employee_airtable').update_multi_record;
const create_record = require('../airtable/employee_airtable').create_record;

const AIRTABLE_BASE_URL = "https://api.airtable.com/v0/";
const BASE_ID = "appI1LPBCtqT1pNPV";
const TABLE_ID = "tbluaX7XZKk2uIbxr";

const TOKEN = "pat4LnrP0iHYxlxrz.0f4d87665a1863959a1aede7d4a88836a665c3bb0d14b65a8248d5821deb8bc4";

var api_url = AIRTABLE_BASE_URL + `${BASE_ID}/${TABLE_ID}`;


// create table 
router.post('/create-table' , async (req, res) => {
    api_url = AIRTABLE_BASE_URL + `${BASE_ID}/tables`;
    const fields = []
    var keys = []
    Employee.getAll(async(err, employees) => {
        if (err) {
            res.json({error: 'Failed to retrieve employees' , messasge : err , statusCode : 500})
        }
        keys  = Object.keys(employees[0])
        console.log(keys)
        fields.push(keys.map((key) => {
            return {
                "name": key,
                "type": "singleLineText"
            }
        }
        ))
    })
    const data = {
        "description": "A Sample Data",
        "fields": fields , 
        "name": "PaylessGate Employee Data"
      }
    const response = await fetch(api_url, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${TOKEN}`,
            "Content-type": "application/json",
        },
        body: JSON.stringify(data),
    });
    if (response.status === 200) {
        const data = await response.json();
        res.json(data);
    }
    else{
        res.json({error: 'Failed to create table asdas' , 
        statusCode : response.status , 
        messasge : response.statusText})

    }
})

// create field
router.post('/create-field' , async (req, res) => {
    api_url = AIRTABLE_BASE_URL + `${BASE_ID}/${TABLE_ID}/fields`;
    const fields = []
    var keys = []
    Employee.getAll(async(err, employees) => {
        if (err) {
            res.json({error: 'Failed to retrieve employees' , messasge : err , statusCode : 500})
        }
        keys  = Object.keys(employees[0])
        console.log(keys)
        fields.push(keys.map((key) => {
            return {
                "name": key,
                "type": "singleLineText"
            }
        }
        ))
    })
    const data = {
        "description": "A Sample Data",
        "fields": fields ,
        "name": "PaylessGate Employee Data"
        }
    const response = await fetch(api_url, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${TOKEN}`,
            "Content-type": "application/json",
        },
        body: JSON.stringify(data),
    });
    if (response.status === 200) {
        const data = await response.json();
        res.json(data);
    }
    else{
        res.json({error: 'Failed to create table asdas' ,
        statusCode : response.status ,
        messasge : response.statusText})

    }
})



// create record 
router.post('/', async (req, res) => {

    Employee.getAll(async(err, employees) => {

        if (err) {
            res.json({error: 'Failed to retrieve employees' , messasge : err})
        }
        const records2 = []
     employees.map((employee) => {
            records2.push(
             {
                fields: {
                    NameKanji: employee.NameKanji,
                  
                }
            }
            )
        })   
        console.log(records2) 
        const bodyContent1 = {
            records: [
              { fields: { NameKanji: 'Sato Hanako' } },
              { fields: { NameKanji: 'Tanaka Misaki' } },
              { fields: { NameKanji: 'Ito Yuma' } },
            
              { fields: { NameKanji: 'John Do ' } },
              { fields: { NameKanji: 'Jane Smith' } },
              { fields: { NameKanji: 'Alice Johnson' } },
              { fields: { NameKanji: 'Emily Brown' } },
              { fields: { NameKanji: 'Michael Johnson' } },
              { fields: { NameKanji: 'Sophia Lee' } },
              { fields: { NameKanji: 'David Kim' } },
              { fields: { NameKanji: 'David Kim' } },

              // Add more objects with ASCII values for NameKanji if needed
            ]
          };
        const bodyContent2 = JSON.stringify({ records: JSON.parse(JSON.stringify(records2)) });
        const body = (bodyContent1)
        const response = await fetch(api_url, {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${TOKEN}`,
              "Content-type": "application/json",
            },
            body : JSON.stringify(bodyContent1)
          });
          if (response.status === 200) {
            res.json({
                message: 'Create record to Airtable successfully',
                data : response.json()
                });
          }else{
            res.json({
                message: 'Create record to Airtable failed',
                data :JSON.stringify(response) , 
                statusText : response.statusText,   
              });   
          }
            
    });

});

// update data from DB to Airtable
router.put('/', async (req, res) => { 
    var records = [] 
    Employee.getAll(async(err, employees) => {
        if (err) {
            res.json({error: 'Failed to retrieve employees' , messasge : err})
        }
        employees.map((employee) => {
            console.log(employee.NameKanji)
            records.push({'fields' : {"NameKanji": employee.NameKanji,}}) 

        })

    })
    console.log("Records",records)
    const data = JSON.stringify({
        "performUpsert": {
          "fieldsToMergeOn": [
            "NameKanji"
          ]
        },
        "records": [{
            "fields" : {
                "NameKanji": "test",
            }  ,
        }]
      });
      const api_url = AIRTABLE_BASE_URL + `${BASE_ID}/${TABLE_ID}`;
      const response = await fetch(api_url, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-type": "application/json",
        },
        body:data
      });
      if (response.status === 200) {
        const data = await response.json();
        console.log("DATA : " + data)
        res.json({
            message: 'Update data from DB to Airtable successfully',
            data : data ,
            records : records
            });      
        }
        else {
            console.log(response)
            res.status(500).json({ error: 'Failed to update data from DB to Airtable' ,
            
            messasge : response.statusText });
        }
     
    //   return "ERROR: Couldn't update data to record id " + recordId;
  
    // Employee.getAll((err, employees) => {
    //   if (err) {
    //     console.log(err)
    //     return res.status(500).json({ error: 'Failed to retrieve employees' , messasge : err });
    //   }
    //   const update = update_multi_record(employees);
    //   res.json({
    //     message: 'Update data from DB to Airtable successfully',
    //     data : update
    //   });
    // });
  });

  module.exports = router;