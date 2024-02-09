const PatientsModel = require("../model/patient.model");
const ObjectId = require('mongoose').Types.ObjectId;

const createPatient = async (req, res) => {
  try {
    const {
      Name,
      Age,
      Gender,
      BloodGroup,
      Address,
      Phone,
      Email,
      assignedDoctor,
    } = req.body;

    const Patientdata = await PatientsModel.create({
      Name,
      Age,
      Gender,
      BloodGroup,
      Address,
      Phone,
      Email,
      assignedDoctor,
    });
    res.status(200).send({
      message: "Patient created successfully",
      success: true,
      data: Patientdata,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "something went wrong" });
  }
};

const getAllPatients = async (req, res) => {
  try {
    const Patientsdata = await PatientsModel.aggregate([
      {
        $lookup: {
          from: "doctors",
          localField: "assignedDoctor",
          foreignField: "_id",
          as: "doctorDETAILS",
        },
      },
      {
        $lookup: {
          from: "hospitals",
          localField: "hospital",
          foreignField: "_id",
          as: "hospitalDETAILS",
        },
      }
    ])
    res.status(200).send({
      message: "Patient fetched successfully",
      success: true,
      data: Patientsdata,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "something went wrong" });
  }
};

const getsinglePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const patientData = await PatientsModel.aggregate([
      {
        $match: {
          $or: [
            { hospital: new ObjectId(id) },
            { assignedDoctor: new ObjectId(id) },
          ],
        },
      },
      {
        $lookup: {
          from: "doctors",
          localField: "assignedDoctor",
          foreignField: "_id",
          as: "doctorDETAILS",
        },
      },
      { 
        $lookup: {
          from: "hospitals",
          localField: "hospital",
          foreignField: "_id",
          as: "hospitalDETAILS",
        },
      },
    ]);
    res.status(200).send({
      message: "Patient fetched successfully",
      success: true,
      data: patientData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "something went wrong" });
  }
};

const updatePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      Name,
      Age,
      Gender,
      BloodGroup,
      Address,
      Phone,
      Email,
      assignedDoctor,
      hospital,
    } = req.body;
    console.log(req.body);

    const Patientsdata = await PatientsModel.findByIdAndUpdate(
      { _id: id },
      {
        Name,
        Age,
        Gender,
        BloodGroup,
        Address,
        Phone,
        Email,
        assignedDoctor,
        hospital,
      },
      {
        new: true,
      }
    );
    res.status(200).send({
      message: "Patient updated successfully",
      success: true,
      data: Patientsdata,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "something went wrong" });
  }
};

const deletePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const Patientsdata = await PatientsModel.findByIdAndDelete({ _id: id });
    res.status(200).send({
      message: "Patient deleted successfully",
      success: true,
      data: Patientsdata,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "something went wrong" });
  }
};

module.exports = {
  createPatient,
  getAllPatients,
  getsinglePatient,
  updatePatient,
  deletePatient,
};
