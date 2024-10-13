import { Router } from "express";
import { addGrade, deleteGrade, editGrade, getClassAverage } from "../controllers/teacherController";

const router = Router();

router.post('/addGrade/', addGrade)
router.put('/editGrade', editGrade)
router.delete('/deleteGrade', deleteGrade)
router.get('/classAverage', getClassAverage)

export default router;