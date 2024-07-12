import dotenv from "dotenv";
import createError from "../utils/createError.js";

dotenv.config();

const requiredEnvVars = [
  "PORT",
  "CORS_ORIGIN",
  "JWT_SECRET",
  "DATABASE_URL",
  "NODE_ENV",
];

const envVariables = () => {
  requiredEnvVars.forEach((varName) => {
    if (!process.env[varName]) {
      throw createError(500, `Environment variable ${varName} is missing!`);
    }
  });

  return {
    PORT: process.env.PORT,
    CORS_ORIGIN: process.env.CORS_ORIGIN,
    JWT_SECRET: process.env.JWT_SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
  };
};

export default envVariables;
