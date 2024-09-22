import express from "express"
import { deleteAppointment, getAllAppointments, postAppointment, updateAppointmentStatus,getAppointmentCount } from "../controller/appointmentController.js";
import {isAdminAuthenticated,isPatientAuthenticated} from "../mddlewares/auth.js"

const router = express.Router();

router.post("/post",isPatientAuthenticated,postAppointment);
router.get("/getall",isAdminAuthenticated,getAllAppointments);
router.put("/update/:id",isAdminAuthenticated,updateAppointmentStatus);

router.delete("/delete/:id",isAdminAuthenticated,deleteAppointment);
router.get('/count', isAdminAuthenticated,getAppointmentCount);



export default router;