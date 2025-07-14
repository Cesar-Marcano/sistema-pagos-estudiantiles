import { Router } from "express";

import { authRouter } from "./routes/auth";

export const router = Router();

// routes
router.use("/auth", authRouter);
