import { Request, Response } from "express";
import { User } from "../models/User"; 
import { Classroom } from "../models/Classroom";
import mongoose from "mongoose";

export const teacherRegister = async (req: Request, res: Response) => {
  try {
      const { username, email, password, classroomName } = req.body;
      // Create the teacher object:
      const teacher = new User({
          username,
          email,
          password,
          role: "teacher",
          classroom: null
      });
      // Create the classroom and link it to the teacher:
      const classroom = new Classroom({
      name: classroomName,
      teacher: teacher._id 
      });
      // Now assign the classroom to the teacher:
      teacher.classroom = classroom._id as mongoose.Types.ObjectId;
      // Save both teacher and classroom in parallel
      await Promise.all([teacher.save(), classroom.save()]);Classroom
      res.status(201).json({ message: "Teacher registered successfully", teacher, classroom });
      } catch (err) {
      const error = err as Error;
      res.status(500).json({ message: "Error registering teacher", error: error.message });
    }
};


export const studentRegister = async (req: Request, res: Response) => {

  const { username, email, password, classroomId } = req.body; 
  // Find the classroom the student is joining
  const classroom = await Classroom.findById(classroomId);
  if (!classroom) return res.status(404).json({ message: "Classroom not found" });
  // Create the student
  const student = new User({ 
      username, 
      email, 
      password, 
      role: "student", 
      classroom: classroom._id 
  });
  await student.save();
  // Add the student to the classroom's student list
  classroom.students.push(student._id as mongoose.Types.ObjectId);
  await classroom.save();

  res.status(201).json({ message: "Student registered successfully", student });
};