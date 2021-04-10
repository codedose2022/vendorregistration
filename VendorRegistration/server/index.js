import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import createError from "http-errors";
import * as dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import vendor from "./routes/vendor.js";
import register from "./routes/initialRegister.js";
import authentication from "./routes/authentication.js";
import application from "./routes/application.js";
import mongoose from "mongoose";
import { initMongodb } from "./helper/initMongodb.js";
dotenv.config();
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));

app.use(cors({ origin: process.env.FRONT_END_URL, credentials: true }));

app.use(cookieParser());
app.use("/vendor", vendor);
app.use("/register", register);
app.use("/auth", authentication);
app.use("/applications", application);

app.use(async (req, res, next) => {
  next(createError.NotFound());
});
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
    },
  });
});

initMongodb(app);
