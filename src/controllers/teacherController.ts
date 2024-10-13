import { Request, Response } from "express";
import { User } from "../models/User"; 
import { Grade } from "../models/Grade"; 
import { Classroom } from "../models/Classroom";
import mongoose from "mongoose";

export const addGrade = async (req: Request, res: Response) => {
    try {
        const { subject, score, username } = req.body;

        // Find the student by username:
        const student = await User.findOne({ username });
        if (!student) {
            res.status(404).json({ message: "Student not found" });
            return;
        }
        // Create a new grade:
        const grade = new Grade({ subject: subject, score, student: student._id });
        console.log({grade})
        await grade.save();
    
        // Update the student to include the grade:
        await User.findByIdAndUpdate(student._id, { $push: { grades: grade._id } });
  
    res.status(201).json({ message: "Grade added successfully", grade });
    } catch (err) {
      const error = err as Error;
      res.status(500).json({ message: "Error adding grade", error: error.message });
    }
};
  
export const editGrade = async (req: Request, res: Response) => {
    try {
        const { subject, score, username } = req.body;

        // Find the student by username:
        const student = await User.findOne({ username });
        if (!student) {
        res.status(404).json({ message: "Student not found" });
        return;
        }
        // Find the grade by subject and student:
        const grade = await Grade.findOne({ subject: subject, student: student._id });
        if (!grade) {
        res.status(404).json({ message: "Grade not found for this student in this subject" });
        return;
        }
        grade.score = score;
        await grade.save();
        // Check if the grade exists and add:
        if (student.grades!.includes(grade._id as mongoose.Types.ObjectId)) {
        student.grades!.push(grade._id as mongoose.Types.ObjectId);
        await student.save();
        res.status(200).json({ message: "Grade editted successfully" });
        }
    } catch(err) {
        const error = err as Error
        res.status(500).json({ message: "Error editting grade", error: error.message });
    }
}

export const deleteGrade = async (req: Request, res: Response) => {
    try {
        const { subject, username } = req.body;

        // Find the student by username:
        const student = await User.findOne({ username });
        if (!student) {
        res.status(404).json({ message: "Student not found" });
        return;
        }
        const grade = await Grade.findOne({ subject, student: student._id });
        if (!grade) {
        res.status(404).json({ message: "Grade not found for this student in this subject" });
        return;
        }
        // Remove the grade from the student's grade array:
        student.grades = student.grades?.filter(g => !g.equals(grade._id as mongoose.Types.ObjectId)) || [];
        await student.save();
        // Delete the grade from db:
        await Grade.findByIdAndDelete(grade._id);
        res.status(200).json({ message: "Grade deleted successfully" });
    } catch(err) {
        const error = err as Error
        res.status(500).json({ message: "Error deleting grade", error: error.message });
    }
} 

export const getClassAverage = async (req: Request, res: Response) => {
    try {
        const { classname } = req.body;
        console.log(classname);
        
        // Find the classroom
        const classroom = await Classroom.findOne({ classroomName: classname }).populate('students');
        if (!classroom) {
            res.status(404).json({ message: "Classroom not found" });
            return;
        }
        // Check if classroom has students
        if (classroom.students.length === 0) {
            res.status(404).json({ message: "No students found in this classroom" });
            return;
        }
        // Get all grades of all students in the classroom
        const grades = await Grade.find({ student: { $in: classroom.students.map(student => student._id) } });
        if (grades.length === 0) {
            res.status(404).json({ message: "No grades found for students in this classroom" });
            return;
        }
        // Calculate the average of grades
        const totalScore = grades.reduce((acc, grade) => acc + grade.score, 0);
        const average = totalScore / grades.length;
        res.status(200).json({ average });
    } catch (err) {
        const error = err as Error;
        res.status(500).json({ message: "Error fetching grade averages", error: error.message });
    }
  };