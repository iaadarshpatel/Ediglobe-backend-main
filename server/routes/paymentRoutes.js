import { Router } from "express";
import allPayments from "../controllers/allPayments.js";

const router = Router();  

router.get('/allpayments/:id', allPayments);

export default router;  
