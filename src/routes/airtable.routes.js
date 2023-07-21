const router = require("express").Router();
var Airtable = require("airtable");
var config = require("../config/airtable.config");

var base = new Airtable({ apiKey: config.APIKEY }).base(config.BASE_ID);

router.get("/basic/", (req, res) => {
  const jsonData = [];

  base(config.TABLE_NAME)
    .select({
      fields: [
        "EmployeeNumber",
        "NameKanji",
        "NameFurigana",
        "Gender",
        "BirthDate",
        "JoiningDate",
        "RetirementDate",
        "Age",
        "YearsInService",
        "BloodType",
        "Admin",
      ],
      sort: [{ field: "EmployeeNumber", direction: "asc" }],
    })
    .eachPage(
      function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.
        records.forEach(function (record) {
          jsonData.push(record._rawJson);
        });
        fetchNextPage();
      },
      function done(err) {
        if (err) {
          console.error(err);
          return res
            .status(500)
            .json({ error: "An error occurred while fetching data." });
        }
        // Send the JSON data as the response
        res.json(jsonData);
      }
    );
});

router.post("/basic/", (req, res) => {
  newEmployee = req.body;
  base(config.TABLE_NAME).create(
    [
      {
        fields: {
          NameKanji: newEmployee.NameKanji,
          NameFurigana: newEmployee.NameFurigana,
          Gender: newEmployee.Gender,
          BirthDate: newEmployee.BirthDate,
          JoiningDate: newEmployee.JoiningDate,
          RetirementDate: newEmployee.RetirementDate,
          Age: newEmployee.Age,
          YearsInService: newEmployee.YearsInService,
          BloodType: newEmployee.BloodType,
          Admin: newEmployee.Admin,
        },
      },
    ],
    function (err, records) {
      if (err) {
        console.error(err);
        return;
      }
      records.forEach(function (record) {
        res.json({ record });
      });
    }
  );
});

router.post("/basic/:id", (req, res) => {
  recordId = req.params.id;
  updatedBasicInfo = req.body;

  base(config.TABLE_NAME).update(
    [
      {
        id: recordId,
        fields: {
          NameKanji: updatedBasicInfo.NameKanji,
          NameFurigana: updatedBasicInfo.NameFurigana,
          Gender: updatedBasicInfo.Gender,
          BirthDate: updatedBasicInfo.BirthDate,
          JoiningDate: updatedBasicInfo.JoiningDate,
          RetirementDate: updatedBasicInfo.RetirementDate,
          Age: updatedBasicInfo.Age,
          YearsInService: updatedBasicInfo.YearsInService,
          BloodType: updatedBasicInfo.BloodType,
          Admin: updatedBasicInfo.Admin,
        },
      },
    ],
    function (err, records) {
      if (err) {
        console.error(err);
        return;
      }
      records.forEach(function (record) {
        res.json({ record });
      });
    }
  );
});

router.delete("/info/:id", (req, res) => {
  recordId = req.params.id;
  base(config.TABLE_NAME).destroy([recordId], function (err, deletedRecords) {
    if (err) {
      console.error(err);
      return;
    }
    res.json({ message: "Deleted" });
  });
});

router.get("/personal/", (req, res) => {
  const jsonData = [];
  base(config.TABLE_NAME)
    .select({
      fields: [
        "EmployeeNumber",
        "HomeAddress",
        "HomeZipCode",
        "HomePhoneNumber",
        "PersonalPhoneNumber",
        "PersonalEmail",
        "PersonalLineId",
        "DrivingLicenseNumber",
        "Qualifications",
        "LastEducation",
        "FamilyInfo",
        "EmergencyContactInfo",
      ],
      sort: [{ field: "EmployeeNumber", direction: "asc" }],
    })
    .eachPage(
      function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.
        records.forEach(function (record) {
          jsonData.push(record._rawJson);
        });
        fetchNextPage();
      },
      function done(err) {
        if (err) {
          console.error(err);
          return res
            .status(500)
            .json({ error: "An error occurred while fetching data." });
        }
        // Send the JSON data as the response
        res.json(jsonData);
      }
    );
});

router.post("/personal/:id", (req, res) => {
  recordId = req.params.id;
  updatedPersonalInfo = req.body;

  base(config.TABLE_NAME).update(
    [
      {
        id: recordId,
        fields: {
          HomeAddress: updatedPersonalInfo.HomeAddress,
          HomeZipCode: updatedPersonalInfo.HomeZipCode,
          HomePhoneNumber: updatedPersonalInfo.HomePhoneNumber,
          PersonalPhoneNumber: updatedPersonalInfo.PersonalPhoneNumber,
          PersonalEmail: updatedPersonalInfo.PersonalEmail,
          PersonalLineId: updatedPersonalInfo.PersonalLineId,
          DrivingLicenseNumber: updatedPersonalInfo.DrivingLicenseNumber,
          Qualifications: updatedPersonalInfo.Qualifications,
          LastEducation: updatedPersonalInfo.LastEducation,
          FamilyInfo: updatedPersonalInfo.FamilyInfo,
          EmergencyContactInfo: updatedPersonalInfo.EmergencyContactInfo,
        },
      },
    ],
    function (err, records) {
      if (err) {
        console.error(err);
        return;
      }
      records.forEach(function (record) {
        res.json({ record });
      });
    }
  );
});

router.get("/insurance/", (req, res) => {
  const jsonData = [];
  base(config.TABLE_NAME)
    .select({
      fields: [
        "EmployeeNumber",
        "BasicPensionNumber",
        "HealthInsuranceNumber",
        "HealthInsuranceDate",
        "HealthInsuranceGrade",
        "WelfarePensionNumber",
      ],
      sort: [{ field: "EmployeeNumber", direction: "asc" }],
    })
    .eachPage(
      function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.
        records.forEach(function (record) {
          jsonData.push(record._rawJson);
        });
        fetchNextPage();
      },
      function done(err) {
        if (err) {
          console.error(err);
          return res
            .status(500)
            .json({ error: "An error occurred while fetching data." });
        }
        // Send the JSON data as the response
        res.json(jsonData);
      }
    );
});

router.post("/insurance/:id", (req, res) => {
  recordId = req.params.id;
  updatedInsuranceInfo = req.body;

  base(config.TABLE_NAME).update(
    [
      {
        id: recordId,
        fields: {
          BasicPensionNumber: updatedInsuranceInfo.BasicPensionNumber,
          HealthInsuranceNumber: updatedInsuranceInfo.HealthInsuranceNumber,
          HealthInsuranceDate: updatedInsuranceInfo.HealthInsuranceDate,
          HealthInsuranceGrade: updatedInsuranceInfo.HealthInsuranceGrade,
          WelfarePensionNumber: updatedInsuranceInfo.WelfarePensionNumber,
        },
      },
    ],
    function (err, records) {
      if (err) {
        console.error(err);
        return;
      }
      records.forEach(function (record) {
        res.json({ record });
      });
    }
  );
});

router.get("/salary/", (req, res) => {
  const jsonData = [];
  base(config.TABLE_NAME)
    .select({
      fields: [
        "EmployeeNumber",
        "CompanyA",
        "CompanyB",
        "GraduateOrMidcareer",
        "MidCareerDetails",
        "TransferredCompany",
        "TransferDate",
        "WorkLocation",
        "CompanyPhoneNumber",
        "CompanyEmail",
        "Position",
        "Team",
        "ResponsiblePersonCode",
        "EmploymentType",
        "JobType",
        "PersonalNumber",
      ],
      sort: [{ field: "EmployeeNumber", direction: "asc" }],
    })
    .eachPage(
      function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.
        records.forEach(function (record) {
          jsonData.push(record._rawJson);
        });
        fetchNextPage();
      },
      function done(err) {
        if (err) {
          console.error(err);
          return res
            .status(500)
            .json({ error: "An error occurred while fetching data." });
        }
        // Send the JSON data as the response
        res.json(jsonData);
      }
    );
});

router.post("/salary/:id", (req, res) => {
  recordId = req.params.id;
  updatedSalaryInfo = req.body;

  base(config.TABLE_NAME).update(
    [
      {
        id: recordId,
        fields: {
          CompanyA: updatedSalaryInfo.CompanyA,
          CompanyB: updatedSalaryInfo.CompanyB,
          GraduateOrMidcareer: updatedSalaryInfo.GraduateOrMidcareer,
          MidCareerDetails: updatedSalaryInfo.MidCareerDetails,
          TransferredCompany: updatedSalaryInfo.TransferredCompany,
          TransferDate: updatedSalaryInfo.TransferDate,
          WorkLocation: updatedSalaryInfo.WorkLocation,
          CompanyPhoneNumber: updatedSalaryInfo.CompanyPhoneNumber,
          CompanyEmail: updatedSalaryInfo.CompanyEmail,
          Position: updatedSalaryInfo.Position,
          Team: updatedSalaryInfo.Team,
          ResponsiblePersonCode: updatedSalaryInfo.ResponsiblePersonCode,
          EmploymentType: updatedSalaryInfo.EmploymentType,
          JobType: updatedSalaryInfo.JobType,
          PersonalNumber: updatedSalaryInfo.PersonalNumber,
        },
      },
    ],
    function (err, records) {
      if (err) {
        console.error(err);
        return;
      }
      records.forEach(function (record) {
        res.json({ record });
      });
    }
  );
});

module.exports = router;
