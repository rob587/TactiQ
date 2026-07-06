import express from "express";
import { analyzeOW } from "../controllers/owController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/analyze", authMiddleware, analyzeOW);

export default router;
