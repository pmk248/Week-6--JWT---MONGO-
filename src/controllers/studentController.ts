import { Request, Response } from "express";
import { User } from "../models/User";
import { Grade } from "../models/Grade"

export const getAllGrades = async (req: Request, res: Response) => {
    try {
        const { username } = req.body;

        // Find the student and populate array:
        const student = await User.findOne({ username }).populate('grades');
        if (!student) {
            res.status(404).json({ message: "Student not found" });
            return;
        }
        // Response includes student's grades:
        res.status(200).json({ grades: student.grades });
    } catch(err) {
        const error = err as Error;
        res.status(500).json({ message: "Error fetching grades", error: error.message });
    }
}