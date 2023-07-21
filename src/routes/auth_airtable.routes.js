const express = require("express");
const router = express.Router();
const fetch = require("node-fetch").default;
const jwt = require("jsonwebtoken");
const config = require("../config/airtable.config");
const nodemailer = require("nodemailer");

const AIRTABLE_BASE_URL =
  "https://api.airtable.com/v0/appI1LPBCtqT1pNPV/tblZOKJuMViKKSFzF";

const TOKEN =
  "pat4LnrP0iHYxlxrz.0f4d87665a1863959a1aede7d4a88836a665c3bb0d14b65a8248d5821deb8bc4";

// Create a transporter with Gmail SMTP configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "hinchanritheavuth20@kit.edu.kh", // Your Gmail email address
    pass: "fwtmyfvzakpktkev", // Your Gmail password or app-specific password
  },
});

// Function to generate a random OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Function to send OTP via email
const sendOTP = (email) => {
  const otp = generateOTP();
  const mailOptions = {
    from: "arihiko@gmail.com",
    to: email,
    subject: "OTP Verification",
    html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
    <div style="margin:50px auto;width:70%;padding:20px 0">
      <div style="border-bottom:1px solid #eee">
        <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Arihiko</a>
      </div>
      <p style="font-size:1.1em">Greetings,</p>
      <p>Use the following OTP to complete your login</p>
      <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
      <p style="font-size:0.9em;">Regards,<br />Arihiko</p>
      <hr style="border:none;border-top:1px solid #eee" />
      <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
        <p>Arihiko</p>
        <p>Address</p>
        <p>Country</p>
      </div>
    </div>
  </div>`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending OTP:", error);
    } else {
      console.log("OTP sent:", info.response);
    }
  });

  return otp;
};

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

const authenticateOTP = (req, res, next) => {
  // Extract the token from the request header
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token not provided" });
  }

  jwt.verify(token, config.JWTSecret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }

    req.otp = decoded.otp; // Store the decoded token in the request object
    req.employee_id = decoded.recordId
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
      res.json(record.fields);
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

router.post("/employee/otp", authenticateOTP, async (req, res) => {
  const otp = req.otp;
  const enteredOtp = req.body.otp
  const employee_id = req.employee_id

  // Verify the entered OTP against the stored OTP
  if (otp === enteredOtp) {
    const token = jwt.sign({recordId: employee_id }, config.JWTSecret);
    res.json({token})
  } else {
    // Invalid OTP
    res.status(401).json({ error: "Invalid OTP" });
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
        const otp = sendOTP(email)
        const token = jwt.sign({ otp: otp, recordId: employee.id }, config.JWTSecret);
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
