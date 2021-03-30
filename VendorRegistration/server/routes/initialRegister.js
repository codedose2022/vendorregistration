import express from "express";
import {
  initialRegister,
  addNewCompany,
} from "../controllers/initialRegister.js";
import multer from "multer";
import { fileFilter, storage } from "../controllers/uploadFiles.js";

const router = express.Router();

let upload = multer({ storage, fileFilter });

router.post("/initialRegister", upload.single("file"), initialRegister);
router.post("/addNewCompany", upload.single("file"), addNewCompany);

/*{
//body (formData)
file : christmas.jpg,
sectionName : certificateInfo
//header
vendorId : 605adb55f740811728d958dc
fieldName :qmsCertCopy
} */

// router.post("/uploadFile", ,uploadFile);

export default router;
