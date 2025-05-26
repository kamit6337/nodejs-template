import dotenv from "dotenv";
dotenv.config();
import { environment } from "./utils/environment.js";
import app from "./app.js";
import { initRedis } from "./redis/redisClient.js";
const PORT = environment.PORT || 8080;

try {
  initRedis();

  app.listen(PORT, () => {
    console.log(`Server is connected on port ${PORT}`);
  });
} catch (error) {
  console.error("Failed to start server:", error);
}
