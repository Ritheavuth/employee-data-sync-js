const express = require("express");
const jwt = require("jsonwebtoken");
const Employee = require("../models/employee.model");
const config = require("../config/api.config");

const router = express.Router();

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

router.get("/employee/profile", authenticateToken, (req, res) => {
  const employeeId = req.employee.EmployeeNumber;
  Employee.findById(employeeId, (err, employee) => {
    if (err) {
      return res.status(500).json({ error: "Failed to fetch employee data" });
    }

    if (!employee) {
      return res.status(404).json({ error: "employee not found" });
    }

    res.json(employee);
  });
});

// Employee Login
router.post("/employee/login", (req, res) => {
  const { email, password } = req.body;

  // Validate employee login
  Employee.validateEmployeeLogin(email, password, (err, employee) => {
    if (err) {
      return res.status(401).json({ error: err.message });
    }

    // Generate JWT token for employee
    const token = jwt.sign(
      { EmployeeNumber: employee.EmployeeNumber },
      config.JWTSecret
    );

    res.json({ token });
  });
});

module.exports = router;
