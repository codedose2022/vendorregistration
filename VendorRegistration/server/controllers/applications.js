import express from "express";
import ApplicationSchema from "../models/applicationSchema.js";
import responseStatusConstants from "../constants/responseStatusCode.js";

const router = express.Router();

export const getUserApplications = async (req, res) => {
  const responseData = {};
  try {
    const applications = await ApplicationSchema.find({
      userId: req.body.initRegId,
    }).sort({ createdAt: -1 });
    responseData.applications = applications;
    responseData.status = responseStatusConstants.SUCCESS;

    return res.status(200).json(responseData);
  } catch (error) {
    responseData.message = error.message;
    return res.status(404).json(responseData);
  }
};
export default router;
