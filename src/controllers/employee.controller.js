const Employee = require('../models/employee.model');

// Get all employees
exports.getAllEmployees = (req, res) => {
  Employee.getAll((err, employees) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve employees' });
    }
    res.json(employees);
  });
};

// Get employee by ID
exports.getEmployeeById = (req, res) => {
  const employeeId = req.params.id;

  Employee.findById(employeeId, (err, employee) => {
    if (err) {
      if (err.message === 'Employee not found') {
        return res.status(404).json({ error: 'Employee not found' });
      }
      return res.status(500).json({ error: 'Failed to retrieve employee' });
    }

    res.json(employee);
  });
};

// Create a new employee
exports.createEmployee = (req, res) => {
  const newEmployee = req.body;

  Employee.create(newEmployee, (err, employee) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to create employee' });
    }

    res.status(201).json(employee);
  });
};

// Update employee by ID
exports.updateEmployeeById = (req, res) => {
  const employeeId = req.params.id;
  const updatedEmployee = req.body;

  Employee.updateById(employeeId, updatedEmployee, (err, employee) => {
    if (err) {
      if (err.message === 'Employee not found') {
        return res.status(404).json({ error: 'Employee not found' });
      }
      return res.status(500).json({ error: 'Failed to update employee' });
    }

    res.json(employee);
  });
};

// Delete employee by ID
exports.deleteEmployeeById = (req, res) => {
  const employeeId = req.params.id;

  Employee.removeById(employeeId, (err, employee) => {
    if (err) {
      if (err.message === 'Employee not found') {
        return res.status(404).json({ error: 'Employee not found' });
      }
      return res.status(500).json({ error: 'Failed to delete employee' });
    }

    res.json(employee);
  });
};

// Delete all employees
exports.deleteAllEmployees = (req, res) => {
  Employee.removeAll((err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to delete employees' });
    }

    res.json({ message: 'All employees deleted' });
  });
};
