import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import envVariables from "./lib/envVariables.js";
import authRoutes from "./routes/auth.routes.js";
import todoRoutes from "./routes/todo.routes.js";

const { PORT, CORS_ORIGIN } = envVariables();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: CORS_ORIGIN,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";

  console.error(err);
  res.status(errorStatus).json({ message: errorMessage });
});

app.listen(PORT, () => {
  console.log(`Server running at Port ${PORT}`);
});
