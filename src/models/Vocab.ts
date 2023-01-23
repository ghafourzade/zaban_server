import mongoose from "mongoose";

export type WordUsage = "noun" | "verb" | "adj" | "adv" | null;
export interface VocabRow {
  _id?: string;
  vocab: string;
  wordUsage: WordUsage;
  meaning: string;
  sentence: string;
  createdDate?: string;
}

const VocabSchema = new mongoose.Schema({
  vocab: { type: String, required: true },
  wordUsage: { type: String, required: true },
  meaning: { type: String, required: true },
  sentence: { type: String, required: true },
  createdDate: { type: Date, default: Date.now },
});

const Vocab = mongoose.model("Vocab", VocabSchema);

export default Vocab;
