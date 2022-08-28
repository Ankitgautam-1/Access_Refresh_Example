import dotenv from "dotenv";
dotenv.config();

const FRONTEND_URL = process.env.FRONTEND_URL ?? "http://localhost:3000";

const PORT = process.env.PORT ?? 3000;

export default FRONTEND_URL;

const MONGO_URL = process.env.MONGO_URL ?? "";
export { PORT, MONGO_URL };
