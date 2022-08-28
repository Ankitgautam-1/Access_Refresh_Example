import express from "express";
import { getContract, signIn, signUp } from "../controller/authController";
import { verifyAccessToken, verifyRefreshToken } from "../utils/authToken";
const authRoute = express.Router();
authRoute
  .post("/api/v1/signin", signIn)
  .post("/api/v1/signup", signUp)
  .get("/api/v1/refreshToken", verifyRefreshToken)
  .get("/api/v1/getContract", verifyAccessToken, getContract);
export default authRoute;
