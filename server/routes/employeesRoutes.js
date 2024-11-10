import { Router } from "express";
import {employeeFetch, employeeFetchId, employeeAuth} from "../controllers/employeeDetails.js";
import authenticate from "../middleware/authenticate.js";

const router = Router();  

// Public route (no authentication required)
router.post('/auth/login', employeeAuth);

// Protected routes (authentication required)
router.get('/employees/:id', authenticate, employeeFetchId);  
router.get('/allemployees', authenticate, employeeFetch);    

export default router;