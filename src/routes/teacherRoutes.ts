import { Router } from "express";
import { addGrade, deleteGrade, editGrade } from "../controllers/teacherController";

const router = Router();

router.post('/addGrade/', addGrade)
router.put('/editGrade', editGrade)
router.delete('/deleteGrade', deleteGrade)

export default router;