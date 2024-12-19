import { environment } from "../utils/environment.js";
import { RedisStore } from "connect-redis";
import redisClient from "../redis/redisClient.js";

const expressSessionOptions = {
  cookie: {
    httpOnly: true,
    maxAge: environment.EXPIRES_IN,
    secure: environment.NODE_ENV === "production", // Use secure cookies in production
  },
  secret: environment.JWT_SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  name: "OAuth-session",
  store: new RedisStore({ client: redisClient, prefix: "myapp:" }),
};

export default expressSessionOptions;
