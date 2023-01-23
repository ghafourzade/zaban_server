import Vocab, { VocabRow } from "../models/Vocab";
import { createTick8WithoutCondition } from "./tick8";

export const createVocab = async (vocabRow: VocabRow) => {
  const newVocab = new Vocab({
    vocab: vocabRow.vocab,
    wordUsage: vocabRow.wordUsage,
    meaning: vocabRow.meaning,
    sentence: vocabRow.sentence,
  });
  try {
    const createdVocab = await newVocab.save();
    await createTick8WithoutCondition(createdVocab._id.toString());
    return createdVocab;
  } catch (error) {
    return { error };
  }
};

export const readVocab = async (id?: string) => {
  try {
    if (id) {
      const vocab = await Vocab.findById(id);
      return vocab;
    } else {
      const vocabs = await Vocab.find({}).sort({ createdDate: -1 });
      return vocabs;
    }
  } catch (error) {
    return { error };
  }
};

export const updateVocab = async (id: string, vocabRow: VocabRow) => {
  try {
    const updatedVocab = await Vocab.updateOne(
      { _id: id },
      {
        $set: {
          vocab: vocabRow.vocab,
          wordUsage: vocabRow.wordUsage,
          meaning: vocabRow.meaning,
          sentence: vocabRow.sentence,
        },
      }
    );
    return updatedVocab;
  } catch (error) {
    return { error };
  }
};

export const deleteVocab = async (id: string) => {
  try {
    const removedVocab = await Vocab.remove({ _id: id });
    return removedVocab;
  } catch (error) {
    return { error };
  }
};
