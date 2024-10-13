import { Router } from "express";
import { teacherRegister, studentRegister } from "../controllers/registerController"

const router = Router();

router.post("/register/teacher", teacherRegister)

router.post("/register/student", studentRegister)

export default router;