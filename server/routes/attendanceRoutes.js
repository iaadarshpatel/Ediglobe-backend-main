import { Router } from "express";
import attendanceDetails from "../controllers/attendanceDetails.js";
import authenticate from "../middleware/authenticate.js";

const router = Router();  

router.get('/attendance', authenticate, attendanceDetails);

export default router;  
