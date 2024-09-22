import {catchAsyncErrors} from "../mddlewares/catchAsyncErrors.js";
import ErrorHandler from "../mddlewares/errorMiddleware.js";
import { User } from "../models/userschema.js";
import {generateToken} from "../utils/jwtToken.js";
import cloudinary from "cloudinary"

export const patientRegister = catchAsyncErrors(async(req, res, next) => {
const {
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    nic,
    role,
}= req.body;

if(
    !firstName ||
    !lastName  || 
    !email  ||
    !phone   ||
    !password ||
    !gender ||
    !dob ||
    !nic ||
    !role
){
    return next(new ErrorHandler("please Fill Full Form!",400));
}

let user = await User.findOne({email});
if(user){
    return next(new ErrorHandler("User Alredy regisred"));
}
user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    nic,
    role,
});
generateToken(user,"User Registered",200,res);

});

export const login = catchAsyncErrors(async(req, res, next )=>{
    const {email,password,confirmPassword,role}=req.body;
    if(!email || !password  || !confirmPassword   || !role)
    {
        return next(new ErrorHandler("Provide All Details!",400));
    }

    if(password !== confirmPassword){
        return next(new ErrorHandler("Password Must Match",400));
    }

    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler(" invalid User and Password",400));
    }

    const ispasswordMatched = await user.comparePassword(password);
    if(!ispasswordMatched){
        return next(new ErrorHandler(" invalid User and Password",400));
    }

    if(role !== user.role){
        return next (new ErrorHandler("this Role not found With user"));
    }
    generateToken(user,"User Login ",200,res);
});

export const addNewAdmin= catchAsyncErrors(async(req,res,next)=>{
    const {
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        dob,
        nic
       
    }= req.body;
    if(
        !firstName ||
        !lastName  || 
        !email  ||
        !phone   ||
        !password ||
        !gender ||
        !dob ||
        !nic 
        
    ){
        return next(new ErrorHandler("please Fill Full Form!",400));
    }
 const isRegistered =await User.findOne({email});
 if(isRegistered){
    return next(new ErrorHandler(`${isRegistered.role}  With This Email Alredy Exist`));
 }
 const admin=await User.create({ 
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    nic,
    role:"Admin"
});
res.status(200).json({
    success:true,
    message:"New Admin Registered",
});

});

export const getAllDoctors = catchAsyncErrors(async(req,res,next)=>{
    const doctors = await User.find({role:"Doctor"});
    res.status(200).json({
        success:true,
        doctors,

    });
   

});

export const getUserDetails = catchAsyncErrors(async(req,res,next)=>{
    const user = req.user;
    res.status(200).json({
        success:true,
        user,
    });
});

export const logoutAdmin=catchAsyncErrors(async(req,res,next)=>
{
    res
    .status(200)
    .cookie("adminToken","",{
        httpOnly:true,
        expires:new Date(Date.now()),
    }).json({
        success:true,
        message:"User Logged Out Successfully",
    });
});

export const logoutPatient=catchAsyncErrors(async(req,res,next)=>
{
    res
    .status(200)
    .cookie("patientToken","",{
        httpOnly:true,
        expires:new Date(Date.now()),
    }).json({
        success:true,
        message:"User Logged Out Successfully",
    });
});

export const addNewDoctor = catchAsyncErrors(async(req,res,next) =>{
    if(!req.files || Object.keys(req.files).length === 0){
        return next(new ErrorHandler("Doctor Avtar Required!",400));
    
    }
    const {docAvatar} = req.files;
    const allowedFormats = ["image/png","image/jpeg","image/webp",];
    if(!allowedFormats.includes(docAvatar.mimetype)){
        return next(new ErrorHandler("File Format Not Supported",400));
    }

    const {
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        dob,
        nic,
        doctorDepartment,
        } =req.body;

        if(
            !firstName ||
            !lastName ||
            !email ||
            !phone ||
            !password ||
            !gender ||
            !dob  ||
            !nic||
            !doctorDepartment
        ){
            return next(new ErrorHandler("Please Provides Full Deails",400));
        }
        const isRegistered = await User.findOne({email});
        if(isRegistered){
            return next(new ErrorHandler(`${isRegistered.role} Alredy Registered with this mail`,400));


        }
        const cloudinaryResponse = await cloudinary.uploader.upload(docAvatar.tempFilePath);

            if(!cloudinaryResponse || cloudinaryResponse.error){
                console.error("Cloudinary Error:",cloudinaryResponse.error || "Unkonown Cloudinary Error");

            }
                const doctor =await User.create({
                    firstName,
                    lastName,
                    email,
                    phone,
                     password,
                     gender,
                        dob,
                        nic,
                        doctorDepartment,
                        role:"Doctor",
                        docAvatar:{
                            public_id:cloudinaryResponse.public_id,
                            url:cloudinaryResponse.secure_url,
                        },
                });
                res.status(200).json({
                    success:true,
                    message:"New Doctor Registered",
                    doctor
                });
});