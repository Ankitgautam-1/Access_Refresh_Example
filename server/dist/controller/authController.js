"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContract = exports.signIn = exports.signUp = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const authSchema_1 = __importDefault(require("../schemaValidation/authSchema"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const accessTokenHours = parseInt((_a = process.env.ACCESS_TOKEN_EXPIRES) !== null && _a !== void 0 ? _a : "5");
const refreshTokenDays = parseInt((_b = process.env.REFRESH_TOKEN_EXPIRES) !== null && _b !== void 0 ? _b : "30");
const authToken_1 = __importStar(require("../utils/authToken"));
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const email = req.body.email;
    const password = req.body.password;
    console.log("email:", email, " password", password);
    try {
        const validation = authSchema_1.default.validate(req.body);
        console.log("validation", validation);
        if (!validation.error) {
            const user = yield userModel_1.default.findOne({
                email: validation.value.email,
            });
            if (user) {
                console.log("validation.value.password:", validation.value.password, "user.password:", user.password);
                bcrypt_1.default.compare(validation.value.password, (_c = user.password) !== null && _c !== void 0 ? _c : "", (err, result) => __awaiter(void 0, void 0, void 0, function* () {
                    if (!result) {
                        res.status(401).send({
                            ok: false,
                            error: "incorrect password",
                        });
                    }
                    else {
                        const accessToken = yield (0, authToken_1.default)(user.id, user.email, accessTokenHours);
                        const refreshToken = yield (0, authToken_1.signRefreshToken)(user.id, user.email, refreshTokenDays);
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
                }));
            }
            else {
                res.status(401).send({ ok: false, message: "user not found" });
            }
        }
        else {
            if (validation.error.isJoi === true) {
                res.status(400).send({
                    ok: false,
                    error: validation.error.details[0].message,
                });
            }
            else {
                res.status(400).send({ ok: false, error: validation.warning });
            }
        }
    }
    catch (error) {
        if (error.isJoi === true) {
            res.status(400).send({
                ok: false,
                error: error.details[0].message,
            });
        }
        else {
            res.status(400).send({ ok: false, error: "user not found" });
        }
    }
});
exports.signIn = signIn;
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
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = req.body.password;
    console.log("email:", email, " password", password);
    try {
        const validation = authSchema_1.default.validate(req.body);
        console.log("validation", validation);
        if (!validation.error) {
            const user = yield userModel_1.default.findOne({
                email: validation.value.email,
            });
            console.log("user", user);
            if (user != null) {
                res
                    .status(400)
                    .send({ ok: false, message: "user already exist with same email" });
            }
            else {
                const passwordCrpyt = yield bcrypt_1.default.hash(password, 10);
                const newUser = yield userModel_1.default.create({
                    email: validation.value.email,
                    password: passwordCrpyt,
                });
                newUser.save();
                res.status(201).send({ ok: true, user: newUser });
            }
        }
        else {
            if (validation.error.isJoi === true) {
                res.status(400).send({
                    ok: false,
                    error: validation.error.details[0].message,
                });
            }
            else {
                res.status(400).send({ ok: false, error: validation.warning });
            }
        }
    }
    catch (error) {
        if (error.isJoi === true) {
            res.status(400).send({
                ok: false,
                error: error.details[0].message,
            });
        }
        else {
            res.status(400).send({ ok: false, error: "user not found" });
        }
    }
});
exports.signUp = signUp;
const getContract = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send({
        ok: true,
        contracts: [
            { id: 1, name: "testData" },
            { id: 2, name: "exmaple " },
            { id: 3, name: "finalData" },
        ],
    });
});
exports.getContract = getContract;
