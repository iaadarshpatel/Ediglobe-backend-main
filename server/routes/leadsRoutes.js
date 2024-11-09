import { Router } from "express";
import {fetchLeadsDetails, updateLeadsDetails} from "../controllers/leadsDetails.js";

const router = Router();  

router.get('/fetchLeads', fetchLeadsDetails);
router.post('/updateLead', updateLeadsDetails);

export default router;  
