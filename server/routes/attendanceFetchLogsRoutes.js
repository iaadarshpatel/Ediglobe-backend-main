import { Router } from "express";
import authenticate from "../middleware/authenticate.js";
import { allAttendanceLogs, allAttendanceLogsFetchById } from "../controllers/attendanceLogsDetailsById.js";

const router = Router();

router.get('/', authenticate, allAttendanceLogs);
router.get('/:id', authenticate, allAttendanceLogsFetchById);

export default router;