import express from "express";
import {
  initialSave,
  submit,
  getAllRegistrations,
  uploadFile,
} from "../controllers/vendor.js";
import multer from "multer";
import { fileFilter, storage } from "../controllers/uploadFiles.js";
import auth from "../middleware/auth.js";

const router = express.Router();

let upload = multer({ storage, fileFilter });

router.post("/initialSave", initialSave);

router.post("/submit", submit);

router.post("/getAllRegistrations", auth, getAllRegistrations);


/*{
//body (formData)
file : christmas.jpg,
sectionName : certificateInfo
//header
vendorId : 605adb55f740811728d958dc
fieldName :qmsCertCopy
} */

router.post("/uploadFile", upload.single("file"),uploadFile);

export default router;
