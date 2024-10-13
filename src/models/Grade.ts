import mongoose, { Document, Schema } from "mongoose";

export default interface Igrade extends Document {
    subject: string,
    score  : number,
    student?: mongoose.Types.ObjectId
}

const gradeSchema = new Schema<Igrade>({
    subject: {
        type: String,
        required: [true, "Subject Title"],
    },
    score: {
        type: Number,
        required: [true, "Score is mandatory!"],
        min: [0, "Score must be at least 0"],
        max: [100, "Score must be at most 100"],
    },
    student: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: [true, "Student ID is mandatory!"],
        default: null
      },
    }, { timestamps: true }
);

export const Grade = mongoose.model<Igrade>("Grade", gradeSchema);