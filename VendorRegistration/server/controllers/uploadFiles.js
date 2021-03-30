import multer from "multer";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

export const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const folderName = req.header("vendorId");
    if (folderName) {
      if (!fs.existsSync(`Y:/images/${folderName}`)) {
        fs.mkdirSync(`Y:/images/${folderName}`);
        cb(null, `Y:/images/${folderName}`);
      } else {
        cb(null, `Y:/images/${folderName}`);
      }
    } else {
      cb(null, `Y:/images/initialReg`);
    }
  },

  filename: function (req, file, cb) {
    const folderName = req.header("fieldName");
    if (folderName) {
      cb(null, req.header("fieldName") + path.extname(file.originalname));
    }else{
      cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
    }
  },
});

export const fileFilter = (req, file, cb) => {
  const allowedFileTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
