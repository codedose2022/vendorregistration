import express from "express";
import vendorRegistrations from "../models/vendorRegistrationSchema.js";
import responseMessageConstants from "../constants/responseMessage.js";
import responseStatusConstants from "../constants/responseStatusCode.js";
import _ from "lodash";

const router = express.Router();

export const initialSave = async (req, res) => {
  //pass vendorId in req if its saved before.
  //initRegId in req.body
  let responseData = {};
  const reqKey = Object.keys(req.body)[0];
  const reqValue = Object.values(req.body)[0];
  let keyValuePair = {};
  try {
    const vendorId = req.body.vendorId ? req.body.vendorId : "";
    if (reqKey === "contactInfo") {
      keyValuePair = {
        "contactInfo.contacts": reqValue,
        "contactInfo.status": "saved",
      };
    } else if (reqKey === "ownerInfo") {
      keyValuePair = {
        "ownerInfo.owners": reqValue,
        "ownerInfo.status": "saved",
      };
    } else {
      keyValuePair = {
        [reqKey]: reqValue,
      };
    }
    //if vendorId is present, update the document for fields as per in req
    if (vendorId !== "") {
      const entries = Object.keys(keyValuePair);

      let updates = {};
      for (let i = 0; i < entries.length; i++) {
        updates[entries[i]] = Object.values(keyValuePair)[i];
      }
      await vendorRegistrations.updateOne(
        {
          _id: vendorId,
        },
        {
          $set: updates,
        }
      );
      responseData.message = responseMessageConstants.UPDATED;
      responseData.status = responseStatusConstants.SUCCESS;
    } else {
      // if vendorId is not present, i.e its initial save, create a new document
      const regData = {
        status: "new",
        initRegId: req.body.initRegId,
        companyDetailId: req.body.companyId,
        [reqKey]: reqValue,
      };

      const vendorReg = new vendorRegistrations(regData);
      await vendorReg.save();
      responseData.message = responseMessageConstants.SAVED;
      responseData.status = responseStatusConstants.SUCCESS;
    }
    const vendorRegistrationsList = await vendorRegistrations.find({
      initRegId: req.body.initRegId,
    });
    responseData.vendorRegistrationsList = vendorRegistrationsList;
    return res.status(200).json(responseData);
  } catch (error) {
    responseData.status = responseStatusConstants.FAILURE;
    responseData.message = error.message;
    return res.status(404).json(responseData);
  }
};

export const submit = async (req, res) => {
  /* req format  
  {
    "vendorId": "605aced40e24a239548ade4a"
} */
  let responseData = {};
  try {
    let status = "";
    await vendorRegistrations
      .findOne({
        _id: req.body.vendorId,
      })
      .then((vendorRegistrationsList) => {
        let currentStatus = vendorRegistrationsList.status;
        if (currentStatus === "new") {
          status = "submitted";
        } else if (currentStatus === "incomplete") {
          status = "under review";
        }
      });

    await vendorRegistrations
      .findOneAndUpdate(
        { _id: req.body.vendorId },
        {
          $set: {
            status: status,
          },
        },
        {new: true},
        {
          fields: {
            'ownerInfo': 1,
    
          
        } }
      )
      .then((result) => {
        responseData.vendorRegistrationsList = result;
      });

    responseData.message = responseMessageConstants.SUBMITTED;
    responseData.status = responseStatusConstants.SUCCESS;
    return res.status(200).json(responseData);
  } catch (error) {
    responseData.status = responseStatusConstants.FAILURE;
    responseData.message = error.message;
    return res.status(404).json(responseData);
  }
};

export const getAllRegistrations = async (req, res) => {
  /* req format  (call initialSave api before save)
  {
    "initRegId": "6059ba940450373cb05c39b1"
} */
  let responseData = {};
  try {
    const vendorRegistrationsList = await vendorRegistrations.find({
      initRegId: req.body.initRegId,
    });
    responseData.vendorRegistrationsList = vendorRegistrationsList;
    responseData.status = responseStatusConstants.SUCCESS;
    return res.status(200).json(responseData);
  } catch (error) {
    responseData.status = responseStatusConstants.FAILURE;
    responseData.message = error.message;
    return res.status(404).json(responseData);
  }
};

export const uploadFile = async (req, res) => {
  let responseData = {};

  try {
    const reqKey = `${req.body.sectionName}.${req.header("fieldName")}`;
    let updates = {
      [reqKey]: req.file.filename,
    };
    await vendorRegistrations.updateOne(
      {
        _id: req.header("vendorId"),
      },
      {
        $set: updates,
      }
    );

    responseData.status = responseStatusConstants.SUCCESS;
    return res.status(200).json(responseData);
  } catch (error) {
    responseData.status = responseStatusConstants.FAILURE;
    responseData.message = error.message;
    return res.status(404).json(responseData);
  }
};



export default router;
