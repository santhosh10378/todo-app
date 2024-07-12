import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";
import envVariables from "../lib/envVariables.js";
import createError from "../utils/createError.js";

const { JWT_SECRET } = envVariables();

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.authToken;

  if (!token) {
    return next(createError(401, "Please Login."));
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      return next(createError(401, "User not found"));
    }

    req.user = user;
    next();
  } catch (error) {
    next(createError(401, "User not found"));
  }
};

export default authMiddleware;
