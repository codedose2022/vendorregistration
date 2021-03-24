import mongoose from "mongoose";

import * as dotenv from "dotenv";
dotenv.config();

const companyInfoSchema = mongoose.Schema(
  {
    comments:{
      type:Object,
      default:null
    },
    vendorType: [[String]],
    // vendorTypeC: {
    //   type: String,
    //   default: "",
    // },
    orgStructure: String,
    // orgStructureC: {
    //   type: String,
    //   default: "",
    // },
    companyName: [String],
    // companyNameC: {
    //   type: String,
    //   default: "",
    // },
    licenseNo: [Number],
    // licenseNoC: {
    //   type: String,
    //   default: "",
    // },
    yearOfEst: [Number],
    // yearOfEstC: {
    //   type: String,
    //   default: "",
    // },
    licenseExpDate: [Date],
    // licenseExpDateC: {
    //   type: String,
    //   default: "",
    // },
    licenseCopy: String,
    // licenseCopyC: {
    //   type: String,
    //   default: "",
    // },
    address1: [String],
    // address1C: {
    //   type: String,
    //   default: "",
    // },
    address2: [String],
    // address2C: {
    //   type: String,
    //   default: "",
    // },
    city: [String],
    // cityC: {
    //   type: String,
    //   default: "",
    // },
    emirates: [String],
    // emiratesC: {
    //   type: String,
    //   default: "",
    // },
    country: [String],
    // countryC: {
    //   type: String,
    //   default: "",
    // },
    poBox: [Number],
    // poBoxC: {
    //   type: String,
    //   default: "",
    // },
    email: [String],
    // emailC: {
    //   type: String,
    //   default: "",
    // },
    website: [String],
    // websiteC: {
    //   type: String,
    //   default: "",
    // },
    phoneNo: [Number],
    // phoneNoC: {
    //   type: String,
    //   default: "",
    // },
    faxNo: [Number],
    // faxNoC: {
    //   type: String,
    //   default: "",
    // },
    mobileNo: [Number],
    // mobileNoC: {
    //   type: String,
    //   default: "",
    // },
    noOfEmp: [Number],
    // noOfEmpC: {
    //   type: String,
    //   default: "",
    // },
    sisCompanies: [[String]],
    // sisCompaniesC: {
    //   type: String,
    //   default: "",
    // },
    status: {
      type: String,
      default:"saved",
    },
  },
  { timestamps: true }
);

const companyInfo = mongoose.model("companyInfo", companyInfoSchema);

export default companyInfo;
