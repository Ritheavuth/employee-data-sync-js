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

Employee.findAll = function () {
  return new Promise((resolve, reject) => {
    sql.query("SELECT * FROM Employees", (err, res) => {
      if (err) {
        console.log("Error retrieving employees: ", err);
        reject(err);
        return;
      }

      const employees = res.map((employee) => new Employee(employee));
      resolve(employees);
    });
  });
};

// Method to insert a new employee
Employee.insert = function (newEmployee) {
  return new Promise((resolve, reject) => {
    sql.query('INSERT INTO Employees SET ?', newEmployee, (err, res) => {
      if (err) {
        console.error('Error inserting employee:', err);
        reject(err);
        return;
      }
      resolve(res);
    });
  });
};

// Method to update an employee
Employee.update = function (employeeId, updatedEmployee) {
  return new Promise((resolve, reject) => {
    sql.query('UPDATE Employees SET ? WHERE EmployeeNumber = ?', [updatedEmployee, employeeId], (err, res) => {
      if (err) {
        console.error('Error updating employee:', err);
        reject(err);
        return;
      }
      resolve(res);
    });
  });
};

// Method to delete an employee
Employee.remove = function (employeeId) {
  return new Promise((resolve, reject) => {
    sql.query('DELETE FROM Employees WHERE EmployeeNumber = ?', employeeId, (err, res) => {
      if (err) {
        console.error('Error deleting employee:', err);
        reject(err);
        return;
      }
      resolve(res);
    });
  });
};
module.exports = Employee;
