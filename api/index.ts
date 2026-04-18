import app from "../src/app";
import { connectDB } from "../src/db/mongoose";

let isDbConnected = false;

const handler = async (req: any, res: any) => {
  if (!isDbConnected) {
    try {
      await connectDB();
      isDbConnected = true;
    } catch (err) {
      console.error("[DB] Connection failed:", err);
      return res.status(503).json({ status: "error", message: "Database unavailable" });
    }
  }
  return app(req, res);
};

export default handler;
