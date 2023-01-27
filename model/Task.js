import mongoose from "mongoose";

const classroomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  instruction:{
    type:String,
  },
  url:{
    type:String
  },
  questionSet:[{
    question:String,
    answer:String
  }],
  classroom:{
    type:String
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
});

module.exports =
  mongoose.models.Classroom || mongoose.model("Classroom", classroomSchema);
