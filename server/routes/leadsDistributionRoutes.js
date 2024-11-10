import { Router } from "express";
import getPGFL from "../controllers/getPGFL.js";
import authenticate from "../middleware/authenticate.js";

const router = Router();  

router.get('/pgfl', authenticate, getPGFL);

export default router;  
