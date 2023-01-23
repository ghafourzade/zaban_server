import TickEight, { afterDays } from "../models/TickEight";
import { readVocab } from "./vocab";

export const createTick8WithoutCondition = async (vocabId: string) => {
  try {
    const tick8 = new TickEight({
      vocabId: vocabId,
    });
    const savedTick8 = await tick8.save();
    return savedTick8;
  } catch (error) {
    return { error };
  }
};

export const createTick8 = async (vocabId: string) => {
  try {
    const vocab = await readVocab(vocabId);
    if (vocab) {
      const createdTick8 = await createTick8WithoutCondition(vocabId);
      return createdTick8;
    } else {
      throw new Error("There is not vocab with this id .");
    }
  } catch (error) {
    return { error };
  }
};

export const readTick8 = async (vocabId?: string) => {
  try {
    if (vocabId) {
      const tick8 = await TickEight.find({ vocabId: vocabId });
      return tick8.length > 0 ? tick8[0] : null;
    } else {
      const tick8s = await TickEight.find({});
      return tick8s;
    }
  } catch (error) {
    return { error };
  }
};

export const readReviewTick8 = async () => {
  const now = new Date();
  try {
    const tick8s = await TickEight.find({ $and: [{ finished: false }, { reviewDate: { $lte: now.toISOString() } }] });
    return tick8s;
  } catch (error) {
    return { error };
  }
};

export const updateNextTickTick8 = async (vocabId: string, tick: boolean) => {
  try {
    const tick8 = await TickEight.find({ vocabId: vocabId });
    if (tick8.length > 0) {
      const falseCount = tick8[0].tickEight.reduce(
        (acc, rowTick) => {
          if (rowTick === false) return acc + 1;
          return acc;
        },
        tick === true ? 0 : 1
      );
      if (falseCount < 2) {
        const reviewIndex = tick8[0].reviewIndex;
        let tickEight = tick8[0].tickEight;
        tickEight[reviewIndex] = tick;
        if (reviewIndex < 7) {
          const updatedTick8 = await TickEight.updateOne(
            { vocabId: vocabId },
            {
              $set: {
                tickEight,
                reviewIndex: reviewIndex + 1,
                reviewDate: afterDays(reviewIndex + 1),
              },
            }
          );
          return updatedTick8;
        } else {
          const updatedTick8 = await TickEight.updateOne(
            { vocabId: vocabId },
            {
              $set: {
                tickEight,
                finished: true,
              },
            }
          );
          return updatedTick8;
        }
      } else {
        const replacedTick8 = await createTick8(vocabId);
        return { ...replacedTick8, reset: true };
      }
    } else {
      const createdTick8 = await createTick8(vocabId);
      return createdTick8;
    }
  } catch (error) {
    return { error };
  }
};

export const updateResetTick8 = async (vocabId: string) => {
  try {
    const tick8 = await TickEight.find({ vocabId: vocabId });
    if (tick8.length > 0) {
      const replacedTick8 = await createTick8WithoutCondition(vocabId);
      return { ...replacedTick8, reset: true };
    }
  } catch (error) {
    return { error };
  }
};
