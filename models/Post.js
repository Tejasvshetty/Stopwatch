const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  // image: {
  //   type: String,
  //   require: true,
  // },
  // cloudinaryId: {
  //   type: String,
  //   require: true,
  // },
  // caption: {
  //   type: String,
  //   required: true,
  // },
  likes: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  hour:{
    type: String,
    required: true,
  },
  minute:{
    type: String,
    required: true,
  },
  second:{
    type: String,
    required: true,
  },
  count:{
    type: String,
    required: true,
  },
  timeStart:{
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Post", PostSchema);
