import mongoose from "mongoose";
import companyInfo from "./companyInfoSchema.js";
// import ownersInfoSchema from "./ownersInfoSchema.js";
// import bankInfoSchema from "./bankInfoSchema.js";
// import taxInfoSchema from "./taxInfoSchema.js";
// import certificatesInfoSchema from "./certificatesInfoSchema.js";
// import productsInfoSchema from "./productsInfoSchema.js";
// import contactInfoSchema from "./contactInfoSchema.js";
// import otherInfoSchema from "./otherInfoSchema.js";

import * as dotenv from "dotenv";
dotenv.config();
const schema = mongoose.Schema;
const vendorRegistrationSchema = mongoose.Schema(
  {
    status: {
      type: String,
      default: "saved",
    },
    initRegId: {
      type: schema.Types.ObjectId,
      ref: "initRegistrationsSchema",
    },
    companyInfo: companyInfo.schema,
    // ownersInfo: ownersInfoSchema,
    // bankInfo: bankInfoSchema,
    // taxInfo: taxInfoSchema,
    // certificatesInfo: certificatesInfoSchema,
    // productsInfo: [productsInfoSchema],
    // contactInfo: [contactInfoSchema],
    // otherInfo: otherInfoSchema,
  },
  { timestamps: true }
);

const vendorRegistrations = mongoose.model(
  "vendorRegistrations",
  vendorRegistrationSchema
);

export default vendorRegistrations;
