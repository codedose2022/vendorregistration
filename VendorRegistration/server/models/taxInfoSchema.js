import mongoose from "mongoose";

import * as dotenv from "dotenv";
dotenv.config();

const taxInfoSchema = mongoose.Schema(
  {
    comments:{
      type:Object,
      default:{}
    },
    taxRegistered:String,
    vatNo: [String],
    vatCopy: String,
    tinNo: [Number],
    status: {
      type: String,
    },
  },
  // { minimize: false },
  { timestamps: true }
);

const taxInfo = mongoose.model("taxInfo", taxInfoSchema);

export default taxInfo;
