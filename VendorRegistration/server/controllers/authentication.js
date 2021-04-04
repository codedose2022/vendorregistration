import express from "express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import InitRegistrationSchema from "../models/initRegistrationSchema.js";
import * as dotenv from "dotenv";
import crypto from "crypto";
import createError from "http-errors";
import responseMessageConstants from "../constants/responseMessage.js";
import responseStatusConstants from "../constants/responseStatusCode.js";

dotenv.config();

const router = express.Router();

export const login = async (req, res) => {
  const { password } = req.body;
  const responseData = {};

  try {
    const user = await InitRegistrationSchema.findOne({
      username: req.body.username,
    }).select("+password");
    if (!user) {
      responseData.message = responseMessageConstants.INVALID_EMAIL;
      responseData.status = responseStatusConstants.INVALID_EMAIL;
      return res.status(200).json(responseData);
    }
    //const isMatch = await bcryptjs.compare(password, user.password);
    const isMatch = password === user.password ? true : false;
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    if (!isMatch) {
      responseData.message = responseMessageConstants.INVALID_PASSWORD;
      responseData.status = responseStatusConstants.INVALID_PASSWORD;
      return res.status(200).json(responseData);
    }
    responseData.message = responseMessageConstants.LOGIN_SUCCESS;
    responseData.status = responseStatusConstants.SUCCESS;
    responseData.token = token;
    delete user._doc.password;
    responseData.userInfo = user;
    return res.status(200).json(responseData);
  } catch (error) {
    responseData.message = error.message;
    return res.status(404).json(responseData);
  }
};

export const isTokenValid = async (req, res) => {
  try {
    const token = req.header("x-auth-token");

    if (!token) return res.json(false);
    try {
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      if (!verified) return res.json(false);

      const user = await InitRegistrationSchema.findById(verified.id);

      if (!user) return res.json(false);
      return res.json(true);
    } catch {
      return res.json(false);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export default router;
