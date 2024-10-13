import { Router } from "express";
import { addGrade, deleteGrade, editGrade, getClassAverage } from "../controllers/teacherController";
import { isTeacher, verify } from "../middleware/authMiddleware";

const router = Router();

router.post('/addGrade/', verify, isTeacher, addGrade)
router.put('/editGrade', verify, isTeacher, editGrade)
router.delete('/deleteGrade', verify, isTeacher, deleteGrade)
router.get('/classAverage', verify, isTeacher, getClassAverage)

export default router;