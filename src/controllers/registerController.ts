import { Request, Response } from "express";
import { User } from "../models/User"; 
import { Classroom } from "../models/Classroom";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

export const teacherRegister = async (req: Request, res: Response) => {
  try {
    const { username, email, password, classroomName } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create the teacher object:
    const teacher = new User({
      username,
      email,
      password: hashedPassword,
      role: "Teacher",
      classroom: null,
      grades: []
    });
    await teacher.save();

    // Create the classroom object:
    const classroom = new Classroom({
      classroomName: classroomName,
      teacher: teacher._id 
    });
    await classroom.save();

    // Adding classroom prop to teacher:
    teacher.classroom = classroom._id as mongoose.Types.ObjectId;
    await teacher.save();

    res.status(201).json({ message: "Teacher registered successfully", teacher, classroom });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ message: "Error registering teacher", error: error.message });
  }
};

export const studentRegister = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password, classroomName } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Find the classroom the student is joining
    const classroom = await Classroom.findOne({ classroomName });
    if (!classroom) {
      res.status(404).json({ message: "Classroom not found" });
      return;
    }
    
    // Create the student
    const student = new User({ 
      username, 
      email, 
      password: hashedPassword, 
      role: "Student", 
      classroom: classroom._id,
      grades: []
    });
    await student.save();

    // Add the student to the classroom's student list
    classroom.students.push(student._id as mongoose.Types.ObjectId);
    await classroom.save();
  
    res.status(201).json({ message: "Student registered successfully", student });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ message: "Error registering student", error: error.message });
  }
};
