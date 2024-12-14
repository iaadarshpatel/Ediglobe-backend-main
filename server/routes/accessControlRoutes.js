import { Router } from "express";
import authenticate from "../middleware/authenticate.js";
import accessControlById from "../controllers/accessControlById.js";

const router = Router();

router.post('/', authenticate, accessControlById);

export default router;