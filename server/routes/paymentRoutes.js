import { Router } from "express";
import allPayments from "../controllers/allPayments.js";
import authenticate from "../middleware/authenticate.js";

const router = Router();  

router.get('/allpayments/:id', authenticate, allPayments);

export default router;  
