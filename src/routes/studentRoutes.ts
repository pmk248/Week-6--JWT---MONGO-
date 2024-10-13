import { Router } from "express";
import { getAllGrades } from "../controllers/studentController"

const router = Router()

router.get('/getGrades', getAllGrades)

export default router;