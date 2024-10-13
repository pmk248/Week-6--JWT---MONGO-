import { Request, Response } from "express";
import { User } from "../models/User";
import { Classroom } from "../models/Classroom";

export const getAllClasses = async (req: Request, res: Response): Promise<void> => {
  try {
    // Find all classrooms
    const classrooms = await Classroom.find().populate('teacher').populate('students');

    if (classrooms.length === 0) {
      res.status(404).json({ message: "No classrooms found" });
      return;
    }

    res.status(200).json(classrooms);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ message: "Error retrieving classrooms", error: error.message });
  }
};

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