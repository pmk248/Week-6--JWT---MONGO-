import { Router } from "express";
import { teacherRegister, studentRegister } from "../controllers/registerController"

const router = Router();

router.post("/teacher", teacherRegister)

router.post("/student", studentRegister)

export default router;