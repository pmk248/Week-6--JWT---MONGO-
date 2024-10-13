import { Request, Response } from "express";
//import Istudent, { Student } from "../models/Student";
import Iteacher, { Teacher } from "../models/Teacher";
import jwt from "jsonwebtoken"

export const register = async (
    req: Request<any, any, Iteacher>,
    res: Response
) => {
    try {
        const teacher = new Teacher(req.body);
        const creation = await teacher.save();
        // ------TOKEN:------- //
        const token = jwt.sign({
            name: creation.username,
            id: creation._id
        }, process.env.SECRET_KEY!);
        res.cookie("token", token);
        // -------------------- //
        res.status(201).json(creation);
        console.log(req.body.username, "added successfully");
    } catch(err) {
        const error = err as Error; 
        console.error(error.message);
        res.status(400).send(error.message);
    }
}
