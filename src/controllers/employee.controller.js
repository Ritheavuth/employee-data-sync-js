const Employee = require("../models/employee.model");

// Get employee by ID
exports.getEmployeeById = (req, res) => {
  const employeeId = req.params.id;

  Employee.findById(employeeId, (err, employee) => {
    if (err) {
      if (err.message === "Employee not found") {
        return res.status(404).json({ error: "Employee not found" });
      }
      return res.status(500).json({ error: "Failed to retrieve employee" });
    }

    res.json(employee);
  });
};
