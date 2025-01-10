import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { clerkMiddleware } from "@clerk/express";
import connectDB from "./config/db.js";
import { clerkWebHooks } from "./controllers/webhooks.js";
import companyRoutes from "./routes/companyRoutes.js";
import connectCloudinary from "./config/cloudinary.js";
import jobRoutes from "./routes/jobRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const app = express();

(async () => {
  try {
    await connectDB();
    console.log("Database connection successful!");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
})();

await connectCloudinary();

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());


app.get("/", (req, res) => res.send("API Working..."));
app.post("/webhooks", clerkWebHooks);
app.use("/api/company", companyRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
