import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
// Replace with your actual secret key
import dotenv from "dotenv";
dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET_KEY as string;
import { AppDataSource } from "../database";

import { User } from "../entities/User"; // Import the User entity

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.split(" ")[1];
  console.log("hello-----", token);

  if (!token) {
    return res.status(401).json({ message: "Authorization token not found" });
  }

  try {
    const decodedToken = jwt.verify(token, SECRET_KEY) as jwt.JwtPayload;
    console.log("good----", decodedToken);

    // Fetch the user from the database using the decoded token
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOne({
      where: {
        id: decodedToken.userId, // Assuming 'id' is the column name in the User entity
      },
    });
    console.log("user----", user);

    if (!user) {
      return res.status(403).json({ message: "Invalid token" });
    }
    res.locals.currentUser = user; // Attach the user to the request
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
};
