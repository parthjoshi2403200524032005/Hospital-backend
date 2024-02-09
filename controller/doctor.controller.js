const doctorModel = require("../model/doctor.model");
const ObjectId = require('mongoose').Types.ObjectId;
const createDoctor = async (req, res) => {
  try {
    const {
      Name,
      Specialization,
      salary,
      Address,
      Phone,
      Email,
      hospital,
      patients,
      experienceinyears
    } = req.body;
    const Doctorsdata = await doctorModel.create({
      Name,
      Specialization,
      salary,
      Address,
      Phone,
      Email,
      hospital,
      patients,
      experienceinyears
    });
    res.status(200).send({
      message: "Doctor created successfully",
      success: true,
      data: Doctorsdata,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "something went wrong" });
  }
};

const getAllDoctor = async (req, res) => {
  try {
    const Doctorsdata = await doctorModel.aggregate([
      {
        $lookup: {
          from: "hospitals",
          localField: "hospital",
          foreignField: "_id",
          as: "hospitalDETAILS",
        },
      },
      {
        $lookup: {
          from: "patients",
          localField: "patients",
          foreignField: "_id",
          as: "patientDETAILS",
        },
      }
    ])
    res.status(200).send({
      message: "Doctor fetched successfully",
      success: true,
      data: Doctorsdata,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "something went wrong" });
  }
};
const getsingleDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await doctorModel.aggregate([
      {
        $match: {
         $or: [
          {hospital: new ObjectId(id)},
          {patients: new ObjectId(id)},
         ]
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
      {
        $lookup: {
          from: "patients",
          localField: "patients",
          foreignField: "_id",
          as: "patientDETAILS",
        },
      }
    ])

    if (!doctor) {
      return res.status(404).send({ message: "Doctor not found" });
    }

    res.status(200).send({
      message: "Doctor fetched successfully",
      success: true,
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong" });
  }
};


const updateDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      Name,
      Specialization,
      salary,
      Address,
      Phone,
      Email,
      hospital,
      patients,
      experienceinyears
    } = req.body;
    const Doctorsdata = await doctorModel.findByIdAndUpdate(
      { _id: id },
      {
        Name,
        Specialization,
        salary,
        Address,
        Phone,
        Email,
        hospital,
        patients,
        experienceinyears
      },
      {
        new: true,
      }
    );
    res.status(200).send({
      message: "Doctor updated successfully",
      success: true,
      data: Doctorsdata,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "something went wrong" });
  }
};

const deleteDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const Doctorsdata = await doctorModel.findByIdAndDelete({ _id: id });
    res.status(200).send({
      message: "Doctor deleted successfully",
      success: true,
      data: Doctorsdata,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "something went wrong" });
  }
};

module.exports = {
  createDoctor,
  getAllDoctor,
  getsingleDoctor,
  updateDoctor,
  deleteDoctor,
};
