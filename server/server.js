import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routers/authRouter.js";
import dotenv from "dotenv";
import dbConnect from "./config/dbConnect.js";

const app = express();
dotenv.config();
dbConnect()

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", // frontend origin
    credentials: true, // this is what allows cookies to be sent
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter);

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
