import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"


const userschema = new mongoose.Schema({
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
    
    password:{
        type:String,
        minLength:[4,"Must Conatin 4 character"],
        maxLength:[4,"Must Conatin 4 character"],
        required:true,
        select:false
    },
    
    role:{
    type:String,
    required:true,
    enum:["Admin","Patient","Doctor"],
    },

    doctorDepartment:{
        type:String,
    },

    docAvatar:{
            public_id: String,
            url: String,
    },


});

userschema.pre("save",async function (next) {
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password,4);
});

userschema.methods.comparePassword= async function(enterdPassword) {
    return await bcrypt.compare(enterdPassword,this.password);
};

userschema.methods.generateJsonWebToken = function(){
    return jwt.sign({id: this._id},process.env.JWT_SECRET_KEY,{
        expiresIn:process.env.JWT_EXPIRES,
    });
};


export const User = mongoose.model("User",userschema);