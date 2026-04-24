import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { authoriseRoles } from "../middleware/auth.middleware.js";
import {createProfile,getProfiles,getProfileById,updateProfile,deleteProfile} from "../controllers/birthProfile.controllers.js"


const router = express.Router();

router.post("/create-profile",authMiddleware,createProfile);
router.get("/get-profile",authMiddleware,getProfiles);
router.get("/get-profilebyid/:id",authMiddleware,getProfileById);
router.patch("/update-profile/:id",authMiddleware,updateProfile);
router.delete("/delete-profile/:id",authMiddleware,deleteProfile);

export default router;