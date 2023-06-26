const express = require("express");
const jwt = require("jsonwebtoken");
const Employee = require("../models/employee.model");
const config = require("../config/api.config");

const router = express.Router();

// Admin Login
router.post("/admin/login", (req, res) => {
  const { email, password } = req.body;

  // Validate admin login
  Employee.validateAdminLogin(email, password, (err, employee) => {
    if (err) {
      return res.status(401).json({ error: err.message });
    }

    // Generate JWT token for admin
    const token = jwt.sign({ sub: employee.id, admin: true }, config.JWTSecret);

    res.json({ token });
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
