const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
    Name:{
     type:mongoose.Schema.Types.String,
     required:true
    },
    Age:{
        type:mongoose.Schema.Types.Number,
        required:true
    },
    Gender:{
        type:mongoose.Schema.Types.String,
        enum:["Male","Female","Other"],
        required:true
    },
    BloodGroup:{
        type:mongoose.Schema.Types.String,
        required:true
    },
    Address:{
        type:mongoose.Schema.Types.String,
        required:true
    },
    Phone:{
        type:mongoose.Schema.Types.String,
        required:true
    },
    Email:{
        type:mongoose.Schema.Types.String,
        required:true
    },
    assignedDoctor: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'doctors' 
    }],
    hospital:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'hospitals'
    }]


},{timestamps:true})
 
module.exports = new mongoose.model("patients", patientSchema,"patients")