import express from "express";
import { initialSave } from "../controllers/vendor.js";

const router = express.Router();

router.post("/initialSave", initialSave);
router.post("/initialSave", initialSave);

export default router;
