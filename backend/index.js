import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import workerRoute from "./routes/workers.js";

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

/*In essence, this code sets up a listener that watches for MongoDB disconnections. When a disconnection happens, it logs a message to the console, informing you of the event. */

//middlewares
app.use(cors());
// app.use(
//   cors({
//     origin: "https://deploy-mern-lwhq.vercel.app",
//     methods: ["POST", "GET"],
//     credentials: true, // Allow credentials to be sent with the request
//   })
// );
app.use(cookieParser());
app.use(express.json());

app.set("view engine", "ejs");

// Middleware to parse request body
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (if any)
app.use(express.static("public"));

app.use("/", (req, res) => {
  res.json("Hey friends, its me surya");
});

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/workers", workerRoute);

app.get("/api/auth/register", (req, res) => {
  res.render("register.ejs");
});

app.get("/customer", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "customer.html"));
});

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(8800, () => {
  connect();
  console.log("Connected to backend.");
});
