import mongoose from "mongoose";

const score = new mongoose.Schema({
  score: {
    type: Number,
    required: true,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  task: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task",
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
});

module.exports = mongoose.models.Score || mongoose.model("Score", score);
