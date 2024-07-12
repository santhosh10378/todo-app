import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import envVariables from "../lib/envVariables.js";
import prisma from "../lib/prisma.js";
import createError from "../utils/createError.js";

const { JWT_SECRET, NODE_ENV } = envVariables();

export const signUp = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    console.log(req.body);

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return next(createError(400, "User already exists"));
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // Generate a token
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    // Set the token in a cookie
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: NODE_ENV === "production",
    });

    res.status(201).json({ message: "Registered" });
  } catch (error) {
    next(createError(error.status || 500, error.message));
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return next(createError(400, "Invalid credentials"));
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(createError(400, "Invalid credentials"));
    }

    // Generate a token
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    // Set the token in a cookie
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: NODE_ENV === "production",
    });

    res.status(200).json({ message: "Logged In" });
  } catch (error) {
    next(createError(error.status || 500, error.message));
  }
};

export const signOut = async (req, res, next) => {
  try {
    // Clear the token cookie
    res.clearCookie("authToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({ message: "Signed out successfully" });
  } catch (error) {
    next(createError(error.status || 500, error.message));
  }
};

export const getTokenUser = async (req, res, next) => {
  try {
    const user = req.user;

    res.status(200).json(user);
  } catch (error) {
    next(createError(error.status || 500, error.message));
  }
};
