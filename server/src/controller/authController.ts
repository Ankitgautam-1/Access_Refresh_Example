import express, { NextFunction } from "express";
import { Request, Response } from "express";
import Joi from "joi";
import UserModel from "../model/userModel";
import authSchema from "../schemaValidation/authSchema";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
const accessTokenHours = parseInt(process.env.ACCESS_TOKEN_EXPIRES ?? "5");
const refreshTokenDays = parseInt(process.env.REFRESH_TOKEN_EXPIRES ?? "30");

import signAccessToken, { signRefreshToken } from "../utils/authToken";
import ContractModel from "../model/contractModel";
const signIn = async (req: Request, res: Response) => {
  const email: string = req.body.email;
  const password: string = req.body.password;
  console.log("email:", email, " password", password);
  try {
    const validation: Joi.ValidationResult<any> = authSchema.validate(req.body);
    console.log("validation", validation);

    if (!validation.error) {
      const user = await UserModel.findOne({
        email: validation.value.email,
      });

      if (user) {
        console.log(
          "validation.value.password:",
          validation.value.password,
          "user.password:",
          user.password
        );
        bcrypt.compare(
          validation.value.password,
          user.password ?? "",
          async (err, result) => {
            if (!result) {
              res.status(401).send({
                ok: false,
                error: "incorrect password",
              });
            } else {
              const accessToken = await signAccessToken(
                user.id,
                user.email,
                accessTokenHours
              );
              const refreshToken = await signRefreshToken(
                user.id,
                user.email,
                refreshTokenDays
              );
              const finalAccessHours = accessTokenHours * 60 * 60 * 1000;
              console.log("finalAccessHours:", finalAccessHours);
              const finalRefreshToken = refreshTokenDays * 24 * 60 * 60 * 1000;
              console.log("finalRefreshToken:", finalRefreshToken);

              res.cookie("accessToken", accessToken, {
                maxAge: finalAccessHours,
              });
              res.cookie("refreshToken", refreshToken, {
                maxAge: finalRefreshToken,
              });
              res.status(200).json({
                ok: true,
                user: user,
                accessToken: accessToken,
                refreshToken: refreshToken,
              });
            }
          }
        );
      } else {
        res.status(401).send({ ok: false, message: "user not found" });
      }
    } else {
      if (validation.error.isJoi === true) {
        res.status(400).send({
          ok: false,
          error: validation.error.details[0].message,
        });
      } else {
        res.status(400).send({ ok: false, error: validation.warning });
      }
    }
  } catch (error: any) {
    if (error.isJoi === true) {
      res.status(400).send({
        ok: false,
        error: error.details[0].message,
      });
    } else {
      res.status(400).send({ ok: false, error: "user not found" });
    }
  }
};
// export const authorization = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const token: string = req.headers.authorization?.toString()!;
//   console.log("token:", token);
//   res.send("authorization");
// };
// export const test = (req: Request, res: Response, next: NextFunction) => {
//   console.log("test");
//   res.send("test");
// };
const signUp = async (req: Request, res: Response) => {
  const email: string = req.body.email;
  const password: string = req.body.password;
  console.log("email:", email, " password", password);
  try {
    const validation: Joi.ValidationResult<any> = authSchema.validate(req.body);
    console.log("validation", validation);

    if (!validation.error) {
      const user = await UserModel.findOne({
        email: validation.value.email,
      });
      console.log("user", user);

      if (user != null) {
        res
          .status(400)
          .send({ ok: false, message: "user already exist with same email" });
      } else {
        const passwordCrpyt = await bcrypt.hash(password, 10);
        const newUser = await UserModel.create({
          email: validation.value.email,
          password: passwordCrpyt,
        });
        newUser.save();
        res.status(201).send({ ok: true, user: newUser });
      }
    } else {
      if (validation.error.isJoi === true) {
        res.status(400).send({
          ok: false,
          error: validation.error.details[0].message,
        });
      } else {
        res.status(400).send({ ok: false, error: validation.warning });
      }
    }
  } catch (error: any) {
    if (error.isJoi === true) {
      res.status(400).send({
        ok: false,
        error: error.details[0].message,
      });
    } else {
      res.status(400).send({ ok: false, error: "user not found" });
    }
  }
};
const getContract = async (req: Request, res: Response) => {
  res.send({
    ok: true,
    contracts: [
      { id: 1, name: "testData" },
      { id: 2, name: "exmaple " },
      { id: 3, name: "finalData" },
    ],
  });
};
export { signUp, signIn, getContract };
