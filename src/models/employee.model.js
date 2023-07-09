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

Employee.findById = function (employeeNumber, result) {
  sql.query("SELECT * FROM Employees WHERE EmployeeNumber = ?", employeeNumber, (err, res) => {
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
    "SELECT * FROM Employees WHERE PersonalEmail = ?",
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

Employee.validateEmployeeLogin = (email, password, result) => {
  Employee.findEmployeeByEmail(email, (err, employee) => {
    if (err) {
      result(err, null);
      return;
    }

    if (!employee) {
      result({ message: "Employee not found" }, null);
      return;
    }

    if (password !== employee.Password) {
      result({ message: "Invalid Password" }, null);
      return;
    }
    result(null, employee)
  });
};

module.exports = Employee;
