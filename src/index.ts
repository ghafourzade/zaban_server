import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import vocabRoute from "./routes/vocab";
import tick8Route from "./routes/tick8";

dotenv.config();
const PORT = process.env.PORT || 5555;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/vocab", vocabRoute);
app.use("/tick8", tick8Route);

mongoose.connect("mongodb://localhost:27017/english").then(() => {
  app.listen(PORT);
  console.log(`Listening on port ${PORT}`);
});
