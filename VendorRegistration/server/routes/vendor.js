import express from "express";
import { initialSave, addComments } from "../controllers/vendor.js";

const router = express.Router();

router.post("/initialSave", initialSave);
router.post("/addComments", addComments);

export default router;
