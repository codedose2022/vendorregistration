import mongoose from "mongoose";

import * as dotenv from "dotenv";
dotenv.config();

const applicationSchema = mongoose.Schema(
  {
    applicationType : String,
    typeId : String,
    userId : String,
  },
  { timestamps: true }
);

const application = mongoose.model("application", applicationSchema);

export default application;
