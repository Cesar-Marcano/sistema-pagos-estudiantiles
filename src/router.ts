import { Router } from "express";

import { authRouter } from "./routes/auth";
import { parentRouter } from "./routes/parent";
import { studentRouter } from "./routes/student";

export const router = Router();

// routes
router.use("/auth", authRouter);
router.use("/parent", parentRouter);
router.use("/student", studentRouter);
