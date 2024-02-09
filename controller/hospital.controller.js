const Hospitalmodel = require("../model/hospital.model");
const ObjectId = require('mongoose').Types.ObjectId;


const createHospital = async (req, res) => {
  try {
    const { name, address, city, pincode, doctorsID } = req.body;

    const Hospitaldata = await Hospitalmodel.create({
      name,
      address,
      city,
      pincode,
      doctorsID,
    });
    if (!Hospitaldata) {
      return res.status(400).send({ message: "please enter valid data" });
    }
    res.status(200).send({
      message: "Hospital created successfully",
      success: true,
      data: Hospitaldata,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "something went wrong" });
  }
};

const getAllHospital = async (req, res) => {
  try {
    const Hospitaldata = await Hospitalmodel.aggregate([
      {
        $lookup: {
          from: "doctors",
          localField: "doctorsID",
          foreignField: "_id",
          as: "doctorsDETAILS",
        },
      },
      {
        $lookup: {
          from: "staffs",
          localField: "staffID",
          foreignField: "_id",
          as: "staffDETAILS",
        },
      },
      {
        $lookup: {
          from: "patients",
          localField: "patientsId",
          foreignField: "_id",
          as: "PATIENTSDETAILS",
        },
      },
    ]);
    console.log(Hospitaldata);
    res.status(200).send({
      message: "Hospital fetched successfully",
      success: true,
      data: Hospitaldata,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "something went wrong" });
  }
};

const getsingleHospital = async (req, res) => {
  try {
    const { id } = req.params;

    const Hospitaldata = await Hospitalmodel.aggregate([
      {
        $match: {
          $or: [
            { doctorsID: new ObjectId(id) },
            { staffID: new ObjectId(id) },
            { patientsId:new ObjectId(id) }
          ]
        }
      },
      
      {
        $lookup: {
          from: "doctors", 
          localField: "doctorsID", 
          foreignField: "_id", 
          as: "doctorsDETAILS",
        },
      }, 
      {
        $lookup: {
          from: "staffs",
          localField: "staffID",
          foreignField: "_id",
          as: "staffDETAILS",
        },
      },
      {
        $lookup: {
          from: "patients",
          localField: "patientsId",
          foreignField: "_id",
          as: "PATIENTSDETAILS",
        },
      },
      {
        
      }
    ]);

    res.status(200).send({ 
      message: "Hospital fetched successfully",
      success: true,
      data: Hospitaldata,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "something went wrong" });
  }
};

const updateHospital = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address, city, pincode, doctorsID, staffID, patientsId } = req.body;

    const Hospitaldata = await Hospitalmodel.findByIdAndUpdate(
      { _id: id },
      { name, address, city, pincode, doctorsID, staffID , patientsId},
      { new: true }
    )
      .populate("doctorsID")
      .populate("staffID");
    res.status(200).send({
      message: "Hospital updated successfully",
      success: true,
      data: Hospitaldata,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "something went wrong" });
  }
};

const deleteHospital = async (req, res) => {
  try {
    const { id } = req.params;
    const Hospitaldata = await Hospitalmodel.findByIdAndDelete({ _id: id });
    res.status(200).send({
      message: "Hospital deleted successfully",
      success: true,
      data: Hospitaldata,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "something went wrong" });
  }
};


module.exports = {
  createHospital,
  getAllHospital,
  getsingleHospital,
  updateHospital,
  deleteHospital,
};
