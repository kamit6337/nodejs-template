import "./lib/passport.js";
import express from "express";
import globalErrorHandler from "./middlewares/globalErrorHandler.js";
import authRouter from "./routes/authRoutes.js";
import globalMiddlewares from "./middlewares/globalMiddlwares.js";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import typeDefs from "./graphql/typeDefs.js";
import resolvers from "./graphql/resolvers.js";
import cors from "cors";
import unIdentifiedUrlError from "./middlewares/unIdentifiedUrlError.js";

const app = express();

const init = async () => {
  try {
    app.get("/", (req, res) => {
      res.send("Hello from the server");
    });

    app.get("/health", (req, res) => {
      res.send("Server health is fine and good");
    });

    // MARK: GLOBAL MIDDLEWARES
    globalMiddlewares(app);

    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });

    await server.start();

    app.use(
      "/graphql",
      cors(),
      expressMiddleware(server, {
        context: ({ req }) => {
          return { req };
        },
      })
    );

    // NOTE: DIFFERENT ROUTES
    app.use("/auth", authRouter);

    // NOTE: UNIDENTIFIED ROUTES
    app.all("*", unIdentifiedUrlError);

    //  NOTE: GLOBAL ERROR HANDLER
    app.use(globalErrorHandler);
  } catch (error) {
    console.log("Issue in server started", error);
  }
};

init();

export default app;
