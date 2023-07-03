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

// Admin Login
router.post("/admin/login", (req, res) => {
  const { email, password } = req.body;

  // Validate admin login
  Employee.validateAdminLogin(email, password, (err, employee) => {
    if (err) {
      return res.status(401).json({ error: err.message });
    }

    // Generate JWT token for admin
    const token = jwt.sign(
      { sub: employee.EmployeeNumber, admin: 1 },
      config.JWTSecret
    );

    res.json({ token });
  });
});

router.get("/employee/profile", authenticateToken, (req, res) => {
  const employeeId = req.employee.sub;
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
      { sub: employee.id, admin: false },
      config.JWTSecret
    );

    res.json({ token });
  });
});

module.exports = router;
