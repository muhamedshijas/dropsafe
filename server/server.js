import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routers/authRouter.js";
import fileRouter from "./routers/fileRouter.js";
import dotenv from "dotenv";
import dbConnect from "./config/dbConnect.js";

dotenv.config();
const app = express();
dbConnect();

const allowedOrigins = [
  "http://localhost:3000",
  "https://dropsafe.onrender.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, 
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/file", fileRouter);

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
