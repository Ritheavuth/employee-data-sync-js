const express = require("express");
const serverless = require("serverless-http");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes

const employeeRoutes = require("./src/routes/employee.routes");
const authRoutes = require("./src/routes/auth.routes");
const airtableRoutes = require("./src/routes/airtable.routes");
const hightouchRoutes = require("./src/routes/hightouch.routes");

app.use("/employee", employeeRoutes);
app.use("/auth", authRoutes);
app.use("/air-table" ,airtableRoutes )
app.use("/hightouch",hightouchRoutes)


module.exports.handler = serverless(app)