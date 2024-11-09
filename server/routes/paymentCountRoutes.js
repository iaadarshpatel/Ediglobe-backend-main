import { Router } from "express";
import {paymentCount, paymentSearch} from "../controllers/paymentCount.js";

const router = Router();  

router.get('/searchpayment/:searchQuery', paymentSearch);
router.get('/payment/count', paymentCount)

export default router;  
