import mongoose from "mongoose";
import { environment } from "../utils/environment.js";

mongoose.connect(environment.MONGO_DB_URI);

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Disconnected from MongoDB");
});

// Handle connection events
mongoose.connection.on("connected", async () => {
  console.log("Connected to MongoDB");

  try {
    mongoose.connection.close();
  } catch (error) {
    console.error("Error processing image:", error);
    mongoose.connection.close();
  }
});
