import express, { Request, Response } from "express";
import cors from "cors";
import authRoute from "./routes/auth";
import helmet from "helmet";
import mongoose from "mongoose";
import dotenv from "dotenv";
import FRONTEND_URL, { MONGO_URL, PORT } from "./utils/config";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
console.log("FRONTEND_URL:", FRONTEND_URL);

app.use(helmet({ noSniff: true }));

app.use(
  cors({
    credentials: true,
    origin: [FRONTEND_URL, "http://localhost:4173"],
  })
);
mongoose
  .connect(MONGO_URL)
  .then((con) => {
    app.get("/", async (req, res) => {
      res.send({ ok: true, message: "server is online" });
    });
    app.use(authRoute);

    app.listen(PORT, () => {
      console.log("Server is online port:", `http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("connection Error", err);
  });
