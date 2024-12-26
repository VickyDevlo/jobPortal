import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import { clerkWebHooks } from "./controllers/webHooks.js";

const app = express();

await connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("API Working..."));

app.post('/webhooks', clerkWebHooks)

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is runing on port ${PORT}`);
});
