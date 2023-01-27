import mongoose from "mongoose";

const result = new mongoose.Schema({
  student: {
    type: String,
    required: true,
  },
  task: {
    type: String,
  },
  taskname: {
    type: String,
  },
  questionSet: [
    {
      question: String,
      title:String, 
      answer: String,
      actual:String
    },
  ],
});

module.exports =
  mongoose.models.Result || mongoose.model("Result", result);
