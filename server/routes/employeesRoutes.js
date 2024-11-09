import { Router } from "express";
import {employeeFetch, employeeFetchId, employeeAuth} from "../controllers/employeeDetails.js";

const router = Router();  

router.get('/employees/:id', employeeFetchId);
router.get('/allemployees', employeeFetch);
router.post('/auth/login', employeeAuth);

export default router;  
