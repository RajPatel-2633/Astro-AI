import express from "express";
import { generateChart , generateChartByProfileId } from "../controllers/birthChart.controllers.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/generate",authMiddleware,generateChart);
router.get("/:profile_id",authMiddleware,generateChartByProfileId);

export default router;