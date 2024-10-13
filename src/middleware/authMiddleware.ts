import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"

interface Itoken {
    name: string,
    id: string 
}

export const verify = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;
    try {
        if (!token) throw new Error("Unauthorized!");
        const checkedToken = jwt.verify(token, process.env.SECRET_KEY!) as Itoken;
        //@ts-ignore
        req.user = checkedToken;
        
        next();
    } catch(err) {
        const error = err as Error;
        console.error(error.message);
        res.status(401).send(error.message);
    }
}