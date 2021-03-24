import mongoose from "mongoose";

import * as dotenv from "dotenv";
dotenv.config();

const ownersInfoSchema = mongoose.Schema(
  {
    comments:{
      type:Object,
      default:{}
    },
    name: [String],
    designation: [String],
    percentOfShare: [Number],
    nationality: [String],
    tel: [Number],
    mob: [Number],
    email: [String],
    status: {
      type: String,
      default:"saved",
    },
  },
  { timestamps: true }
);

const ownersInfo = mongoose.model("ownersInfo", ownersInfoSchema);

export default ownersInfo;
