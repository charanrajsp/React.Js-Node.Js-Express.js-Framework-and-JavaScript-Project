import express from "express"
import {deleteDoctor,getDoctorCount} from "../controller/appointmentController.js"
import {isAdminAuthenticated} from "../mddlewares/auth.js"

const router = express.Router();

router.delete("/delete/:id",isAdminAuthenticated,deleteDoctor);
router.get("/doctorcount",isAdminAuthenticated,getDoctorCount);



export default router;