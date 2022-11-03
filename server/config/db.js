import mongoose from "mongoose";

const connectDB = (DB_URI) => {
  mongoose
    .connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log(`Mongodb Connected`);
    })
    .catch((error) => {
      console.log(`${error} did not connect`);
    });
};

export default connectDB;
