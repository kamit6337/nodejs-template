import redisClient from "../redis/redisClient.js";
import { environment } from "../utils/environment.js";
import { RedisStore } from "connect-redis";

const expressSessionOptions = {
  cookie: { httpOnly: true, maxAge: environment.EXPIRES_IN },
  secret: environment.JWT_SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  name: "OAuth-session",
  store: new RedisStore({ client: redisClient, prefix: "myapp:" }),
};

export default expressSessionOptions;
