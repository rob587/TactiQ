import express from "express";
import { analyzeR6S } from "../controllers/r6sController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/analyze", authMiddleware, analyzeR6S);

export default router;
