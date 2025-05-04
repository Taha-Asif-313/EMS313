import mongoose from "mongoose";

const connectDb = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Db connected!");
    })
    .catch(() => {
      console.log("Db not connected!");
    });
};

export default connectDb;
