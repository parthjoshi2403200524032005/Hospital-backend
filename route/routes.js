const express = require("express");
const router = express.Router();

const {
  createHospital,
  getAllHospital,
  getsingleHospital,
  updateHospital,
  deleteHospital,
} = require("../controller/hospital.controller");

const {
  createDoctor,
  getAllDoctor,
  getsingleDoctor,
  updateDoctor,
  deleteDoctor,
} = require("../controller/doctor.controller");

const {
  createPatient,
  getAllPatients,
  getsinglePatient,
  updatePatient,
  deletePatient,
} = require("../controller/patient.controller");

const {
  createstaff,
  getAllstaff,
  getstaff,
  updatestaff,
  deletestaff,
} = require("../controller/Staff.controller");

// HOSPITALS
router.post("/hospital", createHospital);
router.get("/hospital", getAllHospital);
router.get("/hospital/:id", getsingleHospital);
router.put("/hospital/:id", updateHospital);
router.delete("/hospital/:id", deleteHospital);

// DOCTORS
router.post("/doctor", createDoctor);
router.get("/doctor", getAllDoctor);
router.get("/doctor/:id", getsingleDoctor);
router.put("/doctor/:id", updateDoctor);
router.delete("/doctor/:id", deleteDoctor);

//Patients
router.post("/patient", createPatient);
router.get("/patient", getAllPatients);
router.get("/patient/:id", getsinglePatient);
router.put("/patient/:id", updatePatient);
router.delete("/patient/:id", deletePatient);

// STAFF
router.post("/staff", createstaff);
router.get("/staffs", getAllstaff);
router.get("/staff/:id", getstaff);
router.put("/staff/:id", updatestaff);
router.delete("/staff/:id", deletestaff);

module.exports = router;
