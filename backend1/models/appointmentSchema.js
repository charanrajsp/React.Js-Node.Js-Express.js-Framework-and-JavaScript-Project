import mongoose from "mongoose";
import validator from "validator";

const appointmentSchema = new mongoose.Schema({
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
        validate:[validator.isEmail,"please provide valid Mail"],
    },
    phone:{
        type:String,
        required:true,
        minLength:[10,"please provide valid Phone Number 10"],
        maxLength:[10,"Must contins 10 number"],
    },
    nic:{
        type:String,
        required:true,
        minLength:[13,"Must Contains Atleast 13 characters"],
        maxLength:[13,"Must contins 13 number"],

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
    
appointment_date:{
    type:String,
    required:true,
},
department:{
    type:String,
    required:true,
},
doctor:{
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    
},
hasVisited:{
    type:Boolean,
    default:false,
},

doctorId:{
    type:mongoose.Schema.ObjectId,
    required:true,

},

patientId:{
    type:mongoose.Schema.ObjectId,
    required:true,

},
address:{
    type:String,
    required:true,
},

status:{
    type:String,
    enum:["Pending","Accepted","Rejected"],
    default:"Pending",
},
});

export const Appointment = mongoose.model("Appointment",appointmentSchema);