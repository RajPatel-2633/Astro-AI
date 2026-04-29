import express from "express";
import {initialiseChat,sendMessage,getUserSessions,getChatHistory} from "../controllers/chat.controllers.js"
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/initialise-chat",authMiddleware,initialiseChat);
router.post("/send-message/:sessionId",authMiddleware,sendMessage);
router.get("/get-sessions/:sessionId",authMiddleware,getUserSessions);
router.get("/get-chat-history",authMiddleware,getChatHistory);



export default router;