import mongoose, { Document, Schema } from "mongoose";

export default interface IClassroom extends Document {
  name: string;
  teacher: mongoose.Types.ObjectId; // Link to a teacher (User model)
  students: mongoose.Types.ObjectId[]; // Array of students
}

const classroomSchema = new Schema<IClassroom>({
  name: {
    type: String,
    required: [true, "Classroom name is mandatory!"],
    unique: true,
  },
  teacher: {
    type: Schema.Types.ObjectId,
    ref: "User", // References a teacher from the User model
    required: true,
  },
  students: [{
    type: Schema.Types.ObjectId,
    ref: "User", // Array of students, each referencing a User model
  }],
}, { timestamps: true });

export const Classroom = mongoose.model<IClassroom>("Classroom", classroomSchema);
