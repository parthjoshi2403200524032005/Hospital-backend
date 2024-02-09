const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  Name: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  Specialization: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  salary: {
    type: mongoose.Schema.Types.String,
    required: true,
  }, 
  Address: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  Phone: {
    type: mongoose.Schema.Types.Number,
    required: true,
  },
  Email: {
    type: mongoose.Schema.Types.String, 
    required: true,
  },
  hospital:[ {
    type: mongoose.Schema.Types.ObjectId,
    ref: "hospital", 
    required: true,
  }],
  experienceinyears: {
    
    type: mongoose.Schema.Types.Number,
    default: 0,
  },
  patients: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: "patients",
}]
},{timestamps:true});

 module.exports = new mongoose.model("doctors", doctorSchema, "doctors");
