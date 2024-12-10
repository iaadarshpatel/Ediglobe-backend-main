import { Router } from "express";
import {dpsFormData, dpsFormDataById} from "../controllers/dpsFormDetails.js";
import authenticate from "../middleware/authenticate.js";

const router = Router();  

router.post('/dpsFormData', authenticate, dpsFormData);
router.get('/dpsFormDataById/:id', authenticate, dpsFormDataById);

export default router;  
