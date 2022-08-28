"use strict";
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
exports.signRefreshToken = exports.verifyRefreshToken = exports.verifyAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const accessHours = (_a = process.env.ACCESS_TOKEN_EXPIRES) !== null && _a !== void 0 ? _a : 5;
const refreshHours = (_b = process.env.REFRESH_TOKEN_EXPIRES) !== null && _b !== void 0 ? _b : 30;
const signAccessToken = (userId, userEmail, accessTokenHours) => {
    return new Promise((resolve, reject) => {
        var _a;
        const payload = {
            userID: userId,
            userEmail: userEmail,
        };
        const secrect_key = (_a = process.env.SECRECT_KEY_ACCESS) !== null && _a !== void 0 ? _a : "Secret";
        const options = {
            expiresIn: `${accessTokenHours}h`,
            issuer: "iconnect.com",
        };
        jsonwebtoken_1.default.sign(payload, secrect_key, options, (err, token) => {
            if (err) {
                return reject(err);
            }
            else {
                return resolve(token);
            }
        });
    });
};
const signRefreshToken = (userId, userEmail, refreshTokenDays) => {
    return new Promise((resolve, reject) => {
        var _a;
        const payload = {
            userID: userId,
            userEmail: userEmail,
        };
        const secrect_key = (_a = process.env.SECRECT_KEY_REFRESH) !== null && _a !== void 0 ? _a : "Secret";
        const options = {
            expiresIn: `${refreshTokenDays}d`,
            issuer: "iconnect.com",
        };
        jsonwebtoken_1.default.sign(payload, secrect_key, options, (err, token) => {
            if (err) {
                return reject(err);
            }
            else {
                return resolve(token);
            }
        });
    });
};
exports.signRefreshToken = signRefreshToken;
const verifyAccessToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("req::=>", req);
    var _c;
    // res.send({ ok: true });
    try {
        const accessToken = req.cookies.accessToken;
        console.log("accessToken:", accessToken);
        const access_token_scerect = (_c = process.env.SECRECT_KEY_ACCESS) !== null && _c !== void 0 ? _c : "Secret";
        jsonwebtoken_1.default.verify(accessToken, access_token_scerect, function (err, decoded) {
            if (err === null) {
                next();
            }
            else {
                res.status(403).send({
                    ok: false,
                    message: "User Authentication faild",
                });
            }
        });
    }
    catch (error) {
        res.status(403).send({
            ok: false,
            message: "Invalid header faild",
        });
    }
});
exports.verifyAccessToken = verifyAccessToken;
const verifyRefreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        const refreshToken = req.cookies.refreshToken;
        const refresh_token_scerect = (_d = process.env.SECRECT_KEY_REFRESH) !== null && _d !== void 0 ? _d : "Secret";
        jsonwebtoken_1.default.verify(refreshToken, refresh_token_scerect, function (err, decoded) {
            return __awaiter(this, void 0, void 0, function* () {
                if (err === null) {
                    const accessToken = yield signAccessToken(decoded.userID, decoded.userEmail, parseInt(accessHours.toString()));
                    const finalAccessHours = parseInt(accessHours.toString()) * 60 * 60 * 1000;
                    res.cookie("accessToken", accessToken, {
                        maxAge: finalAccessHours,
                    });
                    res.send({
                        ok: true,
                        accessToken: accessToken,
                    });
                }
                else {
                    res.status(401).send({
                        ok: false,
                        message: "User Authentication faild",
                    });
                }
            });
        });
    }
    catch (error) {
        res.status(401).send({
            ok: false,
            message: "Invalid header call faild",
        });
    }
});
exports.verifyRefreshToken = verifyRefreshToken;
exports.default = signAccessToken;
