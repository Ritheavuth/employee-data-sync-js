const express = require("express");
const serverless = require("serverless-http");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes

const employeeRoutes = require("./src/routes/employee.routes");
const auth_airtableRoutes = require("./src/routes/auth_airtable.routes");

app.use("/employee", employeeRoutes);
app.use("/auth", auth_airtableRoutes);
app.use("/air-table" ,airtableRoutes )

app.listen(5000, () => {console.log("Listening on Port 5000")})


// module.exports.handler = serverless(app)