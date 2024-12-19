import dotenv from "dotenv";
dotenv.config();
import { environment } from "./utils/environment.js";
import server from "./app.js";

const PORT = environment.PORT || 8080;

console.log("Connecting to MongoDB...");
if (environment.NODE_ENV !== "test") {
  server.listen(PORT, () => {
    console.log(`Server is connected on port ${PORT}`);
  });
}
