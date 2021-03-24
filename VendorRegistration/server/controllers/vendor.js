import express from "express";
import vendorRegistrations from "../models/vendorRegistrationSchema.js";
import initRegistrations from "../models/initRegistrationSchema.js";

const router = express.Router();

export const initialSave = async (req, res) => {
  let responseData = {};
  const reqKey = Object.keys(req.body)[0];
  const reqValue = Object.values(req.body)[0];

  try {
    const vendorId = req.body.vendorId ? req.body.vendorId : "";
    const keyValuePair = {
      [reqKey]: reqValue,
    };

    if (vendorId !== "") {
      const entries = Object.keys(keyValuePair);

      const updates = {};
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

    } else {
      const regData = {
        status: "New",
        initRegId: req.body.initRegId,
        [reqKey]: reqValue,
      };
      const vendorReg = new vendorRegistrations(regData);
      await vendorReg.save();
    }
    const vendorRegistrationsList = await vendorRegistrations.find({
      initRegId: req.body.initRegId,
    });
    responseData.vendorRegistrationsList = vendorRegistrationsList;
    responseData.message="Done";
    return res.status(200).json(responseData);
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

export default router;
