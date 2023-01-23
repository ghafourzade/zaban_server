import mongoose from "mongoose";

export const afterDays = (days: number) => Date.now() + 1000 * 3600 * 24 * days;

const TickEightSchema = new mongoose.Schema({
  vocabId: { type: mongoose.Schema.Types.ObjectId, ref: "Vocab", required: true, unique: true },
  createdDate: { type: Date, default: Date.now },
  reviewDate: { type: Date, default: afterDays.bind(null, 1) },
  reviewIndex: { type: Number, default: 1 },
  tickEight: { type: [Boolean], default: [true, null, null, null, null, null, null, null] },
  finished: { type: Boolean, default: false },
});

const TickEight = mongoose.model("TickEight", TickEightSchema);

export default TickEight;
