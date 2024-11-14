import dotenv from "dotenv";
dotenv.config();
import { environment } from "./utils/environment.js";
import connectToDB from "./utils/connectToDB.js";
import server from "./app.js";

const PORT = environment.PORT || 8080;

try {
  console.log("Connecting to MongoDB...");
  if (environment.NODE_ENV !== "test") {
    await connectToDB();
    server.listen(PORT, () => {
      console.log(`Server is connected on port ${PORT}`);
    });
  }
} catch (error) {
  console.error("Failed to start server:", error);
}
