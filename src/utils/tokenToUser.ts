import { Request } from "express";
import jwt from "jsonwebtoken"

export const getUserFromToken = (req: Request): { userId: string; role: string } | null => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return null;
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);
      return decoded as { userId: string; role: string };
    } catch (error) {
      return null;
    }
};