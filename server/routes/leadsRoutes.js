import { Router } from "express";
import {fetchLeadsDetailsById, updateLeadsDetails} from "../controllers/leadsDetails.js";
import authenticate from "../middleware/authenticate.js";

const router = Router();  

router.get('/fetchLeads/:id', authenticate, fetchLeadsDetailsById);
router.post('/updateLead', authenticate, updateLeadsDetails);

export default router;  
