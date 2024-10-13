import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

interface DecodedToken {
    userId: string;
    role: string;
}

export const verify = (req: Request & { user?: DecodedToken }, res: Response, next: NextFunction) => {
    const token = req.headers["authorization"]?.split(" ")[1]; 
    if (!token) {
        res.status(403).json({ message: "No token provided" });
        return;
    }
    try {
        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
        req.user = decoded; 
        next();
    } catch (err) {
        const error = err as Error
        res.status(401).json({ message: "Invalid token", error: error.message });
        return;
    }
};

export const isTeacher = (req: Request & { user?: DecodedToken }, res: Response, next: NextFunction) => {
    const user = req.user as DecodedToken; 
    if (user && user.role !== "Teacher") {
        res.status(403).json({ message: "Access denied: Only teachers allowed" });
        return;
    }
    next();
};

export const isStudent = (req: Request & { user?: DecodedToken }, res: Response, next: NextFunction) => {
    const user = req.user as DecodedToken;
    if (user && user.role !== "Student") {
        res.status(403).json({ message: "Access denied: Only students allowed" });
        return;
    }
  next();
};
