import express from "express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import InitRegistrationSchema from "../models/initRegistrationSchema.js";
import * as dotenv from "dotenv";
import crypto from "crypto";
import responseMessageConstants from "../constants/responseMessage.js";
import responseStatusConstants from "../constants/responseStatusCode.js";


dotenv.config();

const router = express.Router();

export const login = async (req, res) => {
  const { password } = req.body;
  const responseData = {};
  try {
    const user = await InitRegistrationSchema.findOne({ username: req.body.username }).select("+password");
    if (!user) {
      responseData.message = responseMessageConstants.INVALID_EMAIL;
      responseData.status = responseStatusConstants.INVALID_EMAIL;
      return res.status(200).json(responseData);
    }
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      responseData.message = responseMessageConstants.INVALID_PASSWORD;
      responseData.status = responseStatusConstants.INVALID_PASSWORD;
      return res.status(200).json(responseData);
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    responseData.message = responseMessageConstants.LOGIN_SUCCESS;
    responseData.status = responseStatusConstants.SUCCESS;
    responseData.token = token;
    responseData.userInfo = user;
    return res.status(200).json(responseData);
  } catch (error) {
    responseData.message = error.message;
    return res.status(404).json(responseData);  
  }
};


export default router;
