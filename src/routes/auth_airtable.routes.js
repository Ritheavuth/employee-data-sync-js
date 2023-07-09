const express = require("express");
const router = express.Router();
const fetch = require("node-fetch").default;
const jwt = require("jsonwebtoken");
const config = require("../config/api.config");

const AIRTABLE_BASE_URL =
  "https://api.airtable.com/v0/appI1LPBCtqT1pNPV/tblZOKJuMViKKSFzF";

const TOKEN =
  "pat4LnrP0iHYxlxrz.0f4d87665a1863959a1aede7d4a88836a665c3bb0d14b65a8248d5821deb8bc4";

const authenticateToken = (req, res, next) => {
  // Extract the token from the request header
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token not provided" });
  }

  jwt.verify(token, config.JWTSecret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }

    req.employee = decoded; // Store the decoded token in the request object
    next();
  });
};

router.get("/employee/profile", authenticateToken, async (req, res) => {
  const recordId = req.employee.recordId;

  try {
    // Send a GET request to the Airtable API
    const response = await fetch(`${AIRTABLE_BASE_URL}/${recordId}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    if (response.ok) {
      const record = await response.json();
      res.json({employee: record.fields});
    } else {
      throw new Error("Failed to fetch record from Airtable");
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the record" });
  }
});

router.post("/employee/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Send a GET request to fetch all records from the Airtable table
    const response = await fetch(AIRTABLE_BASE_URL, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    // Check if the request was successful
    if (response.ok) {
      const data = await response.json();
      const employees = data.records;

      // Find the employee with the matching email and password
      const employee = employees.find((emp) => {
        return (
          emp.fields.PersonalEmail === email && emp.fields.Password === password
        );
      });
      if (employee) {
        // Employee found, generate JWT token with record ID
        const token = jwt.sign({ recordId: employee.id }, config.JWTSecret);

        res.json({ token });
      } else {
        // Employee not found, login failed
        res.status(401).json({ error: "Invalid email or password" });
      }
    } else {
      throw new Error("Failed to fetch employee records from Airtable");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while logging in" });
  }
});

module.exports = router;
