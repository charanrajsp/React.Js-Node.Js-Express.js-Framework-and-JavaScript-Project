import {catchAsyncErrors} from "../mddlewares/catchAsyncErrors.js";
import ErrorHandler from "../mddlewares/errorMiddleware.js";
import {Appointment} from "../models/appointmentSchema.js";
import { User } from "../models/userschema.js";






export const postAppointment = catchAsyncErrors(async(req,res,next)=>{
    const {
        firstName,
        lastName,
        email,
        phone,
        nic,
        dob,
        gender,
    appointment_date,
    department,
    doctor_firstName,
    doctor_lastName,
    hasVisited,
    address,
    
    } = req.body;

    if(!firstName ||
        !lastName ||
        !email||
        !phone||
        !nic||
        !dob||
        !gender||
    !appointment_date||
    !department||
    !doctor_firstName||
    !doctor_lastName||
    
    !address
){
    return next(new ErrorHandler("Please Fill full Form",400));
}
const isConflict = await User.find({
    firstName:doctor_firstName,
    lastName:doctor_lastName,
    role:"Doctor",
    doctorDepartment:department
});
if(isConflict.length === 0){
    return next(new ErrorHandler("Doctor Not Found !!!",404));
}

if(isConflict.length > 1){
    return next(new ErrorHandler("Doctor conflict !! Please Contact Throught Email or Phone ",404));
}

const doctorId = isConflict[0]._id;
const patientId = req.user._id;

const appointment = await Appointment.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
appointment_date,
department,
doctor:{
    firstName:doctor_firstName,
    lastName:doctor_lastName,
},


hasVisited,
address,
doctorId,
patientId,

});

res.status(200).json({
    success:true,
    message:"Appointment sent Successfully",
    appointment,
});
});

 export const getAllAppointments = catchAsyncErrors(async(req,res,next)=>{
    const appointments= await Appointment.find();
    res.status(200).json({
        success:true,
    appointments,
    });
});

export const updateAppointmentStatus=catchAsyncErrors(async(req,res,next)=>{
    const {id} = req.params;
    let appointment= await Appointment.findById(id);
    if(!appointment){
        return next(new ErrorHandler("Appointment Not Found",404));
    }

    appointment = await Appointment.findByIdAndUpdate(id,req.body, {
            new:true,
            runValidators:true,
            useFindAndModify:false,

    });
    res.status(200).json({
        success:true,
        message:"Appointment Status Updated",
        appointment,
    });
}
);

export const deleteAppointment = catchAsyncErrors(async(req,res,next)=>{
    const {id} = req.params;
    let appointment = await Appointment.findById(id);

    if(!appointment){
        return next(new ErrorHandler("Appointment Not Found",404));
    }
    await appointment.deleteOne();
    res.status(200).json({
        success:true,
        message:"Appointment Deleted!!",
    });
});

export const getAppointmentCount = catchAsyncErrors(async (req, res, next) => {
    const count = await Appointment.countDocuments();
    res.status(200).json({
        success: true,
        message:"Appointment Count Showed",
        count,
    });
});




export const deleteDoctor = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params; // Extract the doctor ID from the request parameters

    // Check if the doctor exists
    const doctor = await User.findById(id);
    if (!doctor) {
        return next(new ErrorHandler("Doctor not found", 404));
    }

    // Perform the deletion
    await User.findByIdAndDelete(id);

    // Send success response
    res.status(200).json({
        success: true,
        message: "Doctor deleted successfully"
    });
});


export const getDoctorCount = catchAsyncErrors(async (req, res, next) => {
    const count = await User.countDocuments({ role: "Doctor" });
    res.status(200).json({
        success: true,
        count,
    });
});


