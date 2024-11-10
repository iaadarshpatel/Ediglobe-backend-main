import { Router } from "express";
import {fetchLeadsDetails, updateLeadsDetails} from "../controllers/leadsDetails.js";
import authenticate from "../middleware/authenticate.js";

const router = Router();  

router.get('/fetchLeads', authenticate, fetchLeadsDetails);
router.post('/updateLead', authenticate, updateLeadsDetails);

export default router;  
