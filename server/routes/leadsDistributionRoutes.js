import { Router } from "express";
import getPGFL from "../controllers/getPGFL.js";

const router = Router();  

router.get('/pgfl', getPGFL);

export default router;  
