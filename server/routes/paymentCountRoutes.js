import { Router } from "express";
import {paymentCount, paymentSearch} from "../controllers/paymentCount.js";
import authenticate from "../middleware/authenticate.js";

const router = Router();  

router.get('/searchpayment/:searchQuery', authenticate, paymentSearch);
router.get('/payment/count', authenticate, paymentCount)

export default router;  
