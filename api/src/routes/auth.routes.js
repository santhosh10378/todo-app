import express from "express";
import {
  getTokenUser,
  signIn,
  signOut,
  signUp,
} from "../controllers/auth.controllers.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/sign-up", signUp);
router.post("/sign-in", signIn);
router.post("/sign-out", signOut);
router.get("/profile", authMiddleware, getTokenUser);

export default router;
