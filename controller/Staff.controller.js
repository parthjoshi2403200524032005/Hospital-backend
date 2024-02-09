const StaffSchema = require("../model/Staff.model");
const ObjectId = require("mongoose").Types.ObjectId;

const createstaff = async (req, res) => {
  try {
    const { Name, Age, Gender, Address, Phone } = req.body;
    const staff = await StaffSchema.create({
      Name,
      Age,
      Gender,
      Address,
      Phone,
    });
    res.status(200).send({ message: "staff created successfully", staff });
  } catch (error) {
    console.log(error);
  }
};

const getAllstaff = async (req, res) => {
  try {
    const staff = await StaffSchema.aggregate([
      {
        $lookup: {
          from: "hospitals",
          localField: "hospitalID",
          foreignField: "_id",
          as: "hospital",
        },
      },
      {
        $lookup: {
          from: "doctors",
          localField: "doctorID",
          foreignField: "_id",
          as: "doctor",
        },
      },
    ]);
    res.status(200).send({ message: "staff fetched successfully", staff });
  } catch (error) {
    console.log(error);
  }
};

const getstaff = async (req, res) => {
  try {
    const { id } = req.params;
    const staff = await StaffSchema.aggregate([
      { $match: { _id: new ObjectId(id) } },
        {
            $lookup: {
              from: "hospitals",
              localField: "hospitalID",
              foreignField: "_id",
              as: "hospital",
            },
          },
          {
            $lookup: {
              from: "doctors",
              localField: "doctorID",
              foreignField: "_id",
              as: "doctor",
            },
          },
     
    ]);
    res.status(200).send({ message: "staff fetched successfully", staff });
  } catch (error) {
    console.log(error);
  }
};

const updatestaff = async (req, res) => {
  try {
    const { id } = req.params;
    const { Name, Age, Gender, Address, Phone, hospitalID, doctorID } =
      req.body;
    console.log(req.body);
    const staff = await StaffSchema.findByIdAndUpdate(
      { _id: id },
      { Name, Age, Gender, Address, Phone, hospitalID, doctorID },
      { new: true }
    );
    res.status(200).send({ message: "staff updated successfully", staff });
  } catch (error) {
    console.log(error);
  }
};

const deletestaff = async (req, res) => {
  try {
    const { id } = req.params;
    const staff = await StaffSchema.findByIdAndDelete({ _id: id });
    res.status(200).send({ message: "staff deleted successfully", staff });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createstaff,
  getAllstaff,
  getstaff,
  updatestaff,
  deletestaff,
};
