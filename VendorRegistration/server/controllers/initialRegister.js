import express from "express";
import initRegistration from "../models/initRegistrationSchema.js";
import responseMessageConstants from "../constants/responseMessage.js";
import responseStatusConstants from "../constants/responseStatusCode.js";
import _ from "lodash";
import { sendEmail } from "../mail.js";
export const initialRegister = async (req, res) => {
  /* pass form data */
  let responseData = {};

  try {
    const {
      fName,
      lName,
      designation,
      email,
      mobNo,
      companyName,
      licenseNo,
      licenseExpDt,
    } = req.body;
    const licenseCopy = req.file.filename;
    const regData = {
      fName,
      lName,
      designation,
      email,
      mobNo,
      companyDetail: { companyName, licenseNo, licenseExpDt, licenseCopy },
    };

    const users = await initRegistration.find();
    let flag = false;
    users.map((user) => {
      if (user.email.includes(req.body.email)) {
        flag = true;
      }
    });
    if (flag) {
      responseData.message = responseMessageConstants.EXISTING_USER;
      responseData.status = responseStatusConstants.EXISTING_USER;
      return res.status(200).json(responseData);
    } else {
      const initialReg = new initRegistration(regData);
      await initialReg.save().then((result) => {
        sendEmail(req.body.email, req.body.fName, "InitialRegistration", null);
      });
      responseData.status = responseStatusConstants.SUCCESS;
      responseData.message = responseMessageConstants.INITIAL_REGISTER_SUCCESS;
      return res.status(200).json(responseData);
    }
  } catch (error) {
    responseData.status = responseStatusConstants.FAILURE;
    responseData.message = error.message;
    return res.status(404).json(responseData);
  }
};

export const addNewCompany = async (req, res) => {
  /* pass company details in form data */
  let responseData = {};
  try {
    const { companyName, licenseNo, licenseExpDt } = req.body;
    const licenseCopy = req.file.filename;
    const regData = {
      companyDetail: { companyName, licenseNo, licenseExpDt, licenseCopy },
    };
    await initRegistration
      .findOneAndUpdate(
        {
          _id: req.body._id,
        },
        {
          $push: regData,
        },
        { new: true }
      )
      .then((result) => {
        sendEmail(
          result.email[0],
          result.fName[0],
          "InitialRegistration",
          null
        );
      });

    responseData.status = responseStatusConstants.SUCCESS;
    return res.status(200).json(responseData);
  } catch (error) {
    responseData.status = responseStatusConstants.FAILURE;
    responseData.message = error.message;
    return res.status(404).json(responseData);
  }
};
export const getUserInfo = async (req, res) => {
  const responseData = {};
  try {
    const user = await initRegistration.findOne({
      _id: req.body.initRegId,
    });
    if (user) {
      responseData.status = responseStatusConstants.SUCCESS;
      delete user._doc.password;
      responseData.userInfo = user;
      return res.status(200).json(responseData);
    }
  } catch (error) {
    responseData.message = error.message;
    return res.status(404).json(responseData);
  }
};
