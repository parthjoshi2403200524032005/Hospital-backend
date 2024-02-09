const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema(
  {
    name: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    address: {
      type: mongoose.Schema.Types.String,
    },
    city: {
      type: mongoose.Schema.Types.String,
    },
    pincode: {
      type: mongoose.Schema.Types.Number,
    },
    specializedIn: [
      {
        type: mongoose.Schema.Types.String,
      },
    ],
    doctorsID: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "doctors",
      },
    ],
    staffID: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "staffs",
      },
    ],
    patientsId:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref:"patients"
      }
    ]
  },
  { timestamps: true }
); 

module.exports = new mongoose.model("hospital", hospitalSchema);
