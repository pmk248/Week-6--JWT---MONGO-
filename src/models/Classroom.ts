import mongoose, { Document, Schema } from "mongoose";

export default interface Iclassroom extends Document {
  classroomName: string;
  teacher: mongoose.Types.ObjectId; 
  students: mongoose.Types.ObjectId[]; 
}

const classroomSchema = new Schema<Iclassroom>({
  classroomName: {
    type: String,
    required: [true, "Classroom name is mandatory!"],
    unique: true,
  },
  teacher: {
    type: Schema.Types.ObjectId,
    ref: "User", 
    required: true,
  },
  students: [{
    type: Schema.Types.ObjectId,
    ref: "User", 
  }],
}, { timestamps: true });

export const Classroom = mongoose.model<Iclassroom>("Classroom", classroomSchema);
