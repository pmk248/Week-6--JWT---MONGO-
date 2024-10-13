import { Router } from "express";
import { getAllClasses, getAllGrades } from "../controllers/studentController"

const router = Router()

router.get('/getGrades', getAllGrades)
router.get('/getClasses', getAllClasses)

export default router;