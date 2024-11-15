import "./lib/passport.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import globalErrorHandler from "./middlewares/globalErrorHandler.js";
import globalMiddlewares from "./middlewares/globalMiddlewares.js";
import protectRoute from "./middlewares/protectRoute.js";
import unidentifiedError from "./middlewares/unidentifiedError.js";
import socketConnect from "./lib/socketConnect.js";
import newConnection from "./socket/newConnection.js";
import joinRooms from "./socket/joinRooms.js";
import onDisconnect from "./socket/onDisconnect.js";

const { app, httpServer, io } = socketConnect();

app.get("/", (req, res) => {
  res.json({ message: "Hello from the server" });
});

app.get("/health", (req, res) => {
  res.json({ message: "Server Health is fine and good" });
});

// NOTE: SOCKET CONNECTION
io.use(socketAuthMiddleware);

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);
  newConnection(socket);
  joinRooms(socket);
  onDisconnect(socket);
});

// NOTE: GLOBAL MIDDLEWARES
globalMiddlewares(app);

// NOTE: DIFFERENT ROUTES
app.use("/auth", authRouter);
app.use("/user", protectRoute, userRouter);

// NOTE: UNIDENTIFIED ROUTES
app.all("*", unidentifiedError);

//  NOTE: GLOBAL ERROR HANDLER
app.use(globalErrorHandler);

export { app };

export default httpServer;
