import { Router } from "express";
import { getAllClasses, getAllGrades } from "../controllers/studentController"
import { isStudent, verify } from "../middleware/authMiddleware";

const router = Router()

router.get('/getGrades', verify, isStudent, getAllGrades)
router.get('/getClasses', verify, isStudent, getAllClasses)

export default router;