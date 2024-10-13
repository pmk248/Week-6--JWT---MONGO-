import mongoose, { Document, Schema } from "mongoose";

export interface Istudent extends Document {}

export const studentSchema = new Schema<Istudent>({

}, { timestamps: true});

export const Post = mongoose.model("Student", studentSchema);