import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import gameRoutes from "./routes/gameRoutes";
import { setupSwagger } from "./swagger";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/game-crud";

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173', 'https://time-pass-two.vercel.app/'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(express.json());
app.use("/api/games", gameRoutes);
setupSwagger(app);

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

  // Start server locally, but not on Vercel
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}


export default app;
