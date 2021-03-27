import express from "express";
import {
  initialSave,
  submit,
  getAllRegistrations,
} from "../controllers/vendor.js";

const router = express.Router();

router.post("/initialSave", initialSave);

router.post("/submit", submit);

router.post("/getAllRegistrations", getAllRegistrations);

export default router;
