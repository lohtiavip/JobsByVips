import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";

import cloudinary from "cloudinary";

//------------- public -----------//
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

//----------- ROUTERS ---------------//
import jobRouter from "./routes/jobRouter.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";

//----------- MIDDLEWARES ------------//
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import { authenticateUser } from "./middleware/authMiddleware.js";
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(cookieParser());
app.use(express.json());
app.use(helmet());
app.use(mongoSanitize());

app.use(express.static(path.resolve(__dirname, "./Client/dist")));

app.get("/api", (req, res) => {
  res.json({
    msg: "Hello Vip as Backend Developer. You are now full stack developer",
  });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", authenticateUser, userRouter);
app.use("/api/v1/jobs", authenticateUser, jobRouter);

// app.use(/.*/, (req, res) => {
//   res.sendFile(path.resolve(__dirname, "./Client/dist", "index.html"));
// });

app.get(/.*/, (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/dist", "index.html"));
});

app.use(/.*/, (req, res) => {
  res.status(404).json({ msg: "not found" });
});

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5100;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log("server running...... " + port);
  });
} catch (e) {
  console.log(e);
  process.exit();
}
