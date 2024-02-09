
const mongoose = require("mongoose");

const StaffSchema = new mongoose.Schema({

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
    Address:{
        type:mongoose.Schema.Types.String,
        required:true
    },
    Phone:{
        type:mongoose.Schema.Types.String,
    },
    doctorID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"doctors"
    },
    hospitalID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"hospital"
    },
   
   

    
},{timestamps:true}); 

module.exports = new mongoose.model("staffs", StaffSchema,"staffs");
