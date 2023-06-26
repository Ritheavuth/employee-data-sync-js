const express = require("express");
const serverless = require("serverless-http");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes

const employeeRoutes = require("./src/routes/employee.routes");
const authRoutes = require("./src/routes/auth.routes");

app.use("/employee", employeeRoutes);
app.use("/auth", authRoutes);

module.exports.handler = serverless(app)