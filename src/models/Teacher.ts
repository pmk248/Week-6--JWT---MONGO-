import mongoose, { Document, Schema } from "mongoose"
import { Istudent } from "./Student"

export default interface Iteacher extends Document {
    username: string;
    email   : string;
    password: string;
    students?  : Istudent[];
}

const teacherSchema = new Schema<Iteacher>({
    username: { 
        type    : String, 
        required: [true, "Name is mandatory!"], 
        unique  : true
    },
    email: { 
        type  : String, 
        required: [true, "Email is mandatory!"] 
    },
    password: { 
        type  : String, 
        required: [true, "Password is mandatory!"]
    },
    students: {
        type: [Schema.Types.ObjectId],
        ref: "Student",
        default: []
    }
}, { timestamps: true })

export const Teacher = mongoose.model("Teacher", teacherSchema);