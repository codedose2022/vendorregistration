import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

export const initMongodb = (app) => {
  const PORT = process.env.PORT || 8000;
  mongoose
    .connect(process.env.CONNECTION_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() =>
      app.listen(PORT, () =>
        console.log(`Server Running on Port: http://localhost:${PORT}`)
      )
    )
    .catch((error) => console.log(`${error} did not connect`));

  mongoose.connection.on("connected", () => {
    console.log("Mongoose connected to db");
  });
  mongoose.connection.on("error", (err) => {
    console.log(err.message);
  });
  mongoose.connection.on("disconnected", () => {
    console.log("Mongoose connection is disconnected");
  });
  process.on("SIGINT", async () => {
    await mongoose.connection.close();
    process.exit(0);
  });
 
};
