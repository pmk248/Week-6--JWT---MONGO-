import { Router } from "express";
import { getAllStudents } from "../controllers/teachersController";
import { verify } from "../middleware/authMiddleware";

const router = Router();

router.get('/', verify, getAllStudents)