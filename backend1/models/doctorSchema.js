import mongoose from "mongoose";
import validator from "validator";

const doctorSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength: [3,"At least Need three Characters"],
    },
    lastName:{
        type:String,
        required:true,
        minLength: [3,"At least Need three Characters"],
    },
    email:{
        type:String,
        required:true,
        unique:true, // Ensure email is unique
        validate:[validator.isEmail,"please provide valid Mail"],
    },
    phone:{
        type:String,
        required:true,
        minLength:[10,"please provide valid Phone Number 10"],
        maxLength:[10,"Must contains 10 numbers"],
    },
    nic:{
        type:String,
        required:true,
        minLength:[13,"Must Contains At least 13 characters"],
        maxLength:[13,"Must contains 13 characters"],
    },
    dob:{
        type:Date,
        required:[true,"DoB is Required"],
    },
    gender:{
        type:String,
        required:true,
        enum:["Male","Female"],
    },
    doctorDepartment:{
        type:String,
        required:true,
    },
    // You can add more fields as needed
});

export const Doctor = mongoose.model("Doctor", doctorSchema);
