import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const accessHours = process.env.ACCESS_TOKEN_EXPIRES ?? 5;
const refreshHours = process.env.REFRESH_TOKEN_EXPIRES ?? 30;
const signAccessToken = (
  userId: String,
  userEmail: String,
  accessTokenHours: number
) => {
  return new Promise((resolve, reject) => {
    const payload = {
      userID: userId,
      userEmail: userEmail,
    };
    const secrect_key: Secret = process.env.SECRECT_KEY_ACCESS ?? "Secret";
    const options = {
      expiresIn: `${accessTokenHours}h`,
      issuer: "iconnect.com",
    };
    jwt.sign(payload, secrect_key, options, (err, token) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(token);
      }
    });
  });
};

const signRefreshToken = (
  userId: String,
  userEmail: String,
  refreshTokenDays: number
) => {
  return new Promise((resolve, reject) => {
    const payload = {
      userID: userId,
      userEmail: userEmail,
    };
    const secrect_key: Secret = process.env.SECRECT_KEY_REFRESH ?? "Secret";
    const options = {
      expiresIn: `${refreshTokenDays}d`,
      issuer: "iconnect.com",
    };
    jwt.sign(payload, secrect_key, options, (err, token) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(token);
      }
    });
  });
};

const verifyAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // console.log("req::=>", req);

  // res.send({ ok: true });
  try {
    const accessToken = req.cookies.accessToken;
    console.log("accessToken:", accessToken);

    const access_token_scerect: Secret =
      process.env.SECRECT_KEY_ACCESS ?? "Secret";
    jwt.verify(
      accessToken,
      access_token_scerect,
      function (err: any, decoded: any) {
        if (err === null) {
          next();
        } else {
          res.status(403).send({
            ok: false,
            message: "User Authentication faild",
          });
        }
      }
    );
  } catch (error) {
    res.status(403).send({
      ok: false,
      message: "Invalid header faild",
    });
  }
};
const verifyRefreshToken = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    const refresh_token_scerect: Secret =
      process.env.SECRECT_KEY_REFRESH ?? "Secret";
    jwt.verify(
      refreshToken,
      refresh_token_scerect,
      async function (err: any, decoded: any) {
        if (err === null) {
          const accessToken = await signAccessToken(
            decoded.userID,
            decoded.userEmail,
            parseInt(accessHours.toString())
          );
          const finalAccessHours =
            parseInt(accessHours.toString()) * 60 * 60 * 1000;

          res.cookie("accessToken", accessToken, {
            maxAge: finalAccessHours,
          });
          res.send({
            ok: true,
            accessToken: accessToken,
          });
        } else {
          res.status(401).send({
            ok: false,
            message: "User Authentication faild",
          });
        }
      }
    );
  } catch (error) {
    res.status(401).send({
      ok: false,
      message: "Invalid header call faild",
    });
  }
};
export { verifyAccessToken, verifyRefreshToken, signRefreshToken };

export default signAccessToken;
