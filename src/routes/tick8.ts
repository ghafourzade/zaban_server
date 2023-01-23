import express from "express";
import { createTick8, readReviewTick8, readTick8, updateNextTickTick8 } from "../controller/tick8";
import TickEight, { afterDays } from "../models/TickEight";

const tick8Route = express.Router();

tick8Route.post("/", async (req, res) => {
  const result = await createTick8(req.body.vocabId);
  res.json(result);
});

tick8Route.get("/", async (req, res) => {
  const result = await readTick8();
  res.json(result);
});

tick8Route.get("/review", async (req, res) => {
  const result = await readReviewTick8();
  res.json(result);
});

tick8Route.get("/:vocabId", async (req, res) => {
  const result = await readTick8(req.params.vocabId);
  res.json(result);
});

tick8Route.put("/:vocabId/next-tick", async (req, res) => {
  const result = await updateNextTickTick8(req.params.vocabId, req.body.tick);
  res.json(result);
});

tick8Route.put("/:vocabId/reset", async (req, res) => {});

export default tick8Route;
