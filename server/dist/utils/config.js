"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONGO_URL = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const FRONTEND_URL = (_a = process.env.FRONTEND_URL) !== null && _a !== void 0 ? _a : "http://localhost:3000";
const PORT = (_b = process.env.PORT) !== null && _b !== void 0 ? _b : 3000;
exports.PORT = PORT;
exports.default = FRONTEND_URL;
const MONGO_URL = (_c = process.env.MONGO_URL) !== null && _c !== void 0 ? _c : "";
exports.MONGO_URL = MONGO_URL;
