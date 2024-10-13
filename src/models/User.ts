import mongoose, { Document, Schema } from "mongoose"

export default interface Iuser extends Document {
    username    : string;
    email       : string;
    password    : string;
    role        : "Teacher" | "Student",
    classroom?  : mongoose.Types.ObjectId,
    grades?     : mongoose.Types.ObjectId[]
}

const userSchema = new Schema<Iuser>({
    username: { 
        type    : String, 
        required: [true, "Name is mandatory!"], 
        unique  : true
    },
    email: { 
        type    : String, 
        required: [true, "Email is mandatory!"] 
    },
    password: { 
        type    : String, 
        required: [true, "Password is mandatory!"]
    },
    role: {
        type    : String,
        required: [true, "Role is mandatory!"],
        enum    : ["Teacher", "Student"]
    },
    classroom: {
        type    : Schema.Types.ObjectId,
        ref     : "Classroom",
        default : null
    },
    grades: {
        type    : [Schema.Types.ObjectId],
        ref     : "Grade",
        default : []
    }
}, { timestamps: true })

export const User = mongoose.model("User", userSchema);