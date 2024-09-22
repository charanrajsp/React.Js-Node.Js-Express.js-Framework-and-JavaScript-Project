import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength: [3,"At least Need three Characters"],
    },
    lastName:{
        type:String,
        required:true,
        minLength: [3,"At least Need three Characters"]
    },
    email:{
        type:String,
        required:true,
        validate:[validator.isEmail,"please provide valid Mail"]
    },
    phone:{
        type:String,
        required:true,
        minLength:[10,"please provide valid Phone Number 10"],
        maxLength:[10,"contins 10 number"]
    },
    message:{
        type:String,
        required:true,
        minLength:[10,"Contains Atleast 10 characters"]
    },

});

export const Message = mongoose.model("Message",messageSchema);