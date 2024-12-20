import { Router } from "express";
import authenticate from "../middleware/authenticate.js";
import attendanceLogsInsert from "../controllers/attendanceLogsDetails.js";

const router = Router();  

router.post('/attendanceLogsPost', authenticate, attendanceLogsInsert);

export default router;  
