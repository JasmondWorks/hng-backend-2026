import express, { Response, Router } from "express";

const router: Router = express.Router();

import classifyRoutes from "../modules/classify/classify.routes";
import profileRoutes from "../modules/profile/profile.routes";

// Health check
router.get("/health", (_, res: Response) => {
  res.status(200).json({ ok: true, message: "HNG Backend API is running" });
});

// Mount modules
router.use("/classify", classifyRoutes);
router.use("/profiles", profileRoutes);

export default router;
