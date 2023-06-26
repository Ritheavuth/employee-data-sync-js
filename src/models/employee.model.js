const sql = require("./db.js");

// constructor
const Employee = function (employee) {
  this.EmployeeNumber = employee.EmployeeNumber;
  this.NameKanji = employee.NameKanji;
  this.NameFurigana = employee.NameFurigana;
  this.Gender = employee.Gender;
  this.BirthDate = employee.BirthDate;
  this.JoiningDate = employee.JoiningDate;
  this.RetirementDate = employee.RetirementDate;
  this.Age = employee.Age;
  this.YearsInService = employee.YearsInService;
  this.BloodType = employee.BloodType;
  this.HomeAddress = employee.HomeAddress;
  this.HomeZipCode = employee.HomeZipCode;
  this.HomePhoneNumber = employee.HomePhoneNumber;
  this.PersonalPhoneNumber = employee.PersonalPhoneNumber;
  this.PersonalEmail = employee.PersonalEmail;
  this.PersonalLineId = employee.PersonalLineId;
  this.DrivingLicenseNumber = employee.DrivingLicenseNumber;
  this.Qualifications = employee.Qualifications;
  this.LastEducation = employee.LastEducation;
  this.FamilyInfo = employee.FamilyInfo;
  this.EmergencyContactInfo = employee.EmergencyContactInfo;
  this.CompanyA = employee.CompanyA;
  this.CompanyB = employee.CompanyB;
  this.GraduateOrMidCareer = employee.GraduateOrMidCareer;
  this.MidCareerDetails = employee.MidCareerDetails;
  this.TransferredCompany = employee.TransferredCompany;
  this.TransferDate = employee.TransferDate;
  this.WorkLocation = employee.WorkLocation;
  this.CompanyPhoneNumber = employee.CompanyPhoneNumber;
  this.CompanyEmail = employee.CompanyEmail;
  this.Position = employee.Position;
  this.Team = employee.Team;
  this.ResponsiblePersonCode = employee.ResponsiblePersonCode;
  this.EmploymentType = employee.EmploymentType;
  this.JobType = employee.JobType;
  this.PersonalNumber = employee.PersonalNumber;
  this.BasicPensionNumber = employee.BasicPensionNumber;
  this.HealthInsuranceNumber = employee.HealthInsuranceNumber;
  this.HealthInsuranceDate = employee.HealthInsuranceDate;
  this.HealthInsuranceGrade = employee.HealthInsuranceGrade;
  this.WelfarePensionNumber = employee.WelfarePensionNumber;
  this.WelfarePensionDate = employee.WelfarePensionDate;
  this.WelfarePensionGrade = employee.WelfarePensionGrade;
  this.EmploymentInsuranceNumber = employee.EmploymentInsuranceNumber;
  this.EmploymentInsuranceDate = employee.EmploymentInsuranceDate;
  this.SalaryTransferDetails = employee.SalaryTransferDetails;
  this.BonusTransferDetails = employee.BonusTransferDetails;
  this.MonthlyWorkHours = employee.MonthlyWorkHours;
  this.MonthlyPaidVacationDays = employee.MonthlyPaidVacationDays;
  this.RemainingPaidVacationDays = employee.RemainingPaidVacationDays;
  this.MonthlyAbsenceDays = employee.MonthlyAbsenceDays;
  this.LateAndEarlyLeaves = employee.LateAndEarlyLeaves;
  this.SpecialPaidVacationDays = employee.SpecialPaidVacationDays;
  this.CommutingExpenses = employee.CommutingExpenses;
  this.CommutingMethod = employee.CommutingMethod;
  this.CarCommutingDetails = employee.CarCommutingDetails;
  this.PublicTransportDetails = employee.PublicTransportDetails;
  this.CommutingTime = employee.CommutingTime;
  this.MaternityLeavePeriod = employee.MaternityLeavePeriod;
  this.ParentalLeavePeriod = employee.ParentalLeavePeriod;
  this.HealthCheckDate = employee.HealthCheckDate;
  this.HealthCheckResult = employee.HealthCheckResult;
  this.Password = employee.Password;
  this.Admin = employee.Admin;
};

Employee.create = function (newEmployee, result) {
  sql.query("INSERT INTO Employees SET ?", newEmployee, (err, res) => {
    if (err) {
      console.log("Error creating new employee: ", err);
      result(err, null);
      return;
    }
    console.log("New employee created: ", { id: res.insertId, ...newEmployee });
    result(null, { id: res.insertId, ...newEmployee });
  });
};

Employee.findById = function (employeeId, result) {
  sql.query("SELECT * FROM Employees WHERE id = ?", employeeId, (err, res) => {
    if (err) {
      console.log("Error finding employee: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Employee found: ", res[0]);
      result(null, res[0]);
      return;
    }

    // Employee with the given ID not found
    result({ message: "Employee not found" }, null);
  });
};

Employee.findEmployeeByEmail = (email, result) => {
  sql.query(
    "SELECT * FROM employees WHERE PersonalEmail = ?",
    [email],
    (err, res) => {
      if (err) {
        console.log("Error while querying the database: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        // Found the employee with the given Personal email
        result(null, res[0]);
        return;
      }

      // Employee not found
      result({ message: "Employee not found" }, null);
    }
  );
};

Employee.validateAdminLogin = (email, password, result) => {
  Employee.findEmployeeByEmail(email, (err, employee) => {
    if (err) {
      result(err, null);
      return;
    }

    if (!employee) {
      result({ message: "Invalid credentials" }, null);
      return;
    }

    if (!employee.Admin) {
      result({ message: "Not authorized as an admin" }, null);
      return;
    }

    bcrypt.compare(password, employee.Password, (bcryptErr, isMatch) => {
      if (bcryptErr || !isMatch) {
        result({ message: "Invalid credentials" }, null);
        return;
      }

      result(null, employee);
    });
  });
};

Employee.validateEmployeeLogin = (email, password, result) => {
  Employee.findEmployeeByEmail(email, (err, employee) => {
    if (err) {
      result(err, null);
      return;
    }

    if (!employee) {
      result({ message: "Invalid credentials" }, null);
      return;
    }

    bcrypt.compare(password, employee.Password, (bcryptErr, isMatch) => {
      if (bcryptErr || !isMatch) {
        result({ message: "Invalid credentials" }, null);
        return;
      }

      result(null, employee);
    });
  });
};

Employee.updateById = function (employeeId, employeeData, result) {
  sql.query(
    "UPDATE Employees SET ? WHERE id = ?",
    [employeeData, employeeId],
    (err, res) => {
      if (err) {
        console.log("Error updating employee: ", err);
        result(err, null);
        return;
      }

      if (res.affectedRows === 0) {
        // Employee with the given ID not found
        result({ message: "Employees not found" }, null);
        return;
      }

      console.log("Employees updated: ", { id: employeeId, ...employeeData });
      result(null, { id: employeeId, ...employeeData });
    }
  );
};

Employee.getAll = function (result) {
  sql.query("SELECT * FROM Employees", (err, res) => {
    if (err) {
      console.log("Error retrieving employees: ", err);
      result(err, null);
      return;
    }

    console.log("Employees retrieved: ", res);
    result(null, res);
  });
};

Employee.removeById = function (employeeId, result) {
  sql.query("DELETE FROM Employees WHERE id = ?", employeeId, (err, res) => {
    if (err) {
      console.log("Error deleting employee: ", err);
      result(err, null);
      return;
    }

    if (res.affectedRows === 0) {
      // Employee with the given ID not found
      result({ message: "Employee not found" }, null);
      return;
    }

    console.log("Employee deleted with id: ", employeeId);
    result(null, { id: employeeId });
  });
};

Employee.removeAll = function (result) {
  sql.query("DELETE FROM Employees", (err, res) => {
    if (err) {
      console.log("Error deleting employees: ", err);
      result(err, null);
      return;
    }

    console.log("All employees deleted.");
    result(null, res);
  });
};

module.exports = Employee;
