import mongoose from "mongoose";
import { environment } from "./environment.js";

let isDatabaseConnected = false;

const connectToDB = async () => {
  if (isDatabaseConnected) {
    return;
  }

  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(environment.MONGO_DB_URI);
    isDatabaseConnected = true;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error(error.message || "Something went wrong");
  }
};

mongoose.connection.on("disconnected", async () => {
  isDatabaseConnected = false;
  console.log("Disconnected from MongoDB");
  await connectToDB();
});

export default connectToDB;
