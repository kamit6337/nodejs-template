export const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
};

// import cors from "cors";

// Set up conditional CORS options
// const corsOptionsDelegate = (req, callback) => {
//   let corsOptions;

//   if (req.headers["x-client-type"] === "web") {
//     // Web client: Enable credentials for OAuth cookie handling
//     corsOptions = {
//       origin: true,
//       methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
//       allowedHeaders: ["Authorization", "Content-Type"],
//       credentials: true,
//     };
//   } else {
//     // Mobile client or other types: No credentials needed
//     corsOptions = {
//       origin: true,
//       methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
//       allowedHeaders: ["Authorization", "Content-Type"],
//       credentials: false,
//     };
//   }

//   callback(null, corsOptions);
// };

// export default corsOptionsDelegate;
// // Apply the CORS middleware with the delegate
// app.use(cors(corsOptionsDelegate));
