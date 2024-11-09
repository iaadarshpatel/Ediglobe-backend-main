import { Router } from "express";
import attendanceDetails from "../controllers/attendanceDetails.js";

const router = Router();  

router.get('/attendance', attendanceDetails);

export default router;  
