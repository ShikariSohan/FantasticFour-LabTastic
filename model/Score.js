import mongoose from "mongoose";

const score = new mongoose.Schema({
  score: {
    type: String,
    required: true,
  },
  task: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task",
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

module.exports = mongoose.models.User || mongoose.model("Score", score);
