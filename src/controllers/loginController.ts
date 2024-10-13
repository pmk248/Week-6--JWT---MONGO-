import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/User";
import jwt from "jsonwebtoken";
import env from "dotenv"

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    // Generate JWT Token
    const token = jwt.sign({ 
      userId: user._id, 
      role: user.role 
    }, process.env.JWT_SECRET!,
      { expiresIn: "1h" });

    // Return the token
    res.status(200).json({ token });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
