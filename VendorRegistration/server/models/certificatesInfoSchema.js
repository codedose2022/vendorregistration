import mongoose from "mongoose";

import * as dotenv from "dotenv";
dotenv.config();

const certificatesInfoSchema = mongoose.Schema(
  {
    comments:{
      type:Object,
      default:{}
    },
    qmsCertCopy: String,
    qmsManualCopy: String,
    qmsPolicyCopy: String,
    qmsListQAQCCopy: String,
    hsCertStandard:String,
    hsCertCopy:String,
    hsCertAuthority: String,
    hsEndDate: String,
    hseManualCopy: String,
    hsePolicyCopy: String,
    hseMgtSystemCopy: String,
    eCertType: String,
    eCertNumber: String,
    eCertFile: String,
    eCertAuth:String,
    eIssDate:Date,
    eExpDate:Date,
    adComDevCopy:String,
    adValueCertCopy:String,
    countryValueCertCopy:String,
    status: {
      type: String,
      default:"saved",
    },
  },
  { timestamps: true }
);

const certificatesInfo = mongoose.model("certificatesInfo", certificatesInfoSchema);

export default certificatesInfo;
