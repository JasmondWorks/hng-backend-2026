import { config } from "dotenv";
config({ path: ".env.local" });
import app from "./app";
import { connectDB } from "./db/mongoose";

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
