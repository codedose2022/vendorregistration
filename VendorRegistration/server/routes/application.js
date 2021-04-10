import express from "express";
import auth from "../middleware/auth.js";
import { getUserApplications } from "../controllers/applications.js";
const router = express.Router();

router.post("/getUserApplications", auth, getUserApplications);

export default router;
