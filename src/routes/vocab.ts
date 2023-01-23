import express from "express";
import { createVocab, deleteVocab, readVocab, updateVocab } from "../controller/vocab";

const vocabRoute = express.Router();

vocabRoute.post("/", async (req, res) => {
  const result = await createVocab(req.body);
  res.json(result);
});
vocabRoute.get("/", async (req, res) => {
  const result = await readVocab();
  res.json(result);
});
vocabRoute.get("/:id", async (req, res) => {
  const result = await readVocab(req.params.id);
  res.json(result);
});
vocabRoute.put("/:id", async (req, res) => {
  const result = await updateVocab(req.params.id, req.body);
  res.json(result);
});
vocabRoute.delete("/:id", async (req, res) => {
  const result = await deleteVocab(req.params.id);
  res.json(result);
});

export default vocabRoute;
