import express from "express";
import { getStrats, rateStrat } from "../controllers/stratController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getStrats);
router.put("/:id/rating", authMiddleware, rateStrat);

export default router;
