import mongoose from "mongoose";

import * as dotenv from "dotenv";
dotenv.config();

const contactInfoSchema = mongoose.Schema(
  {
    comments:{
      type:Object,
      default:{}
    },
    inChargeFor: [String],
    title: [String],
    fname: [String],
    lname: [String],
    position: [String],
    mob: [Number],
    tel: [Number],
    email: [String],
    altEmail: [String],
    status: {
      type: String,
      default:"saved",
    },
  },
  { timestamps: true }
);

const contactInfo = mongoose.model("contactInfo", contactInfoSchema);

export default contactInfo;
